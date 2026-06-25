import { FormState } from "@/types"
import {z} from "zod"


export const verifyEmailSchema = z.object({
    code: z
    .string()
})


export type VerifyEmailDto = z.infer<typeof verifyEmailSchema>
export type VerifyEmailFormState = FormState<VerifyEmailDto>
export type VerifyEmailFormErrors = VerifyEmailFormState["errors"]
export type VerifyEmailFormValues = VerifyEmailFormState["values"]