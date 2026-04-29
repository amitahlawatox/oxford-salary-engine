import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fmt } from "@/lib/format";

export type SacrificeFrequency = "monthly" | "annual";
export type SacrificeKind =
  | "car"
  | "cycle"
  | "childcare"
  | "tech"
  | "holiday"
  | "other";

export interface SacrificeItem {
  id: string;
  kind: SacrificeKind;
  amount: number;
  frequency: SacrificeFrequency;
}

const KIND_LABELS: Record<SacrificeKind, string> = {
  car: "Car (EV / lease)",
  cycle: "Cycle to Work",
  childcare: "Childcare vouchers",
  tech: "Tech scheme",
  holiday: "Holiday purchase",
  other: "Other",
};

export function annualiseSacrifice(items: SacrificeItem[]): number {
  return items.reduce((sum, it) => {
    const a = Number(it.amount) || 0;
    return sum + (it.frequency === "monthly" ? a * 12 : a);
  }, 0);
}

export function newSacrificeItem(kind: SacrificeKind = "car"): SacrificeItem {
  return {
    id: Math.random().toString(36).slice(2, 9),
    kind,
    amount: 0,
    frequency: "monthly",
  };
}

interface Props {
  items: SacrificeItem[];
  onChange: (items: SacrificeItem[]) => void;
}

export const SacrificeItems = ({ items, onChange }: Props) => {
  const update = (id: string, patch: Partial<SacrificeItem>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id));
  const add = () => onChange([...items, newSacrificeItem()]);

  const annualTotal = annualiseSacrifice(items);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Label className="text-sm">Other salary sacrifice</Label>
        {items.length > 0 && (
          <span className="text-xs text-muted-foreground font-mono-num">
            {fmt(annualTotal)} / yr
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Pre-tax & pre-NI deductions: car, cycle to work, childcare, etc.
      </p>

      {items.length > 0 && (
        <div className="mt-3 space-y-2">
          {items.map((it) => (
            <div key={it.id} className="grid grid-cols-12 gap-2 items-center">
              <div className="col-span-5">
                <Select value={it.kind} onValueChange={(v) => update(it.id, { kind: v as SacrificeKind })}>
                  <SelectTrigger className="h-9"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.entries(KIND_LABELS).map(([k, v]) => (
                      <SelectItem key={k} value={k}>{v}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-4 relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">£</span>
                <Input
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={it.amount === 0 ? "" : it.amount}
                  onChange={(e) => update(it.id, { amount: Number(e.target.value) || 0 })}
                  className="pl-6 h-9 font-mono-num"
                />
              </div>
              <div className="col-span-2">
                <Select value={it.frequency} onValueChange={(v) => update(it.id, { frequency: v as SacrificeFrequency })}>
                  <SelectTrigger className="h-9 px-2 text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">/ mo</SelectItem>
                    <SelectItem value="annual">/ yr</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <button
                type="button"
                onClick={() => remove(it.id)}
                aria-label="Remove"
                className="col-span-1 inline-flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-destructive hover:bg-secondary transition"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 text-xs text-foreground border border-dashed border-border rounded-md px-3 py-1.5 hover:bg-secondary transition"
      >
        <Plus className="h-3.5 w-3.5" /> Add salary sacrifice
      </button>
    </div>
  );
};