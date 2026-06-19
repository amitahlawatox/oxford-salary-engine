import { useMemo } from "react";
import { Shell } from "@/components/layout/Shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUrlState } from "@/hooks/useUrlState";
import { calculate } from "@/lib/tax/engine";
import { fmt, fmt2 } from "@/lib/format";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { ShareSummary } from "@/components/tools/ShareSummary";
import { Download } from "lucide-react";
import { LazyBandBreakdown as BandBreakdown } from "@/components/charts/LazyBandBreakdown";
import { downloadToolPdf } from "@/lib/toolPdf";
import { ResultDisclaimer } from "@/components/legal/ResultDisclaimer";

// 2026/27 NHS Agenda for Change pay bands (England, outer London)
const NHS_BANDS: { band: string; min: number; max: number; typical: string }[] = [
  { band: "Band 1", min: 23615, max: 23615, typical: "Domestic / porter" },
  { band: "Band 2", min: 23615, max: 25674, typical: "Healthcare assistant" },
  { band: "Band 3", min: 25674, max: 28093, typical: "Senior HCA / phlebotomist" },
  { band: "Band 4", min: 28093, max: 30820, typical: "Associate practitioner" },
  { band: "Band 5", min: 30820, max: 38352, typical: "Newly qualified nurse / midwife" },
  { band: "Band 6", min: 37338, max: 44962, typical: "Senior nurse / specialist" },
  { band: "Band 7", min: 46148, max: 52809, typical: "Ward manager / advanced practitioner" },
  { band: "Band 8a", min: 53755, max: 60504, typical: "Clinical lead / service manager" },
  { band: "Band 8b", min: 62215, max: 72293, typical: "Deputy director" },
  { band: "Band 8c", min: 73664, max: 86074, typical: "Associate director" },
  { band: "Band 8d", min: 86074, max: 101677, typical: "Director level" },
  { band: "Band 9", min: 105385, max: 121271, typical: "Chief / executive level" },
];

