// 2026/27 UK tax engine — single source of truth.
// All calculations are annual £.

export type Region = "england" | "scotland";
export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5" | "postgrad";
export type PensionMode = "salary-sacrifice" | "personal";
export type TaxYear = "2026/27" | "2025/26";

// ─── Tax-year rate tables ─────────────────────────────
interface YearRates {
  pa: number;           // standard personal allowance
  paTaperFrom: number;  // income at which PA tapers
  rukBands: { name: string; upTo: number; rate: number }[];
  scotBands: { name: string; upTo: number; rate: number }[];
  ni: { pt: number; uel: number; mainRate: number; upperRate: number };
  studentLoan: Record<StudentLoanPlan, { threshold: number; rate: number }>;
  dividend: { allowance: number; basic: number; higher: number; additional: number };
  selfEmployed: { lowerProfitsLimit: number; upperProfitsLimit: number; class4Main: number; class4Upper: number };
}

const RATES: Record<TaxYear, YearRates> = {
  "2026/27": {
    pa: 12_570,
    paTaperFrom: 100_000,
    rukBands: [
      { name: "Basic 20%", upTo: 37_700, rate: 0.2 },
      { name: "Higher 40%", upTo: 125_140 - 12_570, rate: 0.4 },
      { name: "Additional 45%", upTo: Infinity, rate: 0.45 },
    ],
    scotBands: [
      { name: "Starter 19%", upTo: 2_306, rate: 0.19 },
      { name: "Basic 20%", upTo: 13_991, rate: 0.2 },
      { name: "Intermediate 21%", upTo: 31_092, rate: 0.21 },
      { name: "Higher 42%", upTo: 62_430, rate: 0.42 },
      { name: "Advanced 45%", upTo: 125_140 - 12_570, rate: 0.45 },
      { name: "Top 48%", upTo: Infinity, rate: 0.48 },
    ],
    ni: { pt: 12_570, uel: 50_270, mainRate: 0.08, upperRate: 0.02 },
    studentLoan: {
      none: { threshold: Infinity, rate: 0 },
      plan1: { threshold: 26_065, rate: 0.09 },
      plan2: { threshold: 28_470, rate: 0.09 },
      plan4: { threshold: 32_745, rate: 0.09 },
      plan5: { threshold: 25_000, rate: 0.09 },
      postgrad: { threshold: 21_000, rate: 0.06 },
    },
    dividend: { allowance: 500, basic: 0.0875, higher: 0.3375, additional: 0.3935 },
    selfEmployed: { lowerProfitsLimit: 12_570, upperProfitsLimit: 50_270, class4Main: 0.06, class4Upper: 0.02 },
  },
  "2025/26": {
    pa: 12_570,
    paTaperFrom: 100_000,
    rukBands: [
      { name: "Basic 20%", upTo: 37_700, rate: 0.2 },
      { name: "Higher 40%", upTo: 125_140 - 12_570, rate: 0.4 },
      { name: "Additional 45%", upTo: Infinity, rate: 0.45 },
    ],
    scotBands: [
      { name: "Starter 19%", upTo: 2_306, rate: 0.19 },
      { name: "Basic 20%", upTo: 13_991, rate: 0.2 },
      { name: "Intermediate 21%", upTo: 31_092, rate: 0.21 },
      { name: "Higher 42%", upTo: 62_430, rate: 0.42 },
      { name: "Advanced 45%", upTo: 125_140 - 12_570, rate: 0.45 },
      { name: "Top 48%", upTo: Infinity, rate: 0.48 },
    ],
    ni: { pt: 12_570, uel: 50_270, mainRate: 0.08, upperRate: 0.02 },
    studentLoan: {
      none: { threshold: Infinity, rate: 0 },
      plan1: { threshold: 25_000, rate: 0.09 },
      plan2: { threshold: 27_295, rate: 0.09 },
      plan4: { threshold: 31_395, rate: 0.09 },
      plan5: { threshold: 25_000, rate: 0.09 },
      postgrad: { threshold: 21_000, rate: 0.06 },
    },
    dividend: { allowance: 500, basic: 0.0875, higher: 0.3375, additional: 0.3935 },
    selfEmployed: { lowerProfitsLimit: 12_570, upperProfitsLimit: 50_270, class4Main: 0.06, class4Upper: 0.02 },
  },
};

