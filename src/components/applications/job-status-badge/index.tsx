import { cn } from "@/lib/utils";
import type { JobStatus } from "@/features/applications/types";

const config: Record<JobStatus, { label: string; className: string }> = {
  WISHLIST:  { label: "Wishlist",  className: "bg-amber-100 text-amber-700 border-amber-200" },
  APPLIED:   { label: "Applied",   className: "bg-brand-100 text-brand-700 border-brand-200" },
  INTERVIEW: { label: "Interview", className: "bg-sky-100 text-sky-700 border-sky-200" },
  OFFER:     { label: "Offer",     className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  REJECTED:  { label: "Rejected",  className: "bg-red-100 text-red-600 border-red-200" },
  WITHDRAWN: { label: "Withdrawn", className: "bg-gray-100 text-gray-600 border-gray-200" },
};

export default function JobStatusBadge({ status }: { status: JobStatus }) {
  const { label, className } = config[status] ?? { label: status, className: "bg-gray-100 text-gray-600" };
  return (
    <span className={cn("inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border", className)}>
      {label}
    </span>
  );
}