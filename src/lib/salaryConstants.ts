const popular = [
  15_000, 18_000, 20_000, 22_000, 24_000, 25_000, 26_000, 27_000, 28_000,
  29_000, 30_000, 32_000, 35_000, 37_500, 40_000, 42_500, 45_000, 47_500,
  50_000, 55_000, 60_000, 65_000, 70_000, 75_000, 80_000, 85_000, 90_000,
  95_000, 100_000, 110_000, 120_000, 130_000, 150_000, 175_000, 200_000,
];

/** Salary levels shown in cross-link chips on salary pages. */
export const POPULAR_SALARIES: readonly number[] = popular;

/**
 * Every salary for the sitemap.
 * £10k–£300k in £500 steps = 581 pages targeting "[X] after tax uk" queries.
 */
export const ALL_SITEMAP_SALARIES: readonly number[] = (() => {
  const arr: number[] = [];
  for (let s = 10_000; s <= 300_000; s += 500) arr.push(s);
  return arr;
})();

export const MIN_SALARY = 10_000;
export const MAX_SALARY = 500_000;