export const DEFAULT_TAX_YEAR: TaxYear = "2026/27";
export const TAX_YEARS: TaxYear[] = ["2026/27", "2025/26"];
export function getRates(year: TaxYear = DEFAULT_TAX_YEAR) { return RATES[year]; }

export interface CalcInput {
  gross: number;
  region: Region;
  pensionPct: number;
  pensionMode: PensionMode;
  studentLoan: StudentLoanPlan;
  bonus: number;
  overtime: number;
  taxCode?: string; // e.g. "1257L"
  taxYear?: TaxYear;
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
export function personalAllowance(adjustedNetIncome: number, taxCode?: string, year: TaxYear = DEFAULT_TAX_YEAR) {
  const r = RATES[year];
  // Honour numeric tax codes like "1257L" → 12,570
  if (taxCode && /^\d{3,4}[A-Z]?$/i.test(taxCode.trim())) {
    const num = parseInt(taxCode.replace(/\D/g, ""), 10);
    if (!isNaN(num)) return num * 10;
  }
  if (adjustedNetIncome <= r.paTaperFrom) return r.pa;
  return Math.max(0, r.pa - (adjustedNetIncome - r.paTaperFrom) / 2);
}

function bandSlices(taxable: number, region: Region, year: TaxYear = DEFAULT_TAX_YEAR): BandSlice[] {
  const r = RATES[year];
  const bands = region === "scotland" ? r.scotBands : r.rukBands;
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
export function employeeNI(gross: number, year: TaxYear = DEFAULT_TAX_YEAR) {
  const { pt, uel, mainRate, upperRate } = RATES[year].ni;
  if (gross <= pt) return 0;
  const main = Math.min(gross, uel) - pt;
  const upper = Math.max(0, gross - uel);
  return main * mainRate + upper * upperRate;
}

function niMarginalRate(gross: number, year: TaxYear = DEFAULT_TAX_YEAR) {
  const { pt, uel, mainRate, upperRate } = RATES[year].ni;
  if (gross <= pt) return 0;
  if (gross <= uel) return mainRate;
  return upperRate;
}

export function studentLoanRepayment(gross: number, plan: StudentLoanPlan, year: TaxYear = DEFAULT_TAX_YEAR) {
  const { threshold, rate } = RATES[year].studentLoan[plan];
  return Math.max(0, gross - threshold) * rate;
}

// ─── Master calculator ────────────────────────────────
export function calculate(input: CalcInput): CalcResult {
  const year = input.taxYear ?? DEFAULT_TAX_YEAR;
  const totalGross = Math.max(0, input.gross + input.bonus + input.overtime);
  const pension = (totalGross * input.pensionPct) / 100;
  const taxableGross = input.pensionMode === "salary-sacrifice" ? totalGross - pension : totalGross;
  const pa = personalAllowance(taxableGross, input.taxCode, year);
  const taxableIncome = Math.max(0, taxableGross - pa);
  const slices = bandSlices(taxableIncome, input.region, year);
  const incomeTax = slices.reduce((a, s) => a + s.tax, 0);
  const ni = employeeNI(taxableGross, year);
  const sl = studentLoanRepayment(taxableGross, input.studentLoan, year);
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
  const year = input.taxYear ?? DEFAULT_TAX_YEAR;
  const r = RATES[year];
  // marginal rate = income tax marginal + NI marginal + SL marginal
  const taxableGross =
    input.pensionMode === "salary-sacrifice"
      ? (input.gross + input.bonus + input.overtime) * (1 - input.pensionPct / 100)
      : input.gross + input.bonus + input.overtime;
  const pa = personalAllowance(taxableGross, input.taxCode, year);
  const ti = Math.max(0, taxableGross - pa);
  const bands = input.region === "scotland" ? r.scotBands : r.rukBands;
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
  if (taxableGross > r.paTaperFrom && taxableGross < r.paTaperFrom + 2 * r.pa) itRate += 0.2;
  const niRate = niMarginalRate(taxableGross, year);
  const slRate =
    input.studentLoan === "none"
      ? 0
      : taxableGross > r.studentLoan[input.studentLoan].threshold
      ? r.studentLoan[input.studentLoan].rate
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

// ─── Self-Employed (Class 4 NI + Income Tax) ──────────
// 2026/27: Class 2 abolished for most; Class 4 = 6% (£12,570–£50,270) + 2% (>£50,270)
export interface SelfEmployedResult {
  profit: number;
  personalAllowance: number;
  taxableProfit: number;
  incomeTax: number;
  class4: number;
  class2: number;
  net: number;
  paymentsOnAccount: number;
  effectiveRate: number;
  bands: BandSlice[];
}

export function calculateSelfEmployed(profit: number, region: Region = "england", voluntaryClass2 = false): SelfEmployedResult {
  const pa = personalAllowance(profit);
  const ti = Math.max(0, profit - pa);
  const slices = bandSlices(ti, region);
  const incomeTax = slices.reduce((a, s) => a + s.tax, 0);
  const lpt = 12_570;
  const upl = 50_270;
  const main = Math.max(0, Math.min(profit, upl) - lpt);
  const upper = Math.max(0, profit - upl);
  const class4 = main * 0.06 + upper * 0.02;
  const class2 = voluntaryClass2 ? 179.4 : 0; // £3.45/week × 52
  const net = profit - incomeTax - class4 - class2;
  const totalTax = incomeTax + class4 + class2;
  const paymentsOnAccount = totalTax > 1000 ? totalTax / 2 : 0;
  return {
    profit,
    personalAllowance: pa,
    taxableProfit: ti,
    incomeTax,
    class4,
    class2,
    net,
    paymentsOnAccount,
    effectiveRate: profit > 0 ? (totalTax / profit) * 100 : 0,
    bands: slices,
  };
}

// ─── Dividend tax (2026/27) ───────────────────────────
// Allowance £500. Then 8.75% basic / 33.75% higher / 39.35% additional.
export interface DividendResult {
  salary: number;
  dividends: number;
  total: number;
  personalAllowance: number;
  salaryTax: number;
  ni: number;
  dividendAllowance: number;
  dividendTax: number;
  net: number;
  effectiveRate: number;
}

export function calculateDividend(salary: number, dividends: number): DividendResult {
  const total = salary + dividends;
  const pa = personalAllowance(total);
  // Use PA against salary first, then dividends
  const salaryAfterPA = Math.max(0, salary - pa);
  const paLeftForDiv = Math.max(0, pa - salary);
  const salarySlices = bandSlices(salaryAfterPA, "england");
  const salaryTax = salarySlices.reduce((a, s) => a + s.tax, 0);
  const ni = employeeNI(salary);

  const divAllowance = 500;
  const dividendsAfterPA = Math.max(0, dividends - paLeftForDiv);
  const taxableDiv = Math.max(0, dividendsAfterPA - divAllowance);

  // Bands measured from start of taxable income
  const basicRoom = Math.max(0, 37_700 - salaryAfterPA);
  const higherRoom = Math.max(0, (125_140 - 12_570) - Math.max(salaryAfterPA, 37_700));
  const inBasic = Math.min(taxableDiv, basicRoom);
  const afterBasic = taxableDiv - inBasic;
  const inHigher = Math.min(afterBasic, higherRoom);
  const inAdd = Math.max(0, afterBasic - inHigher);
  const dividendTax = inBasic * 0.0875 + inHigher * 0.3375 + inAdd * 0.3935;

  const net = total - salaryTax - ni - dividendTax;
  const totalTax = salaryTax + ni + dividendTax;
  return {
    salary,
    dividends,
    total,
    personalAllowance: pa,
    salaryTax,
    ni,
    dividendAllowance: Math.min(divAllowance, dividendsAfterPA),
    dividendTax,
    net,
    effectiveRate: total > 0 ? (totalTax / total) * 100 : 0,
  };
}

// Find optimal director split: minimal total tax for given total extraction
export function optimiseDirectorSplit(target: number, salaryOptions = [0, 6500, 9100, 12570]): { salary: number; dividends: number; result: DividendResult }[] {
  return salaryOptions
    .filter((sal) => sal <= target)
    .map((salary) => {
      const dividends = target - salary;
      return { salary, dividends, result: calculateDividend(salary, dividends) };
    });
}