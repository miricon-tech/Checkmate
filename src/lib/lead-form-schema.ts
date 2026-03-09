import { z } from "zod";

const phoneCharactersPattern = /^[\d\s()+-]+$/;

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
  email: z.string().trim().email("יש למלא כתובת אימייל תקינה."),
  company: z.string().trim().min(2, "יש למלא שם עסק או תחום."),
  message: z
    .string()
    .trim()
    .max(800, "אפשר לקצר מעט את ההודעה.")
    .refine(
      (value) => value.length === 0 || value.length >= 10,
      "כדאי לפרט לפחות 10 תווים או להשאיר את השדה ריק."
    ),
  website: z.string().trim().max(0, "Invalid submission."),
});

export type LeadFormValues = z.input<typeof leadFormSchema>;
