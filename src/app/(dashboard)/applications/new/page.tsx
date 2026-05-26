import ApplicationForm from "@/components/applications/application-form";

export default function NewApplicationPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
          Add application
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Track a new job you&apos;ve applied to or are interested in</p>
      </div>
      <ApplicationForm />
    </div>
  );
}