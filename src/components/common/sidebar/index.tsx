"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  CalendarCheck,
  Sparkles,
  BarChart3,
  Settings,
  LogOut,
  BriefcaseIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/features/auth/actions";

const navItems = [
  { label: "Overview", href: "/overview", icon: LayoutDashboard },
  { label: "Applications", href: "/applications", icon: BriefcaseBusiness },
  { label: "Interviews", href: "/interviews", icon: CalendarCheck },
  { label: "AI Tools", href: "/ai-tools", icon: Sparkles },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
];

const bottomItems = [
  { label: "Settings", href: "/settings", icon: Settings },
];

type SidebarProps = {
  userName: string | null;
  userEmail: string;
};

export default function Sidebar({ userName, userEmail }: SidebarProps) {
  const pathname = usePathname();

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : userEmail[0].toUpperCase();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-60 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-600">
          <BriefcaseIcon className="w-4 h-4 text-white" />
        </div>
        <span className="text-[15px] font-semibold text-sidebar-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          CareerOS
        </span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className={cn("w-4 h-4 flex-shrink-0", active ? "text-white" : "text-sidebar-foreground/50")} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3 space-y-0.5 border-t border-sidebar-border pt-3">
        {bottomItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0 text-sidebar-foreground/50" />
              {label}
            </Link>
          );
        })}

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:text-white hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4 flex-shrink-0 text-sidebar-foreground/50" />
            Sign out
          </button>
        </form>

        <div className="flex items-center gap-3 px-3 py-2.5 mt-1">
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-white">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{userName ?? "User"}</p>
            <p className="text-xs text-sidebar-foreground/50 truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}