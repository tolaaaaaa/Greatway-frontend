import SkeletonBox from "./skeletonBox";

export default function StatCardSkeleton() {
  return (
    <div className="flex bg-surface p-5 gap-15 flex-col rounded-lg">
      <SkeletonBox className="h-6 w-32" />
      <div className="flex justify-between items-center">
        <SkeletonBox className="h-8 w-16" />
        <SkeletonBox className="h-12 w-12 rounded-md" />
      </div>
    </div>
  );
}