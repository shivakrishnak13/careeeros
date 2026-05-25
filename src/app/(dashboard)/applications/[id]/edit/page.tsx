import { notFound } from "next/navigation";
import { getJobById } from "@/features/applications/actions";
import ApplicationForm from "@/components/applications/application-form";
import { Job } from "@prisma/client";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditApplicationPage({ params }: Props) {
  const { id } = await params;
  const job = await getJobById(id);
  if (!job) notFound();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Edit application
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {job.role} at {job.company}
        </p>
      </div>
      <ApplicationForm job={job as Job} />
    </div>
  );
}