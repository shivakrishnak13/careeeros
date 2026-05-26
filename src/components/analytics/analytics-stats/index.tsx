import { BriefcaseBusiness, TrendingUp, Trophy, Zap } from "lucide-react";

type Props = {
  totalApplications: number;
  activeApplications: number;
  offerRate: number;
  responseRate: number;
};

export default function AnalyticsStats({
  totalApplications,
  activeApplications,
  offerRate,
  responseRate,
}: Props) {
  const replyCount = Math.round((responseRate / 100) * totalApplications);

  const cards = [
    {
      label: "Total applications",
      value: totalApplications,
      sub: "tracked across your search",
      icon: BriefcaseBusiness,
      iconBg: "bg-brand-100",
      iconColor: "text-brand-600",
    },
    {
      label: "Active pipeline",
      value: activeApplications,
      sub:
        totalApplications > 0
          ? `${Math.round((activeApplications / totalApplications) * 100)}% still in play`
          : "applied + interviews + offers",
      icon: Zap,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      label: "Response rate",
      value: `${responseRate}%`,
      sub: `${replyCount} applications received a response`,
      icon: TrendingUp,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      label: "Offer rate",
      value: `${offerRate}%`,
      sub: "applications that led to an offer",
      icon: Trophy,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {card.label}
            </span>
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.iconBg}`}
            >
              <card.icon className={`h-4 w-4 ${card.iconColor}`} />
            </div>
          </div>
          <div>
            <p
              className="text-3xl font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {card.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
