import { z } from "zod";

// Greek-friendly phone check: digits with optional +, spaces, dashes, dots, parentheses.
// Must contain 10–15 digits once separators are removed.
const phoneRegex = /^\+?[\d\s\-().]+$/;

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Παρακαλώ συμπληρώστε το όνομά σας" })
    .max(100, { message: "Το όνομα είναι πολύ μεγάλο" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Το τηλέφωνο είναι υποχρεωτικό" })
    .max(30, { message: "Μη έγκυρο τηλέφωνο" })
    .regex(phoneRegex, { message: "Μη έγκυρο τηλέφωνο" })
    .refine(
      (v) => {
        const digits = v.replace(/\D/g, "");
        return digits.length >= 10 && digits.length <= 15;
      },
      { message: "Το τηλέφωνο πρέπει να έχει 10–15 ψηφία" },
    ),
  serviceType: z
    .string()
    .trim()
    .min(1, { message: "Παρακαλώ επιλέξτε τι σας ενδιαφέρει (Ρεύμα, Φυσικό Αέριο ή Και τα 2)" }),
  email: z
    .string()
    .trim()
    .max(255, { message: "Το email είναι πολύ μεγάλο" })
    .email({ message: "Μη έγκυρο email" })
    .optional()
    .or(z.literal("")),
  sourcePage: z.string().trim().max(100).optional(),
  // Honeypot: real visitors never fill this hidden field.
  website: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;