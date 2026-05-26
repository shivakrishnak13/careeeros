"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import type { AnalyticsData } from "@/features/analytics/types";

export async function getAnalyticsData(): Promise<AnalyticsData | null> {
  const user = await getCurrentUser();
  if (!user) return null;

  const jobs = await db.job.findMany({
    where: { userId: user.id },
    select: {
      id: true,
      status: true,
      company: true,
      appliedAt: true,
    },
    orderBy: { appliedAt: "asc" },
  });

  const total = jobs.length;

  if (total === 0) {
    return {
      totalApplications: 0,
      activeApplications: 0,
      offerRate: 0,
      responseRate: 0,
      statusBreakdown: [],
      weeklyActivity: [],
      topCompanies: [],
      avgResponseDays: null,
    };
  }

  const statusCounts = jobs.reduce<Record<string, number>>((acc, job) => {
    acc[job.status] = (acc[job.status] ?? 0) + 1;
    return acc;
  }, {});

  const statusOrder = [
    "WISHLIST",
    "APPLIED",
    "INTERVIEW",
    "OFFER",
    "REJECTED",
    "WITHDRAWN",
  ];
  const statusBreakdown = statusOrder
    .filter((s) => statusCounts[s])
    .map((s) => ({
      status: s,
      count: statusCounts[s],
      percentage: Math.round((statusCounts[s] / total) * 100),
    }));

  const offers = statusCounts["OFFER"] ?? 0;
  const interviews = statusCounts["INTERVIEW"] ?? 0;
  const responded = interviews + offers + (statusCounts["REJECTED"] ?? 0);
  const active = (statusCounts["APPLIED"] ?? 0) + interviews + offers;

  const offerRate = total > 0 ? Math.round((offers / total) * 100) : 0;
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0;

  const now = new Date();
  const twelveWeeksAgo = new Date(now);
  twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 84);

  const weeklyMap: Record<string, number> = {};
  for (let i = 11; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    const label = weekStart.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
    weeklyMap[label] = 0;
  }

  jobs
    .filter((j) => new Date(j.appliedAt) >= twelveWeeksAgo)
    .forEach((job) => {
      const d = new Date(job.appliedAt);
      const diff = Math.floor(
        (now.getTime() - d.getTime()) / (7 * 24 * 60 * 60 * 1000),
      );
      const weekIndex = Math.min(diff, 11);
      const weekStart = new Date(now);
      weekStart.setDate(weekStart.getDate() - weekIndex * 7);
      const label = weekStart.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
      });
      if (weeklyMap[label] !== undefined) {
        weeklyMap[label] += 1;
      }
    });

  const weeklyActivity = Object.entries(weeklyMap).map(
    ([week, applications]) => ({
      week,
      applications,
    }),
  );

  const companyCounts = jobs.reduce<Record<string, number>>((acc, job) => {
    acc[job.company] = (acc[job.company] ?? 0) + 1;
    return acc;
  }, {});

  const topCompanies = Object.entries(companyCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([company, count]) => ({ company, count }));

  return {
    totalApplications: total,
    activeApplications: active,
    offerRate,
    responseRate,
    statusBreakdown,
    weeklyActivity,
    topCompanies,
    avgResponseDays: null,
  };
}
