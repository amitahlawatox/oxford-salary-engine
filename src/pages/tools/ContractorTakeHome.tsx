import { useState, useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { fmt, fmt2 } from "@/lib/format";
import { Link } from "react-router-dom";

const SITE = "https://uknetpay.co.uk";

// 2026/27 rates
const PERSONAL_ALLOWANCE = 12570;
const BASIC_RATE_LIMIT = 50270;
const DIVIDEND_ALLOWANCE = 500;
const CORP_TAX_RATE = 0.19; // small profits rate under £50k
const DIVIDEND_BASIC_RATE = 0.0875;
const DIVIDEND_HIGHER_RATE = 0.3375;
const UMBRELLA_EMPLOYERS_NI = 0.15;
const UMBRELLA_MARGIN = 25; // £/week typical margin

function calcPAYE(gross: number) {
  const taxable = Math.max(0, gross - PERSONAL_ALLOWANCE);
  const basicBand = Math.max(0, Math.min(taxable, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE));
  const higherBand = Math.max(0, taxable - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE));
  const incomeTax = basicBand * 0.20 + higherBand * 0.40;
  const niEarnings = Math.max(0, gross - PERSONAL_ALLOWANCE);
  const niBasic = Math.min(niEarnings, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE) * 0.08;
  const niHigher = Math.max(0, niEarnings - (BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE)) * 0.02;
  const ni = niBasic + niHigher;
  return { incomeTax, ni, net: gross - incomeTax - ni };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Contractor Take-Home Calculator UK 2026",
  url: `${SITE}/contractor/take-home`,
};