const NhsPay = () => {
  const [s, set] = useUrlState({ salary: 30820, pension: 5, band: "Band 5" });

  const r = useMemo(
    () =>
      calculate({
        gross: s.salary,
        region: "england",
        pensionPct: s.pension,
        pensionMode: "salary-sacrifice",
        studentLoan: "none",
        bonus: 0,
        overtime: 0,
      }),
    [s.salary, s.pension]
  );

  const pensionContrib = Math.round(s.salary * (s.pension / 100));
  const monthlyNet = r.net / 12;

  return (
    <Shell>
      <ToolSeo path="/nhs" />
      <section className="mx-auto max-w-6xl px-6 pt-10 pb-6">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          NHS Take-Home Pay Calculator 2026/27
        </h1>
        <p className="mt-2 text-muted-foreground">
          Calculate your NHS take-home pay after tax, NI, and pension. Select
          your Agenda for Change band or enter a custom salary.
        </p>
        <div className="mt-4">
          <ShareSummary
            summary="NHS Take-Home Pay Calculator — see my UK calculation for the 2026/27 tax year"
            title="NHS Take-Home Pay Calculator | UK Net Pay"
            compact
          />
          <ResultDisclaimer />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card space-y-5">
          <div>
            <Label className="text-sm">NHS Band</Label>
            <select
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={s.band}
              onChange={(e) => {
                const selected = NHS_BANDS.find((b) => b.band === e.target.value);
                if (selected) {
                  set({ band: e.target.value, salary: selected.min });
                }
              }}
            >
              {NHS_BANDS.map((b) => (
                <option key={b.band} value={b.band}>
                  {b.band} — {b.typical} (£{b.min.toLocaleString()}–£{b.max.toLocaleString()})
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-sm">Annual salary</Label>
            <div className="mt-2 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                £
              </span>
              <Input
                type="number"
                value={s.salary === 0 ? "" : s.salary}
                onChange={(e) => set({ salary: Number(e.target.value) || 0 })}
                className="pl-7 font-mono-num text-lg h-11"
              />
            </div>
          </div>
          <div>
            <Label className="text-sm">
              NHS Pension contribution (%)
            </Label>
            <select
              className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono-num"
              value={s.pension}
              onChange={(e) => set({ pension: Number(e.target.value) })}
            >
              <option value={0}>0% — Opted out</option>
              <option value={5}>5.2% — Up to £13,246</option>
              <option value={5.8}>5.8% — £13,247–£16,831</option>
              <option value={7.3}>7.3% — £16,832–£22,878</option>
              <option value={9.8}>9.8% — £22,879–£26,823</option>
              <option value={10}>10.0% — £26,824–£31,587</option>
              <option value={11.6}>11.6% — £31,588–£43,692</option>
              <option value={12.5}>12.5% — £43,693+</option>
            </select>
            <p className="text-xs text-muted-foreground mt-1">
              NHS Pension is salary sacrifice — deducted before tax.
            </p>
          </div>

          <div className="pt-3 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Agenda for Change Bands 2026/27</div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {NHS_BANDS.map((b) => (
                <button
                  key={b.band}
                  onClick={() => set({ band: b.band, salary: b.min })}
                  className={`w-full text-left px-3 py-1.5 rounded text-xs hover:bg-secondary transition ${
                    s.band === b.band ? "bg-secondary font-medium" : ""
                  }`}
                >
                  <span className="font-medium">{b.band}</span>
                  <span className="text-muted-foreground ml-2">
                    £{b.min.toLocaleString()}–£{b.max.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">
            Monthly take-home
          </div>
          <div className="font-mono-num text-3xl font-semibold mt-1">
            {fmt(monthlyNet)}
          </div>
          <div className="text-sm text-muted-foreground">per month</div>
          <div className="mt-6 space-y-2">
            <Row label="Annual gross" v={fmt2(s.salary)} />
            <Row label="Pension contribution" v={`−${fmt2(pensionContrib)}`} />
            <Row label="Income tax" v={fmt2(r.incomeTax)} />
            <Row label="National Insurance" v={fmt2(r.ni)} />
            <Row label="Net per year" v={fmt2(r.net)} />
            <Row label="Net per month" v={fmt2(monthlyNet)} />
            <Row label="Effective rate" v={`${r.effectiveRate.toFixed(1)}%`} />
          </div>
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Tax by band
            </div>
            <BandBreakdown result={r} />
          </div>
          <div className="mt-4">
            <button
              onClick={() =>
                downloadToolPdf({
                  title: "NHS Take-Home Pay Calculator",
                  subtitle: `Tax year 2026/27 | ${s.band} | GBP ${s.salary.toLocaleString()} | ${s.pension}% pension`,
                  rows: [
                    { label: "NHS Band", value: s.band },
                    { label: "Annual salary", value: s.salary },
                    { label: "Pension (%)", value: `${s.pension}%` },
                    { label: "Pension contribution", value: pensionContrib, negative: true },
                    { label: "Income Tax", value: r.incomeTax, negative: true },
                    { label: "NI", value: r.ni, negative: true },
                    { label: "---", value: "" },
                    { label: "Net per year", value: r.net, bold: true },
                    { label: "Net per month", value: r.net / 12, bold: true },
                    { label: "Effective rate", value: `${r.effectiveRate.toFixed(1)}%`, bold: true },
                  ],
                  filename: `uknetpay-nhs-${s.band.replace(/\s/g, "")}-${s.salary}.pdf`,
                })
              }
              className="w-full inline-flex items-center justify-center gap-2 border border-border rounded-md py-2 text-sm hover:bg-secondary transition"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <h2>NHS Pay Bands and Take-Home Pay Explained (2026/27)</h2>
          <p>
            NHS staff in England are paid under the <strong>Agenda for Change</strong> (AfC) framework, which sets pay
            bands from Band 1 (entry level) to Band 9 (executive level). Each band has a salary range with annual
            increments based on experience. Your take-home pay depends on your band, point on the pay spine, pension
            tier, and whether you receive any unsocial hours enhancements.
          </p>

          <h2>Worked Example: Band 5 Nurse (£30,820)</h2>
          <table>
            <thead>
              <tr><th>Component</th><th>Annual</th><th>Monthly</th></tr>
            </thead>
            <tbody>
              <tr><td>Gross salary</td><td>£30,820</td><td>£2,568</td></tr>
              <tr><td>NHS Pension (10%)</td><td>−£3,082</td><td>−£257</td></tr>
              <tr><td>Income Tax</td><td>−£3,050</td><td>−£254</td></tr>
              <tr><td>National Insurance</td><td>−£1,220</td><td>−£102</td></tr>
              <tr><td><strong>Take-home</strong></td><td><strong>£23,468</strong></td><td><strong>£1,956</strong></td></tr>
            </tbody>
          </table>
          <p><small>England, 2026/27 rates, NHS Pension at 10% tier. Actual take-home varies with pension tier, student loan, and regional enhancements.</small></p>

          <h2>NHS Pension Contribution Tiers 2026/27</h2>
          <p>
            The NHS Pension Scheme uses tiered contribution rates based on your pensionable pay. As a salary sacrifice
            scheme, contributions are deducted before income tax and NI, reducing your tax bill. Tiers range from 5.2%
            (earnings up to £13,246) to 12.5% (earnings above £43,693). The employer contribution is 23.7% on top of
            your salary — one of the most generous pension schemes available.
          </p>

          <h3>Frequently Asked Questions</h3>
          <p>
            <strong>How much do NHS nurses take home after tax?</strong> A newly qualified Band 5 nurse earning £30,820
            takes home approximately £1,956/month after tax, NI, and 10% NHS Pension. At the top of Band 5 (£38,352),
            monthly take-home rises to approximately £2,350.
          </p>
          <p>
            <strong>Is the NHS Pension worth it?</strong> Yes — the NHS Pension is a defined benefit scheme with a 23.7%
            employer contribution. Opting out means losing this employer contribution entirely. Even accounting for
            employee contributions of 5.2%–12.5%, the scheme provides significantly more retirement income than a
            typical workplace pension.
          </p>
          <p>
            <strong>Do NHS unsocial hours affect take-home pay?</strong> Yes — enhancements for nights, weekends, and
            bank holidays are taxable income. Enter your total annual salary including enhancements in the calculator
            for an accurate take-home figure.
          </p>
        </div>
      </section>
    </Shell>
  );
};

const Row = ({ label, v }: { label: string; v: string }) => (
  <div className="flex justify-between border-b border-border py-2 last:border-0">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="font-mono-num text-sm">{v}</span>
  </div>
);

export default NhsPay;
