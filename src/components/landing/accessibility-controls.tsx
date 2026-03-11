"use client";

import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  Check,
  Eye,
  SlidersHorizontal,
  Type,
  Underline,
  X,
  ZapOff,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AccessibilityPreferences = {
  highContrast: boolean;
  largeText: boolean;
  reduceMotion: boolean;
  underlineLinks: boolean;
};

type PreferenceKey = keyof AccessibilityPreferences;

const storageKey = "checkmate-accessibility-preferences";

const defaultPreferences: AccessibilityPreferences = {
  highContrast: false,
  largeText: false,
  reduceMotion: false,
  underlineLinks: false,
};

const preferenceLabels: Record<
  PreferenceKey,
  { description: string; icon: LucideIcon; label: string; meta: string }
> = {
  highContrast: {
    description: "מחדד צבעים, גבולות וטקסט לקריאות גבוהה יותר.",
    icon: Eye,
    label: "ניגודיות גבוהה",
    meta: "Contrast",
  },
  largeText: {
    description: "מגדיל את הטקסטים הראשיים לאורך העמוד.",
    icon: Type,
    label: "טקסט גדול",
    meta: "Type",
  },
  reduceMotion: {
    description: "מבטל אנימציות ותנועות עדינות בעמוד.",
    icon: ZapOff,
    label: "הפחתת תנועה",
    meta: "Motion",
  },
  underlineLinks: {
    description: "מוסיף קו תחתון ברור לקישורים אינפורמטיביים.",
    icon: Underline,
    label: "הדגשת קישורים",
    meta: "Links",
  },
};

function applyPreferences(preferences: AccessibilityPreferences) {
  const root = document.documentElement;

  root.dataset.accessibilityContrast = preferences.highContrast
    ? "high"
    : "default";
  root.dataset.accessibilityText = preferences.largeText ? "large" : "default";
  root.dataset.accessibilityMotion = preferences.reduceMotion
    ? "reduced"
    : "default";
  root.dataset.accessibilityLinks = preferences.underlineLinks
    ? "underlined"
    : "default";
}

function readStoredPreferences() {
  if (typeof window === "undefined") {
    return defaultPreferences;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);

    if (!rawValue) {
      return defaultPreferences;
    }

    const parsedValue = JSON.parse(rawValue) as Partial<AccessibilityPreferences>;

    return {
      highContrast: Boolean(parsedValue.highContrast),
      largeText: Boolean(parsedValue.largeText),
      reduceMotion: Boolean(parsedValue.reduceMotion),
      underlineLinks: Boolean(parsedValue.underlineLinks),
    };
  } catch {
    return defaultPreferences;
  }
}

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] =
    useState<AccessibilityPreferences>(() => readStoredPreferences());
  const panelRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    applyPreferences(preferences);
    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen]);

  const togglePreference = (key: PreferenceKey) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  return (
    <aside className="accessibility-dock" aria-label="כלי נגישות">
      {isOpen ? (
        <div
          id="accessibility-panel"
          className="accessibility-panel"
          role="dialog"
          aria-modal="false"
          aria-label="אפשרויות נגישות לעמוד"
          ref={panelRef}
        >
          <div aria-hidden="true" className="accessibility-panel__trim" />
          <div className="accessibility-panel__header">
            <div>
              <p className="accessibility-panel__eyebrow">נגישות</p>
              <h2 className="accessibility-panel__title">התאמה מהירה לקריאה נוחה</h2>
            </div>
            <button
              type="button"
              className="accessibility-panel__close"
              onClick={() => setIsOpen(false)}
              aria-label="סגירת כלי הנגישות"
            >
              <X className="h-4 w-4" strokeWidth={1.9} />
            </button>
          </div>

          <div className="accessibility-panel__intro">
            <span className="accessibility-panel__pill">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.8} />
              <span>4 התאמות מהירות</span>
            </span>
          </div>

          <p className="accessibility-panel__copy">
            אפשר לשפר קריאות, להקטין עומס חזותי ולנווט בעמוד בצורה ברורה יותר.
          </p>

          <div className="accessibility-panel__grid">
            {(Object.keys(preferenceLabels) as PreferenceKey[]).map((key) => (
              (() => {
                const item = preferenceLabels[key];
                const Icon = item.icon;

                return (
                  <button
                    key={key}
                    type="button"
                    className="accessibility-option"
                    aria-pressed={preferences[key]}
                    data-active={preferences[key] ? "true" : "false"}
                    onClick={() => togglePreference(key)}
                  >
                    <span className="accessibility-option__top">
                      <span className="accessibility-option__icon" aria-hidden="true">
                        <Icon className="h-4 w-4" strokeWidth={1.85} />
                      </span>
                      <span className="accessibility-option__state" aria-hidden="true">
                        {preferences[key] ? (
                          <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
                        ) : null}
                        <span>{preferences[key] ? "פעיל" : "כבוי"}</span>
                      </span>
                    </span>

                    <span className="accessibility-option__label-group">
                      <span className="accessibility-option__meta">{item.meta}</span>
                      <span className="accessibility-option__label">
                        {item.label}
                      </span>
                    </span>

                    <span className="accessibility-option__description">
                      {item.description}
                    </span>

                    <span className="accessibility-option__toggle" aria-hidden="true">
                      <span className="accessibility-option__toggle-track">
                        <span className="accessibility-option__toggle-thumb" />
                      </span>
                    </span>
                  </button>
                );
              })()
            ))}
          </div>

          <button
            type="button"
            className="accessibility-panel__reset"
            onClick={resetPreferences}
          >
            איפוס הגדרות נגישות
          </button>
        </div>
      ) : null}

      <button
        type="button"
        className="accessibility-trigger"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label={isOpen ? "סגירת כלי הנגישות" : "פתיחת כלי הנגישות"}
        data-open={isOpen ? "true" : "false"}
        ref={triggerRef}
      >
        <span className="accessibility-trigger__dot" aria-hidden="true" />
        <span className="accessibility-trigger__icon" aria-hidden="true">
          <Accessibility className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.85} />
        </span>
        <span className="sr-only">נגישות</span>
      </button>
    </aside>
  );
}
