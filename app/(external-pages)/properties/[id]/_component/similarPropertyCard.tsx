import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatPrice } from "@/utils/formating";
import { Property } from "@/types/property";

export default function SimilarPropertyCard({ property }: { property: Property }) {
  return (
    <div
      className="flex flex-col gap-2.5 p-[15px_11px] rounded-[7px]"
      style={{ border: "1px solid #343434" }}
    >
      <div className="flex flex-row justify-between items-stretch gap-3.75">
        {/* Image — stretches to full height of the row */}
        <div className="relative w-26.5 shrink-0 rounded-[7px] overflow-hidden min-h-31.5">
          <Image
            src={property.imageUrls?.[0]}
            alt={property.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4.25 flex-1 min-w-0">
          <div className="flex flex-col gap-0">
            {/* Title */}
            <h3
              className="text-white font-bold text-[18px] leading-7.5 tracking-[0.01em] wrap-break-word"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              {property.title}
            </h3>

            {/* Location */}
            <div className="flex items-center gap-1.5">
              <MapPin className="text-[#8D8D8D] shrink-0 w-4 h-4" />
              <span
                className="text-[#8D8D8D] font-bold text-[14px] leading-7.5 wrap-break-word"
                style={{ fontFamily: "Cambay, sans-serif" }}
              >
                {property.location.slice(0, 15)}{property.location.length > 15 ? "..." : ""}
              </span>
            </div>
          </div>

          {/* Price — breaks to next line if too long */}
          <p
            className="text-[#06CD70] font-bold text-[29px] leading-tight tracking-[0.01em] break-all"
            style={{ fontFamily: "Cambay, sans-serif" }}
          >
            {formatPrice(property.salesPrice)}
          </p>

          {/* View Details button */}
          <Link href={`/properties/${property.id}`}>
            <button
              className="px-4.5 py-1.5 rounded-[7px] text-[#06CD70] font-bold text-[16px] leading-6.5 cursor-pointer hover:bg-[#06CD70] hover:text-white transition-colors"
              style={{
                border: "1px solid #06CD70",
                fontFamily: "Cambay, sans-serif",
              }}
            >
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}