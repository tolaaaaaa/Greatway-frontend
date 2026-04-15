"use client";

import { Input } from "@/app/component/ui";
import { Bed, Bath, Car, Dock, Sofa, Trees } from "lucide-react";
import PropertyMediaUpload, {
  MediaFile,
  MediaUploadSlot,
  PropertyVideoUpload,
} from "../../_component/mediaUpload";

export type PropertyFormValues = {
  title: string;
  salesPrice: string;
  location: string;
  description: string;
  features: {
    bedrooms: string;
    bathrooms: string;
    garage: string;
    livingRoom: string;
    squareFeet: string;
    garden: string;
  };
  supportInCharge: string;
  whatsappLink: string;
  callContact: string;
  images: (MediaFile | string | null)[];
  video: MediaFile | string | null;
  supportImage: MediaFile | string | null;
};

type PropertyFormProps = {
  values: PropertyFormValues;
  onChange: (values: PropertyFormValues) => void;
};

export default function PropertyForm({ values, onChange }: PropertyFormProps) {
  const set = <K extends keyof PropertyFormValues>(
    key: K,
    value: PropertyFormValues[K],
  ) => onChange({ ...values, [key]: value });

  const setFeature = (
    key: keyof PropertyFormValues["features"],
    value: string,
  ) => set("features", { ...values.features, [key]: value });

  return (
    <div className="flex flex-col gap-8">
      {/* Media Upload */}
      <PropertyMediaUpload
        onChange={(files) => set("images", files)}
        initialImages={values.images.filter(
          (i): i is string => typeof i === "string",
        )}
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
            />
            <Input
              name="salesPrice"
              label="Sales Price"
              type="number"
              value={values.salesPrice}
              onChange={(val) => set("salesPrice", val)}
            />
          </div>

          <Input
            name="location"
            label="Location"
            value={values.location}
            onChange={(val) => set("location", val)}
          />

          <Input
            type="textarea"
            name="description"
            label="Description"
            value={values.description}
            onChange={(val) => set("description", val)}
          />

          {/* Features */}
          <div className="flex flex-col gap-3 border border-border rounded-xl p-4">
            <label className="text-xl font-cambay font-bold text-muted">
              Features
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { key: "bedrooms", icon: Bed, placeholder: "Bedrooms" },
                { key: "livingRoom", icon: Sofa, placeholder: "Living Room" },
                { key: "bathrooms", icon: Bath, placeholder: "Bathrooms" },
                { key: "garage", icon: Car, placeholder: "Garage" },
                { key: "squareFeet", icon: Dock, placeholder: "Square Feet" },
                { key: "garden", icon: Trees, placeholder: "Garden" },
              ].map(({ key, icon: Icon, placeholder }) => (
                <div
                  key={key}
                  className="flex items-center gap-2 border border-border rounded-lg px-3 py-2"
                >
                  <Icon size={16} className="text-muted shrink-0" />
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={
                      values.features[
                        key as keyof PropertyFormValues["features"]
                      ]
                    }
                    onChange={(e) =>
                      setFeature(
                        key as keyof PropertyFormValues["features"],
                        e.target.value,
                      )
                    }
                    className="bg-transparent text-sm text-foreground placeholder:text-muted outline-none w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Video */}
          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3 w-full">
            <div className="flex flex-col  gap-3">
              <label className="text-xl font-cambay font-bold text-muted">
                Property Video
              </label>
              <PropertyVideoUpload
                onChange={(file) => set("video", file)}
                initialVideo={
                  typeof values.video === "string" ? values.video : null
                }
              />
            </div>
          </div>
        </div>

        {/* Right — Support Card */}
        <div className="flex flex-col gap-5 border border-border rounded-xl p-5 h-fit">
          <div className="flex justify-center">
            <MediaUploadSlot
              accept="image"
              value={values.supportImage}
              onChange={(media) => set("supportImage", media)}
              className="w-20 h-20 rounded-full"
              label=""
            />
          </div>
          <div className="flex flex-col gap-4">
            <Input
              name="supportInCharge"
              label="Support In-Charge"
              value={values.supportInCharge}
              onChange={(val) => set("supportInCharge", val)}
            />
            <Input
              name="whatsappLink"
              label="WhatsApp Contact Link"
              value={values.whatsappLink}
              onChange={(val) => set("whatsappLink", val)}
            />
            <Input
              name="callContact"
              label="Call Contact Details"
              value={values.callContact}
              onChange={(val) => set("callContact", val)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
