import SkeletonBox from "./skeletonBox";

export function ActivityRowSkeleton() {
  return (
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <SkeletonBox className="h-4 w-64" />
        <SkeletonBox className="h-3 w-32" />
      </div>
      <SkeletonBox className="h-8 w-24" />
    </div>
  );
}