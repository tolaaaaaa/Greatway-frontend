import { Skeleton } from "@/app/component/ui";
import PropertyCardSkeleton from "../../_component/propertyCardSekeleton";



const SKELETON_COUNT = 10

export default function PropertyGridSkeleton() {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
 
      {/* Pagination placeholder — keeps layout stable, no shimmer needed */}
      <div className="flex flex-col items-center gap-10 pb-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-7 rounded" />
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8 rounded-[3.77px]" />
          ))}
          <Skeleton className="h-7 w-7 rounded" />
        </div>
        <Skeleton className="h-5 w-24" />
      </div>
    </div>
  );
}