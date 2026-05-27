import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/settings/profile-form";
import ChangePasswordForm from "@/components/settings/change-password-form";
import DangerZone from "@/components/settings/danger-zone";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  return (
    <div className="max-w-xl space-y-6 pb-10">
      <div>
        <h1
          className="text-lg font-semibold text-foreground"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Manage your account details and preferences
        </p>
      </div>

      <section className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Profile
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Update your display name. Your email cannot be changed.
          </p>
        </div>
        <div className="px-5 py-4">
          <ProfileForm initialName={user.name ?? ""} initialEmail={user.email} />
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Password
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Change your account password
          </p>
        </div>
        <div className="px-5 py-4">
          <ChangePasswordForm />
        </div>
      </section>

      <section className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2
            className="text-sm font-semibold text-foreground"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Account
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Sign out or permanently delete your account
          </p>
        </div>
        <div className="px-5 py-4">
          <DangerZone />
        </div>
      </section>
    </div>
  );
}