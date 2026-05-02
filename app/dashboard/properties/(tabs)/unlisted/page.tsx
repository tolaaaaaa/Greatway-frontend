import { Suspense } from "react";
import { getProperties } from "@/actions/property.action";
import PropertyGrid from "../../_component/propertyGrid";
import PropertyGridSkeleton from "../../_component/propertyGridSkeleton";

interface UnlistedPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function UnlistedProperties({ page }: { page: number }) {
  const properties = await getProperties({
    status: "unlisted",
    page,
    limit: 10,
  });

  return <PropertyGrid status="unlisted" data={properties} />;
}

export default async function UnlistedPage({ searchParams }: UnlistedPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <Suspense key={currentPage} fallback={<PropertyGridSkeleton />}>
      <UnlistedProperties page={currentPage} />
    </Suspense>
  );
}