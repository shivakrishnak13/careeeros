"use client";

type StatusBreakdown = {
  status: string;
  count: number;
  percentage: number;
};

type Props = {
  data: StatusBreakdown[];
  total: number;
};

const FUNNEL_STEPS = [
  { status: "APPLIED", label: "Applied", color: "#6366f1" },
  { status: "INTERVIEW", label: "Got interview", color: "#0ea5e9" },
  { status: "OFFER", label: "Got offer", color: "#10b981" },
  { status: "REJECTED", label: "Rejected", color: "#ef4444" },
];

export default function ResponseRateChart({ data, total }: Props) {
  if (total === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        No data yet
      </div>
    );
  }

  const countByStatus = data.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = item.count;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {FUNNEL_STEPS.map((step) => {
        const count = countByStatus[step.status] ?? 0;
        const pct = total > 0 ? Math.round((count / total) * 100) : 0;

        return (
          <div key={step.status} className="space-y-2 rounded-xl bg-background/70 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {step.label}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {count}
                </span>
                <span className="w-8 text-right text-xs text-muted-foreground">
                  {pct}%
                </span>
              </div>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: step.color,
                  minWidth: count > 0 ? "8px" : "0",
                }}
              />
            </div>
          </div>
        );
      })}

      <div className="border-t border-border pt-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Wishlist / Withdrawn
          </span>
          <span className="text-sm font-medium text-foreground">
            {(countByStatus["WISHLIST"] ?? 0) +
              (countByStatus["WITHDRAWN"] ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
