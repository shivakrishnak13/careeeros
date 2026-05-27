"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles, Copy, CheckCheck } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { generateCoverLetter } from "@/features/ai-tools/actions";
import { CoverLetterSchema } from "@/features/ai-tools/schemas";
import type { JobSummary } from "@/features/applications/types";

type Props = { jobs: JobSummary[] };
type CoverLetterFormInputValues = z.input<typeof CoverLetterSchema>;

const tones = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "concise", label: "Concise" },
] as const;

export default function CoverLetterTool({ jobs }: Props) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"select" | "manual">("select");

  const { register, handleSubmit, setValue, watch, formState: { errors } } =
    useForm<CoverLetterFormInputValues>({
      resolver: zodResolver(CoverLetterSchema),
      defaultValues: { tone: "professional" },
    });

  const handleJobSelect = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    if (job) {
      setValue("company", job.company);
      setValue("role", job.role);
    }
  };

  const onSubmit = (values: CoverLetterFormInputValues) => {
    setError(null);
    setResult(null);
    const parsedValues = CoverLetterSchema.parse(values);
    startTransition(async () => {
      const res = await generateCoverLetter(parsedValues);
      if (res.success) setResult(res.data);
      else setError(res.error);
    });
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <Label htmlFor="cl-company">Company</Label>
            <Input id="cl-company" placeholder="e.g. Google" className="h-10" {...register("company")} />
            {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cl-role">Role</Label>
            <Input id="cl-role" placeholder="e.g. Product Designer" className="h-10" {...register("role")} />
            {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Tone</Label>
          <div className="flex items-center gap-2">
            {tones.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setValue("tone", value)}
                className={cn(
                  "px-4 py-1.5 text-sm font-medium rounded-lg border transition-colors",
                  watch("tone") === value
                    ? "bg-brand-600 text-white border-brand-600"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cl-background">
            Your background{" "}
            <span className="text-muted-foreground font-normal text-xs">(optional)</span>
          </Label>
          <Textarea
            id="cl-background"
            placeholder="Brief summary of your experience, skills, or anything you want highlighted…"
            rows={3}
            className="resize-none"
            {...register("userBackground")}
          />
        </div>

        {error && (
          <p className="text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className="h-10 px-6 bg-brand-600 hover:bg-brand-700 text-white gap-2"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate cover letter
            </>
          )}
        </Button>
      </form>

      {result && (
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Generated letter
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-3 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl px-5 py-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}