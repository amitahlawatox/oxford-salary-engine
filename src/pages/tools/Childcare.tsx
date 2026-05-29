import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { CheckCircle2, XCircle, AlertCircle, ChevronDown, Baby, Clock, MapPin, PoundSterling } from "lucide-react";

const SITE = "https://uknetpay.co.uk";

// ── REGIONAL HOURLY RATES (nursery / childminder / nanny) ─────────────────────
// Source: Coram Family & Childcare Survey 2025, Nursery World 2026
const REGIONS: { label: string; nursery: number[]; childminder: number[]; nanny: number[] }[] = [
  // nursery: [under2, age2, age3_4]  childminder: [under2, age2, age3_4]  nanny: [all]
  { label: "Inner London",         nursery: [16.20, 14.80, 13.50], childminder: [13.50, 12.20, 11.00], nanny: [18.00] },
  { label: "Outer London",         nursery: [13.40, 12.20, 11.10], childminder: [11.20, 10.20,  9.20], nanny: [15.50] },
  { label: "South East",           nursery: [11.20, 10.20,  9.30], childminder: [ 9.80,  8.90,  8.00], nanny: [14.00] },
  { label: "East of England",      nursery: [10.60,  9.70,  8.80], childminder: [ 9.20,  8.40,  7.60], nanny: [13.00] },
  { label: "South West",           nursery: [10.20,  9.30,  8.50], childminder: [ 8.90,  8.10,  7.30], nanny: [12.50] },
  { label: "East Midlands",        nursery: [ 9.50,  8.70,  7.90], childminder: [ 8.20,  7.50,  6.80], nanny: [12.00] },
  { label: "West Midlands",        nursery: [ 9.60,  8.80,  8.00], childminder: [ 8.40,  7.70,  7.00], nanny: [12.00] },
  { label: "Yorkshire & Humber",   nursery: [ 9.30,  8.50,  7.70], childminder: [ 8.00,  7.30,  6.60], nanny: [11.50] },
  { label: "North West",           nursery: [ 9.20,  8.40,  7.60], childminder: [ 7.90,  7.20,  6.50], nanny: [11.50] },
  { label: "North East",           nursery: [ 8.80,  8.00,  7.30], childminder: [ 7.50,  6.80,  6.20], nanny: [11.00] },
  { label: "Wales",                nursery: [ 9.10,  8.30,  7.50], childminder: [ 7.80,  7.10,  6.40], nanny: [11.00] },
  { label: "Scotland",             nursery: [ 9.40,  8.60,  7.80], childminder: [ 8.20,  7.50,  6.80], nanny: [12.00] },
  { label: "Northern Ireland",     nursery: [ 8.60,  7.80,  7.10], childminder: [ 7.30,  6.70,  6.00], nanny: [10.50] },
];

type CareType = "nursery" | "childminder" | "nanny" | "afterschool";
type ChildAge = "under2" | "age2" | "age3_4";

const AGE_LABEL: Record<ChildAge, string> = {
  under2: "Under 2 years",
  age2: "2 years old",
  age3_4: "3–4 years old",
};

const CARE_LABEL: Record<CareType, string> = {
  nursery: "Nursery",
  childminder: "Childminder",
  nanny: "Nanny",
  afterschool: "After-school / holiday club",
};

const WEEKLY_CONTRACT = 52;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Childcare Cost Calculator UK 2026",
  url: `${SITE}/childcare`,
  description: "Calculate monthly UK childcare costs for nursery, childminder, or nanny after government-funded hours. Checks eligibility for 30 hours free childcare and Tax-Free Childcare.",
  applicationCategory: "FinanceApplication",
  featureList: ["30 hours free childcare", "15 hours funded", "Tax-Free Childcare", "Universal Credit childcare", "Multiple care types", "Regional rates"],
};

// ── ELIGIBILITY ───────────────────────────────────────────────────────────────
function get30HoursFunded(childAge: ChildAge, bothParentsWork: boolean, income1: number, income2: number) {
  if (childAge !== "age3_4") return false;
  if (!bothParentsWork) return false;
  const quarterMin = 1000; // £1,000 per quarter minimum (NMW 16hrs)
  const annualMin = quarterMin * 4;
  if (income1 < annualMin || income2 < annualMin) return false;
  if (income1 > 100000 || income2 > 100000) return false;
  return true;
}

