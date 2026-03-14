"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type TrackedExternalLinkProps = {
  analyticsEventName: string;
  analyticsProperties?: Record<string, string | number | boolean | null | undefined>;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children">;

export function TrackedExternalLink({
  analyticsEventName,
  analyticsProperties,
  children,
  onClick,
  ...anchorProps
}: TrackedExternalLinkProps) {
  return (
    <a
      {...anchorProps}
      onClick={(event) => {
        trackEvent(analyticsEventName, analyticsProperties);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
