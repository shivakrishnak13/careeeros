import { z } from "zod";

export const CoverLetterSchema = z.object({
  company: z.string().min(1, "Company is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  tone: z.enum(["professional", "friendly", "concise"]).default("professional"),
  jobDescription: z.string().max(3000).optional().or(z.literal("")),
  userBackground: z.string().max(2000).optional().or(z.literal("")),
});

export const InterviewPrepSchema = z.object({
  role: z.string().min(1, "Role is required").max(100),
  company: z.string().max(100).optional().or(z.literal("")),
  focusArea: z.enum(["general", "technical", "behavioural", "mixed"]).default("mixed"),
});

export type CoverLetterFormValues = z.infer<typeof CoverLetterSchema>;
export type InterviewPrepFormValues = z.infer<typeof InterviewPrepSchema>;
