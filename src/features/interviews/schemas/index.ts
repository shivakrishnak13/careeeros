import { z } from "zod";

export const InterviewSchema = z.object({
  round: z.enum(["HR_SCREENING", "TECHNICAL", "ASSIGNMENT", "MANAGERIAL", "FINAL", "OTHER"]),
  status: z.enum(["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED"]).default("SCHEDULED"),
  scheduledAt: z.string().optional().or(z.literal("")),
  duration: z.coerce.number().min(1).max(480).optional(),
  interviewer: z.string().max(100).optional().or(z.literal("")),
  platform: z.string().max(100).optional().or(z.literal("")),
  meetingUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  notes: z.string().max(2000).optional().or(z.literal("")),
  feedback: z.string().max(2000).optional().or(z.literal("")),
  result: z.string().max(200).optional().or(z.literal("")),
});

export type InterviewFormValues = z.output<typeof InterviewSchema>;
export type InterviewFormInputValues = z.input<typeof InterviewSchema>;