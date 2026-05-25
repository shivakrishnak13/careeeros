import { getJobs } from "@/features/applications/actions";
import Link from "next/link";

export default async function ApplicationsPage() {
    const jobs = await getJobs();
    console.log({ jobs })
    return (
        <div className="space-y-4">
            {
                jobs.map((job) => {
                    return (
                        <div key={job.id}>
                            <h1>{job.company}</h1>
                            <Link href={`/applications/${job.id}/edit`}>edit</Link>
                        </div>
                    )
                })
        }
        </div>
    );
}