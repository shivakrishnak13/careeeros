import { redirect } from "next/navigation";
import { getOverviewStats } from "@/features/overview/actions";
import StatsCards from "@/components/dashboard/stats-cards";
import RecentJobs from "@/components/dashboard/recent-jobs";
import UpcomingInterviews from "@/components/dashboard/upcoming-interviews";

export default async function OverviewPage() {
  const stats = await getOverviewStats();
  if (!stats) redirect("/login");

  return (
    <div className="space-y-6">
      <StatsCards
        total={stats.total}
        interviews={stats.interviews}
        offers={stats.offers}
        rejections={stats.rejections}
      />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RecentJobs jobs={stats.recentJobs} />
        </div>
        <div className="lg:col-span-2">
          <UpcomingInterviews interviews={stats.upcomingInterviews} />
        </div>
      </div>
    </div>
  );
}