import InterviewTable from "@/components/interviews/interview-table";
import { Interview } from "@/features/interviews/types";
import { use } from "react";

type Props = {
    search?: string;
    interviewPromise: Promise<Interview[]>
}

export default function InterviewsList({
    search,
    interviewPromise
}: Props) {
    const interviews = use(interviewPromise);

    const filtered = search
        ? interviews.filter(
            (i) =>
                i.job.company.toLowerCase().includes(search.toLowerCase()) ||
                i.job.role.toLowerCase().includes(search.toLowerCase())
        )
        : interviews;

    return <InterviewTable interviews={filtered} />;
}