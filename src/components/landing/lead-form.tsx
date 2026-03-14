"use client";

import type { ChangeEvent, FormEvent } from "react";
import {
  useEffect,
  useEffectEvent,
  useId,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import type { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import {
  leadFormSchema,
  monthlyRevenueOptions,
  type LeadFormValues,
} from "@/lib/lead-form-schema";

const leadFormSignals = [
  { label: "זמן", value: "15 דק׳" },
  { label: "אופי", value: "בלי לחץ" },
  { label: "מטרה", value: "התאמה אמיתית" },
] as const;

const initialValues: LeadFormValues = {
  fullName: "",
  phone: "",
  company: "",
  monthlyRevenue: "",
  challenge: "",
  website: "",
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

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

type LeadSubmissionPayload = LeadFormValues & {
  attribution?: LeadAttribution;
  eventId: string;
  locale: "he" | "en";
  pageUrl: string;
  sourcePath: string;
  submittedAtClient: string;
};

type LeadFormStatus =
  | { tone: "success" | "error"; message: string }
  | null;

type LeadFormProps = {
  className?: string;
  description?: string;
  note?: string;
  submitLabel?: string;
  title?: string;
  tone?: "default" | "strong" | "soft" | "dark";
};

type RevenueSelectProps = {
  describedBy?: string;
  error?: string;
  onChange: (value: LeadFormValues["monthlyRevenue"]) => void;
  options: typeof monthlyRevenueOptions;
  value: LeadFormValues["monthlyRevenue"];
};

function getFieldErrors(error: ZodError<LeadFormValues>) {
  const fieldErrors = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] ?? "",
    ])
  ) as LeadFormErrors;
}

function getCookieValue(name: string) {
  if (typeof document === "undefined") {
    return undefined;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) {
    return undefined;
  }

  return cookie.slice(name.length + 1);
}

function createLeadEventId() {
  const randomPart =
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);

  return `lead-${Date.now()}-${randomPart}`;
}

function buildLeadSubmissionPayload(
  values: LeadFormValues
): LeadSubmissionPayload {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const locale = document.documentElement.lang.startsWith("en") ? "en" : "he";
  const attribution = Object.fromEntries(
    [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "fbclid",
      "gclid",
    ].flatMap((key) => {
      const value = searchParams.get(key)?.trim();

      return value ? [[key, value]] : [];
    })
  ) as LeadAttribution;

  const fbc = getCookieValue("_fbc");
  const fbp = getCookieValue("_fbp");

  if (fbc) {
    attribution.fbc = decodeURIComponent(fbc);
  }

  if (fbp) {
    attribution.fbp = decodeURIComponent(fbp);
  }

  attribution.landing_path = url.pathname;
  attribution.captured_at = new Date().toISOString();

  return {
    ...values,
    attribution,
    eventId: createLeadEventId(),
    locale,
    pageUrl: url.toString(),
    sourcePath: url.pathname,
    submittedAtClient: new Date().toISOString(),
  };
}

