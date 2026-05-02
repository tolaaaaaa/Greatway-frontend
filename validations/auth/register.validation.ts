import { USER_ROLE } from "@/constant/constants";
import { FormState } from "@/types";
import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, { message: "Full name must be at least 2 characters long" })
      .max(100, { message: "Full name cannot exceed 100 characters" }),
 
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .toLowerCase(),
 
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
 
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
 
    role: z
      .enum(Object.values(USER_ROLE) as [string, ...string[]], {
        error: "Invalid role selected",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
 
// Export types
export type RegisterDto = z.infer<typeof registerSchema>;
export type RegisterFormState = FormState<RegisterDto>;
export type RegisterFormErrors = RegisterFormState["errors"];
export type RegisterFormValues = RegisterFormState["values"];
