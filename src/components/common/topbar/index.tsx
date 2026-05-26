"use client";

import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const pageTitles: Record<string, { title: string; description: string }> = {
  "/overview": { title: "Overview", description: "Your job search at a glance" },
  "/applications": { title: "Applications", description: "Track every job you've applied to" },
  "/interviews": { title: "Interviews", description: "Manage your interview rounds" },
  "/ai-tools": { title: "AI Tools", description: "Supercharge your job search with AI" },
  "/analytics": { title: "Analytics", description: "Insights into your job search progress" },
  "/settings": { title: "Settings", description: "Manage your account and preferences" },
};

type TopbarProps = {
  userName: string | null;
};

export default function Topbar({ userName }: TopbarProps) {
  const pathname = usePathname();
  const base = "/" + pathname.split("/")[1];
  const page = pageTitles[base] ?? { title: "CareerOS", description: "" };

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-card flex-shrink-0">
      <div>
        <h1 className="text-[15px] font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          {base === "/overview" ? `${greeting()}, ${userName?.split(" ")[0] ?? "there"} 👋` : page.title}
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">{page.description}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-9 h-9 text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
        </Button>

        {base === "/overview" && (
          <Button asChild size="sm" className="bg-brand-600 hover:bg-brand-700 text-white h-9 px-4 rounded-lg text-sm">
            <Link href="/applications/new">+ Add application</Link>
          </Button>
        )}

        {base === "/applications" && (
          <Button asChild size="sm" className="bg-brand-600 hover:bg-brand-700 text-white h-9 px-4 rounded-lg text-sm">
            <Link href="/applications/new">+ New application</Link>
          </Button>
        )}

        {/* {base === "/interviews" && (
          <Button asChild size="sm" className="bg-brand-600 hover:bg-brand-700 text-white h-9 px-4 rounded-lg text-sm">
            <Link href="/interviews/new">+ Add interview</Link>
          </Button>
        )} */}
      </div>
    </header>
  );
}