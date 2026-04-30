import { describe, expect, it } from "vitest";
import { calculate, getRates, personalAllowance, type CalcInput } from "@/lib/tax/engine";

const baseInput = (overrides: Partial<CalcInput> = {}): CalcInput => ({
  gross: 0,
  region: "england",
  pensionPct: 0,
  pensionMode: "personal",
  studentLoan: "none",
  bonus: 0,
  overtime: 0,
  taxCode: "1257L",
  taxYear: "2026/27",
  extraSacrifice: 0,
  ...overrides,
});

describe("2026/27 statutory variable audit", () => {
  it("matches the core 2026/27 rates we publish", () => {
    const rates = getRates("2026/27");

    expect(rates.pa).toBe(12_570);
    expect(rates.paTaperFrom).toBe(100_000);
    expect(rates.rukBands[0].upTo).toBe(37_700);
    expect(rates.ni.mainRate).toBe(0.08);
    expect(rates.ni.upperRate).toBe(0.02);
    expect(rates.studentLoan.plan5.threshold).toBe(25_000);
    expect(rates.studentLoan.plan5.rate).toBe(0.09);
  });
});

describe("Oxford methodology stress tests", () => {
  it("handles the average earner at £35,000 with clean take-home maths", () => {
    const result = calculate(baseInput({ gross: 35_000, studentLoan: "plan2" }));

    expect(result.personalAllowance).toBe(12_570);
    expect(result.taxableIncome).toBe(22_430);
    expect(result.incomeTax).toBe(4_486);
    expect(result.ni).toBe(1_794.4);
    expect(result.studentLoan).toBe(505.35);
    expect(result.net).toBe(28_214.25);
    expect(result.marginalRate).toBe(37);
  });

  it("calculates the £110,000 tax trap taper exactly", () => {
    const allowance = personalAllowance(110_000, "1257L", "2026/27");
    const result = calculate(baseInput({ gross: 110_000 }));

    expect(allowance).toBe(7_570);
    expect(result.personalAllowance).toBe(7_570);
    expect(result.taxableIncome).toBe(102_430);
    expect(result.incomeTax).toBe(33_432);
    expect(result.ni).toBe(4_210.6);
    expect(result.net).toBe(72_357.4);
    expect(result.marginalRate).toBe(62);
  });

  it("applies the Scottish six-band divergence for an £80,000 earner", () => {
    const scotland = calculate(baseInput({ gross: 80_000, region: "scotland" }));
    const restOfUk = calculate(baseInput({ gross: 80_000, region: "england" }));

    expect(scotland.personalAllowance).toBe(12_570);
    expect(scotland.incomeTax).toBe(21_732.05);
    expect(scotland.net).toBe(54_657.35);
    expect(scotland.incomeTax).toBeGreaterThan(restOfUk.incomeTax);
    expect(scotland.net).toBeLessThan(restOfUk.net);
    expect(scotland.marginalRate).toBe(47);
  });
});
