"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import {
  InterviewSchema,
  type InterviewFormValues,
} from "@/features/interviews/schemas";
import type {
  InterviewRound,
  InterviewStatus,
} from "@/features/interviews/types";

export async function getJobWithInterviews(id: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  return db.job.findFirst({
    where: { id, userId: user.id },
    include: {
      interviews: {
        orderBy: { scheduledAt: "asc" },
      },
    },
  });
}

export async function getInterviews(round?: string, status?: string) {
  const user = await getCurrentUser();
  if (!user) return [];

  return db.interview.findMany({
    where: {
      job: { userId: user.id },
      ...(round && round !== "ALL" ? { round: round as InterviewRound } : {}),
      ...(status && status !== "ALL"
        ? { status: status as InterviewStatus }
        : {}),
    },
    orderBy: { scheduledAt: "asc" },
    select: {
      id: true,
      round: true,
      status: true,
      scheduledAt: true,
      duration: true,
      interviewer: true,
      platform: true,
      meetingUrl: true,
      notes: true,
      feedback: true,
      result: true,
      jobId: true,
      job: {
        select: { id: true, company: true, role: true },
      },
    },
  });
}

export async function getJobsForSelect() {
  const user = await getCurrentUser();
  if (!user) return [];

  return db.job.findMany({
    where: { userId: user.id },
    orderBy: { appliedAt: "desc" },
    select: { id: true, company: true, role: true },
  });
}

export async function createInterview(
  jobId: string,
  values: InterviewFormValues,
) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = InterviewSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid fields" };

  const job = await db.job.findFirst({ where: { id: jobId, userId: user.id } });
  if (!job) return { error: "Job not found" };

  const { scheduledAt, ...rest } = parsed.data;

  await db.interview.create({
    data: {
      ...rest,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
      jobId,
    },
  });

  revalidatePath("/interviews");
  revalidatePath(`/applications/${jobId}`);
  revalidatePath("/overview");
}

export async function updateInterview(
  interviewId: string,
  jobId: string,
  values: InterviewFormValues,
) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = InterviewSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid fields" };

  const { scheduledAt, ...rest } = parsed.data;

  await db.interview.update({
    where: { id: interviewId },
    data: {
      ...rest,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
    },
  });

  revalidatePath("/interviews");
  revalidatePath(`/applications/${jobId}`);
  revalidatePath("/overview");
}

export async function deleteInterview(interviewId: string, jobId: string) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  await db.interview.delete({ where: { id: interviewId } });

  revalidatePath("/interviews");
  revalidatePath(`/applications/${jobId}`);
  revalidatePath("/overview");
}
