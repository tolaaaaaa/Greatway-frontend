"use client";

import { Input } from "@/app/component/ui";
import { Bed, Bath, Car, Dock, Sofa, Trees } from "lucide-react";
import PropertyMediaUpload, {
  MediaFile,
  PropertyVideoUpload,
} from "../../_component/mediaUpload";
import { CreatePropertyFormValues } from "@/validations/property/create-property.validation";
import Image from "next/image";
import { useRef } from "react";

const FEATURE_ICONS = {
  bedrooms: Bed,
  bathrooms: Bath,
  garage: Car,
  livingRoom: Sofa,
  squareFeet: Dock,
  garden: Trees,
} as const;

type FeatureKey = keyof typeof FEATURE_ICONS;

export type PropertyFiles = {
  images: (File | null)[];
  video: File | null;
  avatar: File | null;
};

type PropertyFormProps = {
  values: CreatePropertyFormValues;
  onChange: (values: CreatePropertyFormValues) => void;
  onFilesChange?: (files: PropertyFiles) => void;
  errors?: Partial<
    Record<
      | "title"
      | "salesPrice"
      | "location"
      | "description"
      | "features"
      | "supportInCharge"
      | "whatsAppNumber"
      | "altNumber"
      | "imageUrls"
      | "videoUrl"
      | "saleSupportAvatar",
      string | undefined
    >
  >;
};

export default function PropertyForm({
  values,
  onChange,
  onFilesChange,
  errors = {},
}: PropertyFormProps) {
  // Track raw File objects separately from form values
  const filesRef = useRef<PropertyFiles>({
    images: [null, null, null, null],
    video: null,
    avatar: null,
  });

  const notifyFilesChange = () => {
    onFilesChange?.({ ...filesRef.current });
  };

  const set = <K extends keyof CreatePropertyFormValues>(
    key: K,
    value: CreatePropertyFormValues[K],
  ) => onChange({ ...values, [key]: value });

  const handleFeatureChange = (index: number, description: string) => {
    const newFeatures = [...values.features];
    newFeatures[index] = {
      ...newFeatures[index],
      description,
    };
    set("features", newFeatures);
  };

  const addFeature = (key: FeatureKey, description: string) => {
    const existingIndex = values.features.findIndex((f) => f.icon === key);

    if (existingIndex >= 0) {
      handleFeatureChange(existingIndex, description);
    } else {
      set("features", [
        ...values.features,
        {
          id: crypto.randomUUID(),
          description,
          icon: key,
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Media Upload */}
      <PropertyMediaUpload
        onChange={(files) =>
          set(
            "imageUrls",
            files.map((f) =>
              typeof f === "string" ? f : (f?.url ?? null),
            ) as string[],
          )
        }
        onFilesChange={({ files }) => {
          filesRef.current.images = files;
          notifyFilesChange();
        }}
        initialImages={values.imageUrls}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Left — Form Fields */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              name="title"
              label="Title"
              value={values.title}
              onChange={(val) => set("title", val)}
              error={errors.title}
            />
            <Input
              name="salesPrice"
              label="Sales Price"
              type="number"
              value={values.salesPrice}
              onChange={(val) => set("salesPrice", val)}
              error={errors.salesPrice?.[0]}
            />
          </div>

          <Input
            name="location"
            label="Location"
            value={values.location}
            onChange={(val) => set("location", val)}
            error={errors.location?.[0]}
          />

          <Input
            type="textarea"
            name="description"
            label="Description"
            value={values.description}
            onChange={(val) => set("description", val)}
            error={errors.description?.[0]}
          />

          {/* Features */}
          <div className="flex flex-col gap-3 border border-border rounded-xl p-4">
            <label className="text-xl font-cambay font-bold text-muted">
              Features
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(
                Object.entries(FEATURE_ICONS) as [
                  FeatureKey,
                  React.ComponentType<any>,
                ][]
              ).map(([key, Icon]) => {
                const existingFeature = values.features.find(
                  (f) => f.icon === key,
                );

                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 border border-border rounded-lg px-3 py-2"
                  >
                    <Icon size={16} className="text-muted shrink-0" />
                    <input
                      type="text"
                      placeholder={
                        key.charAt(0).toUpperCase() +
                        key.slice(1).replace(/([A-Z])/g, " $1")
                      }
                      value={existingFeature?.description || ""}
                      onChange={(e) => addFeature(key, e.target.value)}
                      className="bg-transparent text-sm text-foreground placeholder:text-muted outline-none w-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Video */}
          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3 w-full">
            <div className="flex flex-col gap-3">
              <label className="text-xl font-cambay font-bold text-muted">
                Property Video
              </label>
              <PropertyVideoUpload
                onChange={(file) => {
                  // Store blob URL for preview only
                  set("videoUrl", file?.url ?? "");
                }}
                onFileChange={({ file }) => {
                  // Store the actual File object for upload
                  filesRef.current.video = file;
                  notifyFilesChange();
                }}
                initialVideo={values.videoUrl || null}
              />
            </div>
          </div>
        </div>

        {/* Right — Support Card */}
        <div className="flex flex-col gap-5 border border-border rounded-xl p-5 h-fit">
          <div className="flex justify-center">
            <div className="relative w-20 h-20">
              {values.saleSupportAvatar ? (
                <div className="relative w-full h-full group">
                  <Image
                    src={values.saleSupportAvatar}
                    alt="Support Agent"
                    width={80}
                    height={80}
                    className="rounded-full object-cover w-full h-full"
                  />
                  {/* Hover overlay for changing image */}
                  <label className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                    <span className="text-white text-xs font-medium">
                      Change
                    </span>
                    <input
                      type="file"
                      name="saleSupportAvatar"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          filesRef.current.avatar = file;
                          notifyFilesChange();
                          set("saleSupportAvatar", URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-xs text-gray-400 mt-1">Upload</span>
                    <input
                      type="file"
                      name="saleSupportAvatar"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          filesRef.current.avatar = file;
                          notifyFilesChange();
                          set("saleSupportAvatar", URL.createObjectURL(file));
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              name="supportInCharge"
              label="Support In-Charge"
              value={values.supportInCharge}
              onChange={(val) => set("supportInCharge", val)}
              error={errors.supportInCharge?.[0]}
            />
            <Input
              name="whatsAppNumber"
              label="WhatsApp Number"
              value={values.whatsAppNumber}
              onChange={(val) => set("whatsAppNumber", val)}
              error={errors.whatsAppNumber?.[0]}
            />
            <Input
              name="altNumber"
              label="Alternative Number"
              value={values.altNumber}
              onChange={(val) => set("altNumber", val)}
              error={errors.altNumber?.[0]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}