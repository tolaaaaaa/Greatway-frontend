"use client";

import {
  BreadcrumbItemType,
  Breadcrumbs,
  customToast,
} from "@/app/component/ui";
import PageTitle from "@/app/dashboard/_component/pageTitle";
import { ArrowLeft, Home } from "lucide-react";
import PropertyFormContainer from "../../_component/propertyFormContainer";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useTransition } from "react";
import { createProperty } from "@/actions/property.action";
import { CreatePropertyFormState } from "@/validations/property/create-property.validation";
import { PropertyFiles } from "../../_component/propertyForm";

const initialState: CreatePropertyFormState = {
  errors: {},
  error: "",
  values: {
    title: "",
    salesPrice: "",
    location: "",
    description: "",
    supportInCharge: "",
    whatsAppNumber: "",
    altNumber: "",
    imageUrls: [],
    videoUrl: "",
    features: [],
    saleSupportAvatar: "",
  },
};

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Add New Property", href: "/properties/new", isCurrent: true },
];

export default function AddProperty() {
  const [{ error, errors, values }, dispatch, isPending] = useActionState(
    createProperty,
    initialState,
  );
  const [isTransitioning, startTransition] = useTransition();
  const router = useRouter();

  // Holds the latest raw File objects from the form — updated on every change
  const filesRef = useRef<PropertyFiles>({
    images: [null, null, null, null],
    video: null,
    avatar: null,
  });

  useEffect(() => {
    if (error) {
      customToast.error(error);
    }
  }, [error]);

  const handleSubmit = async (formValues: typeof values) => {
    const formData = new FormData();

    // ── Scalar fields ────────────────────────────────────────────────────────
    formData.append("title", formValues.title);
    formData.append("salesPrice", String(formValues.salesPrice ?? ""));
    formData.append("location", formValues.location);
    formData.append("description", formValues.description);
    formData.append("supportInCharge", formValues.supportInCharge);
    formData.append("whatsAppNumber", formValues.whatsAppNumber);
    formData.append("altNumber", formValues.altNumber ?? "");
    formData.append("features", JSON.stringify(formValues.features));

    // ── Image files → matches { name: 'images', maxCount: 4 } ───────────────
    filesRef.current.images.forEach((file) => {
      if (file) formData.append("images", file);
    });

    // ── Video file → matches { name: 'video', maxCount: 1 } ─────────────────
    if (filesRef.current.video) {
      formData.append("video", filesRef.current.video);
    }

    // ── Avatar file → matches { name: 'salesImage', maxCount: 1 } ───────────
    if (filesRef.current.avatar) {
      formData.append("salesImage", filesRef.current.avatar);
    }

    startTransition(() => {
      dispatch(formData);
    });
  };

  return (
    <main className="font-cambay space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => router.back()}
            className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
          >
            <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>
          <PageTitle title="Add New Property" />
        </div>
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      <PropertyFormContainer
        mode="create"
        error={error}
        errors={errors}
        initialValues={initialState.values}
        onSave={handleSubmit}
        onFilesChange={(files) => {
          filesRef.current = files;
        }}
        isSaving={isPending || isTransitioning}
      />
    </main>
  );
}