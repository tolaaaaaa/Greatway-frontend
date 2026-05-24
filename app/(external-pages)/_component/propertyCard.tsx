import { Button } from "@/app/component/ui";
import { Property } from "@/types/property";
import { formatPrice } from "@/utils/formating";
import { getFeatureDescription, getFeatureIcon } from "@/utils/helper";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type props = {
  property: Property;
};

export default function PropertyCard({ property }: props) {
  return (
    <div className="bg-black rounded-[30px] h-87.5 ">
      <div className="flex p-6 gap-7 h-full">
        <div className="h-full w-[45%]">
          <Image
            src={property.imageUrls[0]}
            alt={property.title}
            width={400}
            height={500}
            className="h-full w-full object-cover rounded-[30px]"
          />
        </div>
        <div className="h-full w-[55%] space-y-6">
          <div className="">
            <h1 className="font-bold text-[20px]">{property.title}</h1>
            <h3 className="inline-flex gap-2 font-bold justify-center text-[14px]">
                <span><MapPin className="w-3 h-4" /></span>
                {property.location.slice(0, 20)}{property.location.length > 20 ? "..." : ""}
                </h3>
          </div>
          <h1 className="text-accent font-bold text-[29px]">{formatPrice(property.salesPrice)}</h1>
          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {property.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 font-bold text-sm text-[#DFDFDF]"
              >
                {getFeatureIcon(feature.icon)}
                <span>{getFeatureDescription(feature.description, feature.icon)}</span>
              </div>
            ))}
          </div>
          <div className="w-full">
            <Link href={`/properties/${property.id}`}>
              <Button className="w-full">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
