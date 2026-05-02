"use client";

import { useState } from "react";
import PropertyForm, { PropertyFiles } from "./propertyForm";
import PropertyDetailsHeader from "../[id]/_component/PropertyDetailsHeader";
import { CreatePropertyFormValues } from "@/validations/property/create-property.validation";


type PropertyFormContainerProps = {
  mode: "create" | "edit";
  initialValues: CreatePropertyFormValues;
  error?: string;
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
  onSave?: (values: CreatePropertyFormValues) => Promise<void> | void;
  onFilesChange?: (files: PropertyFiles) => void;
  isSaving?: boolean;
};

export default function PropertyFormContainer({
  mode,
  initialValues,
  error,
  errors = {},
  onSave,
  onFilesChange,
  isSaving = false,
}: PropertyFormContainerProps) {
  const [formValues, setFormValues] = useState<CreatePropertyFormValues>(initialValues);

  const handleSave = async () => {
    await onSave?.(formValues);
  };

  return (
    <div className="space-y-6">
      <PropertyDetailsHeader
        mode={mode}
        property={formValues}
        onSave={handleSave}
        isSaving={isSaving}
        title={
          mode === "create" ? formValues.title || "New Property" : undefined
        }
      />
      <PropertyForm
        values={formValues}
        onChange={setFormValues}
        onFilesChange={onFilesChange}
        errors={errors}
      />
    </div>
  );
}