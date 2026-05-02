import { Skeleton } from "@/app/component/ui";

const SKELETON_COUNT = 5;

export default function CareerSkeleton() {
  return (
    <div className="bg-surface p-6 space-y-4">
      {/* Table header */}
      <div className="grid grid-cols-6 gap-4 pb-3 border-b border-surface-tertiary">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 py-3 border-b border-surface-tertiary">
          {Array.from({ length: 6 }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <Skeleton className="h-7 w-7 rounded" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-8 rounded" />
        ))}
        <Skeleton className="h-7 w-7 rounded" />
      </div>
    </div>
  );
}