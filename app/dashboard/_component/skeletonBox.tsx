import { Skeleton } from "@/app/component/ui";

export default function SkeletonBox({ className }: { className?: string }) {
  return <Skeleton className={className} />;
}