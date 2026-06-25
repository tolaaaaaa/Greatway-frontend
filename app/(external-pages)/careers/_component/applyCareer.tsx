"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  careerTitle?: string;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  availability: string;
};

export default function ApplyModal({ isOpen, onClose, careerTitle }: Props) {
  const [values, setValues] = useState<FormValues>({
    fullName: "",
    email: "",
    phone: "",
    availability: "",
  });
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const resumeRef = useRef<HTMLInputElement>(null);
  const coverLetterRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof FormValues, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async () => {
    setIsPending(true);
    await new Promise((res) => setTimeout(res, 1500));
    setIsPending(false);
    setSuccess(true);
  };

  const handleClose = () => {
    setSuccess(false);
    setValues({ fullName: "", email: "", phone: "", availability: "" });
    setResume(null);
    setCoverLetter(null);
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
          <div className="flex flex-col items-center justify-center gap-6 py-10">
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
              className="text-white font-bold text-[29px] leading-[143.88%] text-center"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Application Sent!
            </h2>

            <p
              className="text-white font-normal text-[18px] leading-[143.88%] text-center max-w-103"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Your application to Greatway Properties has been sent successfully
            </p>

            <button
              onClick={handleClose}
              className="w-85.25 py-3.5 bg-[#06CD70] rounded-[10px] text-white font-bold text-[25px] leading-10.25 text-center cursor-pointer hover:bg-[#05b862] transition-colors"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Continue
            </button>
          </div>
        ) : (
          <>
            {/* Title */}
            <h2
              className="text-white font-bold text-[40px] leading-16.25 text-center tracking-[0.02em] self-stretch"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Apply to Greatway Properties
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
                    placeholder="Enter name"
                    value={values.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    className="w-full h-15.5 px-5 bg-transparent text-white placeholder:text-[#878789] text-[16px] leading-6 outline-none rounded-lg"
                    style={{
                      border: "1.66px solid #FFFFFF",
                      fontFamily: "Euclid Circular A, sans-serif",
                    }}
                  />
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
                    placeholder="Enter email"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full h-15.5 px-5 bg-transparent text-white placeholder:text-[#878789] text-[16px] leading-6 outline-none rounded-lg"
                    style={{
                      border: "1.66px solid #FFFFFF",
                      fontFamily: "Euclid Circular A, sans-serif",
                    }}
                  />
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
                    placeholder="Enter phone number"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className="w-full h-15.5 px-5 bg-transparent text-white placeholder:text-[#878789] text-[16px] leading-6 outline-none rounded-lg"
                    style={{
                      border: "1.66px solid #FFFFFF",
                      fontFamily: "Euclid Circular A, sans-serif",
                    }}
                  />
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
                    >
                      {resume ? resume.name : "PDF Format, max 5mb"}
                    </span>
                    <button
                      type="button"
                      onClick={() => resumeRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#06CD70] font-medium text-[16px] leading-6 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                      style={{
                        border: "1px solid #06CD70",
                        fontFamily: "Euclid Circular A, sans-serif",
                      }}
                    >
                      <Upload size={16} className="text-[#06CD70]" />
                      Upload
                    </button>
                    <input
                      ref={resumeRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setResume(e.target.files?.[0] ?? null)}
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
                    >
                      {coverLetter ? coverLetter.name : "PDF Format, max 5mb"}
                    </span>
                    <button
                      type="button"
                      onClick={() => coverLetterRef.current?.click()}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#06CD70] font-medium text-[16px] leading-6 cursor-pointer hover:opacity-80 transition-opacity shrink-0"
                      style={{
                        border: "1px solid #06CD70",
                        fontFamily: "Euclid Circular A, sans-serif",
                      }}
                    >
                      <Upload size={16} className="text-[#06CD70]" />
                      Upload
                    </button>
                    <input
                      ref={coverLetterRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) =>
                        setCoverLetter(e.target.files?.[0] ?? null)
                      }
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
                      value={values.availability}
                      onChange={(e) => set("availability", e.target.value)}
                      className="bg-transparent text-white text-[16px] leading-6 outline-none w-full"
                      style={{
                        fontFamily: "Euclid Circular A, sans-serif",
                        colorScheme: "dark",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full py-5.5 bg-[#06CD70] rounded-[10px] text-white font-bold text-[20px] leading-8.25 text-center cursor-pointer hover:bg-[#05b862] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              {isPending ? "Sending..." : "Send Application"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}