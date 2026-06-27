"use client";

import { useRef, useActionState, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { CreateApplicationFormState } from "@/validations/applications/create-application.validation";
import { createApplication } from "@/actions/applications.action";
import { customToast } from "@/app/component/ui";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  careerTitle?: string;
  careerId: string;
};

const initialValues: CreateApplicationFormState = {
  errors: {},
  values: {
    fullName: "",
    email: "",
    jobId: "",
    phoneNumber: "",
    startDate: "" as unknown as Date,
  },
};

export default function ApplyModal({ isOpen, onClose, careerTitle, careerId }: Props) {
  const [{ errors, values, error, success }, dispatch, isPending] = useActionState(createApplication, initialValues);

  const resumeRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (error) {
      customToast.error(error)
    }
  }, [error])

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-286 bg-black rounded-[10px] p-[30px_25px] flex flex-col gap-5.25 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:opacity-70 transition-opacity cursor-pointer"
        >
          <X size={24} />
        </button>

        {/* Success state */}
        {success ? (
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="w-14 h-14 rounded-full bg-[#06CD70] flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
              className="text-white font-bold text-[22px] leading-tight text-center"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Application Sent!
            </h2>

            <p
              className="text-white font-normal text-[15px] leading-relaxed text-center max-w-80"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Your application to Greatway Properties has been sent successfully
            </p>

            <button
              onClick={handleClose}
              className="w-60 py-3 bg-[#06CD70] rounded-[10px] text-white font-bold text-[18px] text-center cursor-pointer hover:bg-[#05b862] transition-colors"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Continue
            </button>
          </div>
        ) : (
          <form action={dispatch}>
            {/* hidden jobId */}
            <input type="hidden" name="jobId" value={careerId} />

            {/* Title */}
            <h2
              className="text-white font-bold text-[40px] leading-16.25 text-center tracking-[0.02em] self-stretch mb-5"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Apply to Greatway Properties - {careerTitle}
            </h2>

            {/* Form grid */}
            <div className="flex flex-row gap-10 w-full">
              {/* Left column */}
              <div className="flex flex-col gap-8.25 flex-1">
                {/* Full Name */}
                <div className="flex flex-col gap-2.25">
                  <label
                    className="text-white font-medium text-[16px] leading-6"
                    style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter name"
                    defaultValue={values?.fullName}
                    className="w-full h-15.5 px-5 bg-transparent text-white placeholder:text-[#878789] text-[16px] leading-6 outline-none rounded-lg"
                    style={{ border: "1.66px solid #FFFFFF", fontFamily: "Euclid Circular A, sans-serif" }}
                  />
                  {errors?.fullName && (
                    <p className="text-red-500 text-sm">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2.25">
                  <label
                    className="text-white font-medium text-[16px] leading-6"
                    style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    defaultValue={values?.email}
                    className="w-full h-15.5 px-5 bg-transparent text-white placeholder:text-[#878789] text-[16px] leading-6 outline-none rounded-lg"
                    style={{ border: "1.66px solid #FFFFFF", fontFamily: "Euclid Circular A, sans-serif" }}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2.25">
                  <label
                    className="text-white font-medium text-[16px] leading-6"
                    style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    defaultValue={values?.phoneNumber}
                    className="w-full h-15.5 px-5 bg-transparent text-white placeholder:text-[#878789] text-[16px] leading-6 outline-none rounded-lg"
                    style={{ border: "1.66px solid #FFFFFF", fontFamily: "Euclid Circular A, sans-serif" }}
                  />
                  {errors?.phoneNumber && (
                    <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-8.25 flex-1">
                {/* Upload Resume */}
                <div className="flex flex-col gap-2.25">
                  <label
                    className="text-white font-medium text-[16px] leading-6"
                    style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                  >
                    Upload Resume
                  </label>
                  <div
                    className="w-full h-15.5 px-5 flex flex-row items-center justify-between rounded-lg"
                    style={{ border: "1.66px solid #FFFFFF" }}
                  >
                    <span
                      className="text-[#878789] text-[16px] leading-6 truncate flex-1"
                      style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                      id="resume-name"
                    >
                      PDF Format, max 5mb
                    </span>
                    <button
                      type="button"
                      onClick={() => resumeRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#06CD70] font-medium text-[16px] leading-6 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                      style={{ border: "1px solid #06CD70", fontFamily: "Euclid Circular A, sans-serif" }}
                    >
                      <Upload size={16} className="text-[#06CD70]" />
                      Upload
                    </button>
                    <input
                      ref={resumeRef}
                      type="file"
                      name="resume"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        const label = document.getElementById("resume-name");
                        if (label) label.textContent = file?.name ?? "PDF Format, max 5mb";
                      }}
                    />
                  </div>
                </div>

                {/* Upload Cover Letter */}
                <div className="flex flex-col gap-2.25">
                  <label
                    className="text-white font-medium text-[16px] leading-6"
                    style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                  >
                    Upload Cover Letter{" "}
                    <span className="text-[#878789]">(Optional)</span>
                  </label>
                  <div
                    className="w-full h-15.5 px-5 flex flex-row items-center justify-between rounded-lg"
                    style={{ border: "1.66px solid #FFFFFF" }}
                  >
                    <span
                      className="text-[#878789] text-[16px] leading-6 truncate flex-1"
                      style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                      id="cover-letter-name"
                    >
                      PDF Format, max 5mb
                    </span>
                    <button
                      type="button"
                      onClick={() => coverLetterRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#06CD70] font-medium text-[16px] leading-6 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                      style={{ border: "1px solid #06CD70", fontFamily: "Euclid Circular A, sans-serif" }}
                    >
                      <Upload size={16} className="text-[#06CD70]" />
                      Upload
                    </button>
                    <input
                      ref={coverLetterRef}
                      type="file"
                      name="coverLetter"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        const label = document.getElementById("cover-letter-name");
                        if (label) label.textContent = file?.name ?? "PDF Format, max 5mb";
                      }}
                    />
                  </div>
                </div>

                {/* Availability to Start */}
                <div className="flex flex-col gap-2.25">
                  <label
                    className="text-white font-medium text-[16px] leading-6"
                    style={{ fontFamily: "Euclid Circular A, sans-serif" }}
                  >
                    Availability to Start
                  </label>
                  <div
                    className="w-full h-15.5 px-5 flex flex-row items-center justify-between rounded-lg"
                    style={{ border: "1.66px solid #FFFFFF" }}
                  >
                    <input
                      type="date"
                      name="startDate"
                      className="bg-transparent text-white text-[16px] leading-6 outline-none w-full"
                      style={{ fontFamily: "Euclid Circular A, sans-serif", colorScheme: "dark" }}
                    />
                  </div>
                  {errors?.startDate && (
                    <p className="text-red-500 text-sm">{errors.startDate as unknown as string}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full mt-5 py-5.5 bg-[#06CD70] rounded-[10px] text-white font-bold text-[20px] leading-8.25 text-center cursor-pointer hover:bg-[#05b862] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              {isPending ? "Sending..." : "Send Application"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}