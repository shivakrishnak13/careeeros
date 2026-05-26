export type OverviewStats = {
  total: number;
  interviews: number;
  offers: number;
  rejections: number;
  recentJobs: {
    id: string;
    company: string;
    role: string;
    status: string;
    appliedAt: Date;
  }[];
  upcomingInterviews: {
    id: string;
    round: string;
    scheduledAt: Date | null;
    job: {
      company: string;
      role: string;
    };
  }[];
};
