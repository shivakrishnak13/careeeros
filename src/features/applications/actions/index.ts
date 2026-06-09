"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type JobStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { JobSchema, type JobFormValues } from "@/features/applications/schemas";

export async function getJobs(status?: string) {
  const user = await getCurrentUser();
  if (!user) return [];

  return db.job.findMany({
    where: {
      userId: user.id,
      ...(status && status !== "ALL" ? { status: status as JobStatus } : {}),
    },
    orderBy: { appliedAt: "desc" },
    select: {
      id: true,
      company: true,
      role: true,
      status: true,
      jobType: true,
      workMode: true,
      location: true,
      salaryMin: true,
      salaryMax: true,
      appliedAt: true,
    },
  });
}

export async function getJobById(id: string) {
  const user = await getCurrentUser();
  if (!user) return null;

  return db.job.findFirst({
    where: { id, userId: user.id },
  });
}

export async function createJob(values: JobFormValues) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = JobSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid fields" };

  const {
    appliedAt,
    deadlineAt,
    location,
    jobUrl,
    description,
    notes,
    ...rest
  } = parsed.data;

  await db.job.create({
    data: {
      ...rest,
      location: location || null,
      jobUrl: jobUrl || null,
      description: description || null,
      notes: notes || null,
      appliedAt: new Date(appliedAt),
      deadlineAt: deadlineAt ? new Date(deadlineAt) : null,
      userId: user.id,
    },
  });

  revalidatePath("/applications");
  revalidatePath("/overview");
  redirect("/applications");
}

export async function updateJob(id: string, values: JobFormValues) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = JobSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid fields" };

  const existing = await db.job.findFirst({ where: { id, userId: user.id } });
  if (!existing) throw new Error("Job not found");

  const {
    appliedAt,
    deadlineAt,
    location,
    jobUrl,
    description,
    notes,
    ...rest
  } = parsed.data;

  await db.job.update({
    where: { id },
    data: {
      ...rest,
      location: location || null,
      jobUrl: jobUrl || null,
      description: description || null,
      notes: notes || null,
      appliedAt: new Date(appliedAt),
      deadlineAt: deadlineAt ? new Date(deadlineAt) : null,
    },
  });

  revalidatePath("/applications");
  revalidatePath(`/applications/${id}`);
  revalidatePath("/overview");
  redirect("/applications");
}

export async function deleteJob(id: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const existing = await db.job.findFirst({ where: { id, userId: user.id } });
  if (!existing) throw new Error("Job not found");

  await db.job.delete({ where: { id } });

  revalidatePath("/applications");
  revalidatePath("/overview");
}
