"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewSchema, type InterviewFormInputValues, type InterviewFormValues } from "@/features/interviews/schemas";
import { createInterview, updateInterview } from "@/features/interviews/actions";

type Interview = {
  id: string;
  round: string;
  status: string;
  scheduledAt: Date | null;
  duration: number | null;
  interviewer: string | null;
  platform: string | null;
  meetingUrl: string | null;
  notes: string | null;
  feedback: string | null;
  result: string | null;
};

type Props = {
  jobId: string;
  interview?: Interview;
  onSuccess: () => void;
};

const roundOptions = [
  { value: "HR_SCREENING", label: "HR Screening" },
  { value: "TECHNICAL", label: "Technical" },
  { value: "ASSIGNMENT", label: "Assignment" },
  { value: "MANAGERIAL", label: "Managerial" },
  { value: "FINAL", label: "Final Round" },
  { value: "OTHER", label: "Other" },
];

const statusOptions = [
  { value: "SCHEDULED", label: "Scheduled" },
  { value: "COMPLETED", label: "Completed" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "RESCHEDULED", label: "Rescheduled" },
];

function toDatetimeLocal(date: Date | null) {
  if (!date) return "";
  const d = new Date(date);
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 16);
}

export default function InterviewForm({ jobId, interview, onSuccess }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!interview;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InterviewFormInputValues, undefined, InterviewFormValues>({
    resolver: zodResolver(InterviewSchema),
    defaultValues: {
      round: (interview?.round as InterviewFormValues["round"]) ?? "TECHNICAL",
      status: (interview?.status as InterviewFormValues["status"]) ?? "SCHEDULED",
      scheduledAt: toDatetimeLocal(interview?.scheduledAt ?? null),
      duration: interview?.duration ?? undefined,
      interviewer: interview?.interviewer ?? "",
      platform: interview?.platform ?? "",
      meetingUrl: interview?.meetingUrl ?? "",
      notes: interview?.notes ?? "",
      feedback: interview?.feedback ?? "",
      result: interview?.result ?? "",
    },
  });

  const onSubmit = (values: InterviewFormValues) => {
    startTransition(async () => {
      if (isEdit && interview) {
        await updateInterview(interview.id, jobId, values);
      } else {
        await createInterview(jobId, values);
      }
      onSuccess();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Round <span className="text-destructive">*</span></Label>
          <Select
            defaultValue={interview?.round ?? "TECHNICAL"}
            onValueChange={(v) => setValue("round", v as InterviewFormValues["round"])}
          >
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {roundOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Status</Label>
          <Select
            defaultValue={interview?.status ?? "SCHEDULED"}
            onValueChange={(v) => setValue("status", v as InterviewFormValues["status"])}
          >
            <SelectTrigger className="h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="scheduledAt">Date & Time</Label>
          <Input
            id="scheduledAt"
            type="datetime-local"
            {...register("scheduledAt")}
            className="h-10"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            placeholder="e.g. 60"
            {...register("duration")}
            className="h-10"
          />
          {errors.duration && <p className="text-xs text-destructive">{errors.duration.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="interviewer">Interviewer</Label>
          <Input
            id="interviewer"
            placeholder="e.g. Priya Sharma"
            {...register("interviewer")}
            className="h-10"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="platform">Platform</Label>
          <Input
            id="platform"
            placeholder="e.g. Zoom, Google Meet"
            {...register("platform")}
            className="h-10"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="meetingUrl">Meeting URL</Label>
        <Input
          id="meetingUrl"
          placeholder="https://meet.google.com/..."
          {...register("meetingUrl")}
          className="h-10"
        />
        {errors.meetingUrl && <p className="text-xs text-destructive">{errors.meetingUrl.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="notes">Preparation notes</Label>
        <Textarea
          id="notes"
          placeholder="Topics to prepare, questions to ask..."
          rows={3}
          {...register("notes")}
          className="resize-none"
        />
      </div>

      {isEdit && (
        <>
          <div className="space-y-1.5">
            <Label htmlFor="feedback">Feedback received</Label>
            <Textarea
              id="feedback"
              placeholder="What went well, what didn't..."
              rows={3}
              {...register("feedback")}
              className="resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="result">Result</Label>
            <Input
              id="result"
              placeholder="e.g. Passed, Rejected, Pending"
              {...register("result")}
              className="h-10"
            />
          </div>
        </>
      )}

      <div className="flex justify-end gap-3 pt-1">
        <Button type="button" variant="outline" onClick={onSuccess} className="h-9">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="h-9 bg-brand-600 hover:bg-brand-700 text-white"
        >
          {isPending && <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />}
          {isEdit ? "Save changes" : "Add interview"}
        </Button>
      </div>
    </form>
  );
}