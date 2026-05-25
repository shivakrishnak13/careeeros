import { BriefcaseBusiness, CalendarCheck, Trophy, XCircle } from "lucide-react";

type StatsCardsProps = {
  total: number;
  interviews: number;
  offers: number;
  rejections: number;
};

export default function StatsCards({ total, interviews, offers, rejections }: StatsCardsProps) {
  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;
  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const cards = [
    {
      label: "Total applied",
      value: total,
      sub: "applications tracked",
      icon: BriefcaseBusiness,
      iconBg: "bg-brand-100",
      iconColor: "text-brand-600",
    },
    {
      label: "Interviews",
      value: interviews,
      sub: `${interviewRate}% interview rate`,
      icon: CalendarCheck,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
    },
    {
      label: "Offers",
      value: offers,
      sub: `${offerRate}% offer rate`,
      icon: Trophy,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      label: "Rejections",
      value: rejections,
      sub: total > 0 ? `${Math.round((rejections / total) * 100)}% rejection rate` : "none yet",
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {card.label}
            </span>
            <div className={`w-8 h-8 rounded-lg ${card.iconBg} flex items-center justify-center`}>
              <card.icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {card.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}