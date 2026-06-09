"use client";

import { useOptimistic, useState, useTransition } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ExternalLink,
  Pencil,
  Trash2,
  Video,
  CalendarX,
  Building2,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import InterviewForm from "@/components/interviews/interview-form";
import { deleteInterview } from "@/features/interviews/actions";
import { formatDateTime } from "@/utils";
import { Interview } from "@/features/interviews/types";

type Props = {
  interviews: Interview[];
};

const roundLabels: Record<string, string> = {
  HR_SCREENING: "HR Screening",
  TECHNICAL: "Technical",
  ASSIGNMENT: "Assignment",
  MANAGERIAL: "Managerial",
  FINAL: "Final Round",
  OTHER: "Interview",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  SCHEDULED: { label: "Scheduled", className: "bg-sky-100 text-sky-700 border-sky-200" },
  COMPLETED: { label: "Completed", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  CANCELLED: { label: "Cancelled", className: "bg-red-100 text-red-600 border-red-200" },
  RESCHEDULED: { label: "Rescheduled", className: "bg-amber-100 text-amber-700 border-amber-200" },
};

export default function InterviewTable({ interviews }: Props) {
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);
  const [deletingInterview, setDeletingInterview] = useState<Interview | null>(null);
  const [isPending, startTransition] = useTransition();
  const [optimisticInterviews, removeOptimisticInterview] = useOptimistic(interviews, (current, idToRemove) => current.filter(interview => interview.id !== idToRemove));
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = () => {
    if (!deletingInterview) return;
    startTransition(async () => {
      removeOptimisticInterview(deletingInterview.id)
      try {
        await deleteInterview(deletingInterview.id, deletingInterview.jobId);
      } catch (err) {
        setDeleteError("Failed to delete interview. Please try again.");
      }
    });
    setDeletingInterview(null);
  };

  if (interviews.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl flex flex-col items-center justify-center py-20 text-center px-6">
        <CalendarX className="w-10 h-10 text-muted-foreground/30 mb-3" />
        <p className="text-sm font-medium text-foreground">No interviews found</p>
        <p className="text-xs text-muted-foreground mt-1">
          Try a different filter or add your first interview
        </p>
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
                <th className="text-left px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Application
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Round
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden md:table-cell">
                  Scheduled
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                  Platform
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide hidden lg:table-cell">
                  Result
                </th>
                <th className="text-right px-5 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {optimisticInterviews.map((interview) => {
                const statusCfg = statusConfig[interview.status] ?? {
                  label: interview.status,
                  className: "bg-gray-100 text-gray-600 border-gray-200",
                };

                return (
                  <tr key={interview.id} className="hover:bg-muted/30 transition-colors group">
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <Link
                          href={`/applications/${interview.jobId}`}
                          className="font-medium text-foreground group-hover:text-brand-600 transition-colors truncate max-w-[180px]"
                        >
                          {interview.job.role}
                        </Link>
                        <span className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {interview.job.company}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="text-xs font-medium text-foreground">
                        {roundLabels[interview.round] ?? interview.round}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${statusCfg.className}`}
                      >
                        {statusCfg.label}
                      </span>
                    </td>

                    <td className="px-4 py-4 hidden md:table-cell">
                      {interview.scheduledAt ? (
                        <div className="flex flex-col gap-0.5">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 flex-shrink-0" />
                            {formatDateTime(interview.scheduledAt)}
                          </span>
                          {interview.duration && (
                            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              {interview.duration} min
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/40">—</span>
                      )}
                    </td>

                    <td className="px-4 py-4 hidden lg:table-cell">
                      {interview.platform ? (
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Video className="w-3 h-3 flex-shrink-0" />
                          {interview.platform}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground/40">—</span>
                      )}
                    </td>

                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-xs text-muted-foreground">
                        {interview.result ?? "—"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {interview.meetingUrl && (
                          <a
                            href={interview.meetingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-md text-muted-foreground hover:text-brand-600 hover:bg-brand-50 transition-colors"
                            aria-label="Join meeting"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => setEditingInterview(interview)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-brand-600 hover:bg-brand-50 transition-colors"
                          aria-label="Edit interview"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingInterview(interview)}
                          className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors"
                          aria-label="Delete interview"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!editingInterview} onOpenChange={(o) => !o && setEditingInterview(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
              Edit interview round
            </DialogTitle>
          </DialogHeader>
          {editingInterview && (
            <InterviewForm
              jobId={editingInterview.jobId}
              interview={editingInterview}
              onSuccess={() => setEditingInterview(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletingInterview} onOpenChange={(o) => !o && setDeletingInterview(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete interview?</DialogTitle>
            <DialogDescription>
              This will remove the{" "}
              <span className="font-medium text-foreground">
                {roundLabels[deletingInterview?.round ?? ""] ?? "interview"}
              </span>{" "}
              round for{" "}
              <span className="font-medium text-foreground">
                {deletingInterview?.job.company}
              </span>. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setDeletingInterview(null)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}