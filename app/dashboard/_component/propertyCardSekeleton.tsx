import SkeletonBox from "./skeletonBox";

export default function PropertyCardSkeleton() {
  return (
    <div className="bg-surface-secondary rounded-lg overflow-hidden">
      <SkeletonBox className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <SkeletonBox className="h-6 w-3/4" />
        <SkeletonBox className="h-4 w-1/2" />
        <SkeletonBox className="h-5 w-1/3" />
      </div>
    </div>
  );
}