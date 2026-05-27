import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  FileText,
  Layers3,
  Sparkles,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/session";

const stats = [
  "10+ productivity features",
  "AI-powered career tools",
  "Real-time application tracking",
  "Modern SaaS experience",
];

const features = [
  {
    icon: Layers3,
    title: "Smart Application Tracking",
    description:
      "Organize all your job applications in one place. Track statuses, deadlines, recruiter details, salary expectations, and progress across every opportunity.",
    bullets: [
      "Create and manage job applications",
      "Track application statuses",
      "Add notes and recruiter details",
      "Organize interviews and timelines",
      "Search and filter applications",
    ],
  },
  {
    icon: Target,
    title: "Interview Workflow Management",
    description:
      "Stay prepared and organized through every interview round. Schedule interviews, save feedback, and track progress from screening to final offer.",
    bullets: [
      "Track multiple interview rounds",
      "Save interview notes & feedback",
      "Timeline-based interview flow",
      "Upcoming interview reminders",
      "Status progression tracking",
    ],
  },
  {
    icon: Sparkles,
    title: "AI Interview Preparation",
    description:
      "Generate realistic interview questions and model answers tailored to your target role, company, and focus area using AI-powered career assistance.",
    bullets: [
      "Technical interview questions",
      "Behavioral STAR-method prep",
      "Company-specific preparation",
      "Role-focused question generation",
      "AI-generated model answers",
    ],
  },
  {
    icon: FileText,
    title: "AI Resume Optimization",
    description:
      "Tailor your resume for every application using AI. Match job descriptions, identify missing keywords, and improve your chances of getting shortlisted.",
    bullets: [
      "Resume keyword optimization",
      "Job description matching",
      "ATS-friendly improvements",
      "AI-generated bullet enhancements",
      "Personalized resume suggestions",
    ],
  },
  {
    icon: Bot,
    title: "AI Cover Letter Generator",
    description:
      "Generate professional, personalized cover letters instantly using your application details, role information, and preferred writing tone.",
    bullets: [
      "Personalized cover letters",
      "Multiple writing tones",
      "Application-aware generation",
      "Copy-ready formatting",
      "Fast AI generation",
    ],
  },
  {
    icon: BarChart3,
    title: "Career Insights & Analytics",
    description:
      "Visualize your job search progress with powerful analytics dashboards. Monitor interviews, offers, rejection rates, and overall application performance.",
    bullets: [
      "Application status breakdown",
      "Interview conversion tracking",
      "Weekly activity charts",
      "Offer & rejection insights",
      "Career progress visualization",
    ],
  },
];

const steps = [
  "Track jobs you've applied to from LinkedIn, company portals, or referrals.",
  "Organize interview rounds, notes, schedules, and feedback.",
  "Generate interview prep, optimize resumes, and create cover letters instantly.",
  "Monitor application trends and improve your job search strategy.",
];

