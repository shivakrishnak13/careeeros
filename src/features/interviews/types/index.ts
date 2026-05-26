export type InterviewRound = "HR_SCREENING" | "TECHNICAL" | "ASSIGNMENT" | "MANAGERIAL" | "FINAL" | "OTHER";
export type InterviewStatus = "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";

export type Interview = {
  id: string;
  round: InterviewRound;
  status: InterviewStatus;
  scheduledAt: Date | null;
  duration: number | null;
  interviewer: string | null;
  platform: string | null;
  meetingUrl: string | null;
  notes: string | null;
  feedback: string | null;
  result: string | null;
  jobId: string;
  createdAt: Date;
  updatedAt: Date;
  job: {
    id: string;
    company: string;
    role: string;
  };
};