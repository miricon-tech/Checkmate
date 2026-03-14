"use client";

import dynamic from "next/dynamic";

const AccessibilityControls = dynamic(
  () =>
    import("@/components/landing/accessibility-controls").then(
      (module) => module.AccessibilityControls
    ),
  {
    ssr: false,
  }
);

export function LazyAccessibilityControls() {
  return <AccessibilityControls />;
}
