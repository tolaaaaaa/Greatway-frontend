import SkeletonBox from "./skeletonBox";

export function ActionCardSkeleton() {
  return (
    <div className="flex bg-surface p-5 gap-7 flex-col rounded-lg justify-center items-center">
      <SkeletonBox className="h-12 w-12 rounded-md" />
      <SkeletonBox className="h-6 w-32" />
    </div>
  );
}