import AddInterviewButton from "@/components/interviews/add-interview-button";
import InterviewFilters from "@/components/interviews/interview-filters";
import InterviewsList from "@/components/interviews/interview-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getInterviews, getJobsForSelect } from "@/features/interviews/actions";
import { Suspense } from "react";

type Props = {
  searchParams: Promise<{ round?: string; status?: string; search?: string }>;
};

export default async function InterviewsPage({ searchParams }: Props) {
  const { round, status, search } = await searchParams;
  const jobsPromise = getJobsForSelect();
  const interviewPromise = getInterviews(round, status);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <InterviewFilters />
        </div>
        <AddInterviewButton jobsPromise={jobsPromise} />
      </div>

      <Suspense
        fallback={
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full rounded-xl" />
            ))}
          </div>
        }
      >
        <InterviewsList search={search} interviewPromise={interviewPromise} />
      </Suspense>
    </div>
  );
}