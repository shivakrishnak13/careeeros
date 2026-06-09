import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import {
  BriefcaseBusiness,
  BarChart3,
  Brain,
  FileText,
  Mail,
  CalendarCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

export default async function HomePage() {
  const user = await getCurrentUser();
  if (user) redirect("/overview");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm">
              <BriefcaseBusiness className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
              CareerOS
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">How it works</a>
            <a href="#why" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Why CareerOS</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-4 py-2 rounded-lg hover:bg-muted"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl transition-colors shadow-sm"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-24 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
          <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-brand-200/20 rounded-full blur-3xl" />
        </div>
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            AI-powered career management platform
          </div>
          <h1
            className="text-5xl md:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Manage Your Entire
            <br />
            <span className="text-brand-600">Job Hunt with AI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            CareerOS helps you track applications, prepare for interviews, optimize resumes, and stay organized throughout your career journey — all in one intelligent workspace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3.5 rounded-xl transition-colors shadow-md text-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-card border border-border hover:bg-muted text-foreground font-medium px-6 py-3.5 rounded-xl transition-colors text-sm"
            >
              Explore Features
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-5xl mt-16 px-4">
          <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
              <div className="w-3 h-3 rounded-full bg-green-400/70" />
              <div className="flex-1 mx-4 bg-muted rounded-md h-6 max-w-xs" />
            </div>
            <div className="grid grid-cols-12 h-72">
              <div className="col-span-2 border-r border-border bg-sidebar p-3 flex flex-col gap-1">
                {["Overview", "Applications", "Interviews", "AI Tools", "Analytics"].map((item, i) => (
                  <div
                    key={item}
                    className={`text-xs px-2 py-1.5 rounded-md ${i === 0 ? "bg-sidebar-accent text-white font-medium" : "text-sidebar-foreground/60"}`}
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div className="col-span-10 p-5 bg-background">
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: "Total Applied", value: "24", color: "bg-brand-500" },
                    { label: "Interviews", value: "8", color: "bg-sky-500" },
                    { label: "Offers", value: "2", color: "bg-emerald-500" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-card border border-border rounded-xl p-3">
                      <div className={`w-6 h-1 ${stat.color} rounded-full mb-2`} />
                      <div className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-card border border-border rounded-xl p-3">
                  <div className="text-xs font-medium text-foreground mb-3">Recent Applications</div>
                  <div className="space-y-2">
                    {[
                      { company: "Stripe", role: "Frontend Engineer", status: "Interview", color: "bg-sky-100 text-sky-700" },
                      { company: "Linear", role: "Product Designer", status: "Applied", color: "bg-brand-100 text-brand-700" },
                      { company: "Vercel", role: "DX Engineer", status: "Offer", color: "bg-emerald-100 text-emerald-700" },
                    ].map((app) => (
                      <div key={app.company} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                            {app.company[0]}
                          </div>
                          <div>
                            <div className="text-xs font-medium text-foreground">{app.company}</div>
                            <div className="text-xs text-muted-foreground">{app.role}</div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${app.color}`}>{app.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-border bg-muted/30">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Zap, label: "10+ productivity features" },
              { icon: Brain, label: "AI-powered career tools" },
              { icon: TrendingUp, label: "Real-time application tracking" },
              { icon: Users, label: "Built for modern job seekers" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-brand-600" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Everything You Need to Manage Your Career
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Six powerful modules working together to streamline every stage of your job search.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: BriefcaseBusiness,
                title: "Smart Application Tracking",
                description: "Organize all your job applications in one place. Track statuses, deadlines, recruiter details, salary expectations, and progress across every opportunity.",
                bullets: ["Create and manage job applications", "Track application statuses", "Add notes and recruiter details", "Organize interviews and timelines", "Search and filter applications"],
                accent: "brand",
              },
              {
                icon: CalendarCheck,
                title: "Interview Workflow Management",
                description: "Stay prepared and organized through every interview round. Schedule interviews, save feedback, and track progress from screening to final offer.",
                bullets: ["Track multiple interview rounds", "Save interview notes & feedback", "Timeline-based interview flow", "Upcoming interview reminders", "Status progression tracking"],
                accent: "sky",
              },
              {
                icon: Brain,
                title: "AI Interview Preparation",
                description: "Generate realistic interview questions and model answers tailored to your target role, company, and focus area using AI-powered career assistance.",
                bullets: ["Technical interview questions", "Behavioral STAR-method prep", "Company-specific preparation", "Role-focused question generation", "AI-generated model answers"],
                accent: "violet",
              },
              {
                icon: FileText,
                title: "AI Resume Optimization",
                description: "Tailor your resume for every application using AI. Match job descriptions, identify missing keywords, and improve your chances of getting shortlisted.",
                bullets: ["Resume keyword optimization", "Job description matching", "ATS-friendly improvements", "AI-generated bullet enhancements", "Personalized resume suggestions"],
                accent: "amber",
              },
              {
                icon: Mail,
                title: "AI Cover Letter Generator",
                description: "Generate professional, personalized cover letters instantly using your application details, role information, and preferred writing tone.",
                bullets: ["Personalized cover letters", "Multiple writing tones", "Application-aware generation", "Copy-ready formatting", "Fast AI generation"],
                accent: "emerald",
              },
              {
                icon: BarChart3,
                title: "Career Insights & Analytics",
                description: "Visualize your job search progress with powerful analytics dashboards. Monitor interviews, offers, rejection rates, and overall application performance.",
                bullets: ["Application status breakdown", "Interview conversion tracking", "Weekly activity charts", "Offer & rejection insights", "Career progress visualization"],
                accent: "rose",
              },
            ].map((feature) => {
              const accentMap: Record<string, string> = {
                brand: "bg-brand-100 text-brand-600",
                sky: "bg-sky-100 text-sky-600",
                violet: "bg-violet-100 text-violet-600",
                amber: "bg-amber-100 text-amber-600",
                emerald: "bg-emerald-100 text-emerald-600",
                rose: "bg-rose-100 text-rose-600",
              };
              return (
                <div
                  key={feature.title}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-md hover:border-brand-200 transition-all duration-200"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${accentMap[feature.accent]}`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                  <ul className="space-y-1.5">
                    {feature.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-500 mt-0.5 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-24 px-6 bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              How CareerOS Works
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Add Your Applications", description: "Track jobs you've applied to from LinkedIn, company portals, or referrals." },
              { step: "2", title: "Manage Interviews", description: "Organize interview rounds, notes, schedules, and feedback." },
              { step: "3", title: "Use AI Career Tools", description: "Generate interview prep, optimize resumes, and create cover letters instantly." },
              { step: "4", title: "Analyze Your Progress", description: "Monitor application trends and improve your job search strategy." },
            ].map((item, i) => (
              <div key={item.step} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-5 left-full w-full h-px bg-border z-0 -translate-x-1/2" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-10 h-10 rounded-full bg-brand-600 text-white text-sm font-bold flex items-center justify-center mb-4 shadow-md" style={{ fontFamily: "var(--font-heading)" }}>
                    {item.step}
                  </div>
                  <h3 className="text-sm font-semibold text-foreground mb-2" style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Built for Modern Job Seekers
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
                CareerOS combines productivity, organization, and AI-powered career assistance into one streamlined platform designed to simplify the entire job search experience.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "AI-powered productivity",
                  "Modern dashboard experience",
                  "Organized career management",
                  "Faster interview preparation",
                  "Smarter application tracking",
                  "Clean & responsive design",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>Analytics Overview</div>
                  <div className="text-xs text-muted-foreground">Your job search at a glance</div>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Applications sent", value: "24", bar: "w-full", color: "bg-brand-500" },
                  { label: "Interview rate", value: "33%", bar: "w-1/3", color: "bg-sky-500" },
                  { label: "Offer conversion", value: "25%", bar: "w-1/4", color: "bg-emerald-500" },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className="font-medium text-foreground">{row.value}</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div className={`h-full ${row.bar} ${row.color} rounded-full`} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <div className="text-xs text-muted-foreground mb-2">Application Status Breakdown</div>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { label: "Applied", color: "bg-brand-100 text-brand-700" },
                    { label: "Interview", color: "bg-sky-100 text-sky-700" },
                    { label: "Offer", color: "bg-emerald-100 text-emerald-700" },
                    { label: "Rejected", color: "bg-red-100 text-red-700" },
                  ].map((s) => (
                    <span key={s.label} className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.color}`}>{s.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="bg-brand-600 rounded-3xl px-10 py-14 relative overflow-hidden">
            <div className="absolute inset-0 bg-brand-700/30 rounded-3xl" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-heading)" }}>
                Start Managing Your Career Smarter
              </h2>
              <p className="text-brand-200 mb-8 leading-relaxed text-sm max-w-md mx-auto">
                Track applications, prepare confidently, and streamline your entire job hunt with CareerOS.
              </p>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50 font-semibold px-7 py-3.5 rounded-xl transition-colors shadow-md text-sm"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card py-10 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center shadow-sm">
                <BriefcaseBusiness className="w-3.5 h-3.5 text-white" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>CareerOS</div>
                <div className="text-xs text-muted-foreground">AI-powered career management platform</div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {["Features", "Dashboard", "AI Tools", "Analytics"].map((link) => (
                <a
                  key={link}
                  href={link === "Features" ? "#features" : "/login"}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} CareerOS. Built for modern job seekers.</span>
            <span className="hidden sm:inline">·</span>
            <span>Built by <span className="font-medium text-foreground"><a href="https://shivakrishnak13.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Shivakrishna Kosari</a></span></span>
            <span>·</span>
            <a href="https://github.com/shivakrishnak13" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <span>·</span>
            <a href="https://linkedin.com/in/shivakrishna-kosari" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}