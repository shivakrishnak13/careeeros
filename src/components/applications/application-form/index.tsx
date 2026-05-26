"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createJob, updateJob } from "@/features/applications/actions";
import {
  JobSchema,
  type JobFormInputValues,
  type JobFormValues,
} from "@/features/applications/schemas";
import type { Job } from "@/features/applications/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

type Props = {
  job?: Job;
};

export default function ApplicationForm({ job }: Props) {
  const [isPending, startTransition] = useTransition();
  const isEdit = !!job;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<JobFormInputValues, undefined, JobFormValues>({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      company: job?.company ?? "",
      role: job?.role ?? "",
      status: job?.status ?? "APPLIED",
      jobType: job?.jobType ?? undefined,
      workMode: job?.workMode ?? undefined,
      location: job?.location ?? "",
      jobUrl: job?.jobUrl ?? "",
      description: job?.description ?? "",
      salaryMin: job?.salaryMin ?? undefined,
      salaryMax: job?.salaryMax ?? undefined,
      notes: job?.notes ?? "",
      appliedAt: job?.appliedAt
        ? new Date(job.appliedAt).toISOString().split("T")[0]
        : new Date().toISOString().split("T")[0],
      deadlineAt: job?.deadlineAt
        ? new Date(job.deadlineAt).toISOString().split("T")[0]
        : "",
    },
  });

  const onSubmit = (values: JobFormValues) => {
    startTransition(async () => {
      if (isEdit && job) {
        await updateJob(job.id, values);
      } else {
        await createJob(values);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Basic information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="company">Company <span className="text-destructive">*</span></Label>
            <Input id="company" placeholder="e.g. Google" {...register("company")} className="h-10" />
            {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="role">Role <span className="text-destructive">*</span></Label>
            <Input id="role" placeholder="e.g. Frontend Developer" {...register("role")} className="h-10" />
            {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label>Status</Label>
            <Select
              defaultValue={job?.status ?? "APPLIED"}
              onValueChange={(v) => setValue("status", v as JobFormValues["status"])}
            >
              <SelectTrigger className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="WISHLIST">Wishlist</SelectItem>
                <SelectItem value="APPLIED">Applied</SelectItem>
                <SelectItem value="INTERVIEW">Interview</SelectItem>
                <SelectItem value="OFFER">Offer</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="WITHDRAWN">Withdrawn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Job type</Label>
            <Select
              defaultValue={job?.jobType ?? undefined}
              onValueChange={(v) => setValue("jobType", v as JobFormValues["jobType"])}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FULL_TIME">Full time</SelectItem>
                <SelectItem value="PART_TIME">Part time</SelectItem>
                <SelectItem value="CONTRACT">Contract</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Work mode</Label>
            <Select
              defaultValue={job?.workMode ?? undefined}
              onValueChange={(v) => setValue("workMode", v as JobFormValues["workMode"])}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REMOTE">Remote</SelectItem>
                <SelectItem value="HYBRID">Hybrid</SelectItem>
                <SelectItem value="ONSITE">On-site</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="location">Location</Label>
            <Input id="location" placeholder="e.g. Hyderabad, India" {...register("location")} className="h-10" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="jobUrl">Job URL</Label>
            <Input id="jobUrl" placeholder="https://..." {...register("jobUrl")} className="h-10" />
            {errors.jobUrl && <p className="text-xs text-destructive">{errors.jobUrl.message}</p>}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Compensation & dates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="salaryMin">Min salary (LPA)</Label>
            <Input id="salaryMin" type="number" placeholder="e.g. 8" {...register("salaryMin")} className="h-10" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="salaryMax">Max salary (LPA)</Label>
            <Input id="salaryMax" type="number" placeholder="e.g. 12" {...register("salaryMax")} className="h-10" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="appliedAt">Applied date <span className="text-destructive">*</span></Label>
            <Input id="appliedAt" type="date" {...register("appliedAt")} className="h-10" />
            {errors.appliedAt && <p className="text-xs text-destructive">{errors.appliedAt.message}</p>}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="deadlineAt">Application deadline</Label>
            <Input id="deadlineAt" type="date" {...register("deadlineAt")} className="h-10" />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-5">
        <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Details & notes
        </h2>

        <div className="space-y-1.5">
          <Label htmlFor="description">Job description</Label>
          <Textarea
            id="description"
            placeholder="Paste the job description here — used by AI features for matching and interview prep"
            rows={5}
            {...register("description")}
            className="resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="notes">Your notes</Label>
          <Textarea
            id="notes"
            placeholder="Recruiter name, interview feedback, things to follow up on..."
            rows={3}
            {...register("notes")}
            className="resize-none"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pb-6">
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-brand-600 hover:bg-brand-700 text-white px-6"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {isEdit ? "Saving..." : "Creating..."}
            </span>
          ) : isEdit ? "Save changes" : "Add application"}
        </Button>
      </div>
    </form>
  );
}
