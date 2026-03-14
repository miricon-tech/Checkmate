"use client";

import { track } from "@vercel/analytics/react";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsProperties = Record<string, AnalyticsValue>;

export function trackEvent(
  name: string,
  properties?: AnalyticsProperties
) {
  try {
    track(name, properties);
  } catch {
    // Ignore analytics failures so they never affect UX.
  }
}
