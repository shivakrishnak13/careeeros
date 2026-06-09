import ApplicationsList from "@/components/applications/application-list";
import JobFilters from "@/components/applications/job-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { getJobs } from "@/features/applications/actions";
import { Suspense, use } from "react";

type Props = {
  searchParams: Promise<{ status?: string; search?: string }>;
};

export default async function ApplicationsPage({ searchParams }: Props) {
  const { status, search } = await searchParams;
  const jobsPromise = getJobs(status);

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
        <ApplicationsList status={status} search={search} jobsPromise={jobsPromise} />
      </Suspense>
    </div>
  );
}