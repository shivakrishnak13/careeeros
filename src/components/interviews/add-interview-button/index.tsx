"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import InterviewForm from "@/components/interviews/interview-form";

type Job = {
  id: string;
  company: string;
  role: string;
};

type Props = {
  jobs: Job[];
  preselectedJobId?: string;
};

export default function AddInterviewButton({ jobs, preselectedJobId }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(preselectedJobId ?? "");

  const handleOpen = () => {
    setSelectedJobId(preselectedJobId ?? "");
    setOpen(true);
  };

  return (
    <>
      <Button
        size="sm"
        onClick={handleOpen}
        className="h-9 px-4 bg-brand-600 hover:bg-brand-700 text-white text-sm"
      >
        <Plus className="w-4 h-4 mr-1.5" />
        Add interview
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-heading)" }}>
              Add interview round
            </DialogTitle>
          </DialogHeader>

          {!preselectedJobId && (
            <div className="space-y-1.5">
              <Label>Application <span className="text-destructive">*</span></Label>
              <Select value={selectedJobId} onValueChange={setSelectedJobId}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Select a job application..." />
                </SelectTrigger>
                <SelectContent>
                  {jobs.map((job) => (
                    <SelectItem key={job.id} value={job.id}>
                      {job.role} — {job.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedJobId && (
            <InterviewForm
              jobId={selectedJobId}
              onSuccess={() => setOpen(false)}
            />
          )}

          {!selectedJobId && !preselectedJobId && (
            <p className="text-xs text-muted-foreground pb-2">
              Select an application above to continue.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}