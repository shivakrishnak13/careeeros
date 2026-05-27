"use client";

import { useState } from "react";
import { FileText, Mic, Sparkles, FileSearch } from "lucide-react";
import { cn } from "@/lib/utils";
import CoverLetterTool from "@/components/ai-tools/cover-letter-tool";
import InterviewPrepTool from "@/components/ai-tools/interview-prep-tool";
import ResumeTailorTool from "@/components/ai-tools/resume-tailor-tool";
import type { JobSummary } from "@/features/applications/types";

const TOOLS = [
  {
    id: "cover-letter",
    label: "Cover Letter",
    description: "Generate a tailored cover letter for any role",
    icon: FileText,
    activeBg: "bg-brand-600",
    activeText: "text-brand-600",
    iconBg: "bg-brand-100",
    iconColor: "text-brand-600",
  },
  {
    id: "interview-prep",
    label: "Interview Prep",
    description: "AI-generated questions and model answers",
    icon: Mic,
    activeBg: "bg-violet-600",
    activeText: "text-violet-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    id: "resume-tailor",
    label: "Resume Tailor",
    description: "Rewrite your resume bullets to match any job description",
    icon: FileSearch,
    activeBg: "bg-emerald-600",
    activeText: "text-emerald-600",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
] as const;

type ToolId = (typeof TOOLS)[number]["id"];

type Props = {
  jobs: JobSummary[];
};

export default function AiToolsShell({ jobs }: Props) {
  const [activeId, setActiveId] = useState<ToolId>("cover-letter");
  const active = TOOLS.find((t) => t.id === activeId)!;

  return (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-brand-600" />
          </div>
          <div>
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              AI Tools
            </h2>
          </div>
        </div>

        <div className="flex items-end gap-1 px-4 pt-3 pb-0 border-b border-border overflow-x-auto bg-muted/20">
          {TOOLS.map((tool) => {
            const isActive = tool.id === activeId;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveId(tool.id)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-t-lg border border-b-0 transition-all duration-200",
                  isActive
                    ? cn("bg-card shadow-sm -mb-px z-10 border-border", tool.activeText)
                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40"
                )}
              >
                <span
                  className={cn(
                    "flex items-center justify-center w-5 h-5 rounded-md transition-colors",
                    isActive ? tool.iconBg : "bg-transparent"
                  )}
                >
                  <tool.icon
                    className={cn(
                      "w-3 h-3 transition-colors",
                      isActive ? tool.iconColor : "text-muted-foreground"
                    )}
                  />
                </span>
                {tool.label}
                {isActive && (
                  <span
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5 rounded-t-full",
                      tool.activeBg
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 bg-muted/10 border-b border-border">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                active.iconBg
              )}
            >
              <active.icon className={cn("w-3 h-3", active.iconColor)} />
            </div>
            <p className="text-xs text-muted-foreground">{active.description}</p>
          </div>
        </div>

        <div className="p-5">
          {activeId === "cover-letter" && <CoverLetterTool jobs={jobs} />}
          {activeId === "interview-prep" && <InterviewPrepTool jobs={jobs} />}
          {activeId === "resume-tailor" && <ResumeTailorTool />}
        </div>
      </div>
    </div>
  );
}
