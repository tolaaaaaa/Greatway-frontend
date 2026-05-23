"use client";
import {
  BreadcrumbItemType,
  Breadcrumbs,
  Button,
  Dialog,
  customToast,
} from "@/app/component/ui";
import PageTitle from "@/app/dashboard/_component/pageTitle";
import { ArrowLeft, Home, MapPin } from "lucide-react";
import PropertyDetailsHeader from "./PropertyDetailsHeader";
import PropertyGallery from "./PropertyGallery";
import PropertyVideo from "./PropertyVideo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Property } from "@/types/property";
import { getFeatureDescription, getFeatureIcon } from "@/utils/helper";
import { useState } from "react";
import {
  deleteProperty,
  updatePropertyStatus,
} from "@/actions/property.action";
import { formatPrice } from "@/utils/formating";

type StatusAction = "sold" | "unlisted" | "listed" | null;

export default function PropertiesDetails({
  property,
}: {
  property: Property;
}) {
  const router = useRouter();

  const [pendingStatus, setPendingStatus] = useState<StatusAction>(null);
  const [isPending, setIsPending] = useState(false);
  const [successStatus, setSuccessStatus] = useState<StatusAction>(null);


  const handleStatusUpdate = async (status: NonNullable<StatusAction>) => {
    setIsPending(true);
    const result = await updatePropertyStatus(property.id, status);
    setIsPending(false);
    setPendingStatus(null);

    if (!result) {
      customToast.error("Failed to update property status. Please try again.");
      return;
    }

    setSuccessStatus(status);
  };

  const closeSuccess = (redirectTo?: string) => {
    setSuccessStatus(null);
    if (redirectTo) router.push(redirectTo);
    else router.refresh();
  };

  const isUnlisted = property.status === "unlisted";
  const toggleStatus: NonNullable<StatusAction> = isUnlisted
    ? "listed"
    : "unlisted";

  const [pendingDelete, setPendingDelete] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await deleteProperty(property.id);
    setIsDeleting(false);
    setPendingDelete(false);

    if (!result) {
      customToast.error("Failed to delete property. Please try again.");
      return;
    }

    setDeleteSuccess(true);
  };

  return (
    <>
      <main className="font-cambay space-y-10">
        <div className="items-center flex justify-between">
          <div className="flex gap-3 items-center justify-center">
            <button
              onClick={() => router.back()}
              className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
            >
              <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
            </button>
            <PageTitle title="Property Details" />
          </div>
          <div>
            <Breadcrumbs items={breadcrumbItems} separator="/" />
          </div>
        </div>

        <PropertyDetailsHeader
          property={property}
          onToggleListing={() => handleStatusUpdate(toggleStatus)}
          isTogglingListing={isPending}
          showToggleSuccess={
            successStatus === "listed" || successStatus === "unlisted"
          }
          onToggleSuccessClose={() => closeSuccess()}
        />

        <PropertyGallery property={property} />

        <div className="flex w-full gap-5">
          <div className="w-[65%] space-y-6">
            <div className="flex justify-between items-center">
              <div className="space-y-3">
                <h1 className="font-bold text-4xl">{property.title}</h1>
                <p className="text-muted font-normal inline-flex gap-3 text-[18px]">
                  <MapPin /> {property.location}
                </p>
              </div>
              <h3 className="font-bold text-accent text-4xl">
                {formatPrice(property.salesPrice)}
              </h3>
            </div>

            <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
              <h2 className="font-bold">Description</h2>
              <p className="text-muted font-normal">{property.description}</p>
            </div>

            <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
              <h2 className="font-bold">Features</h2>
              <div className="grid grid-cols-4 gap-5 w-full">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    {getFeatureIcon(feature.icon)}
                    <span className="text-muted font-normal">
                      {getFeatureDescription(feature.description, feature.icon)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
              <h3 className="font-bold">Property Video</h3>
              <PropertyVideo videoUrl={property.videoUrl} />
            </div>
          </div>

          <div className="w-[35%] space-y-4">
            <div className="border border-surface-tertiary px-6 py-12 space-y-6 rounded-lg">
              <div className="flex flex-col justify-center items-center gap-2">
                <Image
                  src={property.saleSupportAvatar}
                  alt={property.title}
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-25 h-25"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href={`https://wa.me/${property.whatsAppNumber.replace(/\D/g, "")}`}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full bg-white text-black p-5"
                  >
                    WhatsApp
                  </Button>
                </Link>
                <Link href={`tel:${property.altNumber}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-bold p-5"
                    style={{ backgroundColor: "#BEF5D8", color: "#06CD70" }}
                  >
                    Call {property.altNumber}
                  </Button>
                </Link>
              </div>
            </div>

            {/* ✅ Hidden when property is sold */}
            {property.status !== "sold" && (
              <div className="border border-surface-tertiary px-6 py-12 space-y-9 rounded-lg">
                <p className="text-center font-bold text-[18px]">
                  Old Property? Would you like to mark this property as sold?
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setPendingStatus("sold")}
                  >
                    Mark as Sold
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full border border-red-600 text-red-600"
                    onClick={() => setPendingDelete(true)}
                  >
                    Delete Property
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Confirm - Mark as Sold */}
      <Dialog
        isOpen={pendingStatus === "sold"}
        onClose={() => setPendingStatus(null)}
        onConfirm={() => handleStatusUpdate("sold")}
        isLoading={isPending}
        mode="confirm"
        title="Are you sure you want to mark this property as sold?"
        confirmLabel="Yes"
        cancelLabel="No"
      />

      {/* Success - Mark as Sold */}
      <Dialog
        isOpen={successStatus === "sold"}
        onClose={() => setSuccessStatus(null)}
        onConfirm={() => {}}
        mode="success"
        title="Property Marked as Sold!"
        description="This property has been marked as sold and is no longer visible to the public."
        onContinue={() => closeSuccess("/dashboard/properties")}
      />

      {/* Success - Listed (handled in header, but kept here as fallback) */}
      <Dialog
        isOpen={successStatus === "listed"}
        onClose={() => setSuccessStatus(null)}
        onConfirm={() => {}}
        mode="success"
        title="Property Listed Successfully!"
        description="This property is now visible to the public."
        onContinue={() => closeSuccess()}
      />

      {/* Success - Unlisted (handled in header, but kept here as fallback) */}
      <Dialog
        isOpen={successStatus === "unlisted"}
        onClose={() => setSuccessStatus(null)}
        onConfirm={() => {}}
        mode="success"
        title="Property Unlisted Successfully!"
        description="This property has been unlisted and is no longer visible to the public."
        onContinue={() => closeSuccess()}
      />

      {/* Delete - Confirm */}
      <Dialog
        isOpen={pendingDelete}
        onClose={() => setPendingDelete(false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        mode="confirm"
        title="Are you sure you want to delete this property?"
        description="This action cannot be undone."
        confirmLabel="Yes"
        cancelLabel="No"
        variant="danger"
      />

      {/* Delete - Success */}
      <Dialog
        isOpen={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
        onConfirm={() => {}}
        mode="success"
        title="Property Deleted Successfully!"
        description="This property has been permanently deleted."
        onContinue={() => {
          setDeleteSuccess(false);
          router.push("/dashboard/properties");
        }}
      />
    </>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Properties", href: "/dashboard/properties" },
  {
    label: "Property Details",
    href: "/dashboard/properties/[id]",
    isCurrent: true,
  },
];
