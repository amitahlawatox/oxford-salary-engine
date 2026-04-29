import { TAX_YEARS, type TaxYear } from "@/lib/tax/engine";
import { Calendar, ArrowLeftRight } from "lucide-react";

type Props = {
  year: TaxYear;
  compare: boolean;
  onYearChange: (y: TaxYear) => void;
  onCompareChange: (v: boolean) => void;
};

export function YearToggle({ year, compare, onYearChange, onCompareChange }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 border border-border rounded-lg p-1.5 bg-card w-fit">
      <div className="flex items-center gap-1.5 px-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        <Calendar className="h-3 w-3" /> Tax Year
      </div>
      <div className="flex rounded-md border border-border overflow-hidden">
        {TAX_YEARS.map((y) => (
          <button
            key={y}
            onClick={() => onYearChange(y)}
            className={`px-3 h-8 text-xs font-mono font-semibold transition-colors ${
              year === y ? "bg-foreground text-background" : "hover:bg-secondary"
            }`}
          >
            {y}
          </button>
        ))}
      </div>
      <button
        onClick={() => onCompareChange(!compare)}
        className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-md text-xs font-medium border transition-colors ${
          compare ? "bg-aurora text-white border-transparent shadow-glow" : "border-border hover:bg-secondary"
        }`}
      >
        <ArrowLeftRight className="h-3 w-3" />
        Compare YoY
      </button>
    </div>
  );
}
