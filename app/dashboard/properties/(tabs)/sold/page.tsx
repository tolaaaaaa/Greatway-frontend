import { Suspense } from "react";
import { getProperties } from "@/actions/property.action";
import PropertyGrid from "../../_component/propertyGrid";
import PropertyGridSkeleton from "../../_component/propertyGridSkeleton";

interface SoldPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function SoldProperties({ page }: { page: number }) {
  const properties = await getProperties({
    status: "sold",
    page,
    limit: 10,
  });

  return <PropertyGrid status="sold" data={properties} />;
}

export default async function SoldPage({ searchParams }: SoldPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <Suspense key={currentPage} fallback={<PropertyGridSkeleton />}>
      <SoldProperties page={currentPage} />
    </Suspense>
  );
}