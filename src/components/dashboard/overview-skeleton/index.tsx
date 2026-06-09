import { Skeleton } from "@/components/ui/skeleton";

export default function OverviewSkeleton() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                        <div className="space-y-1.5">
                            <Skeleton className="h-8 w-12" />
                            <Skeleton className="h-3 w-28" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-card border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-3 w-14" />
                    </div>
                    <div className="divide-y divide-border">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between px-5 py-3.5">
                                <div className="space-y-1.5">
                                    <Skeleton className="h-3.5 w-40" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                    <Skeleton className="h-3 w-12" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-14" />
                    </div>
                    <div className="divide-y divide-border">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="px-5 py-3.5 space-y-1.5">
                                <Skeleton className="h-3.5 w-36" />
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}