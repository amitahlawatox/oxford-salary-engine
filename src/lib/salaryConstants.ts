const popular = [
  15_000, 18_000, 20_000, 22_000, 24_000, 25_000, 26_000, 27_000, 28_000,
  29_000, 30_000, 31_000, 32_000, 33_000, 34_000, 35_000, 36_000, 37_000,
  38_000, 39_000, 40_000, 42_000, 45_000, 48_000, 50_000, 55_000, 60_000,
  65_000, 70_000, 75_000, 80_000, 85_000, 90_000, 95_000, 100_000,
  110_000, 120_000, 130_000, 150_000, 175_000, 200_000,
];

/** Salary levels shown in cross-link chips on salary pages. */
export const POPULAR_SALARIES: readonly number[] = popular;

/** Every salary for the sitemap (£15k–£100k in £1k steps, then £5k up to £200k). */
export const ALL_SITEMAP_SALARIES: readonly number[] = (() => {
  const arr: number[] = [];
  for (let s = 15_000; s <= 100_000; s += 1_000) arr.push(s);
  for (let s = 105_000; s <= 200_000; s += 5_000) arr.push(s);
  return arr;
})();

export const MIN_SALARY = 10_000;
export const MAX_SALARY = 500_000;
