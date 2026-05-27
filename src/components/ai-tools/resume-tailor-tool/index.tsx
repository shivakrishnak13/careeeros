"use client";

import { useState, useTransition } from "react";
import { Loader2, Sparkles, Copy, CheckCheck, FileText, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { tailorResume } from "@/features/ai-tools/actions";

export default function ResumeTailorTool() {
  const [isPending, startTransition] = useTransition();
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canSubmit = resume.trim().length > 50 && jobDescription.trim().length > 50;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setResult(null);
    startTransition(async () => {
      const res = await tailorResume({ resume, jobDescription });
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
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="rt-resume" className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              Your current resume
            </Label>
            <Textarea
              id="rt-resume"
              placeholder="Paste your resume here — bullet points, experience, skills, anything…"
              rows={8}
              className={cn(
                "resize-none text-sm leading-relaxed transition-colors",
                resume.trim().length > 0 && "border-emerald-300 focus-visible:ring-emerald-400/30"
              )}
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground">
              {resume.length > 0 ? `${resume.length} characters` : "Paste your full resume or just the relevant sections"}
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="rt-jd" className="flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
              Job description
            </Label>
            <Textarea
              id="rt-jd"
              placeholder="Paste the job posting here — requirements, responsibilities, nice-to-haves…"
              rows={8}
              className={cn(
                "resize-none text-sm leading-relaxed transition-colors",
                jobDescription.trim().length > 0 && "border-emerald-300 focus-visible:ring-emerald-400/30"
              )}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
            <p className="text-[11px] text-muted-foreground">
              {jobDescription.length > 0 ? `${jobDescription.length} characters` : "The more detail the better — keywords matter"}
            </p>
          </div>
        </div>

        {!canSubmit && (resume.length > 0 || jobDescription.length > 0) && (
          <p className="text-xs text-muted-foreground bg-muted/40 border border-border rounded-lg px-3 py-2">
            Add both your resume and the job description to continue.
          </p>
        )}

        {error && (
          <p className="text-xs text-destructive bg-destructive/5 border border-destructive/20 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex items-center justify-start pt-1">
          <Button
            type="submit"
            disabled={isPending || !canSubmit}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg !border-emerald-600 !bg-emerald-600 px-6 text-sm font-medium !text-white transition-colors hover:!bg-emerald-700 disabled:pointer-events-none disabled:opacity-50"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Tailoring your resume…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Tailor my resume
              </>
            )}
          </Button>
        </div>
      </form>

      {result && (
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              Tailored resume bullets
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
          <div className="bg-muted/30 border border-emerald-200 dark:border-emerald-900 rounded-xl px-5 py-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )}
    </div>
  );
}
