import currency from "currency.js";

export type Region = "england" | "scotland";
export type StudentLoanPlan = "none" | "plan1" | "plan2" | "plan4" | "plan5" | "postgrad";
export type PensionMode = "salary-sacrifice" | "personal";
export type TaxYear = "2026/27" | "2025/26";

interface YearRates {
  pa: number;
  paTaperFrom: number;
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
      { name: "Starter 19%", upTo: 16_537 - 12_570, rate: 0.19 },
      { name: "Basic 20%", upTo: 29_526 - 12_570, rate: 0.2 },
      { name: "Intermediate 21%", upTo: 43_662 - 12_570, rate: 0.21 },
      { name: "Higher 42%", upTo: 75_000 - 12_570, rate: 0.42 },
      { name: "Advanced 45%", upTo: 125_140 - 12_570, rate: 0.45 },
      { name: "Top 48%", upTo: Infinity, rate: 0.48 },
    ],
    ni: { pt: 12_570, uel: 50_270, mainRate: 0.08, upperRate: 0.02 },
    studentLoan: {
      none: { threshold: Infinity, rate: 0 },
      plan1: { threshold: 26_900, rate: 0.09 },
      plan2: { threshold: 29_385, rate: 0.09 },
      plan4: { threshold: 33_795, rate: 0.09 },
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

export function getRates(year: TaxYear = DEFAULT_TAX_YEAR) {
  return RATES[year];
}

export interface CalcInput {
  gross: number;
  region: Region;
  pensionPct: number;
  pensionMode: PensionMode;
  studentLoan: StudentLoanPlan;
  bonus: number;
  overtime: number;
  taxCode?: string;
  taxYear?: TaxYear;
  extraSacrifice?: number;
}

export interface BandSlice {
  name: string;
  rate: number;
  amount: number;
  tax: number;
}

export interface CalcResult {
  gross: number;
  totalGross: number;
  pension: number;
  taxableGross: number;
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

const money = (value: number) => currency(value, { precision: 2, symbol: "" });
const round2 = (value: number) => money(value).value;
const mul = (value: number, rate: number) => round2(value * rate);
const safe = (value: number) => (Number.isFinite(value) ? value : 0);

export function personalAllowance(
  adjustedNetIncome: number,
  taxCode?: string,
  year: TaxYear = DEFAULT_TAX_YEAR,
) {
  const rates = RATES[year];
  let baseAllowance = rates.pa;

  if (taxCode && /^\d{3,4}[A-Z]?$/i.test(taxCode.trim())) {
    const num = Number.parseInt(taxCode.replace(/\D/g, ""), 10);
    if (!Number.isNaN(num)) {
      baseAllowance = num * 10;
    }
  }

  if (adjustedNetIncome <= rates.paTaperFrom) {
    return baseAllowance;
  }

  return Math.max(0, baseAllowance - (adjustedNetIncome - rates.paTaperFrom) / 2);
}

function bandSlices(taxable: number, region: Region, year: TaxYear = DEFAULT_TAX_YEAR): BandSlice[] {
  const bands = region === "scotland" ? RATES[year].scotBands : RATES[year].rukBands;
  const slices: BandSlice[] = [];

  let previousUpper = 0;
  let remaining = taxable;

  for (const band of bands) {
    if (remaining <= 0) {
      break;
    }

    const width = band.upTo - previousUpper;
    const amount = Math.min(remaining, width);
    if (amount > 0) {
      slices.push({
        name: band.name,
        rate: band.rate,
        amount: round2(amount),
        tax: mul(amount, band.rate),
      });
    }

    remaining -= amount;
    previousUpper = band.upTo;
  }

  return slices;
}

export function employeeNI(gross: number, year: TaxYear = DEFAULT_TAX_YEAR) {
  const { pt, uel, mainRate, upperRate } = RATES[year].ni;
  if (gross <= pt) {
    return 0;
  }

  const mainBand = Math.max(0, Math.min(gross, uel) - pt);
  const upperBand = Math.max(0, gross - uel);
  return round2(mul(mainBand, mainRate) + mul(upperBand, upperRate));
}

function niMarginalRate(gross: number, year: TaxYear = DEFAULT_TAX_YEAR) {
  const { pt, uel, mainRate, upperRate } = RATES[year].ni;
  if (gross <= pt) {
    return 0;
  }
  if (gross <= uel) {
    return mainRate;
  }
  return upperRate;
}

export function studentLoanRepayment(
  gross: number,
  plan: StudentLoanPlan,
  year: TaxYear = DEFAULT_TAX_YEAR,
) {
  const { threshold, rate } = RATES[year].studentLoan[plan];
  if (gross <= threshold || rate === 0) {
    return 0;
  }
  return mul(gross - threshold, rate);
}

export function calculate(input: CalcInput): CalcResult {
  const year = input.taxYear ?? DEFAULT_TAX_YEAR;
  const gross = Math.max(0, safe(input.gross));
  const bonus = Math.max(0, safe(input.bonus));
  const overtime = Math.max(0, safe(input.overtime));
  const pensionPct = Math.max(0, safe(input.pensionPct));
  const extraSacrifice = Math.max(0, safe(input.extraSacrifice ?? 0));

  const totalGross = round2(money(gross).add(bonus).add(overtime).value);
  const pension = mul(totalGross, pensionPct / 100);
  const sacrificePension = input.pensionMode === "salary-sacrifice" ? pension : 0;
  const personalPension = input.pensionMode === "personal" ? pension : 0;
  const taxableGross = Math.max(0, round2(money(totalGross).subtract(sacrificePension).subtract(extraSacrifice).value));
  const pa = round2(personalAllowance(taxableGross, input.taxCode, year));
  const taxableIncome = Math.max(0, round2(money(taxableGross).subtract(pa).value));
  const bands = bandSlices(taxableIncome, input.region, year);
  const incomeTax = round2(bands.reduce((sum, band) => sum + band.tax, 0));
  const ni = employeeNI(taxableGross, year);
  const sl = studentLoanRepayment(taxableGross, input.studentLoan, year);
  const net = Math.max(
    0,
    round2(money(taxableGross).subtract(incomeTax).subtract(ni).subtract(sl).subtract(personalPension).value),
  );
  const effectiveRate = totalGross > 0 ? ((incomeTax + ni + sl) / totalGross) * 100 : 0;

  return {
    gross,
    totalGross,
    pension,
    taxableGross,
    personalAllowance: pa,
    taxableIncome,
    incomeTax,
    ni,
    studentLoan: sl,
    net,
    effectiveRate: round2(effectiveRate),
    marginalRate: round2(calcMarginalRate(input) * 100),
    bands,
  };
}

function calcMarginalRate(input: CalcInput) {
  const year = input.taxYear ?? DEFAULT_TAX_YEAR;
  const rates = RATES[year];
  const totalGross = Math.max(0, safe(input.gross) + safe(input.bonus) + safe(input.overtime));
  const extraSacrifice = Math.max(0, safe(input.extraSacrifice ?? 0));
  const salarySacrifice = input.pensionMode === "salary-sacrifice" ? (totalGross * Math.max(0, safe(input.pensionPct)) / 100) : 0;
  const taxableGross = Math.max(0, totalGross - salarySacrifice - extraSacrifice);
  const allowance = personalAllowance(taxableGross, input.taxCode, year);
  const taxableIncome = Math.max(0, taxableGross - allowance);

  const bands = input.region === "scotland" ? rates.scotBands : rates.rukBands;
  let incomeTaxRate = bands[bands.length - 1]?.rate ?? 0;
  for (const band of bands) {
    if (taxableIncome <= band.upTo) {
      incomeTaxRate = band.rate;
      break;
    }
  }

  if (taxableGross > rates.paTaperFrom && taxableGross < rates.paTaperFrom + 2 * rates.pa) {
    incomeTaxRate += 0.2;
  }

  const niRate = niMarginalRate(taxableGross, year);
  const studentLoanRate =
    input.studentLoan !== "none" && taxableGross > rates.studentLoan[input.studentLoan].threshold
      ? rates.studentLoan[input.studentLoan].rate
      : 0;

  return incomeTaxRate + niRate + studentLoanRate;
}

export function solveGrossFromNet(targetAnnualNet: number, base: Omit<CalcInput, "gross">) {
  let lower = 0;
  let upper = 1_500_000;

  for (let index = 0; index < 60; index += 1) {
    const guess = (lower + upper) / 2;
    const result = calculate({ ...base, gross: guess });
    if (result.net < targetAnnualNet) {
      lower = guess;
    } else {
      upper = guess;
    }
  }

  return Math.round((lower + upper) / 2);
}

export function calculateSelfEmployed(
  profit: number,
  region: Region = "england",
  voluntaryClass2 = false,
): SelfEmployedResult {
  const cleanProfit = Math.max(0, safe(profit));
  const rates = RATES[DEFAULT_TAX_YEAR].selfEmployed;
  const pa = round2(personalAllowance(cleanProfit));
  const taxableProfit = Math.max(0, round2(money(cleanProfit).subtract(pa).value));
  const bands = bandSlices(taxableProfit, region);
  const incomeTax = round2(bands.reduce((sum, band) => sum + band.tax, 0));
  const mainBand = Math.max(0, Math.min(cleanProfit, rates.upperProfitsLimit) - rates.lowerProfitsLimit);
  const upperBand = Math.max(0, cleanProfit - rates.upperProfitsLimit);
  const class4 = round2(mul(mainBand, rates.class4Main) + mul(upperBand, rates.class4Upper));
  const class2 = voluntaryClass2 ? round2(3.45 * 52) : 0;
  const totalTax = round2(incomeTax + class4 + class2);
  const net = Math.max(0, round2(money(cleanProfit).subtract(totalTax).value));

  return {
    profit: cleanProfit,
    personalAllowance: pa,
    taxableProfit,
    incomeTax,
    class4,
    class2,
    net,
    paymentsOnAccount: totalTax > 1_000 ? round2(totalTax / 2) : 0,
    effectiveRate: cleanProfit > 0 ? round2((totalTax / cleanProfit) * 100) : 0,
    bands,
  };
}

export function calculateDividend(salary: number, dividends: number): DividendResult {
  const cleanSalary = Math.max(0, safe(salary));
  const cleanDividends = Math.max(0, safe(dividends));
  const total = round2(cleanSalary + cleanDividends);
  const pa = round2(personalAllowance(total));

  const salaryAfterPA = Math.max(0, round2(money(cleanSalary).subtract(pa).value));
  const paLeftForDividends = Math.max(0, round2(pa - cleanSalary));
  const salaryTax = round2(bandSlices(salaryAfterPA, "england").reduce((sum, band) => sum + band.tax, 0));
  const ni = employeeNI(cleanSalary);

  const rates = RATES[DEFAULT_TAX_YEAR].dividend;
  const dividendsAfterPA = Math.max(0, round2(money(cleanDividends).subtract(paLeftForDividends).value));
  const taxableDividends = Math.max(0, round2(money(dividendsAfterPA).subtract(rates.allowance).value));

  const basicRoom = Math.max(0, 37_700 - salaryAfterPA);
  const higherRoom = Math.max(0, (125_140 - 12_570) - Math.max(salaryAfterPA, 37_700));
  const inBasic = Math.min(taxableDividends, basicRoom);
  const afterBasic = Math.max(0, taxableDividends - inBasic);
  const inHigher = Math.min(afterBasic, higherRoom);
  const inAdditional = Math.max(0, afterBasic - inHigher);
  const dividendTax = round2(
    mul(inBasic, rates.basic) + mul(inHigher, rates.higher) + mul(inAdditional, rates.additional),
  );

  const totalTax = round2(salaryTax + ni + dividendTax);
  const net = Math.max(0, round2(money(total).subtract(totalTax).value));

  return {
    salary: cleanSalary,
    dividends: cleanDividends,
    total,
    personalAllowance: pa,
    salaryTax,
    ni,
    dividendAllowance: Math.min(rates.allowance, dividendsAfterPA),
    dividendTax,
    net,
    effectiveRate: total > 0 ? round2((totalTax / total) * 100) : 0,
  };
}

export function optimiseDirectorSplit(target: number, salaryOptions = [0, 6_500, 9_100, 12_570]) {
  return salaryOptions
    .filter((salary) => salary <= target)
    .map((salary) => {
      const dividends = target - salary;
      return { salary, dividends, result: calculateDividend(salary, dividends) };
    });
}
