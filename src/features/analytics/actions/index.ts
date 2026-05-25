"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function getOverviewStats() {
  const user = await getCurrentUser();
  if (!user) return null;

  const [
    total,
    interviews,
    offers,
    rejections,
    recentJobs,
    upcomingInterviews,
  ] = await Promise.all([
    db.job.count({ where: { userId: user.id } }),
    db.job.count({ where: { userId: user.id, status: "INTERVIEW" } }),
    db.job.count({ where: { userId: user.id, status: "OFFER" } }),
    db.job.count({ where: { userId: user.id, status: "REJECTED" } }),
    db.job.findMany({
      where: { userId: user.id },
      orderBy: { appliedAt: "desc" },
      take: 5,
      select: {
        id: true,
        company: true,
        role: true,
        status: true,
        appliedAt: true,
      },
    }),
    db.interview.findMany({
      where: {
        job: { userId: user.id },
        status: "SCHEDULED",
        scheduledAt: { gte: new Date() },
      },
      orderBy: { scheduledAt: "asc" },
      take: 3,
      select: {
        id: true,
        round: true,
        scheduledAt: true,
        job: {
          select: { company: true, role: true },
        },
      },
    }),
  ]);
  console.log({ total, interviews, offers, rejections, recentJobs, upcomingInterviews });
  return {
    total,
    interviews,
    offers,
    rejections,
    recentJobs,
    upcomingInterviews,
  };
}
