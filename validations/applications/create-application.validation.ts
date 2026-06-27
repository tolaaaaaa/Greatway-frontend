import { FormState } from "@/types";
import { z } from "zod";

export const createApplicationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100, "Full name must be at most 100 characters"),
  email: z.string().email("Invalid email address").toLowerCase(),
  phoneNumber: z.string().min(1, "Phone number is required"),
  startDate: z.coerce.date({ error: "Invalid date" }),
   jobId: z.string().uuid("Invalid job ID"),
});

export type CreateApplicationDto = z.infer<typeof createApplicationSchema>;
export type CreateApplicationFormState = FormState<CreateApplicationDto>;
export type CreateApplicationFormErrors = CreateApplicationFormState["errors"];
export type CreateApplicationFormValues = CreateApplicationFormState["values"];