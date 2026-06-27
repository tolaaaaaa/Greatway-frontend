"use server"

import { ServerApiClient } from "@/utils/api-server";
import { formatError } from "@/utils/formating";
import { CreateContactUsFormErrors, CreateContactUsFormState, CreateContactUsFormValues, createContactUsSchema } from "@/validations/contact-us/create-contact-us.validation";

export async function createContactUs(
    state: CreateContactUsFormState,
    formData: FormData
): Promise<CreateContactUsFormState> {
    const body = {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phoneNumber") as string || undefined,
        message: formData.get("message") as string,
    }

    const result = createContactUsSchema.safeParse(body)

    if (!result.success) {
        const errors = formatError<CreateContactUsFormErrors, CreateContactUsFormValues>(result.error)
        return { ...state, errors, values: body as unknown as CreateContactUsFormValues }
    }

    const response = await ServerApiClient.post<ContactUs>("/contact-us", result.data)

    if (response.code >= 400) {
        return {
            ...state,
            error: response.message ?? "Failed to send enquiry. Please try again.",
            errors: {},
            values: result.data,
        };
    }

    return {
        error: "",
        success: true,
        errors: {},
        values: result.data,
    }
}