const ContractorTakeHome = () => {
  const [dayRate, setDayRate] = useState(500);
  const [daysPerYear, setDaysPerYear] = useState(220);
  const [expenses, setExpenses] = useState(3000);

  const results = useMemo(() => {
    const annualRevenue = dayRate * daysPerYear;

    // ── UMBRELLA (inside IR35 equivalent) ──
    const umbrellaMarginAnnual = UMBRELLA_MARGIN * 52;
    const employersNI = (annualRevenue - umbrellaMarginAnnual) * UMBRELLA_EMPLOYERS_NI;
    const umbrellaGross = annualRevenue - umbrellaMarginAnnual - employersNI;
    const umbrella = calcPAYE(umbrellaGross);

    // ── LIMITED COMPANY (outside IR35) ──
    // Optimal split: salary = £12,570 (covers personal allowance, minimal employer NI)
    const ltdSalary = 12570;
    const ltdSalaryEmployerNI = Math.max(0, ltdSalary - 5000) * 0.15;
    const grossProfit = annualRevenue - ltdSalary - ltdSalaryEmployerNI - expenses;
    const corpTax = Math.max(0, grossProfit * CORP_TAX_RATE);
    const dividendPot = grossProfit - corpTax;

    // Personal tax on dividends
    const taxableDivs = Math.max(0, dividendPot - DIVIDEND_ALLOWANCE);
    const personalAllowanceUsed = ltdSalary;
    const remainingPA = Math.max(0, PERSONAL_ALLOWANCE - personalAllowanceUsed);
    const taxableDivsAfterPA = Math.max(0, taxableDivs - remainingPA);
    const basicDivs = Math.min(taxableDivsAfterPA, BASIC_RATE_LIMIT - PERSONAL_ALLOWANCE);
    const higherDivs = Math.max(0, taxableDivsAfterPA - basicDivs);
    const divTax = basicDivs * DIVIDEND_BASIC_RATE + higherDivs * DIVIDEND_HIGHER_RATE;

    const ltdNet = ltdSalary + dividendPot - divTax;

    return {
      annualRevenue,
      umbrella: { gross: umbrellaGross, net: umbrella.net, tax: umbrella.incomeTax + umbrella.ni + employersNI },
      ltd: { net: ltdNet, corpTax, divTax, salary: ltdSalary, dividends: dividendPot },
      saving: ltdNet - umbrella.net,
    };
  }, [dayRate, daysPerYear, expenses]);

  return (
    <Shell>
      <Seo
        title="Contractor Take-Home Calculator UK 2026 — Umbrella vs Limited Company"
        description="Compare umbrella vs limited company take-home pay for contractors in 2026/27. See the exact difference in net income from your day rate."
        path="/contractor/take-home"
        jsonLd={jsonLd}
      />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold mb-2">Contractor Take-Home Calculator 2026/27</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Compare take-home pay for umbrella vs limited company (outside IR35) from your day rate.
          Uses 2026/27 corporation tax, dividend tax, and NI rates.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">Day rate (£)</label>
            <input type="number" min={100} max={5000} step={25}
              value={dayRate} onChange={e => setDayRate(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Days worked/year</label>
            <input type="number" min={1} max={260} value={daysPerYear}
              onChange={e => setDaysPerYear(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Annual expenses (£)</label>
            <input type="number" min={0} max={50000} step={500}
              value={expenses} onChange={e => setExpenses(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-xl border border-border bg-secondary/30 p-5">
            <h2 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">Umbrella</h2>
            <p className="text-3xl font-semibold">{fmt(results.umbrella.net / 12)}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
            <p className="text-sm text-muted-foreground mt-1">{fmt(results.umbrella.net)}/year</p>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p>Gross billings: {fmt(results.annualRevenue)}</p>
              <p>Total deductions: {fmt(results.umbrella.tax)}</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-accent/40 bg-secondary/30 p-5">
            <h2 className="text-sm font-semibold mb-3 text-accent uppercase tracking-wide">Limited Company</h2>
            <p className="text-3xl font-semibold text-accent">{fmt(results.ltd.net / 12)}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
            <p className="text-sm text-muted-foreground mt-1">{fmt(results.ltd.net)}/year</p>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p>Corp tax: {fmt(results.ltd.corpTax)}</p>
              <p>Dividend tax: {fmt(results.ltd.divTax)}</p>
            </div>
          </div>
        </div>

        {results.saving > 0 && (
          <div className="rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 p-4 mb-6 text-sm">
            <strong>Limited company saves {fmt(results.saving)} per year</strong> ({fmt(results.saving / 12)}/month) vs umbrella on this day rate.
          </div>
        )}

        <div className="prose prose-sm dark:prose-invert mb-6">
          <p className="text-xs text-muted-foreground">
            Limited company calculation assumes salary/dividend split: £12,570 salary + remaining profit as dividends. 
            Corporation tax at 19% (small profits rate). Dividend allowance £500. Umbrella assumes £{UMBRELLA_MARGIN}/week margin and 15% employer NI.
            IR35 status not assessed here — see our <Link to="/ir35">IR35 calculator</Link> for status guidance.
          </p>
        </div>
        <ResultDisclaimer />
      </div>

      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Contractor Take-Home Pay: Limited Company vs Umbrella (2026/27)</h2>
          <p>UK contractors have two main operating structures: their own <strong>limited company</strong> (Personal Service Company / PSC) or an <strong>umbrella company</strong>. Both are legal and widely used — but they produce very different take-home pay, particularly outside IR35.</p>
          <h2>Limited company (outside IR35) vs umbrella — worked example</h2>
          <table>
            <thead><tr><th>Component</th><th>Limited Company (outside IR35)</th><th>Umbrella</th></tr></thead>
            <tbody>
              <tr><td>Day rate</td><td>£500/day</td><td>£500/day</td></tr>
              <tr><td>Annual contract (220 days)</td><td>£110,000</td><td>£110,000</td></tr>
              <tr><td>Employer NI + Apprenticeship Levy</td><td>N/A (paid as dividends)</td><td>−£13,200</td></tr>
              <tr><td>Umbrella margin</td><td>N/A</td><td>−£1,560</td></tr>
              <tr><td>Corporation Tax (25%)</td><td>−£5,415</td><td>N/A</td></tr>
              <tr><td>Income Tax + NI (salary/dividend)</td><td>−£11,800</td><td>−£28,500</td></tr>
              <tr><td><strong>Annual take-home</strong></td><td><strong>~£92,800</strong></td><td><strong>~£66,700</strong></td></tr>
            </tbody>
          </table>
          <p><small>Estimates based on optimal £12,570 salary + dividend split for limited company, PAYE for umbrella. Actual figures depend on accountant fees, expenses, pension contributions, and specific contract terms.</small></p>
          <h2>When umbrella makes sense</h2>
          <p>Umbrella companies deduct employer NI (15% above £5,000) and their own margin before paying you, which significantly reduces take-home versus a limited company outside IR35. However, umbrella is the right choice when you're inside IR35 (a limited company inside IR35 produces similar net pay to umbrella, with more admin overhead), when a contract is short-term and setting up a limited company isn't cost-effective, or when an agency mandates it. Umbrella workers are employed and receive employment rights, holiday pay, and statutory sick pay — which have real value.</p>
          <h2>IR35 and your structure</h2>
          <p>The tax advantage of a limited company exists only outside IR35. Inside IR35, your client deducts PAYE income tax and NI from payments to your company before they reach you — eliminating the dividend tax advantage. The calculator above models both scenarios so you can see exactly what each IR35 determination means for your net income at any day rate.</p>
          <p><strong>Accountancy costs:</strong> A limited company typically requires a specialist contractor accountant (£80–£150/month), Companies House filing, and annual accounts. Factor these costs into your net comparison — they reduce the limited company advantage by £1,000–£2,000/year but are themselves tax-deductible business expenses.</p>
          <h2>Related contractor calculators</h2>
          <p>See also: <a href="/ir35">IR35 Calculator</a> (inside vs outside), <a href="/umbrella">Umbrella Company Calculator</a> (detailed umbrella pay breakdown), <a href="/day-rate">Day Rate Calculator</a> (convert day rate to annual salary), <a href="/dividend">Dividend Optimiser</a> (salary/dividend mix for directors).</p>
        </div>
      </section>
    </Shell>
  );
};

export default ContractorTakeHome;
