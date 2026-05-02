import SkeletonBox from "./skeletonBox";

export default function SectionHeader() {
  return (
    <div className="flex justify-between items-center">
      <SkeletonBox className="h-7 w-48" />
      <SkeletonBox className="h-5 w-32" />
    </div>
  );
}