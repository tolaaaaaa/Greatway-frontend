"use client";
import { Button } from "@/app/component/ui";
import { SlidersHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchFilterDisplay = "both" | "search" | "whatsapp";

interface SearchFilterProps {
  display?: SearchFilterDisplay;
}

export default function SearchFilter({ display = "both" }: SearchFilterProps) {
  const showSearch = display !== "whatsapp";
  const showWhatsapp = display !== "search";
  const router = useRouter();

  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [averagePrice, setAveragePrice] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (propertyType.trim()) params.set("type", propertyType.trim());
    if (averagePrice.trim()) params.set("price", averagePrice.trim());
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <>
      {/* Search Box — stays in document flow, positioned relative to hero */}
      {showSearch && (
        <div className="absolute bottom-0 left-0 right-0 translate-y-1/2 z-20">
          <div className="app-container">
            <div className="bg-[#070707] rounded-[15px] shadow-[2px_4px_53px_-15px_rgba(0,0,0,0.25)] flex items-center gap-9.5 px-8.75 py-7.5 w-fit">
              <div className="flex items-center justify-center gap-7.5">
                {/* Location */}
                <div className="flex flex-col gap-1.75 w-46.25">
                  <label className="font-bold text-[17px] leading-8.25 text-[#FCEEE2] tracking-[0.02em]">
                    Location
                  </label>
                  <div className="bg-[#DDE6E9] rounded-[10px] px-3.25 py-1.5 h-8.75 flex items-center">
                    <input
                      type="text"
                      placeholder="Palmgroove, Lagos"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="bg-transparent outline-none font-cambay font-bold text-[15px] leading-6.5 tracking-[0.02em] text-black w-full"
                    />
                  </div>
                </div>

                <div className="w-px h-17 border-l border-[#B2C4CA]" />

                {/* Property Type */}
                <div className="flex flex-col gap-1.75 w-46.25">
                  <label className="font-bold text-[17px] text-[#FCEEE2] leading-8.25 tracking-[0.02em]">
                    Property Type
                  </label>
                  <div className="bg-[#DDE6E9] rounded-[10px] px-3.5 py-1.5 h-8.75 flex items-center">
                    <input
                      type="text"
                      placeholder="Deluxe"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="bg-transparent outline-none font-cambay font-bold text-[15px] leading-6.5 tracking-[0.02em] text-black w-full"
                    />
                  </div>
                </div>

                <div className="w-px h-17 border-l border-[#B2C4CA]" />

                {/* Average Price */}
                <div className="flex flex-col gap-1.75 w-46.25">
                  <label className="font-bold text-[17px] leading-8.25 text-[#FCEEE2] tracking-[0.02em]">
                    Average Price
                  </label>
                  <div className="bg-[#DDE6E9] rounded-[10px] px-3.5 py-1.5 h-8.75 flex items-center">
                    <input
                      type="text"
                      placeholder="₦5000-₦10000"
                      value={averagePrice}
                      onChange={(e) => setAveragePrice(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      className="bg-transparent outline-none font-cambay font-bold text-[15px] leading-6.5 tracking-[0.02em] text-black w-full"
                    />
                  </div>
                </div>

                <SlidersHorizontal className="text-[#FCEEE2] w-8 h-5 cursor-pointer" />
              </div>

              <Button
              variant="primary"
                className="py-6 px-10 text-[17px] rounded-md cursor-pointer"
                onClick={handleSearch}
              >
                Search Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button — fixed on scroll */}
      {showWhatsapp && (
        <a
          href="https://wa.me/yournumber"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.997l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.368l-.36-.214-3.733.979.997-3.648-.235-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
          </svg>
        </a>
      )}
    </>
  );
}