"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  MessageSquare,
} from "lucide-react";
import { FieldIcon, FieldInput, FieldWrapper } from "@/app/component/ui";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  inspectionDate: string;
  inspectionTime: string;
  message: string;
};

const emptyValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  inspectionDate: "",
  inspectionTime: "",
  message: "",
};



export default function BookInspection() {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (key: keyof FormValues, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setIsPending(true);
    // TODO: wire up your action here
    await new Promise((res) => setTimeout(res, 1500));
    setIsPending(false);
    setSuccess(true);
  };

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
            <button
              onClick={() => {
                setSuccess(false);
                setValues(emptyValues);
              }}
              className="w-85.25 py-3.5 bg-[#06CD70] rounded-[10px] text-white font-bold text-[20px] text-center cursor-pointer hover:bg-[#05b862] transition-colors"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Book Another
            </button>
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
          <div className="flex flex-col gap-5.75 w-full">
            {/* Row 1 — First Name + Last Name */}
            <div className="flex flex-row gap-5.75 w-full">
              <FieldWrapper>
                <FieldIcon icon={User} />
                <FieldInput
                  placeholder="First Name"
                  value={values.firstName}
                  onChange={(val) => set("firstName", val)}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldIcon icon={User} />
                <FieldInput
                  placeholder="Last Name"
                  value={values.lastName}
                  onChange={(val) => set("lastName", val)}
                />
              </FieldWrapper>
            </div>

            {/* Row 2 — Email */}
            <FieldWrapper>
              <FieldIcon icon={Mail} />
              <FieldInput
                type="email"
                placeholder="E-mail Address"
                value={values.email}
                onChange={(val) => set("email", val)}
              />
            </FieldWrapper>

            {/* Row 3 — Phone */}
            <FieldWrapper>
              <FieldIcon icon={Phone} />
              <FieldInput
                type="tel"
                placeholder="Phone Number"
                value={values.phone}
                onChange={(val) => set("phone", val)}
              />
            </FieldWrapper>

            {/* Row 4 — Location */}
            <FieldWrapper>
              <FieldIcon icon={MapPin} />
              <FieldInput
                placeholder="Location"
                value={values.location}
                onChange={(val) => set("location", val)}
              />
            </FieldWrapper>

            {/* Row 5 — Inspection Date + Time */}
            <div className="flex flex-row gap-5.75 w-full">
              <FieldWrapper>
                <FieldIcon icon={Calendar} />
                <FieldInput
                  type="date"
                  placeholder="Inspection Date"
                  value={values.inspectionDate}
                  onChange={(val) => set("inspectionDate", val)}
                />
              </FieldWrapper>
              <FieldWrapper>
                <FieldIcon icon={Clock} />
                <FieldInput
                  type="time"
                  placeholder="Inspection Time"
                  value={values.inspectionTime}
                  onChange={(val) => set("inspectionTime", val)}
                />
              </FieldWrapper>
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
              <MessageSquare
                size={24}
                className="text-[#C2C2C2] shrink-0 mt-1"
              />
              <textarea
                placeholder="Additional Message......"
                value={values.message}
                onChange={(e) => set("message", e.target.value)}
                className="bg-transparent text-white placeholder:text-white text-[16px] leading-6.5 outline-none w-full resize-none h-full min-h-67.5"
                style={{ fontFamily: "Cambay, sans-serif" }}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full py-5.5 bg-[#06CD70] rounded-[10px] text-white font-bold text-[20px] leading-8.25 text-center cursor-pointer hover:bg-[#05b862] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              {isPending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}