"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import Image from "next/image";

interface PropertyVideoProps {
  videoUrl?: string;
  thumbnail?: string;
}

export default function PropertyVideo({ videoUrl, thumbnail }: PropertyVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) {
    return (
      <div className="w-full h-80 bg-surface rounded-lg flex items-center justify-center">
        <p className="text-muted">No video available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 bg-surface rounded-lg overflow-hidden group">
      {!isPlaying ? (
        <>
          {/* Video thumbnail */}
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="Video thumbnail"
              fill
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-surface to-surface-secondary" />
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <button
              onClick={() => setIsPlaying(true)}
              className="relative z-10 flex items-center justify-center w-20 h-20 bg-accent rounded-full hover:bg-accent/80 transition-colors shadow-lg"
              aria-label="Play video"
            >
              <Play className="w-8 h-8 text-white fill-white" />
            </button>
          </div>
        </>
      ) : (
        <iframe
          src={`${videoUrl}?autoplay=1`}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Property video"
        />
      )}
    </div>
  );
}
