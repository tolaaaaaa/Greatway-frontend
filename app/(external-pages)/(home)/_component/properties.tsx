import { Property } from "@/types/property";
import PropertyCard from "../../_component/propertyCard";

type Props = {
  property: Property[];
};

export default function PropertyProduct({ property }: Props) {
  return (
    <section className="mt-25">
      <div className="app-container py-17.5">
        <div className="flex flex-col gap-8">
          <div>
            <div className="flex flex-col justify-center items-center text-center">
              <h2 className="text-accent font-bold uppercase text-[20px]">
                Our Homes
              </h2>
              <h1 className="font-bold text-[40px] text-[#FCEEE2] leading-13.75 tracking-[0.01em]">
                Explore Our Latest Developments
              </h1>
              <p className="font-normal text-[20px] text-[#C8C8C8]">
                Each home is carefully designed and built by our team, offering
                exceptional value, comfort, and long-term security.
              </p>
            </div>
          </div>

          {/* products card */}
          {property.length === 0 ? (
            <div className="flex flex-col justify-center items-center text-center py-20 gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-[#C8C8C8] opacity-40"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <p className="text-[#C8C8C8] text-[18px] font-medium">
                No properties available at the moment.
              </p>
              <p className="text-[#C8C8C8] text-[14px] opacity-60">
                Check back soon for new listings.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {property.map((item) => (
                <PropertyCard key={item.id} property={item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
