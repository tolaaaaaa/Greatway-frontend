import { ActionCardSkeleton } from "../../_component/actionCardSkeleton";
import { ActivityRowSkeleton } from "../../_component/activityRowSkeleton";
import PropertyCardSkeleton from "../../_component/propertyCardSekeleton";
import SkeletonBox from "../../_component/skeletonBox";
import SectionHeader from "../../_component/skeletonHeader";
import StatCardSkeleton from "../../_component/statCardSkeleton";
import SurfaceSection from "../../_component/sufaceSection";



export default function OverviewLoading() {
  return (
    <main className="font-cambay space-y-10">

      {/* Page header */}
      <div className="flex justify-between">
        <SkeletonBox className="h-8 w-48" />
        <SkeletonBox className="h-6 w-32" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <ActionCardSkeleton key={i} />
        ))}
      </div>

      {/* Recent properties */}
      <SurfaceSection>
        <SectionHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <PropertyCardSkeleton key={i} />
          ))}
        </div>
      </SurfaceSection>

      {/* Recent activity */}
      <SurfaceSection>
        <SectionHeader />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <ActivityRowSkeleton key={i} />
          ))}
        </div>
      </SurfaceSection>

    </main>
  );
}