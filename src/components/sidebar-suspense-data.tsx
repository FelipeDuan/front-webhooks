import { Skeleton, TextSkeleton } from "./ui/skeleton";

interface SidebarSuspenseDataProps {
  count?: number;
  animate?: boolean;
}

export function SidebarSuspenseData({
  count = 12,
  animate = true,
}: SidebarSuspenseDataProps) {
  return (
    <div>
      {Array.from({ length: count }).map((item) => (
        <div key={`${item}`} className="flex items-start gap-4 px-4 py-2.5">
          <Skeleton animate={animate} className="w-6 h-4.5" />

          <div className="flex w-full">
            <TextSkeleton animate={animate} lines={1} className="w-22" />

            <TextSkeleton animate={animate} lines={2} className="w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
