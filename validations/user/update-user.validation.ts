import { USER_ROLE, USER_STATUS } from "@/constant/constants";
import { FormState } from "@/types";
import { z } from "zod";

export const updateUserSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full name must be at least 2 characters long" })
    .max(100, { message: "Full name cannot exceed 100 characters" })
    .optional(),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .toLowerCase()
    .optional(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .optional(),

  status: z
    .enum(Object.values(USER_STATUS) as [string, ...string[]])
    .optional(),

  role: z
    .enum(Object.values(USER_ROLE) as [string, ...string[]], {
      error: "Invalid role selected",
    })
    .optional(),
});

// Export types
export type UpdateUserDto = z.infer<typeof updateUserSchema>;
export type UpdateUserFormState = FormState<UpdateUserDto>;
export type UpdateUserFormErrors = UpdateUserFormState["errors"];
export type UpdateUserFormValues = UpdateUserFormState["values"];
