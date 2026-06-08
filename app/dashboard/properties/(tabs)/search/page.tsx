import { Suspense } from "react";
import { getProperties } from "@/actions/property.action";
import { redirect } from "next/navigation";
import PropertyGrid from "../../_component/propertyGrid";
import PropertyGridSkeleton from "../../_component/propertyGridSkeleton";

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>;
}

async function SearchResults({ query, page }: { query: string; page: number }) {
  const properties = await getProperties({
    search: query,
    page,
    limit: 10,
  });

  return <PropertyGrid status="listed" data={properties} />;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;

  if (!q?.trim()) redirect("/dashboard/properties/listed");

  const currentPage = page ? Number(page) : 1;

  return (
    <div>
      <p className="text-muted text-sm mb-4">
        Showing results for <span className="text-foreground font-semibold">"{q}"</span>
      </p>
      <Suspense key={`${q}-${currentPage}`} fallback={<PropertyGridSkeleton />}>
        <SearchResults query={q} page={currentPage} />
      </Suspense>
    </div>
  );
}