const benefits = [
  "AI-powered productivity",
  "Modern dashboard experience",
  "Organized career management",
  "Faster interview preparation",
  "Smarter application tracking",
  "Clean & responsive design",
];

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#preview" },
  { label: "AI Tools", href: "#features" },
  { label: "Analytics", href: "#analytics" },
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default async function Home() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/overview");
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.18),transparent_55%)]" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,transparent,rgba(79,70,229,0.03),transparent)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20">
              <BriefcaseBusiness className="h-5 w-5" />
            </div>
            <div>
              <div className="font-heading text-lg font-semibold">CareerOS</div>
              <div className="text-xs text-muted-foreground">AI-powered career management platform</div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="rounded-xl px-4 text-sm">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="h-10 rounded-xl bg-brand-600 px-4 text-white hover:bg-brand-700">
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </header>

        <section className="grid gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-100">
              <Sparkles className="h-4 w-4" />
              AI-powered productivity platform for the entire job search lifecycle
            </div>

            <h1 className="mt-6 max-w-xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Manage Your Entire Job Hunt with AI
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              CareerOS helps you track applications, prepare for interviews, optimize resumes, and stay organized throughout your career journey — all in one intelligent workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 rounded-xl bg-brand-600 px-6 text-sm font-medium text-white hover:bg-brand-700">
                <Link href="/register">
                  Get Started Free
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-xl border-border bg-card/70 px-6 text-sm backdrop-blur">
                <Link href="#features">
                  Explore Features
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {stats.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card/80 px-4 py-3 text-sm text-foreground shadow-sm backdrop-blur"
                >
                  <span className="h-2 w-2 rounded-full bg-brand-500" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div id="preview" className="relative">
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="absolute -right-6 bottom-6 h-32 w-32 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="rounded-[2rem] border border-border/70 bg-card/75 p-4 shadow-2xl shadow-brand-900/10 backdrop-blur">
              <div className="rounded-[1.5rem] border border-border/70 bg-background/95 p-4">
                <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                  <Card className="rounded-[1.5rem] border border-border/70 bg-card shadow-none">
                    <CardContent className="space-y-4 p-5">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Application pipeline</p>
                          <h3 className="mt-1 font-heading text-lg font-semibold">24 active opportunities</h3>
                        </div>
                        <div className="rounded-2xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                          +18%
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          { label: "Applied", value: "12", tone: "bg-brand-500" },
                          { label: "Interview", value: "8", tone: "bg-sky-500" },
                          { label: "Offers", value: "4", tone: "bg-emerald-500" },
                        ].map((item) => (
                          <div key={item.label} className="rounded-2xl border border-border/70 bg-background p-4">
                            <div className={`h-2 w-10 rounded-full ${item.tone}`} />
                            <div className="mt-4 text-2xl font-semibold">{item.value}</div>
                            <div className="mt-1 text-xs text-muted-foreground">{item.label}</div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-2xl border border-border/70 bg-background p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Weekly activity</p>
                            <p className="text-xs text-muted-foreground">Applications, follow-ups, interviews</p>
                          </div>
                          <span className="text-xs text-brand-600 dark:text-brand-200">Last 7 days</span>
                        </div>
                        <div className="mt-5 flex h-32 items-end gap-3">
                          {[36, 54, 48, 72, 66, 92, 80].map((height, index) => (
                            <div key={index} className="flex flex-1 flex-col items-center gap-2">
                              <div
                                className="w-full rounded-t-2xl bg-gradient-to-t from-brand-600 to-brand-200 dark:from-brand-500 dark:to-brand-200/70"
                                style={{ height: `${height}%` }}
                              />
                              <span className="text-[11px] text-muted-foreground">
                                {["M", "T", "W", "T", "F", "S", "S"][index]}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4">
                    <Card className="rounded-[1.5rem] border border-border/70 bg-card shadow-none">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">AI interview prep</p>
                            <h3 className="mt-1 font-heading text-lg font-semibold">Frontend Engineer at Vercel</h3>
                          </div>
                          <div className="rounded-2xl bg-brand-50 p-2 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                            <Bot className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="mt-4 space-y-3">
                          {[
                            "Tell me about a performance issue you solved in React.",
                            "How would you structure a scalable design system?",
                            "Walk through a time you handled conflicting stakeholder priorities.",
                          ].map((question) => (
                            <div key={question} className="rounded-2xl bg-muted px-4 py-3 text-sm leading-6 text-foreground">
                              {question}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card id="analytics" className="rounded-[1.5rem] border border-border/70 bg-card shadow-none">
                      <CardContent className="space-y-4 p-5">
                        <div>
                          <p className="text-sm text-muted-foreground">Upcoming interviews</p>
                          <h3 className="mt-1 font-heading text-lg font-semibold">Stay on top of every round</h3>
                        </div>
                        {[
                          { role: "Product Designer", company: "Notion", time: "Today, 4:00 PM" },
                          { role: "Backend Engineer", company: "Supabase", time: "Tomorrow, 10:30 AM" },
                        ].map((item) => (
                          <div key={item.role} className="flex items-center justify-between rounded-2xl border border-border/70 bg-background px-4 py-3">
                            <div>
                              <div className="font-medium">{item.role}</div>
                              <div className="text-sm text-muted-foreground">{item.company}</div>
                            </div>
                            <div className="text-right text-xs text-muted-foreground">{item.time}</div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="grid gap-4 rounded-[2rem] border border-border/70 bg-card/65 p-6 shadow-sm backdrop-blur sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-background/80 px-5 py-4 text-sm font-medium text-foreground">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
              Product capabilities
            </div>
            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything You Need to Manage Your Career
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
              CareerOS is an AI-powered productivity platform for managing the entire job search lifecycle.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={feature.title}
                  className="rounded-[1.75rem] border border-border/70 bg-card/90 py-0 shadow-sm transition-transform duration-200 hover:-translate-y-1"
                >
                  <CardContent className="p-6 sm:p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-heading text-2xl font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                      {feature.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {feature.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-foreground">
                          <Check className="mt-0.5 h-4 w-4 flex-none text-brand-600 dark:text-brand-200" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="grid gap-10 py-16 sm:py-20 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <div className="inline-flex rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground backdrop-blur">
              How CareerOS Works
            </div>
            <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
              A cleaner workflow for your entire job search
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Replace scattered spreadsheets, tabs, and notes with one focused workspace that keeps your applications, interviews, and AI career tools connected.
            </p>
          </div>

          <div className="grid gap-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className="rounded-[1.5rem] border border-border/70 bg-card/90 p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand-600 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      {[
                        "Add Your Applications",
                        "Manage Interviews",
                        "Use AI Career Tools",
                        "Analyze Your Progress",
                      ][index]}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground sm:text-base">{step}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="rounded-[2rem] border border-border/70 bg-card/80 p-8 shadow-sm backdrop-blur sm:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-sm text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-100">
                  Built for Modern Job Seekers
                </div>
                <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                  Built for Modern Job Seekers
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  CareerOS combines productivity, organization, and AI-powered career assistance into one streamlined platform designed to simplify the entire job search experience.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/90 px-5 py-4 text-sm font-medium"
                  >
                    <Check className="h-4 w-4 text-brand-600 dark:text-brand-200" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="rounded-[2rem] border border-brand-200/70 bg-gradient-to-br from-brand-50 via-card to-card p-8 shadow-sm dark:border-brand-500/20 dark:from-brand-500/10 dark:via-card dark:to-card sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
                Start Managing Your Career Smarter
              </h2>
              <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                Track applications, prepare confidently, and streamline your entire job hunt with CareerOS.
              </p>
              <Button asChild className="mt-8 h-12 rounded-xl bg-brand-600 px-6 text-sm font-medium text-white hover:bg-brand-700">
                <Link href="/register">
                  Get Started
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <footer className="border-t border-border/70 py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-heading text-lg font-semibold">CareerOS</div>
              <div className="mt-1 text-sm text-muted-foreground">AI-powered career management platform</div>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
