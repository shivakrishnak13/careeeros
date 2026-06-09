import AnalyticsContent from "@/components/analytics/analytics-content";
import AnalyticsSkeleton from "@/components/analytics/analytics-skeleton";
import { getAnalyticsData } from "@/features/analytics/actions";
import { Suspense } from "react";

export default async function AnalyticsPage() {
  const dataPromise = getAnalyticsData();

  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsContent dataPromise={dataPromise} />
    </Suspense>
  )
}