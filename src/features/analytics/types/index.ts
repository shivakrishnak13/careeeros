export type StatusBreakdown = {
  status: string;
  count: number;
  percentage: number;
};

export type WeeklyActivity = {
  week: string;
  applications: number;
};

export type TopCompany = {
  company: string;
  count: number;
};

export type AnalyticsData = {
  totalApplications: number;
  activeApplications: number;
  offerRate: number;
  responseRate: number;
  statusBreakdown: StatusBreakdown[];
  weeklyActivity: WeeklyActivity[];
  topCompanies: TopCompany[];
  avgResponseDays: number | null;
};
