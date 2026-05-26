"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const rounds = [
  { label: "All", value: "ALL" },
  { label: "HR Screening", value: "HR_SCREENING" },
  { label: "Technical", value: "TECHNICAL" },
  { label: "Assignment", value: "ASSIGNMENT" },
  { label: "Managerial", value: "MANAGERIAL" },
  { label: "Final Round", value: "FINAL" },
  { label: "Other", value: "OTHER" },
];

const statuses = [
  { label: "All", value: "ALL" },
  { label: "Scheduled", value: "SCHEDULED" },
  { label: "Completed", value: "COMPLETED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Rescheduled", value: "RESCHEDULED" },
];

export default function InterviewFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentRound = searchParams.get("round") ?? "ALL";
  const currentStatus = searchParams.get("status") ?? "ALL";
  const currentSearch = searchParams.get("search") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value !== "ALL") {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search company or role..."
            defaultValue={currentSearch}
            onChange={(e) => updateParam("search", e.target.value)}
            className="pl-9 h-9 bg-card border-border"
          />
        </div>

        <div className="flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1 overflow-x-auto">
          {statuses.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => updateParam("status", value)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
                currentStatus === value
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1 w-fit overflow-x-auto">
        {rounds.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => updateParam("round", value)}
            className={cn(
              "px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
              currentRound === value
                ? "bg-card text-foreground shadow-sm border border-border"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}