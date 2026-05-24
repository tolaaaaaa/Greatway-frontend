"use client";
import { ChevronLeft, ChevronRight, ImageIcon, Play } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

type Props = {
  gallery: Pagination<Gallery>;
};

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i.test(url);
}

function MediaItem({ item, alt }: { item: Gallery; alt: string }) {
  const video = isVideo(item.imageUrl);

  return (
    <div className="relative overflow-hidden rounded-lg h-full">
      {video ? (
        <>
          <video
            src={item.imageUrl}
            className="w-full h-full object-cover"
            muted
            playsInline
            loop
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/50 rounded-full p-3">
              <Play size={28} className="text-white fill-white" />
            </div>
          </div>
        </>
      ) : (
        <Image
          src={item.imageUrl}
          alt={alt}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      )}
    </div>
  );
}

export default function ExternalGallery({ gallery }: Props) {
  const topRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { items, metadata } = gallery;
  const { page, totalPages } = metadata;

  // Ensure currentPage is always a number for comparison
  const currentPage = Number(page);

  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth" });

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    scrollToTop();
  };

  return (
    <section className="mt-25">
      <div className="app-container">
        <div ref={topRef} className="space-y-10">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4">
              <ImageIcon className="w-16 h-16 text-[#C8C8C8] opacity-30" />
              <p className="text-[#C8C8C8] text-[18px] font-medium">
                No Gallery available at the moment.
              </p>
              <p className="text-[#C8C8C8] text-[14px] opacity-50">
                Check back soon for new images.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {(() => {
                const rows = [];
                let i = 0;

                while (i < items.length) {
                  const rowIndex = rows.length;

                  if (rowIndex % 2 === 1 && i + 2 <= items.length - 1) {
                    rows.push(
                      <div
                        key={`special-${i}`}
                        className="grid grid-cols-[290.25px_1fr_290.25px] gap-5 h-77"
                      >
                        <MediaItem item={items[i]} alt={`gallery image ${i + 1}`} />
                        <MediaItem item={items[i + 1]} alt={`gallery image ${i + 2}`} />
                        <MediaItem item={items[i + 2]} alt={`gallery image ${i + 3}`} />
                      </div>
                    );
                    i += 3;
                  } else {
                    const rowItems = items.slice(i, i + 3);
                    rows.push(
                      <div
                        key={`normal-${i}`}
                        className="grid grid-cols-3 gap-5 h-77"
                      >
                        {rowItems.map((item, idx) => (
                          <MediaItem
                            key={item.id}
                            item={item}
                            alt={`gallery image ${i + idx + 1}`}
                          />
                        ))}
                      </div>
                    );
                    i += rowItems.length;
                  }
                }

                return rows;
              })()}
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
                    className={
                      !metadata.hasPreviousPage ? "text-[#393939]" : "text-white"
                    }
                  />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`
                      w-8.25 h-8.25 rounded-[3.77px] flex items-center justify-center
                      font-medium text-[22px] leading-6.75 text-white transition-colors duration-200
                      ${currentPage === p ? "bg-accent" : "hover:bg-white/10"}
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
                    className={
                      !metadata.hasNextPage ? "text-[#393939]" : "text-white"
                    }
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