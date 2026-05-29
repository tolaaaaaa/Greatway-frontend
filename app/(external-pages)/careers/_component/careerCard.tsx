"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { formatPrice } from "@/utils/formating";
import ApplyModal from "./applyCareer";

type Props = {
  career: Career;
};

export default function CareerCard({ career }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [showApply, setShowApply] = useState(false);

  return (
    <>
      <div
        className="flex flex-col gap-6 px-6.25 py-6.25"
        style={{ borderTop: "1px solid #454545" }}
      >
        {/* Header row */}
        <div className="flex flex-row items-center gap-7">
          {/* Left — badge, title, meta */}
          <div className="flex flex-col gap-3 flex-1">
            {/* Badge */}
            <span className="text-[#06CD70] font-normal uppercase text-[16px] leading-7.5 tracking-[0.01em]">
              {career.status} Role
            </span>

            {/* Title */}
            <h3 className="text-white font-bold text-[24px] leading-7.5 tracking-[0.01em]">
              {career.title}
            </h3>

            {/* Meta — type · salary · location */}
            <div className="flex flex-row items-center gap-6">
              <span className="text-[#C8C8C8] font-normal text-[16px] leading-7.5 uppercase">
                {career.employmentType}
              </span>
              <span className="w-1.25 h-1.25 rounded-full bg-[#C8C8C8] shrink-0" />
              <span className="text-[#C8C8C8] font-normal text-[16px] leading-7.5 uppercase">
                {career.salary ?? formatPrice("100000")}
              </span>
              <span className="w-1.25 h-1.25 rounded-full bg-[#C8C8C8] shrink-0" />
              <span className="text-[#C8C8C8] font-normal text-[16px] leading-7.5 uppercase">
                {career.location}
              </span>
            </div>
          </div>

          {/* Toggle arrow */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-9.5 h-9.5 flex items-center justify-center rounded-full border-2 border-white shrink-0 cursor-pointer hover:opacity-70 transition-opacity"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            {isOpen ? (
              <ChevronUp size={38} className="text-white" />
            ) : (
              <ChevronDown size={38} className="text-white" />
            )}
          </button>

          {/* Submit Application button */}
          <button
            onClick={() => setShowApply(true)}
            className="shrink-0 px-13.25 py-1.5 bg-[#06CD70] rounded-[7px] text-white font-bold text-[16px] leading-6.5 cursor-pointer hover:bg-[#05b862] transition-colors"
          >
            Submit Application
          </button>
        </div>

        {/* Expanded content */}
        {isOpen && (
          <div className="flex flex-col gap-6">
            {/* About the Role */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[#C8C8C8] font-normal text-[20px] leading-6">
                About the Role
              </h4>
              <p className="text-[#C8C8C8] font-normal text-[16px] leading-6">
                {career.description}
              </p>
            </div>

            {/* Responsibilities + Skills side by side */}
            <div className="flex flex-row gap-22.5">
              {/* Responsibilities */}
              <div className="flex flex-col gap-2 flex-1">
                <h4 className="text-[#C8C8C8] font-normal text-[20px] leading-6">
                  Responsibilities
                </h4>
                <ul className="flex flex-col gap-0">
                  {career.responsibilities?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#C8C8C8] font-normal text-[16px] leading-6 flex items-start gap-2"
                    >
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-[#C8C8C8] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills & Qualifications */}
              <div className="flex flex-col gap-2 w-111.5 shrink-0">
                <h4 className="text-[#C8C8C8] font-normal text-[20px] leading-6">
                  Skills & Qualifications
                </h4>
                <ul className="flex flex-col gap-0">
                  {career.skills?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[#C8C8C8] font-normal text-[16px] leading-6 flex items-start gap-2"
                    >
                      <span className="mt-2.5 w-1 h-1 rounded-full bg-[#C8C8C8] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-2">
              <h4 className="text-[#C8C8C8] font-normal text-[20px] leading-6">
                Benefits
              </h4>
              <ul className="flex flex-col gap-0">
                {career.benefits?.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-[#C8C8C8] font-normal text-[16px] leading-6 flex items-start gap-2"
                  >
                    <span className="mt-2.5 w-1 h-1 rounded-full bg-[#C8C8C8] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <ApplyModal
        isOpen={showApply}
        onClose={() => setShowApply(false)}
        careerTitle={career.title}
      />
    </>
  );
}
