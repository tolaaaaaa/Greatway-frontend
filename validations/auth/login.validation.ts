import { FormState } from "@/types";
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .toLowerCase(),
 
  password: z
    .string()
    .min(1, { message: "Password is required" }),
});
 
// Export types
export type LoginDto = z.infer<typeof loginSchema>;
export type LoginFormState = FormState<LoginDto>;
export type LoginFormErrors = LoginFormState["errors"];
export type LoginFormValues = LoginFormState["values"];