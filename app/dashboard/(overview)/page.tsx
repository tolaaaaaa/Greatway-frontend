import { getAnalytics } from "@/actions/analytics.action";
import Overview from "./_component/overview";
import { getTrails } from "@/actions/trails.action";
import { getProperties } from "@/actions/property.action";
import { Suspense } from "react";
import OverviewLoading from "./_component/overviewLoading";
import { Trails } from "@/types/trails";
import { Property } from "@/types/property";

export const revalidate = 60;

async function getDashboardData() {
  const [analytics, trails, properties] = await Promise.all([
    getAnalytics(),
    getTrails({ limit: 7} as PaginationParams),
    getProperties({ limit: 3 })
  ]);
  
  return {
    analytics,
    trails: trails?.items || [],
    properties: properties?.items || []
  };
}

export default async function Page() {
  const dataPromise = getDashboardData();
  
  return (
    <Suspense fallback={<OverviewLoading />}>
      <OverviewDataFetcher dataPromise={dataPromise} />
    </Suspense>
  );
}

async function OverviewDataFetcher({ 
  dataPromise 
}: { 
  dataPromise: Promise<{
    analytics: Analytics | null;
    trails: Trails[];
    properties: Property[];
  }> 
}) {
  const { analytics, trails, properties } = await dataPromise;
  
  return <Overview analytics={analytics} trails={trails} properties={properties} />;
}