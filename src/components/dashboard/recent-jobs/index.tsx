import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils";

type Job = {
  id: string;
  company: string;
  role: string;
  status: string;
  appliedAt: Date;
};

const statusConfig: Record<string, { label: string; className: string }> = {
  WISHLIST:  { label: "Wishlist",  className: "bg-amber-100 text-amber-700" },
  APPLIED:   { label: "Applied",   className: "bg-brand-100 text-brand-700" },
  INTERVIEW: { label: "Interview", className: "bg-sky-100 text-sky-700" },
  OFFER:     { label: "Offer",     className: "bg-emerald-100 text-emerald-700" },
  REJECTED:  { label: "Rejected",  className: "bg-red-100 text-red-600" },
  WITHDRAWN: { label: "Withdrawn", className: "bg-gray-100 text-gray-600" },
};

export default function RecentJobs({ jobs }: { jobs: Job[] }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Recent applications
        </h2>
        <Link
          href="/applications"
          className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium transition-colors"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center px-6">
          <p className="text-sm font-medium text-foreground">No applications yet</p>
          <p className="text-xs text-muted-foreground mt-1">Start tracking your job search</p>
          <Link
            href="/applications/new"
            className="mt-4 text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            + Add your first application
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {jobs.map((job) => {
            const status = statusConfig[job.status] ?? { label: job.status, className: "bg-gray-100 text-gray-600" };
            return (
              <Link
                key={job.id}
                href={`/applications/${job.id}`}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/40 transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-brand-600 transition-colors">
                    {job.role}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{job.company}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <span className={cn("text-xs font-medium px-2 py-0.5 rounded-full", status.className)}>
                    {status.label}
                  </span>
                  <span className="text-xs text-muted-foreground w-14 text-right">
                    {formatDate(job.appliedAt)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}