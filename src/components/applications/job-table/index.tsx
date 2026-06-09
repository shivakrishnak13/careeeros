import DeleteJobButton from "@/components/applications/delete-job-button";
import JobStatusBadge from "@/components/applications/job-status-badge";
import type { JobSummary } from "@/features/applications/types";
import { AlertCircle, Building2, ExternalLink, MapPin, Pencil, X } from "lucide-react";
import Link from "next/link";
import { useOptimistic, useState } from "react";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function formatSalary(min: number | null, max: number | null, currency: string | null) {
  if (!min && !max) return null;
  const c = currency ?? "LPA";
  if (min && max) return `${min}–${max} ${c}`;
  return `${min ?? max} ${c}`;
}

type JobTableProps = {
  jobs: (JobSummary & { currency?: string | null, jobUrl?: string | null })[];
};

export default function JobTable({ jobs }: JobTableProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [optimisticJobs, removeOptimisticJob] = useOptimistic(jobs, (current, idToRemove) =>
    current.filter(j => j.id !== idToRemove)
  );


  if (jobs.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl flex flex-col items-center justify-center py-20 text-center px-6">
        <Building2 className="w-10 h-10 text-muted-foreground/30 mb-3" />
        <p className="text-sm font-medium text-foreground">No applications found</p>
        <p className="text-xs text-muted-foreground mt-1">Try a different filter or add your first application</p>
        <Link
          href="/applications/new"
          className="mt-4 text-xs bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors font-medium"
        >
          + Add application
        </Link>
      </div>
    );
  }

  return (
    <>
      {deleteError && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {deleteError}
          <button onClick={() => setDeleteError(null)} className="ml-auto">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Role & Company</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">Location</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">Salary</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden sm:table-cell">Applied</th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {optimisticJobs.map((job) => (
                <tr key={job.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <Link
                        href={`/applications/${job.id}`}
                        className="font-medium text-foreground group-hover:text-brand-600 transition-colors truncate max-w-[200px]"
                      >
                        {job.role}
                      </Link>
                      <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Building2 className="w-3 h-3" /> {job.company}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <JobStatusBadge status={job.status} />
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {job.location ? (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {job.location}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-xs text-muted-foreground">
                      {formatSalary(job.salaryMin, job.salaryMax, null) ?? "—"}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-xs text-muted-foreground">{formatDate(job.appliedAt)}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {job.jobUrl && (
                        <a
                          href={job.jobUrl as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md text-muted-foreground hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          aria-label="Open job URL"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <Link
                        href={`/applications/${job.id}/edit`}
                        className="p-1.5 rounded-md text-muted-foreground hover:text-brand-600 hover:bg-brand-50 transition-colors"
                        aria-label="Edit application"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteJobButton id={job.id} company={job.company} role={job.role} onDelete={() => removeOptimisticJob(job.id)} setDeleteError={setDeleteError} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}