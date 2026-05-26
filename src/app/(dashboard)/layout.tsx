import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import Sidebar from "@/components/common/sidebar";
import Topbar from "@/components/common/topbar";
import Footer from "@/components/common/footer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar userName={user.name} userEmail={user.email} />
      <div className="flex flex-col flex-1 min-w-0 ml-60">
        <Topbar userName={user.name} />
        <main className="flex-1 overflow-y-auto">
          <div className="px-6 py-6 max-w-screen-xl mx-auto">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}