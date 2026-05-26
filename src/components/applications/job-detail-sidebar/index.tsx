import Link from "next/link";
import {
  MapPin,
  Briefcase,
  Monitor,
  Banknote,
  Calendar,
  CalendarClock,
  ExternalLink,
  Pencil,
} from "lucide-react";
import JobStatusBadge from "@/components/applications/job-status-badge";
import type { Job } from "@/features/applications/types";

type Props = {
  job: Job;
};

const jobTypeLabels: Record<string, string> = {
  FULL_TIME: "Full-time",
  PART_TIME: "Part-time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
};

const workModeLabels: Record<string, string> = {
  REMOTE: "Remote",
  HYBRID: "Hybrid",
  ONSITE: "On-site",
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground mt-0.5 break-words">{value}</p>
      </div>
    </div>
  );
}

export default function JobDetailSidebar({ job }: Props) {
  const salary =
    job.salaryMin || job.salaryMax
      ? `${job.salaryMin ?? ""}${job.salaryMin && job.salaryMax ? " – " : ""}${job.salaryMax ?? ""} ${job.currency ?? "LPA"}`
      : null;

  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="min-w-0">
            <h2
              className="text-base font-semibold text-foreground leading-snug"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {job.role}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
          </div>
          <JobStatusBadge status={job.status} />
        </div>

        <div className="flex gap-2">
          {job.jobUrl && (
            <a
              href={job.jobUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View job
            </a>
          )}
          <Link
            href={`/applications/${job.id}/edit`}
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-muted/80 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Link>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl px-5 py-1">
        {job.location && (
          <MetaRow icon={MapPin} label="Location" value={job.location} />
        )}
        {job.jobType && (
          <MetaRow icon={Briefcase} label="Job type" value={jobTypeLabels[job.jobType] ?? job.jobType} />
        )}
        {job.workMode && (
          <MetaRow icon={Monitor} label="Work mode" value={workModeLabels[job.workMode] ?? job.workMode} />
        )}
        {salary && (
          <MetaRow icon={Banknote} label="Salary" value={salary} />
        )}
        <MetaRow icon={Calendar} label="Applied on" value={formatDate(job.appliedAt)} />
        {job.deadlineAt && (
          <MetaRow icon={CalendarClock} label="Deadline" value={formatDate(job.deadlineAt)} />
        )}
      </div>
    </div>
  );
}