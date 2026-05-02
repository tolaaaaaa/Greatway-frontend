"use client";

import { BreadcrumbItemType, Breadcrumbs, customToast } from "@/app/component/ui";
import PageTitle from "@/app/dashboard/_component/pageTitle";
import { ArrowLeft, Home } from "lucide-react";
import PropertyFormContainer from "../../../_component/propertyFormContainer";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { Property } from "@/types/property";
import { CreatePropertyFormValues } from "@/validations/property/create-property.validation";
import { UpdatePropertyFormState } from "@/validations/property/update-property.validation";
import { PropertyFiles } from "../../../_component/propertyForm";
import { updateProperty } from "@/actions/property.action";

type EditPropertyProps = {
  property: Property;
};

export default function EditProperty({ property }: EditPropertyProps) {
  const [isTransitioning, startTransition] = useTransition();

  const filesRef = useRef<PropertyFiles>({
    images: [null, null, null, null],
    video: null,
    avatar: null,
  });

  const initialValues: CreatePropertyFormValues = {
    title: property.title,
    salesPrice: String(property.salesPrice),
    location: property.location,
    description: property.description,
    supportInCharge: property.supportInCharge,
    whatsAppNumber: property.whatsAppNumber,
    altNumber: property.altNumber ?? "",
    imageUrls: property.imageUrls,
    videoUrl: property.videoUrl,
    saleSupportAvatar: property.saleSupportAvatar,
    features: property.features.map((f) => ({
      id: f.id,
      description: f.description,
      icon: f.icon as string,
    })),
  };

  const initialState: UpdatePropertyFormState = {
    errors: {},
    error: "",
    values: initialValues,
  };

  const updatePropertyWithId = updateProperty.bind(null, property.id);

  const [{ error, errors, values }, dispatch, isPending] = useActionState(
    updatePropertyWithId,
    initialState,
  );

  useEffect(() => {
    if (error) {
      customToast.error(error);
    }
  }, [error]);

  const handleSave = async (formValues: CreatePropertyFormValues) => {
    const formData = new FormData();

    formData.append("title", formValues.title);
    formData.append("salesPrice", String(formValues.salesPrice ?? ""));
    formData.append("location", formValues.location);
    formData.append("description", formValues.description);
    formData.append("supportInCharge", formValues.supportInCharge);
    formData.append("whatsAppNumber", formValues.whatsAppNumber);
    formData.append("altNumber", formValues.altNumber ?? "");
    formData.append("features", JSON.stringify(formValues.features));
    formData.append("imageUrls", JSON.stringify(formValues.imageUrls));
    formData.append("videoUrl", formValues.videoUrl ?? "");
    formData.append("saleSupportAvatar", formValues.saleSupportAvatar ?? "");

    // New image files
    filesRef.current.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    if (filesRef.current.video) {
      formData.append("video", filesRef.current.video);
    }

    if (filesRef.current.avatar) {
      formData.append("salesImage", filesRef.current.avatar);
    }

    startTransition(() => {
      dispatch(formData);
    });
  };

  const breadcrumbItems: BreadcrumbItemType[] = [
    { label: "Home", href: "/", icon: <Home size={16} /> },
    { label: "Properties", href: "/dashboard/properties" },
    { label: property.title, href: `/dashboard/properties/${property.id}` },
    { label: "Edit", href: `/dashboard/properties/${property.id}/edit`, isCurrent: true },
  ];

  return (
    <main className="font-cambay space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => window.history.back()}
            className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
          >
            <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>
          <PageTitle title="Edit Property" />
        </div>
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      <PropertyFormContainer
        mode="edit"
        error={error}
        errors={errors}
        initialValues={values} // ✅ use values from state so form repopulates on error
        onSave={handleSave}
        onFilesChange={(files) => {
          filesRef.current = files;
        }}
        isSaving={isPending || isTransitioning}
      />
    </main>
  );
}