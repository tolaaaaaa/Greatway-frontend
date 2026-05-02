"use client";

import { useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PropertyCard from "../../_component/productCard";
import { Building2 } from "lucide-react";
import { Property } from "@/types/property";

export type TabType = "listed" | "unlisted" | "sold";

interface PropertyGridProps {
  status: TabType;
  data: Pagination<Property>;
}

export default function PropertyGrid({ status, data }: PropertyGridProps) {
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { items, metadata } = data;
  const { page, totalPages } = metadata;

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
    <div ref={topRef} className="space-y-10">
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              url={property.imageUrls?.[0] ?? "/property_image.png"}
              title={property.title}
              location={property.location}
              status={property.status}
              price={property.salesPrice}
              createdAt={new Date(property.createdAt).toLocaleDateString()}
              features={property.features}
              onViewDetails={() => {}}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="bg-surface-secondary p-4 rounded-full">
            <Building2 className="w-10 h-10 text-muted" />
          </div>
          <p className="text-xl font-bold text-foreground">
            No {status} properties found
          </p>
          <p className="text-sm text-muted">
            Properties marked as {status} will appear here
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-10 pb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
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
                  ${page === p ? "bg-[#06CD70]" : "hover:bg-white/10"}
                `}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(page + 1)}
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
  );
}