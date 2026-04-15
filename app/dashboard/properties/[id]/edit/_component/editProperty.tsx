"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import { BreadcrumbItemType, Breadcrumbs } from "@/app/component/ui";
import PageTitle from "@/app/dashboard/_component/pageTitle";
import PropertyDetailsHeader from "../../_component/PropertyDetailsHeader";
import { PropertiesDetailsProps, salesProps } from "../../_component/propertiesDetails";
import PropertyForm, { PropertyFormValues } from "../../../_component/propertyForm";


type EditPropertyProps = {
  property: PropertiesDetailsProps & { sales: salesProps };
};

export default function EditProperty({ property }: EditPropertyProps) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [formValues, setFormValues] = useState<PropertyFormValues>({
    title: property.title ?? "",
    salesPrice: String(property.price ?? ""),
    location: property.location ?? "",
    description: property.description ?? "",
    features: {
      bedrooms: property.features?.find((f) => f.item.toLowerCase().includes("bedroom"))?.item.split(" ")[0] ?? "",
      bathrooms: property.features?.find((f) => f.item.toLowerCase().includes("bathroom"))?.item.split(" ")[0] ?? "",
      garage: property.features?.some((f) => f.item.toLowerCase().includes("garage")) ? "Yes" : "",
      livingRoom: "",
      squareFeet: property.features?.find((f) => f.item.toLowerCase().includes("square"))?.item.split(" ")[0] ?? "",
      garden: "",
    },
    supportInCharge: property.sales?.title ?? "",
    whatsappLink: property.sales?.whatsappNumber ?? "",
    callContact: property.sales?.phoneNumber ?? "",
    images: property.url ?? [],           // string[] from property
  video: property.video ?? null,        // string from property
  supportImage: property.sales?.url ?? null,  // string from property
  });

  const handleSave = async () => {
    try {
      setIsSaving(true);
      // call your update API here
      console.log("Saving edits:", formValues);
    } finally {
      setIsSaving(false);
    }
  };

  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "Home", href: "/", icon: <Home size={16} /> },
    { label: "Properties", href: "/dashboard/properties" },
    { label: property.title, href: `/dashboard/properties/${property.id}` },
    { label: "Edit", href: `/dashboard/properties/${property.id}/edit`, isCurrent: true },
  ];

  return (
    <main className="font-cambay space-y-10">
      {/* Top Nav */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => router.back()}
            className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
          >
            <ArrowLeft className="w-6 h-6 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>
          <PageTitle title="Edit Property" />
        </div>
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      {/* Header with Save */}
      <PropertyDetailsHeader
        mode="edit"
        property={property}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Form */}
      <PropertyForm values={formValues} onChange={setFormValues} />
    </main>
  );
}