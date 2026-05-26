import { getAnalyticsData } from "@/features/analytics/actions";
import AnalyticsStats from "@/components/analytics/analytics-stats";
import StatusDonutChart from "@/components/analytics/status-donut-chart";
import WeeklyActivityChart from "@/components/analytics/weekly-activity-chart";
import ResponseRateChart from "@/components/analytics/response-rate-chart";
import TopCompanies from "@/components/analytics/top-companies";

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();

  if (!data) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
        Something went wrong loading analytics.
      </div>
    );
  }

  if (data.totalApplications === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-4">
          <span className="text-2xl">📊</span>
        </div>
        <p
          className="text-sm font-medium text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          No data to analyse yet
        </p>
        <p className="text-xs text-muted-foreground mt-1 max-w-xs">
          Start tracking job applications and your analytics will appear here automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <AnalyticsStats
        totalApplications={data.totalApplications}
        activeApplications={data.activeApplications}
        offerRate={data.offerRate}
        responseRate={data.responseRate}
      />

      <div className="bg-card border border-border rounded-xl p-6">
        <h3
          className="text-sm font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Weekly activity
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 mb-6">
          Applications submitted per week — last 12 weeks
        </p>
        <WeeklyActivityChart data={data.weeklyActivity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Status breakdown
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-6">
            Where your applications stand
          </p>
          <StatusDonutChart data={data.statusBreakdown} />
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Application funnel
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-6">
            How far your applications are progressing
          </p>
          <ResponseRateChart data={data.statusBreakdown} total={data.totalApplications} />
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Top companies
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-6">
            Companies you&apos;ve applied to most
          </p>
          <TopCompanies data={data.topCompanies} total={data.totalApplications} />
        </div>
      </div>

    </div>
  );
}