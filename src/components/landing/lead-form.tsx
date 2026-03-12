"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useId, useState } from "react";
import type { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
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

function getFieldErrors(error: ZodError<LeadFormValues>) {
  const fieldErrors = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] ?? "",
    ])
  ) as LeadFormErrors;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<LeadFormStatus>(null);
  const formId = useId();

  const fieldErrorId = (field: keyof LeadFormValues) => `${formId}-${field}-error`;
  const isFilled = (field: keyof LeadFormValues) => values[field].trim().length > 0;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const fieldName = name as keyof LeadFormValues;

    setValues((current) => ({ ...current, [fieldName]: value }));

    if (errors[fieldName]) {
      setErrors((current) => ({ ...current, [fieldName]: undefined }));
    }

    if (status) {
      setStatus(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const result = leadFormSchema.safeParse(values);

    if (!result.success) {
      const nextErrors = getFieldErrors(result.error);

      if (nextErrors.website) {
        setErrors({});
        setStatus({
          tone: "success",
          message: "הפרטים התקבלו. אם יש התאמה, ניצור קשר להמשך.",
        });
        setValues(initialValues);
        return;
      }

      setErrors(nextErrors);
      setStatus({
        tone: "error",
        message: "יש כמה פרטים שכדאי לדייק לפני שליחה.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        body: JSON.stringify(values),
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
          "הפרטים התקבלו. אם העסק מתאים, נחזור לתיאום בדיקת התאמה.",
      });
      setValues(initialValues);
    } catch {
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
      <form className="lead-form" noValidate onSubmit={handleSubmit}>
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
            </span>
            <select
              name="monthlyRevenue"
              className="ui-input ui-select"
              value={values.monthlyRevenue}
              onChange={handleChange}
              aria-invalid={Boolean(errors.monthlyRevenue)}
              aria-describedby={
                errors.monthlyRevenue ? fieldErrorId("monthlyRevenue") : undefined
              }
            >
              <option value="">בחרו טווח מחזור</option>
              {monthlyRevenueOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
              <span className="ui-field__hint">3-4 שורות קצרות מספיקות</span>
            </span>
            <textarea
              name="challenge"
              rows={4}
              placeholder="למשל: יש לידים אבל אין תהליך סגירה ברור, הכול נשען עליי, או שאין מספיק פגישות שמתקיימות."
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
