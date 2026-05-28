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
    </Shell>
  );
};

export default EVSalary;
