import { Suspense } from "react";
import { getProperties } from "@/actions/property.action";
import PropertyGrid from "../../_component/propertyGrid";
import PropertyGridSkeleton from "../../_component/propertyGridSkeleton";

interface ListedPageProps {
  searchParams: Promise<{ page?: string }>;
}

async function ListedProperties({ page }: { page: number }) {
  const properties = await getProperties({
    status: "listed",
    page,
    limit: 10,
  });

  return <PropertyGrid status="listed" data={properties} />;
}

export default async function ListedPage({ searchParams }: ListedPageProps) {
  const { page } = await searchParams;
  const currentPage = page ? Number(page) : 1;

  return (
    <Suspense key={currentPage} fallback={<PropertyGridSkeleton />}>
      <ListedProperties page={currentPage} />
    </Suspense>
  );
}