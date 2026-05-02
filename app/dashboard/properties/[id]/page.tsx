import { getProperty } from "@/actions/property.action";
import PropertiesDetails from "./_component/propertiesDetails";
import { Suspense } from "react";
import PropertiesDetailsSkeleton from "./_component/propertyDetailSkeleton";


export const revalidate = 60;


export async function generateStaticParams() {
  return [];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  
  return (
    <Suspense fallback={<PropertiesDetailsSkeleton />}>
      <PropertyDetailsContent id={id} />
    </Suspense>
  );
}

// Separate async component for better Suspense handling
async function PropertyDetailsContent({ id }: { id: string }) {
  const property = await getProperty(id);

  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100 gap-4">
        <h2 className="text-2xl font-bold">Property Not Found</h2>
        <p className="text-muted">The property you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return <PropertiesDetails property={property} />;
}