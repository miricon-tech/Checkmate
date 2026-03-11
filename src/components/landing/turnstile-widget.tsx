"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

type TurnstileWidgetProps = {
  onError: () => void;
  onExpire: () => void;
  onVerify: (token: string) => void;
  resetKey: number;
};

type TurnstileInstance = {
  remove?: (widgetId: string) => void;
  render: (
    container: HTMLElement,
    options: {
      action: string;
      appearance: "always" | "interaction-only";
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
      language: string;
      sitekey: string;
      theme: "auto" | "dark" | "light";
    }
  ) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileInstance;
  }
}

const scriptId = "cf-turnstile-script";
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function TurnstileWidget({
  onError,
  onExpire,
  onVerify,
  resetKey,
}: TurnstileWidgetProps) {
  const [scriptLoaded, setScriptLoaded] = useState(
    () => typeof window !== "undefined" && Boolean(window.turnstile)
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const callbacksRef = useRef({
    onError,
    onExpire,
    onVerify,
  });

  useEffect(() => {
    callbacksRef.current = {
      onError,
      onExpire,
      onVerify,
    };
  }, [onError, onExpire, onVerify]);

  useEffect(() => {
    if (
      !siteKey ||
      !scriptLoaded ||
      !containerRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      action: "lead_form",
      appearance: "interaction-only",
      callback: (token) => callbacksRef.current.onVerify(token),
      "error-callback": () => callbacksRef.current.onError(),
      "expired-callback": () => callbacksRef.current.onExpire(),
      language: "he",
      sitekey: siteKey,
      theme: "light",
    });
  }, [scriptLoaded]);

  useEffect(() => {
    if (!resetKey || !widgetIdRef.current || !window.turnstile) {
      return;
    }

    window.turnstile.reset(widgetIdRef.current);
  }, [resetKey]);

  useEffect(() => {
    return () => {
      if (widgetIdRef.current && window.turnstile?.remove) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  if (!siteKey) {
    return (
      <div className="rounded-[20px] border border-[rgba(180,54,54,0.12)] bg-[rgba(180,54,54,0.05)] px-4 py-3 text-sm leading-6 text-[rgba(120,34,34,0.88)]">
        חסר `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, לכן אימות האבטחה של הטופס עדיין לא
        פעיל.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Script
        id={scriptId}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div
        ref={containerRef}
        className="min-h-[72px] rounded-[20px] border border-[rgba(22,52,92,0.08)] bg-white/70 px-3 py-2 shadow-[0_10px_24px_rgba(22,52,92,0.06)]"
      />
      <p className="text-xs leading-5 text-[rgba(17,26,31,0.5)]">
        בדיקת אבטחה שקטה להגנה על הטופס מפני בוטים וספאם.
      </p>
    </div>
  );
}
