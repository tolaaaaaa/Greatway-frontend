"use client";

import { useState } from "react";
import { PropertiesDetailsProps } from "../[id]/_component/propertiesDetails";
import PropertyForm, { PropertyFormValues } from "./propertyForm";
import PropertyDetailsHeader from "../[id]/_component/PropertyDetailsHeader";

type PropertyFormContainerProps = {
  mode: "create" | "edit";
  property?: PropertiesDetailsProps;
  onSave?: (values: PropertyFormValues) => Promise<void> | void;
};

export default function PropertyFormContainer({
  mode,
  property,
  onSave,
}: PropertyFormContainerProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState<PropertyFormValues>({
    title: property?.title ?? "",
    salesPrice: "",
    location: property?.location ?? "",
    description: "",
    features: {
      bedrooms: "",
      bathrooms: "",
      garage: "",
      livingRoom: "",
      squareFeet: "",
      garden: "",
    },
    supportInCharge: "",
    whatsappLink: "",
    callContact: "",
    images: [],
    video: null,
    supportImage: null,
  });

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave?.(formValues);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <PropertyDetailsHeader
        mode={mode}
        property={property}
        onSave={handleSave}
        isSaving={isSaving}
        title={mode === "create" ? formValues.title || "New Property" : undefined}
      />
      <PropertyForm values={formValues} onChange={setFormValues} />
    </div>
  );
}