import { FormState } from "@/types";
import { z } from "zod";

export const resetPasswordSchema = z.object({
     password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
 
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });


  export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;
  export type ResetPasswordFormState = FormState<ResetPasswordDto>;
  export type ResetPasswordFormErrors = ResetPasswordFormState["errors"];
  export type ResetPasswordFormValues = ResetPasswordFormState["values"];
  