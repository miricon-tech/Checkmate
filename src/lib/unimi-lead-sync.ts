import "server-only";

import { siteConfig } from "@/lib/site-config";
import {
  monthlyRevenueOptions,
  type LeadFormValues,
} from "@/lib/lead-form-schema";

const monthlyRevenueLabels = Object.fromEntries(
  monthlyRevenueOptions.map((option) => [option.value, option.label])
) as Record<string, string>;

type LeadAttribution = Partial<
  Record<
    | "utm_source"
    | "utm_medium"
    | "utm_campaign"
    | "utm_term"
    | "utm_content"
    | "fbclid"
    | "gclid"
    | "fbc"
    | "fbp"
    | "landing_path"
    | "captured_at",
    string
  >
>;

type LeadSyncPayload = LeadFormValues & {
  attribution?: LeadAttribution;
  eventId?: string;
  locale?: "he" | "en";
  pageUrl?: string;
  sourcePath?: string;
  submittedAtClient?: string;
};

function getOptionalString(
  payload: Record<string, unknown>,
  key: keyof LeadSyncPayload
) {
  const value = payload[key];

  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();

  return trimmed.length > 0 ? trimmed : undefined;
}

function getAttribution(
  payload: Record<string, unknown>
): LeadAttribution | undefined {
  const attribution = payload.attribution;

  if (!attribution || typeof attribution !== "object" || Array.isArray(attribution)) {
    return undefined;
  }

  const normalized = Object.fromEntries(
    Object.entries(attribution).flatMap(([key, value]) => {
      if (typeof value !== "string") {
        return [];
      }

      const trimmed = value.trim();

      return trimmed ? [[key, trimmed]] : [];
    })
  ) as LeadAttribution;

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

function normalizePageUrl(pageUrl: string | undefined, request: Request) {
  if (pageUrl) {
    return pageUrl;
  }

  const referer = request.headers.get("referer");

  if (referer) {
    return referer;
  }

  return siteConfig.siteUrl;
}

function normalizeSourcePath(
  sourcePath: string | undefined,
  pageUrl: string | undefined
) {
  if (sourcePath) {
    return sourcePath;
  }

  if (!pageUrl) {
    return "/";
  }

  try {
    return new URL(pageUrl).pathname || "/";
  } catch {
    return "/";
  }
}

function getLocale(locale: string | undefined): "he" | "en" {
  return locale === "en" ? "en" : "he";
}

function getEventId(eventId: string | undefined) {
  return eventId ?? `lead-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
}

function getFormData(values: LeadFormValues) {
  const monthlyRevenueLabel =
    monthlyRevenueLabels[values.monthlyRevenue] ?? undefined;

  return {
    challenge: values.challenge.trim() || undefined,
    formType: "checkmate-lead",
    monthlyRevenue: values.monthlyRevenue || undefined,
    monthlyRevenueLabel,
  };
}

export function isUnimiLeadSyncEnabled() {
  return Boolean(process.env.UNIMI_SITE_KEY);
}

export async function syncLeadToUnimi(
  values: LeadFormValues,
  payload: Record<string, unknown>,
  request: Request
) {
  const siteKey = process.env.UNIMI_SITE_KEY?.trim();

  if (!siteKey) {
    return { enabled: false, ok: false as const };
  }

  const endpoint =
    process.env.UNIMI_LEADS_ENDPOINT?.trim() ||
    "https://unimi.io/api/leads";
  const pageUrl = normalizePageUrl(getOptionalString(payload, "pageUrl"), request);
  const sourcePath = normalizeSourcePath(
    getOptionalString(payload, "sourcePath"),
    pageUrl
  );
  const locale = getLocale(getOptionalString(payload, "locale"));
  const submittedAtClient =
    getOptionalString(payload, "submittedAtClient") || new Date().toISOString();
  const eventId = getEventId(getOptionalString(payload, "eventId"));
  const attribution = getAttribution(payload);

  const response = await fetch(endpoint, {
    body: JSON.stringify({
      attribution,
      businessName: values.company,
      eventId,
      formData: getFormData(values),
      locale,
      message: values.challenge.trim() || undefined,
      name: values.fullName,
      pageUrl,
      phone: values.phone,
      projectType: "external-growth-partner",
      siteKey,
      sourcePath,
      submittedAtClient,
    }),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");

    throw new Error(
      `Unimi lead sync failed with ${response.status}${responseText ? `: ${responseText}` : ""}`
    );
  }

  return { enabled: true, ok: true as const };
}
