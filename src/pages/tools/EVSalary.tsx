import { useState, useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";
import { fmt } from "@/lib/format";

const SITE = "https://uknetpay.co.uk";
const BIK_RATE_2026 = 0.04; // 4% Benefit in Kind for EVs 2026/27

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "EV Salary Sacrifice Calculator UK 2026",
  url: `${SITE}/salary-sacrifice/electric-car`,
};

const EVSalary = () => {
  const [salary, setSalary] = useState(45000);
  const [carListPrice, setCarListPrice] = useState(35000);
  const [monthlySacrifice, setMonthlySacrifice] = useState(450);

  const results = useMemo(() => {
    const annualSacrifice = monthlySacrifice * 12;
    const newSalary = salary - annualSacrifice;
    const taxRate = salary > 50270 ? 0.40 : 0.20;
    const niRate = salary > 12570 ? 0.08 : 0;

    // Tax + NI saved by reducing salary
    const taxSaving = annualSacrifice * taxRate;
    const niSaving = Math.min(annualSacrifice, Math.max(0, salary - 12570)) * niRate;
    const totalSaving = taxSaving + niSaving;

    // Benefit in Kind tax cost
    const bikValue = carListPrice * BIK_RATE_2026;
    const bikTaxCost = bikValue * taxRate;

    // Net monthly cost
    const netMonthlyCost = monthlySacrifice - (totalSaving / 12) + (bikTaxCost / 12);

    return { taxSaving, niSaving, totalSaving, bikValue, bikTaxCost, netMonthlyCost, newSalary };
  }, [salary, carListPrice, monthlySacrifice]);

  return (
    <Shell>
      <Seo
        title="EV Salary Sacrifice Calculator UK 2026 — Electric Car Tax Saving"
        description="Calculate your EV salary sacrifice saving for 2026/27. See income tax and NI saved, BiK cost at 4%, and your true net monthly cost for an electric company car."
        path="/salary-sacrifice/electric-car"
        jsonLd={jsonLd}
      />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="text-2xl font-semibold mb-2">EV Salary Sacrifice Calculator 2026/27</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Electric cars attract a <strong>4% Benefit in Kind (BiK) rate in 2026/27</strong> — the lowest of any car type.
          Combined with salary sacrifice, this makes EVs significantly cheaper than a personally leased car for most employees.
        </p>

        <div className="grid gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1">Your gross salary (£)</label>
            <input type="number" min={15000} max={300000} step={1000}
              value={salary} onChange={e => setSalary(Number(e.target.value))} className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Car list price (P11D value, £)</label>
              <input type="number" min={10000} max={150000} step={500}
                value={carListPrice} onChange={e => setCarListPrice(Number(e.target.value))} className="w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Monthly sacrifice amount (£)</label>
              <input type="number" min={100} max={3000} step={10}
                value={monthlySacrifice} onChange={e => setMonthlySacrifice(Number(e.target.value))} className="w-full" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-secondary/30 p-6 space-y-4 mb-6">
          <h2 className="text-base font-semibold">Your EV salary sacrifice saving</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-background p-4">
              <p className="text-xs text-muted-foreground">Income tax saved (annual)</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">{fmt(results.taxSaving)}</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-xs text-muted-foreground">NI saved (annual)</p>
              <p className="text-xl font-semibold text-green-600 dark:text-green-400">{fmt(results.niSaving)}</p>
            </div>
            <div className="rounded-lg bg-background p-4">
              <p className="text-xs text-muted-foreground">BiK tax cost (annual, 4% rate)</p>
              <p className="text-xl font-semibold text-red-500">{fmt(results.bikTaxCost)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">BiK value: {fmt(results.bikValue)}</p>
            </div>
            <div className="rounded-lg bg-background p-4 border-2 border-accent/30">
              <p className="text-xs text-muted-foreground">True net monthly cost</p>
              <p className="text-xl font-semibold text-accent">{fmt(results.netMonthlyCost)}</p>
              <p className="text-[10px] text-muted-foreground mt-1">vs {fmt(monthlySacrifice)} gross sacrifice</p>
            </div>
          </div>
        </div>

        <div className="prose prose-sm dark:prose-invert mb-6">
          <h2>How EV salary sacrifice works in 2026/27</h2>
          <p>Your employer leases an EV and you give up part of your salary in exchange. Because the sacrifice reduces your taxable income, you save income tax and National Insurance on that amount. The only tax you pay is Benefit in Kind (BiK) — and for electric cars that is just <strong>4% of the car's list price in 2026/27</strong>.</p>
          <p><strong>Sources:</strong> <a href="https://www.gov.uk/expenses-and-benefits-company-cars" target="_blank" rel="noopener noreferrer">gov.uk — company car tax</a> · <a href="https://www.gov.uk/government/publications/rates-and-allowances-employment-income-and-expenses/taxable-benefit-in-kind-for-company-cars" target="_blank" rel="noopener noreferrer">HMRC BiK rates 2026/27</a></p>
        </div>
        <ResultDisclaimer />
      </div>

      {/* SEO content */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>Electric Car Salary Sacrifice — How It Works and Why It Saves So Much (2026/27)</h2>
          <p>Electric vehicle (EV) salary sacrifice is one of the most tax-efficient benefits available to UK employees in 2026/27. By sacrificing salary in exchange for an electric car, you pay Income Tax and National Insurance on a lower gross salary, and the company car Benefit in Kind (BiK) rate for pure electric vehicles is just 4% — dramatically lower than petrol and hybrid alternatives. The combined effect means many employees can drive a brand-new electric car for less than the cost of leasing one personally, often significantly less.</p>
          <h2>How the tax saving works</h2>
          <table>
            <thead><tr><th>Component</th><th>Personal lease</th><th>EV salary sacrifice</th></tr></thead>
            <tbody>
              <tr><td>Monthly lease cost</td><td>£450 (from net pay)</td><td>£450 (salary sacrifice)</td></tr>
              <tr><td>Tax and NI relief</td><td>None</td><td>~£126/month (basic rate)</td></tr>
              <tr><td>BiK tax on car (4%)</td><td>N/A</td><td>~£30/month (est. £30k car)</td></tr>
              <tr><td><strong>Net monthly cost</strong></td><td><strong>£450</strong></td><td><strong>~£354</strong></td></tr>
              <tr><td>Annual saving</td><td>—</td><td>~£1,152/year</td></tr>
            </tbody>
          </table>
          <p><small>Basic rate taxpayer, £30,000 list price EV. Higher rate taxpayers save more (42% combined IT+NI relief vs 28%). Employer NI saving of 15% is often passed back to the employee.</small></p>
          <h2>The 4% BiK rate — why EVs are different</h2>
          <p>Benefit in Kind tax is charged on company cars as a percentage of the car's list price. For a pure battery electric vehicle in 2026/27, the BiK rate is <strong>4%</strong>. A petrol car with 130g/km CO₂ emissions has a BiK rate of 30–33%. On a £35,000 list price, the annual BiK tax difference is enormous: £35,000 × 4% × 20% = £280/year for the EV versus £35,000 × 31% × 20% = £2,170/year for the petrol equivalent. The government has committed to keeping EV BiK rates low through to 2029/30, rising to 9% by that point — still far below petrol and hybrid rates.</p>
          <h2>Who qualifies</h2>
          <p>Any employee can access EV salary sacrifice if their employer offers a scheme. Your sacrificed salary must not drop below the National Minimum Wage. You must be employed (not self-employed or inside IR35 via umbrella). The car is leased by your employer and made available to you — you return it at the end of the sacrifice period (typically 2–4 years). Insurance, servicing, breakdown cover, and often home charging installation are typically included in the monthly cost.</p>
          <h2>Does salary sacrifice affect my pension or mortgage?</h2>
          <p>Salary sacrifice reduces your contractual gross salary. This can affect mortgage affordability assessments (lenders use gross salary), employer pension contributions calculated as a percentage of salary, and life insurance cover based on salary multiples. Most employees find these impacts manageable for typical sacrifice amounts (£200–£500/month), but it's worth checking with your lender before committing to a large sacrifice if you're planning to remortgage soon.</p>
        </div>
      </section>
    </Shell>
  );
};

export default EVSalary;
