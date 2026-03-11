"use client";

import { useEffect, useState } from "react";

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
  { description: string; label: string }
> = {
  highContrast: {
    description: "מחדד צבעים, גבולות וטקסט לקריאות גבוהה יותר.",
    label: "ניגודיות גבוהה",
  },
  largeText: {
    description: "מגדיל את הטקסטים הראשיים לאורך העמוד.",
    label: "טקסט גדול",
  },
  reduceMotion: {
    description: "מבטל אנימציות ותנועות עדינות בעמוד.",
    label: "הפחתת תנועה",
  },
  underlineLinks: {
    description: "מוסיף קו תחתון ברור לקישורים אינפורמטיביים.",
    label: "הדגשת קישורים",
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

function AccessibilityGlyph() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-[1.15rem] w-[1.15rem]"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M6.7 8.7c1.45 1.16 3.33 1.74 5.3 1.74s3.85-.58 5.3-1.74"
        stroke="var(--accent)"
        strokeWidth="1.55"
      />
      <circle cx="12" cy="4.7" r="1.55" fill="currentColor" />
      <path
        d="M12 8.9v6.1"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 11.8 8.8 18.35"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 11.8 15.2 18.35"
        stroke="currentColor"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function AccessibilityControls() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] =
    useState<AccessibilityPreferences>(() => readStoredPreferences());

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

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
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
        >
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
              ×
            </button>
          </div>

          <p className="accessibility-panel__copy">
            אפשר לשפר קריאות, להקטין עומס חזותי ולנווט בעמוד בצורה ברורה יותר.
          </p>

          <div className="accessibility-panel__grid">
            {(Object.keys(preferenceLabels) as PreferenceKey[]).map((key) => (
              <button
                key={key}
                type="button"
                className="accessibility-option"
                aria-pressed={preferences[key]}
                data-active={preferences[key] ? "true" : "false"}
                onClick={() => togglePreference(key)}
              >
                <span className="accessibility-option__label">
                  {preferenceLabels[key].label}
                </span>
                <span className="accessibility-option__description">
                  {preferenceLabels[key].description}
                </span>
              </button>
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
      >
        <span className="accessibility-trigger__icon" aria-hidden="true">
          <AccessibilityGlyph />
        </span>
        <span className="sr-only">נגישות</span>
      </button>
    </aside>
  );
}
