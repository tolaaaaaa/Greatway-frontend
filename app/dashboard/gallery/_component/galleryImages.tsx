"use client";

import { Button } from "@/app/component/ui";
import Image from "next/image";
import { useState } from "react";
import { X, Play } from "lucide-react";

export type Props = {
  gallery: Gallery;
  alt: string;
  handleDelete: (id: string) => void;
};

function isVideo(url: string) {
  return /\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i.test(url);
}

export default function GalleryImages({ gallery, alt, handleDelete }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const video = isVideo(gallery.imageUrl);

  return (
    <>
      {/* Card */}
      <div
        className="relative group rounded-lg overflow-hidden"
        style={{ width: "353.67px", height: "174px" }}
      >
        {video ? (
          <>
            <video
              src={gallery.imageUrl}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            {/* Play icon indicator */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-black/50 rounded-full p-2">
                <Play size={24} className="text-white fill-white" />
              </div>
            </div>
          </>
        ) : (
          <Image
            src={gallery.imageUrl}
            alt={alt}
            fill
            className="object-cover"
            sizes="354px"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 px-4">
          <Button
            size="md"
            type="button"
            onClick={() => setShowPreview(true)}
            className="w-full"
          >
            Preview
          </Button>
          <Button
            size="md"
            type="button"
            className="w-full text-red-800 border border-red-800"
            variant="ghost"
            onClick={() => handleDelete(gallery.id)}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="relative w-[90vw] h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPreview(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-1"
            >
              <X size={28} />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              {video ? (
                <video
                  src={gallery.imageUrl}
                  className="max-w-full max-h-full rounded-lg"
                  controls
                  autoPlay
                />
              ) : (
                <Image
                  src={gallery.imageUrl}
                  alt={alt}
                  fill
                  className="rounded-lg object-contain"
                  sizes="90vw"
                  priority
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}