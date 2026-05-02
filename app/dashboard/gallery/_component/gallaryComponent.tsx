"use client";

import { useState, FormEvent, useRef } from "react";
import { BreadcrumbItemType, Breadcrumbs, Button } from "@/app/component/ui";
import { Home } from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import { MediaUploadSlot, MediaFile } from "../../_component/mediaUpload";
import GalleryImages from "./galleryImages";
import { Pagination } from "@/app/component/layout";

const ITEMS_PER_PAGE = 9;

export default function GallaryComponent() {
  const [media, setMedia] = useState<MediaFile | string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLElement>(null);

  const handleMediaChange = (mediaFile: MediaFile | null) => {
    setMedia(mediaFile);
    console.log("Media selected:", mediaFile);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!media) {
      console.log("No media selected");
      return;
    }

    setIsUploading(true);

    try {
      // Your upload logic here
      console.log("Uploading media:", media);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Clear form after successful upload
      setMedia(null);
      alert("Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(imagesGallery.length / ITEMS_PER_PAGE);

  const paginatedImages = imagesGallery.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <main ref={topRef} className="font-cambay space-y-7">
      <div className="flex justify-between items-center">
        <PageTitle title="Gallery Management" />
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      <div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <MediaUploadSlot
            accept="both"
            value={media}
            onChange={handleMediaChange}
            className="h-64 w-full"
          />

          <Button type="submit" size="lg" className="w-full">
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>

      <div className="space-y-7">
        <h2 className="font-bold text-[24px]">Gallery uploads</h2>

        {/* Fixed: Using paginatedImages instead of imagesGallery */}
        {paginatedImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedImages.map((image, index) => (
              <div key={index}>
                <GalleryImages url={image} alt={`${index} image`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500 gap-3">
            <p className="text-xl font-bold">No images found</p>
            <p className="text-sm">Upload images to see them here</p>
          </div>
        )}
      </div>

      {/* Only show pagination if there are images */}
      {imagesGallery.length > 0 && (
        <div className="flex flex-col justify-center items-center gap-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <div className="flex justify-center items-center">
         <button
            onClick={scrollToTop}
            className="font-bold text-[18px] underline text-white hover:text-white/70 transition-colors cursor-pointer"
          >
            Back To Top
          </button>
      </div>
    </main>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Gallery", href: "/dashboard/gallery", isCurrent: true },
];

export const imagesGallery = [
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary1.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
  "/gallary2.png",
];
