import { Suspense } from "react";
import { getJobs } from "@/features/applications/actions";
import JobTable from "@/components/applications/job-table";
import JobFilters from "@/components/applications/job-filters";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  searchParams: Promise<{ status?: string; search?: string }>;
};

async function ApplicationsList({ status, search }: { status?: string; search?: string }) {
  const jobs = await getJobs(status);

  const filtered = search
    ? jobs.filter(
        (j) =>
          j.company.toLowerCase().includes(search.toLowerCase()) ||
          j.role.toLowerCase().includes(search.toLowerCase())
      )
    : jobs;

  return <JobTable jobs={filtered} />;
}

export default async function ApplicationsPage({ searchParams }: Props) {
  const { status, search } = await searchParams;

  return (
    <div className="space-y-4">
      <JobFilters />
      <Suspense
        fallback={
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        }
      >
        <ApplicationsList status={status} search={search} />
      </Suspense>
    </div>
  );
}