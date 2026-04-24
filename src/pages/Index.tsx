import { Link } from "react-router-dom";
import { ArrowRight, Calculator, Clock, RotateCcw, TrendingUp, Users, Briefcase, Baby, Hammer, Building2, FileSignature, MapPin } from "lucide-react";
import { Shell } from "@/components/layout/Shell";

type Tool = {
  to: string;
  title: string;
  desc: string;
  icon: typeof Calculator;
  status: "live" | "soon";
  unique?: boolean;
};

const TOOLS: Tool[] = [
  { to: "/take-home", title: "Take-Home Calculator", desc: "Annual gross → net. Tax code, all SL plans, bonus, overtime, pension.", icon: Calculator, status: "live" },
  { to: "/hourly", title: "Hourly Wage", desc: "Hourly rate + hours/week → annual take-home.", icon: Clock, status: "live" },
  { to: "/reverse", title: "Reverse Salary", desc: "Target net income → required gross salary.", icon: RotateCcw, status: "live" },
  { to: "/pay-rise", title: "Pay Rise Simulator", desc: "How much of that raise actually reaches your bank account?", icon: TrendingUp, status: "live", unique: true },
  { to: "#", title: "Two-Salary Compare", desc: "Side-by-side: current job vs new offer.", icon: Users, status: "soon" },
  { to: "#", title: "Pro-Rata", desc: "Part-time hours → adjusted salary + tax.", icon: Briefcase, status: "soon" },
  { to: "#", title: "Two Jobs", desc: "Combined tax across two employments.", icon: Briefcase, status: "soon" },
  { to: "#", title: "Maternity / SMP / Sick", desc: "Reduced-pay periods impact.", icon: Baby, status: "soon" },
  { to: "#", title: "Self-Employed", desc: "Class 2 + 4 NI, payments on account.", icon: Hammer, status: "soon", unique: true },
  { to: "#", title: "Dividend Optimiser", desc: "Director salary + dividends split.", icon: Building2, status: "soon", unique: true },
  { to: "#", title: "IR35 Contractor", desc: "Inside vs outside IR35 take-home.", icon: FileSignature, status: "soon", unique: true },
  { to: "#", title: "Cost-of-Living Overlay", desc: "Does your net cover London? Manchester?", icon: MapPin, status: "soon", unique: true },
];

const Index = () => {
  return (
    <Shell>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Updated for 2026/27 tax year
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight max-w-3xl">
          UK take-home pay,<br />calculated to the penny.
        </h1>
        <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
          A precise suite of UK tax calculators — Income Tax, NI, Student Loan, pension, dividends.
          Live recalculation, shareable links, PDF export. No sign-up. No tracking.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/take-home"
            className="inline-flex items-center gap-2 bg-foreground text-background rounded-md px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
          >
            Open take-home calculator <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/pay-rise"
            className="inline-flex items-center gap-2 border border-border rounded-md px-5 py-2.5 text-sm font-medium hover:bg-secondary transition"
          >
            Try pay-rise simulator
          </Link>
        </div>
      </section>

      {/* Tools grid */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">All calculators</h2>
          <span className="text-xs text-muted-foreground tabular">{TOOLS.filter((t) => t.status === "live").length} live · {TOOLS.filter((t) => t.status === "soon").length} coming</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            const isLive = t.status === "live";
            const Wrapper: React.ElementType = isLive ? Link : "div";
            return (
              <Wrapper
                key={t.title}
                to={isLive ? t.to : undefined}
                className={`group relative border border-border rounded-lg p-5 bg-card transition-all ${
                  isLive ? "hover:border-foreground/40 hover:shadow-sm cursor-pointer" : "opacity-60"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="h-9 w-9 rounded-md bg-secondary flex items-center justify-center">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    {t.unique && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-accent/15 text-accent uppercase tracking-wider">Unique</span>
                    )}
                    {!isLive && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wider">Soon</span>
                    )}
                  </div>
                </div>
                <div className="mt-4 font-medium tracking-tight">{t.title}</div>
                <div className="mt-1 text-sm text-muted-foreground leading-snug">{t.desc}</div>
                {isLive && (
                  <div className="mt-3 inline-flex items-center gap-1 text-xs text-foreground/70 group-hover:text-foreground transition">
                    Open <ArrowRight className="h-3 w-3" />
                  </div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </section>
    </Shell>
  );
};

export default Index;
