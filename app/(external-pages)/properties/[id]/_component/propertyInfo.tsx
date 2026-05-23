
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Property } from "@/types/property";
import { formatPrice } from "@/utils/formating";
import { getFeatureDescription, getFeatureIcon } from "@/utils/helper";
import PropertyVideo from "@/app/dashboard/properties/[id]/_component/PropertyVideo";

export default function PropertyInfo({ property }: { property: Property }) {
  return (
    <div className="flex flex-col gap-5.5 flex-1">
      {/* Header: title, location, book now, price */}
      <div className="flex flex-col gap-3.25">
        <div className="flex flex-row items-start justify-between">
          <div className="flex flex-col gap-0">
            <h1
              className="text-white font-bold text-[40px] leading-16.25"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              {property.title}
            </h1>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[#8D8D8D]" />
              <span
                className="text-[#8D8D8D] text-[20px] leading-11.25"
                style={{ fontFamily: "Cambay, sans-serif" }}
              >
                {property.location}
              </span>
            </div>
          </div>

          {/* Book Now button */}
          <Link href={`/book?propertyId=${property.id}`}>
            <button
              className="px-4.5 py-2.5 bg-[#06CD70] rounded-[7px] text-white font-bold text-[18px] leading-7.25 cursor-pointer hover:bg-[#05b862] transition-colors"
              style={{ fontFamily: "Cambay, sans-serif" }}
            >
              Book Now
            </button>
          </Link>
        </div>

        {/* Price */}
        <p
          className="text-[#06CD70] font-bold text-[41px] leading-10.75 tracking-[0.01em]"
          style={{ fontFamily: "Cambay, sans-serif" }}
        >
          {formatPrice(property.salesPrice)}
        </p>
      </div>

      {/* Description */}
      <div
        className="flex flex-col gap-2.25 p-[24px_18px_19px_29px] rounded-[7px]"
        style={{ border: "1px solid #343434" }}
      >
        <h2
          className="text-white font-bold text-[20px] leading-7.5 tracking-[0.01em]"
          style={{ fontFamily: "Cambay, sans-serif" }}
        >
          Description
        </h2>
        <p
          className="text-[#ABABAB] font-normal text-[16px] leading-6.25"
          style={{ fontFamily: "Cambay, sans-serif" }}
        >
          {property.description}
        </p>
      </div>

      {/* Features */}
      <div
        className="flex flex-col gap-4.25 p-[24px_38px_20px_30px] rounded-[7px]"
        style={{ border: "1px solid #343434" }}
      >
        <h2
          className="text-white font-bold text-[20px] leading-7.5 tracking-[0.01em]"
          style={{ fontFamily: "Cambay, sans-serif" }}
        >
          Features
        </h2>
        <div className="flex flex-row flex-wrap gap-x-9.5 gap-y-2">
          {property.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              {getFeatureIcon(feature.icon)}
              <span
                className="text-[#ABABAB] font-bold text-[18px] leading-9.75 tracking-[0.01em]"
                style={{ fontFamily: "Cambay, sans-serif" }}
              >
                {getFeatureDescription(feature.description, feature.icon)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Property Video */}
      <div
        className="flex flex-col gap-3.25 p-[24px_30px_30px] rounded-[7px]"
        style={{ border: "1px solid #343434" }}
      >
        <h2
          className="text-white font-bold text-[20px] leading-7.5 tracking-[0.01em]"
          style={{ fontFamily: "Cambay, sans-serif" }}
        >
          Property Video
        </h2>
        <PropertyVideo videoUrl={property.videoUrl} />
      </div>
    </div>
  );
}