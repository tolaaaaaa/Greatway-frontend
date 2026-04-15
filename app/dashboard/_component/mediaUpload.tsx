"use client";

import { Camera, Video, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

type MediaType = "image" | "video" | "both";

export type MediaFile = {
  url: string;
  type: "image" | "video";
  file: File;
};

type MediaUploadSlotProps = {
  accept: MediaType;
  value?: MediaFile | string | null; // ← add string
  onChange: (media: MediaFile | null) => void;
  className?: string;
  label?: string;
};

// ─── Single Upload Slot ───────────────────────────────────────────────────────

export function MediaUploadSlot({
  accept = "image",
  value,
  onChange,
  className = "",
  label,
}: MediaUploadSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptAttr =
    accept === "image"
      ? "image/*"
      : accept === "video"
        ? "video/*"
        : "image/*,video/*";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const type = file.type.startsWith("video") ? "video" : "image";
    onChange({ url, type, file });
  };

  const Icon = accept === "video" ? Video : Camera;

  const displayUrl = typeof value === "string" ? value : (value?.url ?? null);
  const displayType =
    typeof value === "string"
      ? value.match(/\.(mp4|webm|mov)$/i)
        ? "video"
        : "image"
      : (value?.type ?? null);

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className={`
        relative flex flex-col items-center justify-center gap-2
        bg-surface-secondary border border-border rounded-xl
        cursor-pointer hover:border-accent hover:bg-surface-tertiary
        transition-all duration-200 overflow-hidden
        ${className}
      `}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        onChange={handleFileChange}
        className="hidden"
      />

     {displayUrl ? (
  <>
    {displayType === "image" ? (
      <Image
        src={displayUrl}         // ← was value.url
        alt="Uploaded media"
        fill
        className="object-cover"
      />
    ) : (
      <video
        src={displayUrl}         // ← was value.url
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
      />
    )}
    <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
      <Icon className="text-white w-6 h-6" />
    </div>
  </>
) : (
  <>
    <Icon className="w-7 h-7 text-muted" strokeWidth={1.5} />
    <p className="text-xs text-muted">
      {label !== undefined
        ? label
        : accept === "video"
          ? "Click to add video"
          : "Click to add picture"}
    </p>
  </>
)}
    </div>
  );
}

// ─── Image Upload Grid (no video) ─────────────────────────────────────────────

type PropertyImageUploadProps = {
  onChange?: (files: (MediaFile | string | null)[]) => void;
  initialImages?: (string | null)[];   // ← add this
};

export function PropertyImageUpload({ onChange, initialImages = [] }: PropertyImageUploadProps) {
  const [mainImage, setMainImage] = useState<MediaFile | string | null>(initialImages[0] ?? null);
  const [sideImages, setSideImages] = useState<(MediaFile | string | null)[]>([
    initialImages[1] ?? null,
    initialImages[2] ?? null,
    initialImages[3] ?? null,
  ]);

  const handleMainChange = (media: MediaFile | null) => {
    setMainImage(media);
    onChange?.([media, ...sideImages]);
  };

  const handleSideChange = (index: number, media: MediaFile | null) => {
    const updated = [...sideImages];
    updated[index] = media;
    setSideImages(updated);
    onChange?.([mainImage, ...updated]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_0.6fr] gap-3">
      {/* Main large image */}
      <MediaUploadSlot
        accept="image"
        value={mainImage}
        onChange={handleMainChange}
        className="h-64 md:h-93.75"
      />

      {/* 3 smaller images stacked */}
      <div className="grid grid-rows-3 gap-3 h-64 md:h-93.75">
        {sideImages.map((img, i) => (
          <MediaUploadSlot
            key={i}
            accept="image"
            value={img}
            onChange={(media) => handleSideChange(i, media)}
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
}

// ─── Video Upload Section ─────────────────────────────────────────────────────

type PropertyVideoUploadProps = {
  onChange?: (file: MediaFile | null) => void;
  initialVideo?: string | null;   // ← add this
};


export function PropertyVideoUpload({ onChange, initialVideo }: PropertyVideoUploadProps) {
  const [video, setVideo] = useState<MediaFile | string | null>(initialVideo ?? null);

  const handleChange = (media: MediaFile | null) => {
    setVideo(media);
    onChange?.(media);
  };

  return (
    <div className="h-80">
      <MediaUploadSlot
        accept="video"
        value={video}
        onChange={handleChange}
        className="h-full w-full"  
        label="Click to add video"
      />
    </div>
  );
}

// ─── Combined (kept for backwards compat) ────────────────────────────────────

export default function PropertyMediaUpload({
  onChange,
  initialImages,
}: {
  onChange?: (files: (MediaFile | string | null)[]) => void;
  initialImages?: (string | null)[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <PropertyImageUpload onChange={onChange} initialImages={initialImages} />
    </div>
  );
}
