import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/app/component/ui";
import Link from "next/link";
import { PropertyFeature } from "@/types/property";
import { Bed, Bath, Car, Trees, Maximize, Sofa, Warehouse } from "lucide-react";
import { formatPrice } from "@/utils/formating";

export type PropertyCardProps = {
  id: string;
  url: string;
  title: string;
  location: string;
  price: string;
  createdAt: string;
  features: PropertyFeature[];
  status?: "listed" | "unlisted" | "sold";
  onViewDetails?: () => void;
};

// Map feature.icon text to the component
const getFeatureIcon = (featureText: string) => {
  const normalizedText = featureText.toLowerCase().trim();

  if (normalizedText.includes("bedroom")) return <Bed size={16} />;
  if (normalizedText.includes("bathroom")) return <Bath size={16} />;
  if (normalizedText.includes("garage")) return <Warehouse size={16} />;
  if (normalizedText.includes("garden")) return <Trees size={16} />;
  if (
    normalizedText.includes("livingroom") ||
    normalizedText.includes("living room")
  )
    return <Sofa size={16} />;
  if (
    normalizedText.includes("squarefeet") ||
    normalizedText.includes("square feet")
  )
    return <Maximize size={16} />;

  // Default icon if no match
  return <Maximize size={16} />;
};

export default function PropertyCard({
  id,
  url,
  title,
  location,
  price,
  createdAt,
  features,
  status,
  onViewDetails,
}: PropertyCardProps) {
  const isSold = status === "sold";

  return (
    <div className="flex flex-col gap-4">
      {/* Image */}
      <div className="relative w-full h-64 rounded-md overflow-hidden">
        <Image
          src={url}
          alt={title}
          fill
          className={`object-cover transition-all duration-300 ${isSold ? "brightness-50" : ""}`}
        />

        {/* Sold Overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-cambay font-bold text-black text-center leading-[144%] tracking-[0%] select-none"
              style={{ fontSize: "97.81px", transform: "rotate(-45deg)" }}
            >
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Date */}
      <p className="text-danger font-normal text-[15px]">
        Posted on {createdAt}
      </p>

      {/* Title */}
      <h4 className="font-bold text-[20px] text-foreground leading-snug">
        {title}
      </h4>

      {/* Location */}
      <p className="inline-flex gap-2 items-center text-muted font-bold text-base">
        <MapPin size={16} /> {location}
      </p>

      {/* Price */}
      <div className="font-bold text-3xl text-accent">
        {formatPrice(price)}
      </div>

      {/* Features */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 font-bold text-sm text-muted"
          >
            {getFeatureIcon(feature.icon)}
            <span>{feature.description}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      {!isSold && (
        <Link href={`/dashboard/properties/${encodeURIComponent(id)}`}>
          <Button variant="primary" size="lg" fullWidth className="p-5 mt-1">
            View Details
          </Button>
        </Link>
      )}
    </div>
  );
}
