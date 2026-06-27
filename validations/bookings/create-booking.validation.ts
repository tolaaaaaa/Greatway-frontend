import { FormState } from "@/types";
import { z } from "zod";

export const createBookingSchema = z.object({
    firstName: z.string().trim().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters"),
    lastName: z.string().trim().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    email: z.string().email("Invalid email address").toLowerCase(),
    location: z.string().trim().min(2, "Location must be at least 2 characters").max(200, "Location must be at most 200 characters"),
    inspectionDate: z.coerce.date({ error: "Invalid date" }).refine(
        (date) => date > new Date(),
        "Inspection date must be in the future"
    ),
    inspectionTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format"),
    message: z.string().trim().max(1000, "Message must be at most 1000 characters").optional(),
});

export type CreateBookingDto = z.infer<typeof createBookingSchema>;
export type CreateBookingFormState = FormState<CreateBookingDto>;
export type CreateBookingFormErrors = CreateBookingFormState["errors"];
export type CreateBookingFormValues = CreateBookingFormState["values"];