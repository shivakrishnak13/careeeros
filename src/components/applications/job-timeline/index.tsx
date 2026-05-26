import { CheckCircle2, Circle } from "lucide-react";

type Props = {
  currentStatus: string;
};

const steps = [
  { key: "WISHLIST", label: "Wishlist" },
  { key: "APPLIED", label: "Applied" },
  { key: "INTERVIEW", label: "Interview" },
  { key: "OFFER", label: "Offer" },
];

const statusOrder: Record<string, number> = {
  WISHLIST: 0,
  APPLIED: 1,
  INTERVIEW: 2,
  OFFER: 3,
};

export default function JobTimeline({ currentStatus }: Props) {
  const isTerminal = currentStatus === "REJECTED" || currentStatus === "WITHDRAWN";
  const currentIndex = statusOrder[currentStatus] ?? 1;

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3
        className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Application progress
      </h3>

      {isTerminal ? (
        <div className="flex items-center gap-3 py-1">
          <div className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <Circle className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {currentStatus === "REJECTED" ? "Application rejected" : "Application withdrawn"}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {currentStatus === "REJECTED"
                ? "Better luck next time — keep applying!"
                : "You withdrew from this application"}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-0">
          {steps.map((step, index) => {
            const done = index < currentIndex;
            const active = index === currentIndex;
            const upcoming = index > currentIndex;

            return (
              <div key={step.key} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${done
                        ? "bg-brand-600"
                        : active
                          ? "bg-brand-600 ring-4 ring-brand-100"
                          : "bg-muted"
                      }`}
                  >
                    {done ? (
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    ) : (
                      <Circle
                        className={`w-3.5 h-3.5 ${active ? "text-white" : "text-muted-foreground/40"}`}
                      />
                    )}
                  </div>
                  <span
                    className={`text-[10px] font-medium mt-1.5 whitespace-nowrap ${done || active ? "text-foreground" : "text-muted-foreground/50"
                      }`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-1 mb-4 rounded-full transition-colors ${index < currentIndex ? "bg-brand-600" : "bg-muted"
                      }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}