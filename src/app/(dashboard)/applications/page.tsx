import { getJobs } from "@/features/applications/actions";

export default async function ApplicationsPage() {
    const jobs = await getJobs();
    console.log({ jobs })
    return (
        <div className="space-y-4">
            applications
        </div>
    );
}