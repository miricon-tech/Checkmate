"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import type { ZodError } from "zod";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { leadFormSchema, type LeadFormValues } from "@/lib/lead-form-schema";

const initialValues: LeadFormValues = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  message: "",
  website: "",
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

type LeadFormStatus =
  | { tone: "success" | "error"; message: string }
  | null;

function getFieldErrors(error: ZodError<LeadFormValues>) {
  const fieldErrors = error.flatten().fieldErrors;

  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, messages]) => [
      key,
      messages?.[0] ?? "",
    ])
  ) as LeadFormErrors;
}

export function LeadForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<LeadFormStatus>(null);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = leadFormSchema.safeParse(values);

    if (!result.success) {
      const nextErrors = getFieldErrors(result.error);

      if (nextErrors.website) {
        setErrors({});
        setStatus({
          tone: "success",
          message: "השליחה אומתה. אפשר עכשיו לחבר את הטופס ליעד קליטה אמיתי.",
        });
        setValues(initialValues);
        return;
      }

      setErrors(nextErrors);
      setStatus({
        tone: "error",
        message: "יש כמה שדות שצריך לדייק לפני שליחה.",
      });
      return;
    }

    setErrors({});
    setStatus({
      tone: "success",
      message: "הפרטים תקינים והטופס מוכן לחיבור ל־CRM, WhatsApp או webhook.",
    });
    setValues(initialValues);
  };

  return (
    <Panel tone="strong" className="p-6 md:p-7">
      <form className="space-y-4" noValidate onSubmit={handleSubmit}>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-[var(--accent-deep)]">
            השאירו פרטים
          </p>
          <p className="text-sm leading-6 text-[rgba(17,26,31,0.62)]">
            נחזור אליכם לבדיקת התאמה קצרה של 15 דקות.
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
              aria-describedby={errors.fullName ? "lead-full-name-error" : undefined}
            />
            {errors.fullName ? (
              <span id="lead-full-name-error" className="ui-field__error">
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
              aria-describedby={errors.phone ? "lead-phone-error" : undefined}
            />
            {errors.phone ? (
              <span id="lead-phone-error" className="ui-field__error">
                {errors.phone}
              </span>
            ) : null}
          </label>

          <label className="ui-field">
            <span className="ui-field__label">אימייל</span>
            <input
              type="email"
              name="email"
              placeholder="name@business.co.il"
              className="ui-input"
              autoComplete="email"
              inputMode="email"
              value={values.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
            />
            {errors.email ? (
              <span id="lead-email-error" className="ui-field__error">
                {errors.email}
              </span>
            ) : null}
          </label>

          <label className="ui-field">
            <span className="ui-field__label">שם העסק</span>
            <input
              type="text"
              name="company"
              placeholder="שם העסק או התחום"
              className="ui-input"
              autoComplete="organization"
              value={values.company}
              onChange={handleChange}
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "lead-company-error" : undefined}
            />
            {errors.company ? (
              <span id="lead-company-error" className="ui-field__error">
                {errors.company}
              </span>
            ) : null}
          </label>

          <label className="ui-field">
            <span className="ui-field__label">מה חשוב לכם לשפר?</span>
            <textarea
              name="message"
              rows={4}
              placeholder="לידים, תיאום פגישות, מכירות, שליטה בדוחות..."
              className="ui-input ui-textarea"
              value={values.message}
              onChange={handleChange}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "lead-message-error" : undefined}
            />
            {errors.message ? (
              <span id="lead-message-error" className="ui-field__error">
                {errors.message}
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

        <Button type="submit" variant="gold" className="w-full justify-center">
          בדיקת התאמה (15 דק׳)
        </Button>

        <p className="ui-form-note">
          ולידציה עם Zod פעילה עכשיו. היעד הבא הוא לחבר את השליחה ל־CRM,
          WhatsApp או לאוטומציה שתבחרו.
        </p>
      </form>
    </Panel>
  );
}
