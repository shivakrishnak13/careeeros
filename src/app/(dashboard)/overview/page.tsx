import OverviewContent from "@/components/dashboard/overview-content";
import OverviewSkeleton from "@/components/dashboard/overview-skeleton";
import { getOverviewStats } from "@/features/overview/actions";
import { Suspense } from "react";

export default async function OverviewPage() {
  const statsPromise = getOverviewStats();

  return (
    <Suspense fallback={<OverviewSkeleton />} >
      <OverviewContent statsPromise={statsPromise} />
    </Suspense>
  );
}