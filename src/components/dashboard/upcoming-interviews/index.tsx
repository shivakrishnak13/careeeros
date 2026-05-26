import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDateTime } from "@/utils";

type Interview = {
  id: string;
  round: string;
  scheduledAt: Date | null;
  job: { company: string; role: string };
};

const roundLabels: Record<string, string> = {
  HR_SCREENING: "HR Screening",
  TECHNICAL:    "Technical",
  ASSIGNMENT:   "Assignment",
  MANAGERIAL:   "Managerial",
  FINAL:        "Final Round",
  OTHER:        "Interview",
};

export default function UpcomingInterviews({ interviews }: { interviews: Interview[] }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Upcoming interviews
        </h2>
        <Link
          href="/interviews"
          className="flex items-center gap-1 text-xs text-brand-600 hover:text-brand-700 font-medium transition-colors"
        >
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center px-6">
          <Calendar className="w-8 h-8 text-muted-foreground/40 mb-2" />
          <p className="text-sm font-medium text-foreground">No upcoming interviews</p>
          <p className="text-xs text-muted-foreground mt-1">Interviews will appear here once scheduled</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {interviews.map((interview) => (
            <div key={interview.id} className="px-5 py-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Calendar className="w-4 h-4 text-sky-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground truncate">{interview.job.company}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{interview.job.role}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs bg-sky-100 text-sky-700 font-medium px-2 py-0.5 rounded-full">
                    {roundLabels[interview.round] ?? interview.round}
                  </span>
                  {interview.scheduledAt && (
                    <span className="text-xs text-muted-foreground">
                      {formatDateTime(interview.scheduledAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}