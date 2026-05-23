// _component/propertySidebar.tsx
import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";
import SimilarPropertyCard from "./similarPropertyCard";

type Props = {
  property: Property;
  similarProperties: Property[];
};

export default function PropertySidebar({ property, similarProperties }: Props) {
  return (
    <div className="flex flex-col gap-20.5 w-81.75 shrink-0">

      {/* Sales Support Card */}
      <div
        className="flex flex-row items-center p-[61px_40px] rounded-[7px]"
        style={{ border: "1px solid #343434" }}
      >
        <div className="flex flex-col items-center gap-7.25 w-full">
          {/* Avatar */}
          <div className="relative w-28.5 h-28.5 rounded-full overflow-hidden shrink-0">
            <Image
              src={property.saleSupportAvatar}
              alt="Sales Support"
              fill
              className="object-cover"
            />
          </div>

          {/* Name & Role */}
          <div className="flex flex-col items-center gap-0 text-center">
            <h3
              className="text-white font-bold text-[22px] leading-7.5 tracking-[0.01em]"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              {property.supportInCharge}
            </h3>
            <p
              className="text-[#8D8D8D] font-normal text-[18px] leading-6.25"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Sales Support
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-2.5 w-full">
            <Link
              href={`https://wa.me/${property.whatsAppNumber?.replace(/\D/g, "")}`}
              target="_blank"
              className="w-full"
            >
              <button
                className="w-full py-2.5 bg-white rounded-[7px] text-[#111111] font-bold text-[18px] leading-7.25 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                style={{ fontFamily: "Cambay, sans-serif" }}
              >
                Message
              </button>
            </Link>
            <Link href={`tel:${property.altNumber}`} className="w-full">
              <button
                className="w-full py-2.5 bg-[#BEF5E8] rounded-[7px] text-[#06CD70] font-bold text-[18px] leading-7.25 text-center cursor-pointer hover:opacity-80 transition-opacity"
                style={{ fontFamily: "Cambay, sans-serif" }}
              >
                Call
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      {similarProperties.length > 0 && (
        <div className="flex flex-col gap-5">
          <h2
            className="text-[#E2FCF0] font-bold text-[30px] leading-7.5 tracking-[0.01em]"
            style={{ fontFamily: "Cambay, sans-serif" }}
          >
            Similar Properties
          </h2>
          <div className="flex flex-col gap-6">
            {similarProperties.slice(0, 3).map((item) => (
              <SimilarPropertyCard key={item.id} property={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}