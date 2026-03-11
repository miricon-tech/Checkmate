import { NextResponse } from "next/server";
import { sendLeadNotification } from "@/lib/lead-email";
import {
  leadFormSchema,
  type LeadFormValues,
} from "@/lib/lead-form-schema";

export const runtime = "nodejs";

type LeadFieldErrors = Partial<Record<keyof LeadFormValues, string>>;

function getFieldErrors(payload: Record<string, string[] | undefined>) {
  return Object.fromEntries(
    Object.entries(payload).map(([key, messages]) => [key, messages?.[0] ?? ""])
  ) as LeadFieldErrors;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
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
      return NextResponse.json({
        message: "הפרטים התקבלו. אם יש התאמה, ניצור קשר להמשך.",
      });
    }

    return NextResponse.json(
      {
        fieldErrors,
        message: "יש כמה פרטים שכדאי לדייק לפני שליחה.",
      },
      { status: 400 }
    );
  }

  try {
    await sendLeadNotification(result.data);

    return NextResponse.json({
      message: "הפרטים התקבלו. אם העסק מתאים, נחזור לתיאום בדיקת התאמה.",
    });
  } catch (error) {
    console.error("Failed to deliver lead form email", error);

    return NextResponse.json(
      {
        message:
          "השליחה לא הושלמה כרגע. אפשר לנסות שוב בעוד רגע או לפנות אלינו ישירות.",
      },
      { status: 500 }
    );
  }
}
