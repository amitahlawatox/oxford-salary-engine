import { useState, useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { fmt } from "@/lib/format";

const SITE = "https://uknetpay.co.uk";

const REGIONS = [
  { label: "Inner London", hourly: 13.50, fullDay: 115 },
  { label: "Outer London", hourly: 11.20, fullDay: 95 },
  { label: "South East", hourly: 9.80, fullDay: 82 },
  { label: "East of England", hourly: 9.20, fullDay: 77 },
  { label: "South West", hourly: 8.90, fullDay: 74 },
  { label: "West Midlands", hourly: 8.40, fullDay: 70 },
  { label: "East Midlands", hourly: 8.10, fullDay: 68 },
  { label: "Yorkshire", hourly: 8.00, fullDay: 67 },
  { label: "North West", hourly: 7.90, fullDay: 66 },
  { label: "North East", hourly: 7.50, fullDay: 63 },
  { label: "Wales", hourly: 7.80, fullDay: 65 },
  { label: "Scotland", hourly: 8.20, fullDay: 69 },
];

// Gov.uk funded hours 2026 (England)
const FUNDED = {
  age2: 15,   // 15 hours/week for eligible 2-year-olds
  age3_4: 30, // 30 hours/week for 3-4 year olds (working parents)
  age3_4_basic: 15, // 15 hours universal
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Childcare Cost Calculator UK 2026",
  url: `${SITE}/childcare`,
  description: "Calculate your monthly childcare costs after government-funded hours for 2026. Covers 15-hour and 30-hour free childcare, Tax-Free Childcare, and salary sacrifice.",
  applicationCategory: "FinanceApplication",
};

const Childcare = () => {
  const [region, setRegion] = useState(0);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [childAge, setChildAge] = useState<"under2"|"2"|"3_4">("3_4");
  const [workingParent, setWorkingParent] = useState(true);
  const [weeksPerYear, setWeeksPerYear] = useState(48);
  const [salary, setSalary] = useState(35000);

  const r = REGIONS[region];

  const fundedHours = useMemo(() => {
    if (childAge === "under2") return 0;
    if (childAge === "2") return FUNDED.age2;
    return workingParent ? FUNDED.age3_4 : FUNDED.age3_4_basic;
  }, [childAge, workingParent]);

  const paidHours = Math.max(0, hoursPerWeek - fundedHours);
  const weeklyGross = paidHours * r.hourly;
  const annualGross = weeklyGross * weeksPerYear;
  const monthlyGross = annualGross / 12;

  // Tax-Free Childcare: govt tops up 20p per £1, max £2,000/yr top-up per child
  const tfcTopup = Math.min(annualGross * 0.20, 2000);
  const annualAfterTFC = annualGross - tfcTopup;
  const monthlyAfterTFC = annualAfterTFC / 12;

  // Salary sacrifice estimate (saves income tax + NI on sacrifice amount)
  const taxRate = salary > 50270 ? 0.40 : 0.20;
  const niRate = 0.08;
  const sacrificeAnnual = Math.min(monthlyGross * 12, 55000); // rough cap
  const salarySacrifSaving = sacrificeAnnual * (taxRate + niRate);
  const monthlySaving = salarySacrifSaving / 12;

  return (
    <Shell>
      <Seo
        title="Childcare Cost Calculator UK 2026 — After Free Hours & Tax-Free Childcare"
        description="Calculate monthly childcare costs in 2026 after government-funded hours. Covers 15 and 30 hours free childcare, Tax-Free Childcare 20% top-up, and salary sacrifice savings."
        path="/childcare"
        jsonLd={jsonLd}
      />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold mb-2">Childcare Cost Calculator 2026</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Estimate your monthly childcare costs after government-funded hours, Tax-Free Childcare, and salary sacrifice savings.
          Based on <a href="https://www.gov.uk/free-childcare-education-eligibility" target="_blank" rel="noopener noreferrer" className="underline text-accent">gov.uk funded hours rules for 2026</a>.
        </p>

        <div className="grid gap-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Child age</label>
              <select value={childAge} onChange={e => setChildAge(e.target.value as typeof childAge)} className="w-full">
                <option value="under2">Under 2 years</option>
                <option value="2">2 years old</option>
                <option value="3_4">3–4 years old</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <select value={region} onChange={e => setRegion(Number(e.target.value))} className="w-full">
                {REGIONS.map((reg, i) => <option key={reg.label} value={i}>{reg.label}</option>)}
              </select>
            </div>
          </div>

          {childAge === "3_4" && (
            <div>
              <label className="block text-sm font-medium mb-1">Both parents working?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" checked={workingParent} onChange={() => setWorkingParent(true)} /> Yes — 30 hours free
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="radio" checked={!workingParent} onChange={() => setWorkingParent(false)} /> No — 15 hours free
                </label>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Hours per week needed</label>
              <input type="number" min={1} max={60} value={hoursPerWeek}
                onChange={e => setHoursPerWeek(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Weeks per year</label>
              <input type="number" min={1} max={52} value={weeksPerYear}
                onChange={e => setWeeksPerYear(Number(e.target.value))} className="w-full" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Your salary (for salary sacrifice saving)</label>
            <input type="number" min={10000} max={500000} step={1000} value={salary}
              onChange={e => setSalary(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* Results */}
        <div className="rounded-xl border border-border bg-secondary/30 p-6 space-y-4 mb-6">
          <h2 className="text-base font-semibold">Your childcare costs — {r.label}</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-background p-4">
              <p className="text-xs text-muted-foreground">Government-funded hours</p>
              <p className="text-xl font-semibold">{fundedHours} hrs/week</p>
              <p className="text-xs text-muted-foreground mt-1">
                {childAge === "under2" ? "No funded hours — under 2" :
                 childAge === "2" ? "15 hours for eligible 2-year-olds" :
                 workingParent ? "30 hours (working parents)" : "15 hours universal"}
              </p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-xs text-muted-foreground">Hours you pay for</p>
              <p className="text-xl font-semibold">{paidHours} hrs/week</p>
              <p className="text-xs text-muted-foreground mt-1">at {fmt(r.hourly)}/hr in {r.label}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-background p-4 text-center">
              <p className="text-xs text-muted-foreground">Monthly (no discounts)</p>
              <p className="text-lg font-semibold">{fmt(monthlyGross)}</p>
            </div>
            <div className="rounded-lg bg-background p-4 text-center border-2 border-accent/30">
              <p className="text-xs text-muted-foreground">With Tax-Free Childcare</p>
              <p className="text-lg font-semibold text-accent">{fmt(monthlyAfterTFC)}</p>
              <p className="text-[10px] text-muted-foreground">saves {fmt(tfcTopup / 12)}/mo</p>
            </div>
            <div className="rounded-lg bg-background p-4 text-center">
              <p className="text-xs text-muted-foreground">Salary sacrifice saving</p>
              <p className="text-lg font-semibold text-green-600 dark:text-green-400">−{fmt(monthlySaving)}/mo</p>
              <p className="text-[10px] text-muted-foreground">tax+NI saving</p>
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="prose prose-sm dark:prose-invert mb-6">
          <h2>How the 30 hours free childcare works</h2>
          <p>
            Working parents of 3–4 year olds in England are entitled to <strong>30 hours of free childcare per week</strong> for up to 38 weeks per year (term time). Both parents must work at least 16 hours per week and earn at least the National Living Wage. Apply via the <a href="https://www.gov.uk/apply-free-childcare-if-you-work" target="_blank" rel="noopener noreferrer">gov.uk childcare portal</a>.
          </p>
          <h2>Tax-Free Childcare</h2>
          <p>
            For every £8 you pay into a Tax-Free Childcare account, the government adds £2 — a 20% top-up worth up to <strong>£2,000 per year per child</strong> (£4,000 if your child is disabled). You can use Tax-Free Childcare alongside the funded hours.
          </p>
          <h2>Childcare via salary sacrifice</h2>
          <p>
            Some employers offer childcare via salary sacrifice, where you pay for childcare from your pre-tax salary. This saves income tax (20% or 40%) and National Insurance (8%) on the amount sacrificed — the saving shown above is an estimate based on your salary level.
          </p>
          <p><strong>Sources:</strong> <a href="https://www.gov.uk/free-childcare-education-eligibility" target="_blank" rel="noopener noreferrer">gov.uk — Free childcare eligibility</a> · <a href="https://www.gov.uk/tax-free-childcare" target="_blank" rel="noopener noreferrer">gov.uk — Tax-Free Childcare</a></p>
        </div>

        <ResultDisclaimer />
      </div>
    </Shell>
  );
};

export default Childcare;
