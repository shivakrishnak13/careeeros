import { Skeleton } from "@/components/ui/skeleton";

export default function AnalyticsSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <Skeleton className="h-4 w-32 mb-1.5" />
                <Skeleton className="h-3 w-56 mb-6" />
                <Skeleton className="h-48 w-full rounded-lg" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-6">
                        <Skeleton className="h-4 w-32 mb-1.5" />
                        <Skeleton className="h-3 w-44 mb-6" />
                        <Skeleton className="h-40 w-full rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}