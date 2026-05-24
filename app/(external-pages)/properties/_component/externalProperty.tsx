"use client";

import { useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Property } from "@/types/property";
import PropertyCard from "../../_component/propertyCard";
import { Building2 } from "lucide-react";

type Props = {
  properties: Pagination<Property>;
};

export default function ExternalPropertyPage({ properties }: Props) {
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { items, metadata } = properties;
  const { page, totalPages } = metadata;

  const currentPage = Number(page)

  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth" });

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
    scrollToTop();
  };

  return (
    <section className="mt-40">
      <div className="app-container">
        <div ref={topRef} className="space-y-10">
          {/* Grid */}
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Building2 className="w-16 h-16 text-[#C8C8C8] opacity-30" />
              <p className="text-[#C8C8C8] text-[18px] font-medium">
                No properties available at the moment.
              </p>
              <p className="text-[#C8C8C8] text-[14px] opacity-50">
                Check back soon for new listings.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {items.map((property) => (
                <PropertyCard property={property} key={property.id} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center gap-10 pb-6">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!metadata.hasPreviousPage}
                  className="w-7.25 h-7.25 flex items-center justify-center disabled:opacity-30 transition-opacity"
                >
                  <ChevronLeft
                    size={20}
                    className={!metadata.hasPreviousPage ? "text-[#393939]" : "text-white"}
                  />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`
                      w-8.25 h-8.25 rounded-[3.77px] flex items-center justify-center
                      font-medium text-[22px] leading-6.75 text-white transition-colors duration-200
                      ${currentPage === p ? "bg-[#06CD70]" : "hover:bg-white/10"}
                    `}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!metadata.hasNextPage}
                  className="w-7.25 h-7.25 flex items-center justify-center disabled:opacity-30 transition-opacity"
                >
                  <ChevronRight
                    size={20}
                    className={!metadata.hasNextPage ? "text-[#393939]" : "text-white"}
                  />
                </button>
              </div>

              <button
                onClick={scrollToTop}
                className="font-bold text-[18px] underline text-white hover:text-white/70 transition-colors cursor-pointer"
              >
                Back To Top
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}