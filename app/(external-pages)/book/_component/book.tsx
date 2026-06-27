"use client";

import { useActionState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
} from "lucide-react";
import { FieldIcon, FieldInput, FieldWrapper, customToast } from "@/app/component/ui";
import { CreateBookingFormState } from "@/validations/bookings/create-booking.validation";
import { createBooking } from "@/actions/booking.action";


const initialValues: CreateBookingFormState = {
  errors: {},
  values: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    inspectionDate: "" as unknown as Date,
    inspectionTime: "",
    message: "",
  },
};

export default function BookInspection() {
  const [{ errors, values, error, success }, dispatch, isPending] = useActionState(createBooking, initialValues);

  useEffect(() => {
    if (error) {
      customToast.error(error);
    }
  }, [error]);

  if (success) {
    return (
      <section className="mt-25">
        <div className="app-container py-10">
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="w-20 h-20 rounded-full bg-[#06CD70] flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2
              className="text-white font-bold text-[29px] text-center"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Booking Confirmed!
            </h2>
            <p
              className="text-white font-normal text-[18px] text-center max-w-103"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Your inspection booking has been sent successfully. We will be in
              touch shortly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="app-container py-7.75">
        <div className="flex flex-col items-center gap-12.75">
          {/* Header */}
          <div className="flex flex-col items-center gap-1.75">
            <h1
              className="text-white font-bold text-[50px] leading-20.25 tracking-[0.02em] text-center"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Book an Inspection With Us
            </h1>
            <p
              className="text-white font-normal text-[20px] leading-6.25 text-center"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Please fill in this form to book an inspection with us.
            </p>
          </div>

          {/* Form */}
          <form action={dispatch} className="flex flex-col gap-5.75 w-full">
            {/* Row 1 — First Name + Last Name */}
            <div className="flex flex-row gap-5.75 w-full">
              <div className="flex flex-col gap-1.5 flex-1">
                <FieldWrapper>
                  <FieldIcon icon={User} />
                  <FieldInput
                    name="firstName"
                    placeholder="First Name"
                    defaultValue={values?.firstName}
                  />
                </FieldWrapper>
                {errors?.firstName && (
                  <p className="text-red-500 text-sm">{errors.firstName}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <FieldWrapper>
                  <FieldIcon icon={User} />
                  <FieldInput
                    name="lastName"
                    placeholder="Last Name"
                    defaultValue={values?.lastName}
                  />
                </FieldWrapper>
                {errors?.lastName && (
                  <p className="text-red-500 text-sm">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Row 2 — Email */}
            <div className="flex flex-col gap-1.5">
              <FieldWrapper>
                <FieldIcon icon={Mail} />
                <FieldInput
                  name="email"
                  type="email"
                  placeholder="E-mail Address"
                  defaultValue={values?.email}
                />
              </FieldWrapper>
              {errors?.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {/* Row 3 — Phone */}
            <div className="flex flex-col gap-1.5">
              <FieldWrapper>
                <FieldIcon icon={Phone} />
                <FieldInput
                  name="phoneNumber"
                  type="tel"
                  placeholder="Phone Number"
                  defaultValue={values?.phoneNumber}
                />
              </FieldWrapper>
              {errors?.phoneNumber && (
                <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Row 4 — Location */}
            <div className="flex flex-col gap-1.5">
              <FieldWrapper>
                <FieldIcon icon={MapPin} />
                <FieldInput
                  name="location"
                  placeholder="Location"
                  defaultValue={values?.location}
                />
              </FieldWrapper>
              {errors?.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>

            {/* Row 5 — Inspection Date + Time */}
            <div className="flex flex-row gap-5.75 w-full">
              <div className="flex flex-col gap-1.5 flex-1">
                <FieldWrapper>
                  <FieldIcon icon={Calendar} />
                  <FieldInput
                    name="inspectionDate"
                    type="date"
                    placeholder="Inspection Date"
                  />
                </FieldWrapper>
                {errors?.inspectionDate && (
                  <p className="text-red-500 text-sm">{errors.inspectionDate as unknown as string}</p>
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <FieldWrapper>
                  <FieldIcon icon={Clock} />
                  <FieldInput
                    name="inspectionTime"
                    type="time"
                    placeholder="Inspection Time"
                  />
                </FieldWrapper>
                {errors?.inspectionTime && (
                  <p className="text-red-500 text-sm">{errors.inspectionTime as unknown as string}</p>
                )}
              </div>
            </div>

            {/* Row 6 — Additional Message */}
            <div
              className="flex flex-row items-start gap-5 px-3.25 py-4.75 rounded-[7px] w-full"
              style={{
                border: "1px solid #C2C2C2",
                filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
                minHeight: "318px",
              }}
            >
              <MessageSquare size={24} className="text-[#C2C2C2] shrink-0 mt-1" />
              <textarea
                name="message"
                placeholder="Additional Message......"
                defaultValue={values?.message}
                className="bg-transparent text-white placeholder:text-white text-[16px] leading-6.5 outline-none w-full resize-none h-full min-h-67.5"
                style={{ fontFamily: "Cambay, sans-serif" }}
              />
            </div>
            {errors?.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-5.5 bg-[#06CD70] rounded-[10px] text-white font-bold text-[20px] leading-8.25 text-center cursor-pointer hover:bg-[#05b862] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}