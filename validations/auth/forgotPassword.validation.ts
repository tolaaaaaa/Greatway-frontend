import { FormState } from "@/types"
import {z} from "zod"


export const forgotPasswordSchema = z.object({
    email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .toLowerCase(),
})


export type ForgotPasswordDto = z.infer<typeof forgotPasswordSchema>
export type ForgotPasswordFormState = FormState<ForgotPasswordDto>
export type ForgotPasswordFormErrors = ForgotPasswordFormState["errors"]
export type ForgotPasswordFormValues = ForgotPasswordFormState["values"]