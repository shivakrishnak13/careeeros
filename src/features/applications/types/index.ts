export type JobStatus = "WISHLIST" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED" | "WITHDRAWN";
export type JobType = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP" | "FREELANCE";
export type WorkMode = "REMOTE" | "HYBRID" | "ONSITE";

export type Job = {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  jobType: JobType | null;
  workMode: WorkMode | null;
  location: string | null;
  jobUrl: string | null;
  description: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  currency: string | null;
  notes: string | null;
  appliedAt: Date;
  deadlineAt: Date | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JobSummary = Pick<Job, "id" | "company" | "role" | "status" | "jobType" | "workMode" | "location" | "salaryMin" | "salaryMax" | "appliedAt">;