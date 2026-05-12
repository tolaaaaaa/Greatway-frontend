import { Skeleton } from "@/app/component/ui";

const SKELETON_COUNT = 10;

export default function AdminSkeleton() {
  return (
    <div className="bg-surface p-5 space-y-4">
      <div className="grid grid-cols-5 gap-4 pb-3 border-b border-surface-tertiary">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
      {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
        <div key={i} className="grid grid-cols-5 gap-4 py-3 border-b border-surface-tertiary">
          {Array.from({ length: 5 }).map((_, j) => (
            <Skeleton key={j} className="h-4 w-full" />
          ))}
        </div>
      ))}
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