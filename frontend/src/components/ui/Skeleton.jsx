import { cn } from "../../utils/cn";

export default function Skeleton({ className }) {
  return <div className={cn("skeleton rounded-lg", className)} />;
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-bg-border bg-bg-card p-5">
      <Skeleton className="mb-3 h-4 w-1/3" />
      <Skeleton className="mb-2 h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
