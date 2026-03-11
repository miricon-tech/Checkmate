import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/lead-email";
import {
  checkLeadRateLimit,
  getClientIp,
  getLeadGuardConfig,
  hasAllowedLeadOrigin,
  hasJsonContentType,
  isBodyTooLarge,
} from "@/lib/lead-request-guards";
import {
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/lead-form-schema";
import { verifyTurnstileToken } from "@/lib/lead-turnstile";

export const runtime = "nodejs";

type LeadFieldErrors = Partial<Record<keyof LeadFormValues, string>>;

function jsonResponse(
  body: Record<string, unknown>,
  init?: ResponseInit
) {
  const headers = new Headers(init?.headers);

  headers.set("Cache-Control", "no-store, max-age=0");
  headers.set("Referrer-Policy", "same-origin");
  headers.set("Vary", "Origin");
  headers.set("X-Content-Type-Options", "nosniff");

  return NextResponse.json(body, {
    ...init,
    headers,
  });
}

function getFieldErrors(payload: Record<string, string[] | undefined>) {
  return Object.fromEntries(
    Object.entries(payload).map(([key, messages]) => [key, messages?.[0] ?? ""])
  ) as LeadFieldErrors;
}

export async function POST(request: Request) {
  const guardConfig = getLeadGuardConfig();

  if (!hasAllowedLeadOrigin(request)) {
    return jsonResponse(
      { message: "מקור הבקשה לא מורשה לשליחת הטופס." },
      { status: 403 }
    );
  }

  if (!hasJsonContentType(request)) {
    return jsonResponse(
      { message: "פורמט הבקשה לא נתמך." },
      { status: 415 }
    );
  }

  if (isBodyTooLarge(request)) {
    return jsonResponse(
      {
        message: `הבקשה גדולה מדי. אפשר לשלוח עד ${guardConfig.maxBodyBytes} בתים.`,
      },
      { status: 413 }
    );
  }

  const rateLimit = checkLeadRateLimit(request);

  if (rateLimit.limited) {
    return jsonResponse(
      {
        message:
          "נשלחו יותר מדי ניסיונות בפרק זמן קצר. נסו שוב בעוד כמה דקות.",
      },
      {
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
        status: 429,
      }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse(
      { message: "לא הצלחנו לקרוא את פרטי הטופס. נסו שוב." },
      { status: 400 }
    );
  }

  const normalizedPayload =
    payload && typeof payload === "object"
      ? { website: "", ...(payload as Record<string, unknown>) }
      : payload;

  const result = leadFormSchema.safeParse(normalizedPayload);

  if (!result.success) {
    const fieldErrors = getFieldErrors(result.error.flatten().fieldErrors);

    if (fieldErrors.website) {
      return jsonResponse({
        message: "הפרטים התקבלו. אם יש התאמה, ניצור קשר להמשך.",
      });
    }

    return jsonResponse(
      {
        fieldErrors,
        message: "יש כמה פרטים שכדאי לדייק לפני שליחה.",
      },
      { status: 400 }
    );
  }

  const turnstileToken =
    payload && typeof payload === "object"
      ? String(
          (payload as Record<string, unknown>).turnstileToken ?? ""
        ).trim()
      : "";

  if (!turnstileToken) {
    return jsonResponse(
      {
        message: "צריך להשלים את אימות האבטחה לפני שליחת הטופס.",
        resetTurnstile: true,
      },
      { status: 400 }
    );
  }

  try {
    const turnstileResult = await verifyTurnstileToken(
      turnstileToken,
      getClientIp(request)
    );

    if (!turnstileResult.ok) {
      return jsonResponse(
        {
          message: "אימות האבטחה לא הושלם. אפשר לנסות שוב.",
          resetTurnstile: turnstileResult.resetRequired,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Failed to verify Turnstile token", error);

    return jsonResponse(
      {
        message:
          "בדיקת האבטחה לא זמינה כרגע. אפשר לנסות שוב בעוד רגע או לפנות אלינו ישירות.",
        resetTurnstile: true,
      },
      { status: 503 }
    );
  }

  try {
    await sendLeadNotification(result.data);

    return jsonResponse({
      message: "הפרטים התקבלו. אם העסק מתאים, נחזור לתיאום בדיקת התאמה.",
      resetTurnstile: true,
    });
  } catch (error) {
    console.error("Failed to deliver lead form email", error);

    return jsonResponse(
      {
        message:
          "השליחה לא הושלמה כרגע. אפשר לנסות שוב בעוד רגע או לפנות אלינו ישירות.",
        resetTurnstile: true,
      },
      { status: 500 }
    );
  }
}