function get15HoursAge2(childAge: ChildAge, bothParentsWork: boolean, income1: number) {
  if (childAge !== "age2") return false;
  if (!bothParentsWork) return false;
  return income1 >= 4000 && income1 <= 100000; // must work, earn £4k+, under £100k
}

function getTFCEligible(bothParentsWork: boolean, income1: number, income2: number) {
  if (!bothParentsWork) return false;
  const quarterMin = 2379; // NMW 16hrs per week
  return income1 >= quarterMin && income2 >= quarterMin && income1 <= 100000 && income2 <= 100000;
}

const Childcare = () => {
  // Inputs
  const [numChildren, setNumChildren] = useState(1);
  const [childAge, setChildAge] = useState<ChildAge>("age3_4");
  const [careType, setCareType] = useState<CareType>("nursery");
  const [regionIdx, setRegionIdx] = useState(2); // South East default
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(48);

  // Parent details for eligibility
  const [bothParentsWork, setBothParentsWork] = useState(true);
  const [income1, setIncome1] = useState(35000);
  const [income2, setIncome2] = useState(32000);

  const r = REGIONS[regionIdx];

  // Hourly rate based on care type + child age
  const ageIdx = childAge === "under2" ? 0 : childAge === "age2" ? 1 : 2;
  const hourlyRate = useMemo(() => {
    if (careType === "afterschool") return 6.50;
    if (careType === "nanny") return r.nanny[0];
    if (careType === "childminder") return r.childminder[ageIdx];
    return r.nursery[ageIdx];
  }, [careType, r, ageIdx]);

  // Funded hours per week
  const funded30 = get30HoursFunded(childAge, bothParentsWork, income1, income2);
  const funded15Age2 = get15HoursAge2(childAge, bothParentsWork, income1);
  const tfcEligible = getTFCEligible(bothParentsWork, income1, income2);

  const fundedHours = useMemo(() => {
    if (careType === "nanny") return 0; // nannies don't accept funded hours
    if (childAge === "under2") return 0;
    if (childAge === "age2") return funded15Age2 ? 15 : 0;
    if (childAge === "age3_4") return funded30 ? 30 : 15; // all 3-4 get 15 universal
    return 0;
  }, [childAge, careType, funded30, funded15Age2]);

  // Calculations (per child)
  const paidHoursPerWeek = Math.max(0, hoursPerWeek - fundedHours);
  const weeklyGross = paidHoursPerWeek * hourlyRate;
  const annualGross = weeklyGross * weeksPerYear;
  const monthlyGross = annualGross / 12;

  // Tax-Free Childcare: £2,000/year top-up per child
  const tfcAnnualTopup = tfcEligible ? Math.min(annualGross * numChildren * 0.25, 2000 * numChildren) : 0;
  // Note: TFC is 20p per 80p, so top-up = 25% of what you pay (up to £2k per child)

  const totalMonthlyBeforeSupport = monthlyGross * numChildren;
  const totalAnnualBeforeSupport = annualGross * numChildren;
  const monthlyAfterTFC = Math.max(0, (totalAnnualBeforeSupport - tfcAnnualTopup) / 12);

  const fundedHoursSaving = fundedHours * hourlyRate * weeksPerYear * numChildren;
  const totalMonthlyFullCost = (hoursPerWeek * hourlyRate * weeksPerYear * numChildren) / 12;

  return (
    <Shell>
      <Seo
        title="Childcare Cost Calculator UK 2026 — Nursery, Childminder & Nanny Costs"
        description="Calculate UK childcare costs for nursery, childminder, or nanny after funded hours. Checks your eligibility for 30 hours free childcare, 15 hours, and Tax-Free Childcare 2026."
        path="/childcare"
        jsonLd={jsonLd}
      />

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span>
            <span>Childcare Calculator</span>
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Childcare Cost Calculator 2026</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Estimate your monthly childcare costs, check eligibility for funded hours, and see your Tax-Free Childcare saving.
            Rates based on <a href="https://www.familyandchildcaretrust.org/childcare-survey" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Coram Family &amp; Childcare Survey 2025</a>.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">

          {/* ── LEFT: INPUTS ─────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Section 1: Your child */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Baby className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Your child</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Number of children</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setNumChildren(Math.max(1, numChildren - 1))}
                      className="h-8 w-8 rounded-lg border border-border bg-secondary flex items-center justify-center text-sm font-medium hover:bg-secondary/80">−</button>
                    <span className="text-lg font-semibold w-6 text-center">{numChildren}</span>
                    <button onClick={() => setNumChildren(Math.min(5, numChildren + 1))}
                      className="h-8 w-8 rounded-lg border border-border bg-secondary flex items-center justify-center text-sm font-medium hover:bg-secondary/80">+</button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Age of youngest child</label>
                  <div className="space-y-1.5">
                    {(["under2","age2","age3_4"] as ChildAge[]).map(age => (
                      <label key={age} className={`flex items-center gap-2.5 p-2 rounded-lg cursor-pointer border transition-colors text-sm ${childAge === age ? "border-accent bg-accent/5 text-foreground" : "border-border hover:border-border/80"}`}>
                        <input type="radio" name="age" value={age} checked={childAge === age} onChange={() => setChildAge(age)} className="accent-current" />
                        {AGE_LABEL[age]}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Care type */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Type of care</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {(["nursery","childminder","nanny","afterschool"] as CareType[]).map(type => (
                  <button key={type} onClick={() => setCareType(type)}
                    className={`p-3 rounded-lg border text-sm text-left transition-colors ${careType === type ? "border-accent bg-accent/5 font-medium text-foreground" : "border-border text-muted-foreground hover:border-border/70 hover:text-foreground"}`}>
                    {CARE_LABEL[type]}
                  </button>
                ))}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Hours per week needed</label>
                  <input type="number" min={1} max={60} value={hoursPerWeek}
                    onChange={e => setHoursPerWeek(Math.max(1, Math.min(60, Number(e.target.value))))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                  <p className="text-[11px] text-muted-foreground mt-1">Typical full-time: 40–50 hrs</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Weeks per year</label>
                  <input type="number" min={38} max={52} value={weeksPerYear}
                    onChange={e => setWeeksPerYear(Math.max(38, Math.min(52, Number(e.target.value))))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                  <p className="text-[11px] text-muted-foreground mt-1">38 = term-time only, 52 = year-round</p>
                </div>
              </div>
            </div>

            {/* Section 3: Location */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Location</h2>
              </div>
              <div className="relative">
                <select value={regionIdx} onChange={e => setRegionIdx(Number(e.target.value))}
                  className="w-full appearance-none rounded-lg border border-border bg-background px-3 py-2.5 text-sm pr-8">
                  {REGIONS.map((reg, i) => <option key={reg.label} value={i}>{reg.label}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">
                {CARE_LABEL[careType]} rate in {r.label}:{" "}
                <span className="font-medium text-foreground">
                  £{hourlyRate.toFixed(2)}/hr for {AGE_LABEL[childAge].toLowerCase()}
                </span>
              </p>
            </div>

            {/* Section 4: Eligibility check */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <PoundSterling className="h-4 w-4 text-muted-foreground" />
                <h2 className="text-sm font-semibold">Government support eligibility</h2>
              </div>
              <div className="space-y-3 mb-4">
                <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                  <input type="checkbox" checked={bothParentsWork} onChange={e => setBothParentsWork(e.target.checked)}
                    className="h-4 w-4 rounded" />
                  Both parents (or single parent) are working
                </label>
              </div>
              {bothParentsWork && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Your salary (£/year)</label>
                    <input type="number" min={0} max={500000} step={1000} value={income1}
                      onChange={e => setIncome1(Number(e.target.value))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Partner's salary (£/year)</label>
                    <input type="number" min={0} max={500000} step={1000} value={income2}
                      onChange={e => setIncome2(Number(e.target.value))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT: RESULTS ────────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* Eligibility summary */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-sm font-semibold mb-3">Your eligibility</h2>
              <div className="space-y-2.5">

                {/* 15 hours universal */}
                <div className="flex items-start gap-2.5">
                  {childAge === "age3_4"
                    ? <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    : <XCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
                  <div>
                    <p className={`text-sm font-medium ${childAge === "age3_4" ? "text-foreground" : "text-muted-foreground"}`}>
                      15 hours free (universal)
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {childAge === "age3_4" ? "✓ All 3–4 year olds qualify" : "For 3–4 year olds only"}
                    </p>
                  </div>
                </div>

                {/* 30 hours */}
                <div className="flex items-start gap-2.5">
                  {funded30
                    ? <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    : childAge === "age3_4" && bothParentsWork
                    ? <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    : <XCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
                  <div>
                    <p className={`text-sm font-medium ${funded30 ? "text-foreground" : "text-muted-foreground"}`}>
                      30 hours free (working parents)
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {funded30 ? "✓ Eligible — both parents working, income within limits"
                        : childAge !== "age3_4" ? "For 3–4 year olds only"
                        : !bothParentsWork ? "Both parents must be working"
                        : income1 > 100000 || income2 > 100000 ? "Not eligible if either parent earns over £100,000"
                        : "Each parent must earn at least £4,000/year"}
                    </p>
                  </div>
                </div>

                {/* 15 hours age 2 */}
                <div className="flex items-start gap-2.5">
                  {funded15Age2
                    ? <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    : childAge === "age2"
                    ? <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    : <XCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />}
                  <div>
                    <p className={`text-sm font-medium ${funded15Age2 ? "text-foreground" : "text-muted-foreground"}`}>
                      15 hours (eligible 2-year-olds)
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {funded15Age2 ? "✓ Eligible working parent, 2-year-old"
                        : childAge !== "age2" ? "For 2-year-olds only"
                        : "Working parent required, earning £4,000–£100,000"}
                    </p>
                  </div>
                </div>

                {/* Tax-Free Childcare */}
                <div className="flex items-start gap-2.5">
                  {tfcEligible
                    ? <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    : <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />}
                  <div>
                    <p className={`text-sm font-medium ${tfcEligible ? "text-foreground" : "text-muted-foreground"}`}>
                      Tax-Free Childcare (20% top-up)
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {tfcEligible
                        ? `✓ Saves up to £${(2000 * numChildren).toLocaleString()}/year`
                        : "Both parents must earn £2,379+/quarter and under £100,000"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Cost summary */}
            <div className="rounded-xl border-2 border-accent/30 bg-card p-5">
              <h2 className="text-sm font-semibold mb-4">Monthly cost summary</h2>

              {/* Full cost without support */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Full cost (no support)</span>
                  <span className="font-medium">£{Math.round(totalMonthlyFullCost).toLocaleString()}/mo</span>
                </div>

                {fundedHours > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      − {fundedHours} funded hours/week
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      −£{Math.round(fundedHoursSaving / 12).toLocaleString()}/mo
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm border-t border-border pt-2">
                  <span className="text-muted-foreground">After funded hours</span>
                  <span className="font-medium">£{Math.round(totalMonthlyBeforeSupport).toLocaleString()}/mo</span>
                </div>

                {tfcEligible && tfcAnnualTopup > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600 dark:text-green-400">
                      − Tax-Free Childcare (20%)
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      −£{Math.round(tfcAnnualTopup / 12).toLocaleString()}/mo
                    </span>
                  </div>
                )}
              </div>

              {/* Final number */}
              <div className="rounded-xl bg-secondary/50 p-4 text-center mt-2">
                <p className="text-xs text-muted-foreground mb-1">Your estimated monthly cost</p>
                <p className="text-3xl font-semibold text-foreground">
                  £{Math.round(monthlyAfterTFC).toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  £{Math.round(monthlyAfterTFC * 12).toLocaleString()}/year · {r.label}
                </p>
              </div>

              {/* Annual saving badge */}
              {(fundedHoursSaving + tfcAnnualTopup) > 0 && (
                <div className="mt-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-3 text-center">
                  <p className="text-xs text-green-700 dark:text-green-300">
                    You save <strong>£{Math.round(fundedHoursSaving + tfcAnnualTopup).toLocaleString()}/year</strong> through government support
                  </p>
                </div>
              )}
            </div>

            {/* Funding note */}
            {careType === "nanny" && (
              <div className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 p-4 text-sm text-amber-800 dark:text-amber-300">
                <strong>Note:</strong> Government-funded hours cannot be used directly with a nanny unless they are OFSTED-registered. Most nannies are not. Tax-Free Childcare can still be used with a registered nanny.
              </div>
            )}

            {/* Apply CTA */}
            {tfcEligible && (
              <a href="https://www.gov.uk/apply-for-tax-free-childcare" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-accent text-accent bg-accent/5 hover:bg-accent/10 transition-colors px-4 py-3 text-sm font-medium">
                Apply for Tax-Free Childcare on GOV.UK →
              </a>
            )}
            {(funded30 || funded15Age2) && (
              <a href="https://www.gov.uk/free-childcare-if-youre-working" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full rounded-xl border border-border text-muted-foreground hover:text-foreground hover:border-border/80 transition-colors px-4 py-3 text-sm font-medium">
                Apply for funded hours on GOV.UK →
              </a>
            )}
          </div>
        </div>

        {/* ── GUIDE CONTENT ─────────────────────────────────────────────────── */}
        <div className="mt-12 prose prose-sm dark:prose-invert max-w-none">

          <h2>UK Childcare Costs 2026 — What You Need to Know</h2>
          <p>Childcare is one of the biggest monthly expenses for working families in the UK. Costs vary substantially by type of care, region, and child age — and several government schemes can significantly reduce what you pay.</p>

          <h3>Average childcare costs by type (2026)</h3>
          <table>
            <thead><tr><th>Type</th><th>Typical weekly cost (full-time)</th><th>Best for</th></tr></thead>
            <tbody>
              <tr><td>Nursery (London)</td><td>£370–£540 (under 2s)</td><td>Consistent care, full-time working parents</td></tr>
              <tr><td>Nursery (outside London)</td><td>£220–£320 (under 2s)</td><td>Consistent care, part or full-time</td></tr>
              <tr><td>Childminder</td><td>£200–£280 (under 2s)</td><td>Flexible hours, home setting, often cheaper</td></tr>
              <tr><td>Nanny</td><td>£450–£720 (London)</td><td>Multiple children, irregular hours, highest flexibility</td></tr>
              <tr><td>After-school club</td><td>£60–£120</td><td>School-age children, 3pm–6pm</td></tr>
            </tbody>
          </table>

          <h3>Government-funded childcare hours 2026</h3>
          <table>
            <thead><tr><th>Scheme</th><th>Hours/week</th><th>Who qualifies</th></tr></thead>
            <tbody>
              <tr><td>15 hours free (universal)</td><td>15</td><td>All 3–4 year olds in England</td></tr>
              <tr><td>30 hours free</td><td>30</td><td>3–4 year olds, both parents working, each earning £4,000–£100,000/year</td></tr>
              <tr><td>15 hours for 2-year-olds</td><td>15</td><td>Eligible working parents of 2-year-olds</td></tr>
              <tr><td>15 hours for 9-month-olds+</td><td>15</td><td>Eligible working parents, children from 9 months (from Sep 2025)</td></tr>
            </tbody>
          </table>
          <p><em>Note: Funded hours rules differ in Scotland, Wales, and Northern Ireland. The figures above apply to England.</em></p>

          <h3>Tax-Free Childcare</h3>
          <p>For every £8 you pay into your Tax-Free Childcare account, the government adds £2 — a 20% top-up worth up to <strong>£2,000 per year per child</strong> (£4,000 if your child is disabled). Both parents must be working and earning at least £2,379 per quarter. Neither parent can earn over £100,000. Apply at <a href="https://childcare.gov.uk" target="_blank" rel="noopener noreferrer">childcare.gov.uk</a>.</p>

          <h3>Universal Credit childcare support</h3>
          <p>If you receive Universal Credit, you may be able to claim back up to <strong>85% of childcare costs</strong> (maximum £1,014.63/month for one child, £1,739.37 for two or more). You must be in paid work. This cannot be combined with Tax-Free Childcare — choose whichever saves you more.</p>

          <h3>Salary sacrifice childcare</h3>
          <p>Some employers offer childcare through salary sacrifice — you pay from your pre-tax salary, saving income tax (20–40%) and National Insurance (8%) on the amount sacrificed. Use our <Link to="/take-home">take-home calculator</Link> to model the impact on your net pay.</p>

          <p><strong>Sources:</strong>{" "}
            <a href="https://www.familyandchildcaretrust.org/childcare-survey" target="_blank" rel="noopener noreferrer">Coram Family & Childcare Survey 2025</a> ·{" "}
            <a href="https://www.gov.uk/free-childcare-if-youre-working" target="_blank" rel="noopener noreferrer">gov.uk — Free childcare</a> ·{" "}
            <a href="https://www.gov.uk/tax-free-childcare" target="_blank" rel="noopener noreferrer">gov.uk — Tax-Free Childcare</a>
          </p>
        </div>

        <div className="mt-8">
          <ResultDisclaimer />
        </div>
      </div>
    </Shell>
  );
};

export default Childcare;
