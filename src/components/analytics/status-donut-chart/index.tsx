"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

type StatusBreakdown = {
  status: string;
  count: number;
  percentage: number;
};

type Props = {
  data: StatusBreakdown[];
};

const STATUS_COLORS: Record<string, string> = {
  WISHLIST: "#f59e0b",
  APPLIED: "#6366f1",
  INTERVIEW: "#0ea5e9",
  OFFER: "#10b981",
  REJECTED: "#ef4444",
  WITHDRAWN: "#6b7280",
};

const STATUS_LABELS: Record<string, string> = {
  WISHLIST: "Wishlist",
  APPLIED: "Applied",
  INTERVIEW: "Interview",
  OFFER: "Offer",
  REJECTED: "Rejected",
  WITHDRAWN: "Withdrawn",
};

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: StatusBreakdown }[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-sm text-xs">
      <p className="font-medium text-foreground">{STATUS_LABELS[item.name] ?? item.name}</p>
      <p className="text-muted-foreground mt-0.5">
        {item.value} applications · {item.payload.percentage}%
      </p>
    </div>
  );
}

export default function StatusDonutChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-sm text-muted-foreground">
        No data yet
      </div>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    name: d.status,
    value: d.count,
  }));

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={100}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {chartData.map((entry) => (
              <Cell key={entry.status} fill={STATUS_COLORS[entry.status] ?? "#6366f1"} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="space-y-2">
        {data.map((item) => (
          <div key={item.status} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: STATUS_COLORS[item.status] ?? "#6366f1" }}
              />
              <span className="text-xs text-muted-foreground">
                {STATUS_LABELS[item.status] ?? item.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-foreground">{item.count}</span>
              <span className="text-xs text-muted-foreground w-8 text-right">{item.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}