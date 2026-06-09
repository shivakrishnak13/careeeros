"use client"
import JobTable from "@/components/applications/job-table";
import { JobSummary } from "@/features/applications/types";
import { use } from "react";

type Props = {
    status?: string; search?: string,
    jobsPromise: Promise<(JobSummary & { currency?: string | null, jobUrl?: string | null })[]>;
}

export default function ApplicationsList({ status, search, jobsPromise }: Props) {
    const jobs = use(jobsPromise);

    const filtered = search
        ? jobs.filter(
            (j) =>
                j.company.toLowerCase().includes(search.toLowerCase()) ||
                j.role.toLowerCase().includes(search.toLowerCase())
        )
        : jobs;

    return <JobTable jobs={filtered} />;
}