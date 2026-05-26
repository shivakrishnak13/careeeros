import { z } from "zod";

export const JobSchema = z.object({
  company: z.string().min(1, "Company name is required").max(100),
  role: z.string().min(1, "Role is required").max(100),
  status: z.enum(["WISHLIST", "APPLIED", "INTERVIEW", "OFFER", "REJECTED", "WITHDRAWN"]).default("APPLIED"),
  jobType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"]).optional(),
  workMode: z.enum(["REMOTE", "HYBRID", "ONSITE"]).optional(),
  location: z.string().max(100).optional().or(z.literal("")),
  jobUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  description: z.string().max(5000).optional().or(z.literal("")),
  salaryMin: z.coerce.number().min(0).optional(),
  salaryMax: z.coerce.number().min(0).optional(),
  notes: z.string().max(2000).optional().or(z.literal("")),
  appliedAt: z.string().min(1, "Applied date is required"),
  deadlineAt: z.string().optional().or(z.literal("")),
});

export type JobFormInputValues = z.input<typeof JobSchema>;
export type JobFormValues = z.output<typeof JobSchema>;
