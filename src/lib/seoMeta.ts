// Centralised SEO metadata + JSON-LD generators for every tool.
// Used by individual tool pages to keep titles, descriptions and structured
// data consistent for Google indexing and AdSense compliance.

export type ToolMeta = {
  path: string;
  title: string;        // <60 chars, keyword-led
  description: string;  // <160 chars
  h1: string;
  faq?: { q: string; a: string }[];
  howTo?: { name: string; steps: string[] };
};

export const TOOL_META: Record<string, ToolMeta> = {
  "/take-home": {
    path: "/take-home",
    title: "UK Take-Home Pay Calculator 2026/27 — After Tax & NI",
    description: "Calculate your UK take-home pay for 2026/27. Income Tax, NI, Student Loan, pension and bonus — to the penny. Compare 2025/26 instantly.",
    h1: "Take-Home Pay Calculator",
    faq: [
      { q: "How is take-home pay calculated in 2026/27?", a: "Take-home equals gross salary minus Income Tax (20/40/45% bands), Class 1 NI (8% main / 2% upper), Student Loan and pension contributions. Personal Allowance is £12,570, tapered above £100,000." },
      { q: "What changed for the 2026/27 tax year?", a: "Bands and Personal Allowance remain frozen, but Student Loan repayment thresholds rose: Plan 1 to £26,065, Plan 2 to £28,470, Plan 4 to £32,745." },
      { q: "Is salary sacrifice better than personal pension?", a: "Salary sacrifice reduces gross pay before tax and NI, so it almost always beats personal contributions for higher earners — saving an extra 8% NI on the contribution." },
    ],
    howTo: { name: "How to calculate UK take-home pay", steps: ["Enter your annual gross salary", "Choose region (England/Wales/NI or Scotland)", "Add bonus, overtime and pension %", "Pick your Student Loan plan", "Read your monthly net and effective tax rate"] },
  },
  "/hourly": {
    path: "/hourly",
    title: "UK Hourly Wage Calculator 2026/27 — Net Pay per Hour",
    description: "Convert an hourly rate into annual, monthly and weekly take-home pay after UK tax and NI for the 2026/27 tax year.",
    h1: "Hourly Wage Calculator",
    faq: [
      { q: "How many working weeks should I use?", a: "Most employees use 52 weeks; if you take 5.6 weeks paid leave it's already included. Contractors typically use 46–48 weeks to allow for holidays and downtime." },
      { q: "Does this include National Insurance?", a: "Yes — Class 1 employee NI is deducted at 8% between £12,570 and £50,270, and 2% above." },
    ],
  },
  "/reverse": {
    path: "/reverse",
    title: "Reverse Salary Calculator UK — Gross from Net 2026/27",
    description: "Enter the take-home pay you need and we'll solve the gross salary required after UK tax, NI and Student Loan in 2026/27.",
    h1: "Reverse Salary Calculator",
  },
  "/pay-rise": {
    path: "/pay-rise",
    title: "UK Pay Rise Calculator 2026/27 — Net Increase After Tax",
    description: "See exactly how much of your pay rise reaches your bank account after Income Tax, NI and Student Loan in 2026/27.",
    h1: "Pay Rise Simulator",
    faq: [
      { q: "Why is my pay rise smaller after tax?", a: "Marginal rates stack: 20–45% Income Tax, 8% or 2% NI, plus 9% Student Loan if applicable — so a 40% taxpayer typically keeps 49p of every extra £1." },
    ],
  },
  "/compare": {
    path: "/compare",
    title: "Compare Two Salaries UK 2026/27 — Job Offer Calculator",
    description: "Side-by-side UK salary comparison for two job offers. Compare net pay, tax and NI for 2026/27 in one click.",
    h1: "Two-Salary Comparison",
  },
  "/pro-rata": {
    path: "/pro-rata",
    title: "Pro-Rata Salary Calculator UK 2026/27 — Part-Time Pay",
    description: "Adjust a full-time salary for part-time hours and calculate the pro-rata UK take-home pay for the 2026/27 tax year.",
    h1: "Pro-Rata Calculator",
  },
  "/two-jobs": {
    path: "/two-jobs",
    title: "Two Jobs Tax Calculator UK 2026/27 — Combined Take-Home",
    description: "Combined Income Tax and NI across two UK employments. See your true net pay when working two jobs in 2026/27.",
    h1: "Two-Jobs Tax Calculator",
  },
  "/maternity": {
    path: "/maternity",
    title: "UK Maternity Pay Calculator 2026/27 — SMP Take-Home",
    description: "Statutory Maternity Pay take-home calculator. See how SMP and reduced pay periods affect your annual UK net income.",
    h1: "Maternity / SMP Calculator",
  },
  "/self-employed": {
    path: "/self-employed",
    title: "UK Self-Employed Tax Calculator 2026/27 — Class 4 NI",
    description: "Sole trader Income Tax + Class 4 NI (6%/2%) and payments on account for the 2026/27 UK tax year.",
    h1: "Self-Employed Calculator",
    faq: [
      { q: "Has Class 2 NI been abolished?", a: "Class 2 NI was effectively abolished from April 2024 for most self-employed — voluntary contributions remain available to protect State Pension entitlement." },
    ],
  },
  "/dividend": {
    path: "/dividend",
    title: "Dividend Tax Calculator UK 2026/27 — Director Salary Mix",
    description: "Optimise director salary + dividends for 2026/27. Dividend rates 8.75% / 33.75% / 39.35% with £500 allowance.",
    h1: "Dividend Optimiser",
    faq: [
      { q: "What is the optimal director salary in 2026/27?", a: "£12,570 (the Primary Threshold and Personal Allowance) usually maximises take-home for one-person limited companies, with the rest taken as dividends." },
    ],
  },
  "/ir35": {
    path: "/ir35",
    title: "IR35 Calculator UK 2026/27 — Inside vs Outside Take-Home",
    description: "Compare contractor net pay inside vs outside IR35 for 2026/27. Day rate to take-home with NI and corporation tax.",
    h1: "IR35 Contractor Calculator",
  },
  "/cost-of-living": {
    path: "/cost-of-living",
    title: "UK Cost of Living Salary Adjuster 2026/27",
    description: "Compare salaries across UK cities adjusted for cost of living. See real purchasing-power take-home for 2026/27.",
    h1: "Cost-of-Living Adjuster",
  },
};

const SITE = "https://uknetpay.co.uk";

/** Build a JSON-LD array for a tool page (WebApplication + FAQ + HowTo + Breadcrumb) */
export function buildToolJsonLd(meta: ToolMeta) {
  const ld: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: meta.h1,
      url: `${SITE}${meta.path}`,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      description: meta.description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
      isPartOf: { "@type": "WebSite", name: "UK Net Pay", url: SITE },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "UK Net Pay", item: SITE },
        { "@type": "ListItem", position: 2, name: meta.h1, item: `${SITE}${meta.path}` },
      ],
    },
  ];

  if (meta.faq?.length) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: meta.faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  if (meta.howTo) {
    ld.push({
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: meta.howTo.name,
      step: meta.howTo.steps.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s, text: s })),
    });
  }

  return ld;
}
