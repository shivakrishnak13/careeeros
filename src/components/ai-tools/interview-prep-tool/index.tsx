"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { generateInterviewPrep } from "@/features/ai-tools/actions";
import { InterviewPrepSchema } from "@/features/ai-tools/schemas";
import type { InterviewQA } from "@/features/ai-tools/types";
import type { JobSummary } from "@/features/applications/types";
import { Button } from "@/components/ui/button";

type Props = { jobs: JobSummary[] };
type InterviewPrepFormInputValues = z.input<typeof InterviewPrepSchema>;

const focusAreas = [
  { value: "mixed", label: "Mixed", description: "All types" },
  { value: "technical", label: "Technical", description: "Skills & code" },
  { value: "behavioural", label: "Behavioural", description: "STAR method" },
  { value: "general", label: "General", description: "Role fit" },
] as const;

export default function InterviewPrepTool({ jobs }: Props) {
  const [isPending, startTransition] = useTransition();
  const [questions, setQuestions] = useState<InterviewQA[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [mode, setMode] = useState<"select" | "manual">("select");

  const { register, handleSubmit, setValue, watch, formState: { errors } } =
    useForm<InterviewPrepFormInputValues>({
      resolver: zodResolver(InterviewPrepSchema),
      defaultValues: { focusArea: "mixed" },
    });

  const selectedFocus = watch("focusArea");

  const handleJobSelect = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setValue("role", job.role);
      setValue("company", job.company);
    }
  };

  const onSubmit = (values: InterviewPrepFormInputValues) => {
    setError(null);
    setQuestions([]);
    setExpanded(null);
    const parsedValues = InterviewPrepSchema.parse(values);
    startTransition(async () => {
      const res = await generateInterviewPrep(parsedValues);
      if (res.success) setQuestions(res.data);
      else setError(res.error);
    });
  };

  return (
    <div className="max-w-2xl space-y-5">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1 w-fit">
          {(["select", "manual"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={cn(
                "px-3 py-1 text-xs font-medium rounded-md transition-colors",
                mode === m
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "select" ? "From my jobs" : "Enter manually"}
            </button>
          ))}
        </div>

        {mode === "select" && jobs.length > 0 && (
          <div className="space-y-1.5">
            <Label className="text-xs font-medium">Select a job</Label>
            <Select onValueChange={handleJobSelect}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Choose from your applications…" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.company} — {job.role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {mode === "select" && jobs.length === 0 && (
          <p className="text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2">
            No applications found. Switch to manual entry.
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="ip-role">Role</Label>
            <Input id="ip-role" placeholder="e.g. Frontend Engineer" className="h-10" {...register("role")} />
            {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ip-company">
              Company{" "}
              <span className="text-muted-foreground font-normal text-xs">(optional)</span>
            </Label>
            <Input id="ip-company" placeholder="e.g. Stripe" className="h-10" {...register("company")} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Focus area</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {focusAreas.map(({ value, label, description }) => {
              const isSelected = selectedFocus === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setValue("focusArea", value)}
                  className={cn(
                    "relative flex flex-col items-start gap-0.5 px-3 py-2.5 text-left rounded-xl border-2 transition-all duration-150",
                    isSelected
                      ? "border-violet-500 bg-violet-50 dark:bg-violet-950/40 shadow-sm"
                      : "border-border bg-card hover:border-muted-foreground/30 hover:bg-muted/30"
                  )}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </span>
                  )}
                  <span
                    className={cn(
                      "text-sm font-semibold leading-none",
                      isSelected ? "text-violet-700 dark:text-violet-300" : "text-foreground"
                    )}
                  >
                    {label}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] leading-tight mt-0.5",
                      isSelected ? "text-violet-500 dark:text-violet-400" : "text-muted-foreground"
                    )}
                  >
                    {description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <p className="text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-lg !border-violet-600 !bg-violet-600 px-6 text-sm font-medium !text-white transition-colors hover:!bg-violet-700 disabled:pointer-events-none disabled:opacity-50"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating questions…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate interview questions
            </>
          )}
        </Button>
      </form>

      {questions.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              {questions.length} questions generated
            </span>
            <span className="text-xs text-muted-foreground">
              Click any question to reveal the answer
            </span>
          </div>
          <div className="space-y-2">
            {questions.map((qa, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-start justify-between gap-3 px-4 py-3.5 text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-semibold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground leading-snug">
                      {qa.question}
                    </span>
                  </div>
                  {expanded === i
                    ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  }
                </button>
                {expanded === i && (
                  <div className="px-4 pb-4">
                    <div className="ml-8 text-sm text-muted-foreground leading-relaxed border-l-2 border-violet-200 pl-3">
                      {qa.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
