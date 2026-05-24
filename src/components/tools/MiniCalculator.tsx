import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { calculate } from "@/lib/tax/engine";
import { fmt } from "@/lib/format";
import { ArrowRight } from "lucide-react";

/**
 * Compact interactive salary calculator embedded in article body.
 * Converts informational readers into tool users.
 * Advisor: "Bento-Style Mini Calculator" — captures users where they land.
 */
export function MiniCalculator() {
  const [salary, setSalary] = useState(35000);

  const result = useMemo(() => {
    try {
      return calculate({ gross: salary, year: "2026/27", scotland: false });
    } catch {
      return null;
    }
  }, [salary]);

  const monthlyNet = result ? result.net / 12 : 0;
  const monthlyTax = result ? result.incomeTax / 12 : 0;
  const monthlyNI = result ? result.employeeNI / 12 : 0;

  return (
    <div className="not-prose my-8 rounded-xl border border-border bg-secondary/30 p-5">
      <p className="text-sm font-semibold text-foreground mb-3">
        Calculate your take-home pay
      </p>
      <div className="flex items-center gap-3 mb-4">
        <label htmlFor="mini-salary" className="text-sm text-muted-foreground whitespace-nowrap">
          Annual salary £
        </label>
        <input
          id="mini-salary"
          type="number"
          min={10000}
          max={500000}
          step={500}
          value={salary}
          onChange={(e) => setSalary(Number(e.target.value) || 0)}
          className="flex-1"
        />
      </div>

      {result && salary >= 10000 && (
        <>
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="rounded-lg bg-background p-3 text-center">
              <div className="text-xs text-muted-foreground">Monthly take-home</div>
              <div className="text-lg font-semibold text-foreground">{fmt(monthlyNet)}</div>
            </div>
            <div className="rounded-lg bg-background p-3 text-center">
              <div className="text-xs text-muted-foreground">Income tax</div>
              <div className="text-sm font-medium text-muted-foreground">{fmt(monthlyTax)}/mo</div>
            </div>
            <div className="rounded-lg bg-background p-3 text-center">
              <div className="text-xs text-muted-foreground">National Insurance</div>
              <div className="text-sm font-medium text-muted-foreground">{fmt(monthlyNI)}/mo</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-[10px] text-muted-foreground">
              Illustrative estimate · 2026/27 HMRC rates · Not financial advice
            </p>
            <Link
              to="/take-home"
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            >
              Full calculator <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
