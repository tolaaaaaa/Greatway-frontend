"use server"
import { ServerApiClient } from "@/utils/api-server";
import { formatError } from "@/utils/formating";
import { CreateApplicationFormErrors, CreateApplicationFormState, CreateApplicationFormValues, createApplicationSchema } from "@/validations/applications/create-application.validation";

export async function createApplication(
    state: CreateApplicationFormState,
    formData: FormData
): Promise<CreateApplicationFormState> {
    const body = {
        fullName: formData.get("fullName") as string,
        email: formData.get("email") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        startDate: formData.get("startDate") as string,
        jobId: formData.get("jobId") as string
    }

    const result = createApplicationSchema.safeParse(body)

    if (!result.success) {
        const errors = formatError<
            CreateApplicationFormErrors, CreateApplicationFormValues
        >(result.error)

        return { ...state, errors, values: body as unknown as CreateApplicationFormValues }
    }

      const payload = new FormData()
    payload.append("fullName", result.data.fullName)
    payload.append("email", result.data.email)
    payload.append("phoneNumber", result.data.phoneNumber)
    payload.append("startDate", result.data.startDate.toISOString())
    payload.append("jobId", result.data.jobId)

    const resume = formData.get("resume") as File | null
    if (resume && resume.size > 0) {
        payload.append("resume", resume, resume.name)
    }

    const coverLetter = formData.get("coverLetter") as File | null
    if (coverLetter && coverLetter.size > 0) {
        payload.append("coverLetter", coverLetter, coverLetter.name)
    }

    const response = await ServerApiClient.post<Application>("/applications", payload)

    if (response.code >= 400) {
        console.log(response)
        return {
            ...state,
            error: response.message ?? "Failed to create property. Please try again.",
            errors: {},
            values: result.data,
        };
    }

    return {
        error: "",
        success: true,
        errors: {},
        values: result.data
    }
}