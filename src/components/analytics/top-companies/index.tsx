import { Building2 } from "lucide-react";

type TopCompany = {
  company: string;
  count: number;
};

type Props = {
  data: TopCompany[];
  total: number;
};

export default function TopCompanies({ data, total }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        No data yet
      </div>
    );
  }

  const max = data[0]?.count ?? 1;

  return (
    <div className="space-y-3.5">
      {data.map((item, index) => {
        const pct = Math.round((item.count / max) * 100);
        const totalPct = total > 0 ? Math.round((item.count / total) * 100) : 0;

        return (
          <div
            key={item.company}
            className="flex items-center gap-3 rounded-xl bg-background/70 p-3"
          >
            <span className="w-4 flex-shrink-0 text-right text-xs font-medium text-muted-foreground">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                  <Building2 className="h-3.5 w-3.5 flex-shrink-0 text-muted-foreground" />
                  {item.company}
                </span>
                <div className="ml-2 flex flex-shrink-0 items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {item.count}
                  </span>
                  <span className="w-7 text-right text-xs text-muted-foreground">
                    {totalPct}%
                  </span>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-brand-500 transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
