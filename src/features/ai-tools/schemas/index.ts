import { z } from "zod";

export const CoverLetterSchema = z.object({
  company: z.string().min(1, "Company is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  tone: z.enum(["professional", "friendly", "concise"]).default("professional"),
  jobDescription: z.string().max(3000).optional().or(z.literal("")),
  userBackground: z.string().max(2000).optional().or(z.literal("")),
});

export type CoverLetterFormValues = z.infer<typeof CoverLetterSchema>;
