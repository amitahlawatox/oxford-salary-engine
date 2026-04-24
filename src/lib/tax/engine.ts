// 2026/27 UK tax engine — single source of truth.
// All calculations are annual £.

export type Region = "england" | "scotland";
export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5" | "postgrad";
export type PensionMode = "salary-sacrifice" | "personal";

export interface CalcInput {
  gross: number;
  region: Region;
  pensionPct: number;
  pensionMode: PensionMode;
  studentLoan: StudentLoanPlan;
  bonus: number;
  overtime: number;
  taxCode?: string; // e.g. "1257L"
}

export interface CalcResult {
  gross: number;
  totalGross: number; // gross + bonus + overtime
  pension: number;
  taxableGross: number; // after salary-sacrifice pension
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  ni: number;
  studentLoan: number;
  net: number;
  effectiveRate: number;
  marginalRate: number;
  bands: BandSlice[];
}

export interface BandSlice {
  name: string;
  rate: number;
  amount: number; // £ falling in this band
  tax: number;
}

// ─── Personal Allowance ───────────────────────────────
export function personalAllowance(adjustedNetIncome: number, taxCode?: string) {
  // Honour numeric tax codes like "1257L" → 12,570
  if (taxCode && /^\d{3,4}[A-Z]?$/i.test(taxCode.trim())) {
    const num = parseInt(taxCode.replace(/\D/g, ""), 10);
    if (!isNaN(num)) return num * 10;
  }
  if (adjustedNetIncome <= 100_000) return 12_570;
  return Math.max(0, 12_570 - (adjustedNetIncome - 100_000) / 2);
}

// ─── Income Tax ───────────────────────────────────────
const RUK_BANDS = [
  { name: "Basic 20%", upTo: 37_700, rate: 0.2 },
  { name: "Higher 40%", upTo: 125_140 - 12_570, rate: 0.4 },
  { name: "Additional 45%", upTo: Infinity, rate: 0.45 },
];
const SCOT_BANDS = [
  { name: "Starter 19%", upTo: 2_306, rate: 0.19 },
  { name: "Basic 20%", upTo: 13_991, rate: 0.2 },
  { name: "Intermediate 21%", upTo: 31_092, rate: 0.21 },
  { name: "Higher 42%", upTo: 62_430, rate: 0.42 },
  { name: "Advanced 45%", upTo: 125_140 - 12_570, rate: 0.45 },
  { name: "Top 48%", upTo: Infinity, rate: 0.48 },
];

function bandSlices(taxable: number, region: Region): BandSlice[] {
  const bands = region === "scotland" ? SCOT_BANDS : RUK_BANDS;
  let prev = 0;
  let remaining = taxable;
  const slices: BandSlice[] = [];
  for (const b of bands) {
    if (remaining <= 0) break;
    const width = b.upTo - prev;
    const amount = Math.min(remaining, width);
    slices.push({ name: b.name, rate: b.rate, amount, tax: amount * b.rate });
    remaining -= amount;
    prev = b.upTo;
  }
  return slices;
}

// ─── National Insurance (Class 1 employee) ────────────
export function employeeNI(gross: number) {
  const pt = 12_570;
  const uel = 50_270;
  if (gross <= pt) return 0;
  const main = Math.min(gross, uel) - pt;
  const upper = Math.max(0, gross - uel);
  return main * 0.08 + upper * 0.02;
}

function niMarginalRate(gross: number) {
  if (gross <= 12_570) return 0;
  if (gross <= 50_270) return 0.08;
  return 0.02;
}

// ─── Student Loans ────────────────────────────────────
const SL_THRESHOLDS: Record<StudentLoanPlan, { threshold: number; rate: number }> = {
  none: { threshold: Infinity, rate: 0 },
  plan1: { threshold: 26_065, rate: 0.09 },
  plan2: { threshold: 28_470, rate: 0.09 },
  plan4: { threshold: 32_745, rate: 0.09 },
  plan5: { threshold: 25_000, rate: 0.09 },
  postgrad: { threshold: 21_000, rate: 0.06 },
};

export function studentLoanRepayment(gross: number, plan: StudentLoanPlan) {
  const { threshold, rate } = SL_THRESHOLDS[plan];
  return Math.max(0, gross - threshold) * rate;
}

// ─── Master calculator ────────────────────────────────
export function calculate(input: CalcInput): CalcResult {
  const totalGross = Math.max(0, input.gross + input.bonus + input.overtime);
  const pension = (totalGross * input.pensionPct) / 100;
  const taxableGross = input.pensionMode === "salary-sacrifice" ? totalGross - pension : totalGross;
  const pa = personalAllowance(taxableGross, input.taxCode);
  const taxableIncome = Math.max(0, taxableGross - pa);
  const slices = bandSlices(taxableIncome, input.region);
  const incomeTax = slices.reduce((a, s) => a + s.tax, 0);
  const ni = employeeNI(taxableGross);
  const sl = studentLoanRepayment(taxableGross, input.studentLoan);
  const personalDeduction = input.pensionMode === "personal" ? pension : 0;
  const net = taxableGross - incomeTax - ni - sl - personalDeduction;
  const effectiveRate = totalGross > 0 ? ((incomeTax + ni + sl) / totalGross) * 100 : 0;

  // Marginal: rate on next £1
  const next = calcSimpleNext(input);
  const marginalRate = next * 100;

  return {
    gross: input.gross,
    totalGross,
    pension,
    taxableGross,
    personalAllowance: pa,
    taxableIncome,
    incomeTax,
    ni,
    studentLoan: sl,
    net,
    effectiveRate,
    marginalRate,
    bands: slices,
  };
}

function calcSimpleNext(input: CalcInput): number {
  // marginal rate = income tax marginal + NI marginal + SL marginal
  const taxableGross =
    input.pensionMode === "salary-sacrifice"
      ? (input.gross + input.bonus + input.overtime) * (1 - input.pensionPct / 100)
      : input.gross + input.bonus + input.overtime;
  const pa = personalAllowance(taxableGross, input.taxCode);
  const ti = Math.max(0, taxableGross - pa);
  const bands = input.region === "scotland" ? SCOT_BANDS : RUK_BANDS;
  let prev = 0;
  let itRate = 0;
  for (const b of bands) {
    if (ti <= b.upTo) {
      itRate = b.rate;
      break;
    }
    prev = b.upTo;
  }
  // PA taper between 100k–125,140 effectively adds 20% (PA reduces by 50p per £1)
  if (taxableGross > 100_000 && taxableGross < 125_140) itRate += 0.2;
  const niRate = niMarginalRate(taxableGross);
  const slRate =
    input.studentLoan === "none"
      ? 0
      : taxableGross > SL_THRESHOLDS[input.studentLoan].threshold
      ? SL_THRESHOLDS[input.studentLoan].rate
      : 0;
  return itRate + niRate + slRate;
}

// ─── Reverse: target net → gross ──────────────────────
export function solveGrossFromNet(targetAnnualNet: number, base: Omit<CalcInput, "gross">): number {
  let lo = 0;
  let hi = 1_500_000;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const { net } = calculate({ ...base, gross: mid });
    if (net < targetAnnualNet) lo = mid;
    else hi = mid;
  }
  return Math.round((lo + hi) / 2);
}