import { getJobs } from "@/features/applications/actions";
import AiToolsShell from "@/components/ai-tools/ai-tools-shell";

export default async function AiToolsPage() {
  const jobs = await getJobs();

  return <AiToolsShell jobs={jobs} />;
}