import { getProperties, getProperty } from "@/actions/property.action";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PropertyInfo from "./_component/propertyInfo";
import PropertyGallery from "@/app/dashboard/properties/[id]/_component/PropertyGallery";
import PropertySidebar from "./_component/salesInfo";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const [property, similarPropertiesData] = await Promise.all([
    getProperty(id),
    getProperties({ status: "listed", limit: 3 }),
  ]);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <p className="text-muted">
          The property you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  const similarProperties = similarPropertiesData.items.filter(
    (p) => p.id !== id,
  );

  return (
    <section className="">
      <div className="app-container py-10">
        <div className="flex flex-col gap-9.25">
          {/* Back navigation */}
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-white hover:text-[#06CD70] transition-colors w-fit"
            style={{ fontFamily: "Cambay, sans-serif" }}
          >
            <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
            <span className="font-bold text-3xl text-foreground ">
              Back to Properties
            </span>
          </Link>

          {/* Gallery */}
          <PropertyGallery property={property} />

          {/* Body: left info + right sidebar */}
          <div className="flex flex-row items-start gap-18.5">
            <PropertyInfo property={property} />
            <PropertySidebar
              property={property}
              similarProperties={similarProperties}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
