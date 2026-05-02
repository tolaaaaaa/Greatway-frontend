
import { Skeleton } from "@/app/component/ui";

export default function PropertiesDetailsSkeleton() {
  return (
    <main className="font-cambay space-y-10 animate-pulse">
      {/* Header with back button and breadcrumb */}
      <div className="items-center flex justify-between">
        <div className="flex gap-3 items-center justify-center">
          <Skeleton className="w-9 h-9 rounded-md" />
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      {/* Property Gallery Skeleton */}
      <div className="space-y-4">
        <Skeleton className="w-full h-[400px] rounded-lg" />
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-24 h-24 rounded-md" />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex w-full gap-5">
        {/* 65% Content Area */}
        <div className="w-[65%] space-y-6">
          {/* Title and Price */}
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <Skeleton className="h-10 w-96" />
              <Skeleton className="h-6 w-64" />
            </div>
            <Skeleton className="h-10 w-40" />
          </div>

          {/* Description Section */}
          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
            <Skeleton className="h-7 w-32" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          {/* Features Section */}
          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
            <Skeleton className="h-7 w-28" />
            <div className="grid grid-cols-4 gap-5 w-full">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Skeleton className="w-5 h-5 rounded" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
            <Skeleton className="h-7 w-36" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
          </div>
        </div>

        {/* 35% Sidebar */}
        <div className="w-[35%] space-y-4">
          {/* Agent Card Skeleton */}
          <div className="border border-surface-tertiary px-6 py-12 space-y-6 rounded-lg">
            <div className="flex flex-col justify-center items-center gap-2">
              <Skeleton className="w-[100px] h-[100px] rounded-full" />
              <div className="flex flex-col items-center gap-1">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Skeleton className="w-full h-10 rounded-md" />
              <Skeleton className="w-full h-10 rounded-md" />
            </div>
          </div>

          {/* Action Card Skeleton */}
          <div className="border border-surface-tertiary px-6 py-12 space-y-9 rounded-lg">
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-3/4 mx-auto" />
            </div>
            <div className="space-y-3">
              <Skeleton className="w-full h-12 rounded-md" />
              <Skeleton className="w-full h-12 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}