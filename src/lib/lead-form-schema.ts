import { z } from "zod";

const phoneCharactersPattern = /^[\d\s()+-]+$/;

export const monthlyRevenueOptions = [
  { value: "up_to_50", label: "עד 50,000 ש\"ח" },
  { value: "50_to_100", label: "50,000–100,000 ש\"ח" },
  { value: "100_to_250", label: "100,000–250,000 ש\"ח" },
  { value: "250_to_500", label: "250,000–500,000 ש\"ח" },
  { value: "500_plus", label: "500,000 ש\"ח ומעלה" },
  { value: "variable_or_other", label: "משתנה / אחר" },
] as const;

const monthlyRevenueValues = new Set(
  monthlyRevenueOptions.map((option) => option.value)
);

export const leadFormSchema = z.object({
  fullName: z.string().trim().min(2, "יש למלא שם מלא."),
  phone: z
    .string()
    .trim()
    .min(9, "יש למלא מספר טלפון תקין.")
    .refine(
      (value) =>
        phoneCharactersPattern.test(value) &&
        value.replace(/\D/g, "").length >= 9,
      "יש למלא מספר טלפון תקין."
    ),
  company: z.string().trim().min(2, "יש למלא את שם העסק."),
  monthlyRevenue: z
    .string()
    .trim()
    .refine(
      (value) =>
        value.length === 0 ||
        monthlyRevenueValues.has(
          value as (typeof monthlyRevenueOptions)[number]["value"]
        ),
      "יש לבחור טווח תקין או להשאיר ריק."
    ),
  challenge: z
    .string()
    .trim()
    .max(800, "אפשר לקצר מעט את התיאור.")
    .refine(
      (value) => value.length === 0 || value.length >= 10,
      "אם בוחרים לפרט, כדאי לכתוב לפחות כמה מילים."
    ),
  website: z.string().trim().max(0, "Invalid submission."),
});

export type LeadFormValues = z.input<typeof leadFormSchema>;
