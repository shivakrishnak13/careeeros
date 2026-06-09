import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getJobWithInterviews } from "@/features/interviews/actions";
import JobDetailSidebar from "@/components/applications/job-detail-sidebar";
import JobTimeline from "@/components/applications/job-timeline";
import InterviewList from "@/components/interviews/interview-table";
import AddInterviewButton from "@/components/interviews/add-interview-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Job } from "@/features/applications/types";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getJobWithInterviews(id);
  if (!job) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/applications"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to applications
        </Link>
        <h1
          className="text-xl font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {job.role}
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">{job.company}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <JobTimeline currentStatus={job.status} />

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Tabs defaultValue="interviews">
              <div className="flex items-center justify-between px-5 pt-4 pb-0 border-b border-border">
                <TabsList className="bg-transparent p-0 h-auto gap-1">
                  <TabsTrigger
                    value="interviews"
                    className="px-3 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-brand-600 data-[state=active]:text-brand-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground"
                  >
                    Interviews
                    {job.interviews.length > 0 && (
                      <span className="ml-1.5 text-xs bg-brand-100 text-brand-600 font-medium px-1.5 py-0.5 rounded-full">
                        {job.interviews.length}
                      </span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger
                    value="description"
                    className="px-3 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-brand-600 data-[state=active]:text-brand-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="px-3 py-2 text-sm rounded-none border-b-2 border-transparent data-[state=active]:border-brand-600 data-[state=active]:text-brand-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground"
                  >
                    Notes
                  </TabsTrigger>
                </TabsList>

                <div className="pb-3">
                  <AddInterviewButton
                    job={[{ id: job.id, company: job.company, role: job.role }]}
                    preselectedJobId={job.id}
                  />
                </div>
              </div>

              <TabsContent value="interviews" className="p-5 mt-0">
                <InterviewList
                  //   jobId={job.id}
                  interviews={job.interviews.map((i) => ({
                    ...i,
                    scheduledAt: i.scheduledAt ?? null,
                    job: { id: job.id, company: job.company, role: job.role },
                  }))}
                />
              </TabsContent>

              <TabsContent value="description" className="p-5 mt-0">
                {job.description ? (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                      {job.description}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No description added</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Edit the application to add a job description
                    </p>
                    <Link
                      href={`/applications/${job.id}/edit`}
                      className="mt-3 text-xs text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Edit application →
                    </Link>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="notes" className="p-5 mt-0">
                {job.notes ? (
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {job.notes}
                  </p>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-sm font-medium text-foreground">No notes yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Keep track of anything relevant to this application
                    </p>
                    <Link
                      href={`/applications/${job.id}/edit`}
                      className="mt-3 text-xs text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Add notes →
                    </Link>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-4">
          <JobDetailSidebar job={job as unknown as Job} />
        </div>
      </div>
    </div>
  );
}