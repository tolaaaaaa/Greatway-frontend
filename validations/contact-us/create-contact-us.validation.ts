import { FormState } from "@/types";
import { z } from "zod";

export const createContactUsSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").toLowerCase(),
  phoneNumber: z.string().optional(),
  message: z.string().trim().min(6, "Message must be at least 6 characters").max(1000, "Message must be at most 1000 characters"),
});

export type CreateContactUsDto = z.infer<typeof createContactUsSchema>;
export type CreateContactUsFormState = FormState<CreateContactUsDto>;
export type CreateContactUsFormErrors = CreateContactUsFormState["errors"];
export type CreateContactUsFormValues = CreateContactUsFormState["values"];