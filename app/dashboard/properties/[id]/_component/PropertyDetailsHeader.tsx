import { Button, Dialog } from "@/app/component/ui";
import Link from "next/link";
import { CreatePropertyFormValues } from "@/validations/property/create-property.validation";
import { useState } from "react";

type HeaderMode = "edit" | "create" | "view";

interface PropertyDetailsHeaderProps {
  property?: CreatePropertyFormValues & {
    id?: string;
    status?: "listed" | "unlisted" | "sold";
  };
  mode?: HeaderMode;
  onSave?: () => void;
  isSaving?: boolean;
  title?: string;
  onToggleListing?: () => void;
  isTogglingListing?: boolean;
  showToggleSuccess?: boolean;        // ✅ parent controls success dialog
  onToggleSuccessClose?: () => void;  // ✅ parent handles close/continue
}

export default function PropertyDetailsHeader({
  property,
  mode = "view",
  onSave,
  isSaving = false,
  title = "New Property",
  onToggleListing,
  isTogglingListing = false,
  showToggleSuccess = false,
  onToggleSuccessClose,
}: PropertyDetailsHeaderProps) {
  const isUnlisted = property?.status === "unlisted";
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = () => {
    setShowConfirm(false);
    onToggleListing?.(); // parent handles API + success
  };

  // Create mode
  if (mode === "create") {
    return (
      <div className="bg-surface rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[18px]">{title}</h1>
            <p className="inline-flex gap-1 font-bold text-[18px]">
              <span className="text-accent">New Property / </span>
              <span className="text-muted">Address</span>
            </p>
          </div>
          <Button variant="primary" size="lg" className="px-15 py-6" onClick={onSave} isDisabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    );
  }

  // Edit mode
  if (mode === "edit") {
    return (
      <div className="bg-surface rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[18px]">{property?.title}</h1>
            <p className="inline-flex gap-1 font-bold text-[18px]">
              <span className={isUnlisted ? "text-red-600" : "text-accent"}>
                {property?.status
                  ? property.status.charAt(0).toUpperCase() + property.status.slice(1)
                  : ""}{" "}
                Property /
              </span>{" "}
              <span className="text-muted">{property?.location}</span>
            </p>
          </div>
          <Button variant="primary" size="lg" className="px-15 py-6" onClick={onSave} isDisabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    );
  }

  // View mode
  return (
    <>
      <div className="bg-surface rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[18px]">{property?.title}</h1>
            <p className="inline-flex gap-1 font-bold text-[18px]">
              <span className={isUnlisted ? "text-red-600" : "text-accent"}>
                {property?.status
                  ? property.status.charAt(0).toUpperCase() + property.status.slice(1)
                  : ""}{" "}
                Property /
              </span>{" "}
              <span className="text-muted">{property?.location}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Link href={`/dashboard/properties/${property?.id}/edit`}>
              <Button variant="primary" size="lg" className="px-6 py-3">Edit</Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className={isUnlisted ? "border border-accent text-accent" : "border border-red-600 text-red-600"}
              onClick={() => setShowConfirm(true)}
            >
              {isUnlisted ? "List Property" : "Unlist Property"}
            </Button>
          </div>
        </div>
      </div>

      {/* Confirm */}
      <Dialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirm}
        isLoading={isTogglingListing}
        mode="confirm"
        title={isUnlisted ? "Are you sure you want to list this property?" : "Are you sure you want to unlist this property?"}
        confirmLabel="Yes"
        cancelLabel="No"
        variant={isUnlisted ? "info" : "warning"}
      />

      {/* Success — fully controlled by parent */}
      <Dialog
        isOpen={showToggleSuccess}
        onClose={onToggleSuccessClose ?? (() => {})}
        onConfirm={() => {}}
        mode="success"
        title={isUnlisted ? "Property Listed Successfully!" : "Property Unlisted Successfully!"}
        description={
          isUnlisted
            ? "This property is now visible to the public."
            : "This property has been unlisted and is no longer visible to the public."
        }
        onContinue={onToggleSuccessClose}
      />
    </>
  );
}