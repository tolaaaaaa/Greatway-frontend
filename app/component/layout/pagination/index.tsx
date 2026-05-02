"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "light" | "dark"; // Add theme support
};

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  variant = "dark" // Default to dark for white backgrounds
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const textColor = variant === "dark" ? "text-white" : "text-black";
  const inactiveColor = variant === "dark" ? "text-[#393939]" : "text-gray-400";
  const hoverBg = variant === "dark" ? "hover:bg-white/10" : "hover:bg-black/10";

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-7.25 h-7.25 flex items-center justify-center disabled:opacity-30 transition-opacity"
      >
        <ChevronLeft
          size={20}
          className={currentPage === 1 ? inactiveColor : textColor}
        />
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
            w-8.25 h-8.25 rounded-[3.77px] flex items-center justify-center
            font-medium text-[22px] leading-6.75 transition-colors duration-200
            ${
              currentPage === page
                ? "bg-[#06CD70] text-white"
                : `${textColor} ${hoverBg}`
            }
          `}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-7.25 h-7.25 flex items-center justify-center disabled:opacity-30 transition-opacity"
      >
        <ChevronRight
          size={20}
          className={currentPage === totalPages ? inactiveColor : textColor}
        />
      </button>
    </div>
  );
}