import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getInterviews, getJobsForSelect } from "@/features/interviews/actions";
import InterviewFilters from "@/components/interviews/interview-filters";
import InterviewTable from "@/components/interviews/interview-table";
import AddInterviewButton from "@/components/interviews/add-interview-button";

type Props = {
  searchParams: Promise<{ round?: string; status?: string; search?: string }>;
};

async function InterviewsList({
  round,
  status,
  search,
}: {
  round?: string;
  status?: string;
  search?: string;
}) {
  const interviews = await getInterviews(round, status);
  console.log(interviews)

  const filtered = search
    ? interviews.filter(
        (i) =>
          i.job.company.toLowerCase().includes(search.toLowerCase()) ||
          i.job.role.toLowerCase().includes(search.toLowerCase())
      )
    : interviews;

  return <InterviewTable interviews={filtered} />;
}

export default async function InterviewsPage({ searchParams }: Props) {
  const { round, status, search } = await searchParams;
  const jobs = await getJobsForSelect();

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <InterviewFilters />
        </div>
        <AddInterviewButton jobs={jobs} />
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
        <InterviewsList round={round} status={status} search={search} />
      </Suspense>
    </div>
  );
}