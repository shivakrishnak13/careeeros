"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { type JobStatus } from "@prisma/client";

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
