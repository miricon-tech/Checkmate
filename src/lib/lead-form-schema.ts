import { z } from "zod";

const phoneCharactersPattern = /^[\d\s()+-]+$/;

export const monthlyRevenueOptions = [
  { value: "up_to_80", label: "עד 80,000 ש\"ח" },
  { value: "80_to_150", label: "80,000–150,000 ש\"ח" },
  { value: "150_to_300", label: "150,000–300,000 ש\"ח" },
  { value: "300_plus", label: "300,000 ש\"ח ומעלה" },
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
      (value) => monthlyRevenueValues.has(value as (typeof monthlyRevenueOptions)[number]["value"]),
      "יש לבחור מחזור חודשי משוער."
    ),
  challenge: z
    .string()
    .trim()
    .min(10, "כדאי לפרט בקצרה מה האתגר המרכזי היום.")
    .max(800, "אפשר לקצר מעט את התיאור."),
  website: z.string().trim().max(0, "Invalid submission."),
});

export type LeadFormValues = z.input<typeof leadFormSchema>;
