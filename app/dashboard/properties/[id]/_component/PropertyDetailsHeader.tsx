import { Button } from "@/app/component/ui";
import { PropertiesDetailsProps } from "./propertiesDetails";
import Link from "next/link";

type HeaderMode = "edit" | "create" | "view";

interface PropertyDetailsHeaderProps {
  property?: PropertiesDetailsProps;
  mode?: HeaderMode;
  onSave?: () => void;
  isSaving?: boolean;
  title?: string; // Custom title for create mode
}

export default function PropertyDetailsHeader({
  property,
  mode = "view",
  onSave,
  isSaving = false,
  title = "New Property",
}: PropertyDetailsHeaderProps) {
  const isUnlisted = property?.status === "unlisted";

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
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              className="px-15 py-6"
              onClick={onSave}
              isDisabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Edit mode - has save button
  if (mode === "edit") {
    return (
      <div className="bg-surface rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-[18px]">{property?.title}</h1>
            <p className="inline-flex gap-1 font-bold text-[18px]">
              <span className={isUnlisted ? "text-red-600" : "text-accent"}>
                {property?.status
                  ? property.status.charAt(0).toUpperCase() +
                    property.status.slice(1)
                  : ""}{" "}
                Property /
              </span>{" "}
              <span className="text-muted">{property?.location}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              className="px-15 py-6"
              onClick={onSave}
              isDisabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // View mode (default) - has edit and list/unlist buttons
  return (
    <div className="bg-surface rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-[18px]">{property?.title}</h1>
          <p className="inline-flex gap-1 font-bold text-[18px]">
            <span className={isUnlisted ? "text-red-600" : "text-accent"}>
              {property?.status
                ? property.status.charAt(0).toUpperCase() +
                  property.status.slice(1)
                : ""}{" "}
              Property /
            </span>{" "}
            <span className="text-muted">{property?.location}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link href={`/dashboard/properties/${property?.id}/edit`}>
            <Button variant="primary" size="lg" className="px-6 py-3">
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className={
              isUnlisted
                ? "border border-accent text-accent"
                : "border border-red-600 text-red-600"
            }
          >
            {isUnlisted ? "List Property" : "Unlist Property"}
          </Button>
        </div>
      </div>
    </div>
  );
}