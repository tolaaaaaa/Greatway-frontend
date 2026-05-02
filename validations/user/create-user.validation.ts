import { USER_ROLE } from "@/constant/constants";
import { FormState } from "@/types";
import { z } from "zod";

export const createUserSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(100, { message: "Full name cannot exceed 100 characters" })
    .optional(),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .toLowerCase(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),

  role: z
    .enum(Object.values(USER_ROLE) as [string, ...string[]], {
      error: "Invalid role selected",
    })
    .optional(),
});

// Export types
export type CreateUserDto = z.infer<typeof createUserSchema>;
export type CreateUserFormState = FormState<CreateUserDto>;
export type CreateUserFormErrors = CreateUserFormState["errors"];
export type CreateUserFormValues = CreateUserFormState["values"];
