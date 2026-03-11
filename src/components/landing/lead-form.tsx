"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useId, useState } from "react";
import type { ZodError } from "zod";
import { TurnstileWidget } from "@/components/landing/turnstile-widget";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { cn } from "@/lib/cn";
import {
  leadFormSchema,
  monthlyRevenueOptions,
  type LeadFormValues,
} from "@/lib/lead-form-schema";

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
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const formId = useId();

  const fieldErrorId = (field: keyof LeadFormValues) => `${formId}-${field}-error`;

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

    if (!turnstileToken) {
      setStatus({
        tone: "error",
        message: "צריך להשלים את אימות האבטחה לפני שליחת הטופס.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        body: JSON.stringify({
          ...values,
          turnstileToken,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            fieldErrors?: LeadFormErrors;
            message?: string;
            resetTurnstile?: boolean;
          }
        | null;

      if (!response.ok) {
        if (payload?.fieldErrors) {
          setErrors(payload.fieldErrors);
        }

        if (payload?.resetTurnstile) {
          setTurnstileToken("");
          setTurnstileResetKey((current) => current + 1);
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
      setTurnstileToken("");
      setTurnstileResetKey((current) => current + 1);
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
    <Panel tone={tone} className={cn("p-6 md:p-7", className)}>
      <form className="space-y-4" noValidate onSubmit={handleSubmit}>
        <div className="space-y-1">
          <p className="type-form-title text-[var(--accent-deep)]">
            {title}
          </p>
          <p className="type-body-sm text-[rgba(17,26,31,0.62)]">
            {description}
          </p>
        </div>

        <input
          type="hidden"
          name="website"
          value={values.website}
          onChange={handleChange}
        />

        <div className="grid gap-3">
          <label className="ui-field">
            <span className="ui-field__label">שם מלא</span>
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

          <label className="ui-field">
            <span className="ui-field__label">טלפון</span>
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

          <label className="ui-field">
            <span className="ui-field__label">שם העסק</span>
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

          <label className="ui-field">
            <span className="ui-field__label">מחזור חודשי משוער</span>
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

          <label className="ui-field">
            <span className="ui-field__label">מה האתגר המרכזי היום?</span>
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

        <TurnstileWidget
          onError={() => {
            setTurnstileToken("");
            setStatus({
              tone: "error",
              message: "אימות האבטחה לא הושלם. אפשר לנסות שוב.",
            });
          }}
          onExpire={() => {
            setTurnstileToken("");
            setStatus({
              tone: "error",
              message: "אימות האבטחה פג. צריך לאשר שוב לפני שליחה.",
            });
          }}
          onVerify={(token) => {
            setTurnstileToken(token);

            if (status?.tone === "error") {
              setStatus(null);
            }
          }}
          resetKey={turnstileResetKey}
        />

        <Button
          aria-busy={isSubmitting}
          className="w-full justify-center"
          disabled={isSubmitting}
          type="submit"
          variant="gold"
        >
          {isSubmitting ? "שולחים..." : submitLabel}
        </Button>

        <p className="ui-form-note">{note}</p>
      </form>
    </Panel>
  );
}
