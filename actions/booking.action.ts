"use server"

import { Bookings } from "@/types/bookings";
import { ServerApiClient } from "@/utils/api-server";
import { formatError } from "@/utils/formating";
import { CreateBookingFormErrors, CreateBookingFormState, CreateBookingFormValues, createBookingSchema } from "@/validations/bookings/create-booking.validation";

export async function createBooking(
    state: CreateBookingFormState,
    formData: FormData
): Promise<CreateBookingFormState> {
    const body = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        email: formData.get("email") as string,
        location: formData.get("location") as string,
        inspectionDate: formData.get("inspectionDate") as string,
        inspectionTime: formData.get("inspectionTime") as string,
        message: formData.get("message") as string
    }

    const result = createBookingSchema.safeParse(body)

    if (!result.success) {
        const errors = formatError<CreateBookingFormErrors, CreateBookingFormValues>(
            result.error
        )

         return { ...state, errors, values: body as unknown as  CreateBookingFormValues}
    }

    const response = await ServerApiClient.post<Bookings>("/bookings", result.data)

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