function RevenueSelect({
  describedBy,
  error,
  onChange,
  options,
  value,
}: RevenueSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const selectedOption = options.find((option) => option.value === value);
  const selectedLabel = selectedOption?.label ?? "אפשר להשאיר ריק";

  const handlePointerDownOutside = useEffectEvent((event: PointerEvent) => {
    const target = event.target;

    if (!(target instanceof Node)) {
      return;
    }

    if (!rootRef.current?.contains(target)) {
      setIsOpen(false);
    }
  });

  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key !== "Escape") {
      return;
    }

    setIsOpen(false);
    buttonRef.current?.focus();
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("pointerdown", handlePointerDownOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleSelect = (nextValue: LeadFormValues["monthlyRevenue"]) => {
    onChange(nextValue);
    setIsOpen(false);

    requestAnimationFrame(() => {
      buttonRef.current?.focus();
    });
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "ui-select-menu",
        isOpen && "ui-select-menu--open",
        value && "ui-select-menu--filled",
        error && "ui-select-menu--error"
      )}
    >
      <button
        ref={buttonRef}
        type="button"
        className="ui-input ui-select-menu__trigger"
        aria-controls={listboxId}
        aria-describedby={describedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span
          className={cn(
            "ui-select-menu__value",
            !value && "ui-select-menu__value--placeholder"
          )}
        >
          {selectedLabel}
        </span>
        <span className="ui-select-menu__icon-shell" aria-hidden="true">
          <ChevronDown className="ui-select-menu__icon" strokeWidth={1.9} />
        </span>
      </button>

      <div
        id={listboxId}
        role="listbox"
        aria-hidden={!isOpen}
        className="ui-select-menu__panel"
        data-open={isOpen ? "true" : "false"}
      >
        <div className="ui-select-menu__panel-inner">
          <button
            type="button"
            role="option"
            tabIndex={isOpen ? 0 : -1}
            aria-selected={!value}
            className={cn(
              "ui-select-menu__option",
              !value && "ui-select-menu__option--selected"
            )}
            onClick={() => handleSelect("")}
          >
            <span className="ui-select-menu__option-copy">
              <span className="ui-select-menu__option-title">
                אפשר להשאיר ריק
              </span>
              <span className="ui-select-menu__option-caption">
                לא חובה לבחור טווח בשלב הזה
              </span>
            </span>
            <Check
              className="ui-select-menu__check"
              strokeWidth={2}
            />
          </button>

          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                role="option"
                tabIndex={isOpen ? 0 : -1}
                aria-selected={isSelected}
                className={cn(
                  "ui-select-menu__option",
                  isSelected && "ui-select-menu__option--selected"
                )}
                onClick={() => handleSelect(option.value)}
              >
                <span className="ui-select-menu__option-title">
                  {option.label}
                </span>
                <Check
                  className="ui-select-menu__check"
                  strokeWidth={2}
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function LeadForm({
  className,
  description = "שיחה קצרה כדי לבדוק אם יש כאן פוטנציאל צמיחה אמיתי.",
  note = "הפרטים נועדו לבדוק התאמה ראשונית למודל העבודה של Checkmate.",
  submitLabel = "בדיקת התאמה (15 דק׳)",
  title = "בדיקת התאמה לעסק",
  tone = "strong",
}: LeadFormProps) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<LeadFormStatus>(null);
  const formId = useId();

  const fieldErrorId = (field: keyof LeadFormValues) => `${formId}-${field}-error`;
  const isFilled = (field: keyof LeadFormValues) => values[field].trim().length > 0;
  const updateFieldValue = (
    fieldName: keyof LeadFormValues,
    value: LeadFormValues[keyof LeadFormValues]
  ) => {
    setValues((current) => ({ ...current, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: undefined }));
    }

    if (status) {
      setStatus(null);
    }
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof LeadFormValues;

    updateFieldValue(fieldName, value);
  };

  const handleFormFocus = () => {
    if (hasStarted) {
      return;
    }

    setHasStarted(true);
    trackEvent("lead_form_start", {
      location: "cta_form",
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    trackEvent("lead_submit_attempt", {
      location: "cta_form",
    });

    const result = leadFormSchema.safeParse(values);

    if (!result.success) {
      const nextErrors = getFieldErrors(result.error);

      if (nextErrors.website) {
        setErrors({});
        setStatus({
          tone: "success",
          message:
            "הבקשה התקבלה. אם יש התאמה לשירות, נחזור אליכם בהקדם לתיאום שיחת התאמה.",
        });
        setValues(initialValues);
        return;
      }

      setErrors(nextErrors);
      trackEvent("lead_submit_validation_error", {
        location: "cta_form",
        errorCount: Object.values(nextErrors).filter(Boolean).length,
      });
      setStatus({
        tone: "error",
        message: "יש כמה פרטים שכדאי לדייק לפני שליחה.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const submissionPayload = buildLeadSubmissionPayload(values);
      const response = await fetch("/api/lead", {
        body: JSON.stringify(submissionPayload),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            fieldErrors?: LeadFormErrors;
            message?: string;
          }
        | null;

      if (!response.ok) {
        if (payload?.fieldErrors) {
          setErrors(payload.fieldErrors);
        }

        trackEvent("lead_submit_error", {
          location: "cta_form",
          status: response.status,
        });
        setStatus({
          tone: "error",
          message:
            payload?.message ??
            "השליחה לא הושלמה כרגע. אפשר לנסות שוב בעוד רגע.",
        });
        return;
      }

      setStatus({
        tone: "success",
        message:
          payload?.message ??
          "הבקשה התקבלה. אם יש התאמה לשירות, נחזור אליכם בהקדם לתיאום שיחת התאמה.",
      });
      trackEvent("lead_submit_success", {
        location: "cta_form",
      });
      setValues(initialValues);
    } catch {
      trackEvent("lead_submit_error", {
        location: "cta_form",
        status: "network",
      });
      setStatus({
        tone: "error",
        message: "יש בעיית תקשורת זמנית. נסו שוב בעוד רגע.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Panel tone={tone} className={cn("p-6 lg:p-8", className)}>
      <form
        className="lead-form"
        noValidate
        onSubmit={handleSubmit}
        onFocusCapture={handleFormFocus}
      >
        <div className="lead-form__hero">
          <div className="lead-form__hero-surface" aria-hidden="true" />
          <div className="lead-form__hero-top">
            <span className="lead-form__eyebrow">Intro Call</span>
            <span className="lead-form__eyebrow-pill">שלב 01</span>
          </div>

          <div className="lead-form__hero-copy">
            <p className="type-form-title text-[var(--accent-deep)]">
              {title}
            </p>
            <p className="type-body-sm text-[rgba(17,26,31,0.62)]">
              {description}
            </p>
          </div>

          <div className="lead-form__signals" aria-label="מאפייני השיחה">
            {leadFormSignals.map((signal) => (
              <div key={signal.label} className="lead-form__signal">
                <span className="lead-form__signal-label">{signal.label}</span>
                <strong className="lead-form__signal-value">{signal.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="lead-form__section-header">
          <div>
            <p className="lead-form__section-kicker">כמה פרטים קצרים</p>
            <p className="lead-form__section-title">
              כדי להבין אם יש בסיס נכון לשיחה.
            </p>
          </div>
          <span className="lead-form__section-index">01</span>
        </div>

        <input
          type="hidden"
          name="website"
          value={values.website}
          onChange={handleChange}
        />

        <div className="lead-form__fields grid grid-cols-1 gap-x-5 gap-y-4 lg:grid-cols-2">
          <label
            className={cn(
              "ui-field",
              isFilled("fullName") && "ui-field--filled",
              errors.fullName && "ui-field--error"
            )}
          >
            <span className="ui-field__label-row">
              <span className="ui-field__label">שם מלא</span>
            </span>
            <input
              type="text"
              name="fullName"
              placeholder="איך קוראים לך?"
              className="ui-input"
              autoComplete="name"
              value={values.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? fieldErrorId("fullName") : undefined}
            />
            {errors.fullName ? (
              <span id={fieldErrorId("fullName")} className="ui-field__error">
                {errors.fullName}
              </span>
            ) : null}
          </label>

          <label
            className={cn(
              "ui-field",
              isFilled("phone") && "ui-field--filled",
              errors.phone && "ui-field--error"
            )}
          >
            <span className="ui-field__label-row">
              <span className="ui-field__label">טלפון</span>
            </span>
            <input
              type="tel"
              name="phone"
              placeholder="050-000-0000"
              className="ui-input"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? fieldErrorId("phone") : undefined}
            />
            {errors.phone ? (
              <span id={fieldErrorId("phone")} className="ui-field__error">
                {errors.phone}
              </span>
            ) : null}
          </label>

          <label
            className={cn(
              "ui-field",
              isFilled("company") && "ui-field--filled",
              errors.company && "ui-field--error"
            )}
          >
            <span className="ui-field__label-row">
              <span className="ui-field__label">שם העסק</span>
            </span>
            <input
              type="text"
              name="company"
              placeholder="איך נקרא העסק?"
              className="ui-input"
              autoComplete="organization"
              value={values.company}
              onChange={handleChange}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? fieldErrorId("company") : undefined}
            />
            {errors.company ? (
              <span id={fieldErrorId("company")} className="ui-field__error">
                {errors.company}
              </span>
            ) : null}
          </label>

          <label
            className={cn(
              "ui-field",
              isFilled("monthlyRevenue") && "ui-field--filled",
              errors.monthlyRevenue && "ui-field--error"
            )}
          >
            <span className="ui-field__label-row">
              <span className="ui-field__label">מחזור חודשי משוער</span>
              <span className="ui-field__hint">אופציונלי</span>
            </span>
            <RevenueSelect
              value={values.monthlyRevenue}
              options={monthlyRevenueOptions}
              error={errors.monthlyRevenue}
              describedBy={
                errors.monthlyRevenue ? fieldErrorId("monthlyRevenue") : undefined
              }
              onChange={(nextValue) => {
                updateFieldValue("monthlyRevenue", nextValue);
              }}
            />
            {errors.monthlyRevenue ? (
              <span
                id={fieldErrorId("monthlyRevenue")}
                className="ui-field__error"
              >
                {errors.monthlyRevenue}
              </span>
            ) : null}
          </label>

          <label
            className={cn(
              "ui-field lg:col-span-2",
              isFilled("challenge") && "ui-field--filled",
              errors.challenge && "ui-field--error"
            )}
          >
            <span className="ui-field__label-row">
              <span className="ui-field__label">מה האתגר המרכזי היום?</span>
              <span className="ui-field__hint">אופציונלי</span>
            </span>
            <textarea
              name="challenge"
              rows={4}
              placeholder="אם נוח לך, אפשר לכתוב בקצרה מה מרגיש תקוע כרגע."
              className="ui-input ui-textarea"
              value={values.challenge}
              onChange={handleChange}
              aria-invalid={Boolean(errors.challenge)}
              aria-describedby={errors.challenge ? fieldErrorId("challenge") : undefined}
            />
            {errors.challenge ? (
              <span id={fieldErrorId("challenge")} className="ui-field__error">
                {errors.challenge}
              </span>
            ) : null}
          </label>
        </div>

        {status ? (
          <div
            className={
              status.tone === "success"
                ? "ui-form-status ui-form-status--success"
                : "ui-form-status ui-form-status--error"
            }
          >
            {status.message}
          </div>
        ) : null}

        <div className="lead-form__actions">
          <p className="lead-form__action-copy">
            נחזור רק אם נראה שיש בסיס אמיתי להתאמה ולעבודה משותפת.
          </p>
          <Button
            aria-busy={isSubmitting}
            className="w-full justify-center lg:w-auto lg:min-w-[14rem]"
            disabled={isSubmitting}
            type="submit"
            variant="primary"
          >
            {isSubmitting ? "שולחים..." : submitLabel}
          </Button>
        </div>

        <p className="ui-form-note lead-form__note">
          <span className="lead-form__note-dot" aria-hidden="true" />
          <span>{note}</span>
        </p>
      </form>
    </Panel>
  );
}
