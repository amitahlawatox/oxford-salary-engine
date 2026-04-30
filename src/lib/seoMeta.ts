// Centralised SEO metadata + JSON-LD generators for every tool.
// Used by individual tool pages to keep titles, descriptions and structured
// data consistent for Google indexing and AdSense compliance.

export type ToolMeta = {
  path: string;
  title: string;
  description: string;
  h1: string;
  faq?: { q: string; a: string }[];
  howTo?: { name: string; steps: string[] };
};

export const TOOL_META: Record<string, ToolMeta> = {
  "/take-home": {
    path: "/take-home",
    title: "UK Take-Home Pay Calculator 2026/27 - After Tax & NI",
    description:
      "Calculate your UK take-home pay for 2026/27. Income Tax, NI, Student Loan, pension and bonus to the penny. Compare 2025/26 instantly.",
    h1: "Take-Home Pay Calculator",
    faq: [
      {
        q: "How is take-home pay calculated in 2026/27?",
        a: "Take-home equals gross salary minus Income Tax, Class 1 NI, any Student Loan repayment, and pension contributions. Personal Allowance is £12,570 and tapers above £100,000.",
      },
      {
        q: "What changed for the 2026/27 tax year?",
        a: "Bands and Personal Allowance remain frozen, while Student Loan thresholds and supporting worked examples are updated in the public model.",
      },
      {
        q: "Is salary sacrifice better than personal pension?",
        a: "Salary sacrifice reduces gross pay before tax and NI, so it often saves more than making the same contribution from post-tax income.",
      },
    ],
    howTo: {
      name: "How to calculate UK take-home pay",
      steps: [
        "Enter your annual gross salary",
        "Choose region (England/Wales/NI or Scotland)",
        "Add bonus, overtime and pension percentage",
        "Pick your Student Loan plan",
        "Read your monthly net and effective tax rate",
      ],
    },
  },
  "/hourly": {
    path: "/hourly",
    title: "UK Hourly Wage Calculator 2026/27 - Net Pay per Hour",
    description:
      "Convert an hourly rate into annual, monthly and weekly take-home pay after UK tax and NI for the 2026/27 tax year.",
    h1: "Hourly Wage Calculator",
    faq: [
      {
        q: "How many working weeks should I use?",
        a: "Most employees use 52 weeks. Contractors often use 46 to 48 weeks to reflect holidays and downtime.",
      },
      {
        q: "Does this include National Insurance?",
        a: "Yes. Class 1 employee NI is deducted in line with the current primary threshold and upper earnings limit.",
      },
    ],
  },
  "/reverse": {
    path: "/reverse",
    title: "Reverse Salary Calculator UK - Gross from Net 2026/27",
    description:
      "Enter the take-home pay you need and solve the gross salary required after UK tax, NI and Student Loan in 2026/27.",
    h1: "Reverse Salary Calculator",
  },
  "/pay-rise": {
    path: "/pay-rise",
    title: "UK Pay Rise Calculator 2026/27 - Net Increase After Tax",
    description:
      "See exactly how much of your pay rise reaches your bank account after Income Tax, NI and Student Loan in 2026/27.",
    h1: "Pay Rise Simulator",
    faq: [
      {
        q: "Why is my pay rise smaller after tax?",
        a: "Marginal tax, NI and Student Loan deductions stack, so each extra pound is not kept in full.",
      },
    ],
  },
  "/compare": {
    path: "/compare",
    title: "Compare Two Salaries UK 2026/27 - Job Offer Calculator",
    description:
      "Side-by-side UK salary comparison for two job offers. Compare net pay, tax and NI for 2026/27 in one click.",
    h1: "Two-Salary Comparison",
  },
  "/pro-rata": {
    path: "/pro-rata",
    title: "Pro-Rata Salary Calculator UK 2026/27 - Part-Time Pay",
    description:
      "Adjust a full-time salary for part-time hours and calculate the pro-rata UK take-home pay for the 2026/27 tax year.",
    h1: "Pro-Rata Calculator",
  },
  "/two-jobs": {
    path: "/two-jobs",
    title: "Two Jobs Tax Calculator UK 2026/27 - Combined Take-Home",
    description:
      "Combined Income Tax and NI across two UK employments. See your true net pay when working two jobs in 2026/27.",
    h1: "Two-Jobs Tax Calculator",
  },
  "/maternity": {
    path: "/maternity",
    title: "UK Maternity Pay Calculator 2026/27 - SMP Take-Home",
    description:
      "Statutory Maternity Pay take-home calculator. See how SMP and reduced pay periods affect your annual UK net income.",
    h1: "Maternity / SMP Calculator",
  },
  "/self-employed": {
    path: "/self-employed",
    title: "UK Self-Employed Tax Calculator 2026/27 - Class 4 NI",
    description:
      "Sole trader Income Tax, Class 4 NI and payments on account for the 2026/27 UK tax year.",
    h1: "Self-Employed Calculator",
    faq: [
      {
        q: "Has Class 2 NI been abolished?",
        a: "Class 2 NI is voluntary for many self-employed users and remains relevant mainly for State Pension protection.",
      },
    ],
  },
  "/dividend": {
    path: "/dividend",
    title: "Dividend Tax Calculator UK 2026/27 - Director Salary Mix",
    description:
      "Optimise director salary and dividends for 2026/27 with current dividend rates and the £500 allowance.",
    h1: "Dividend Optimiser",
    faq: [
      {
        q: "What is the optimal director salary in 2026/27?",
        a: "A salary around £12,570 is often efficient for one-person limited companies because it aligns with the Personal Allowance and NI thresholds.",
      },
    ],
  },
  "/ir35": {
    path: "/ir35",
    title: "IR35 Calculator UK 2026/27 - Inside vs Outside Take-Home",
    description:
      "Compare contractor net pay inside vs outside IR35 for 2026/27. Turn a day rate into take-home with NI and contractor tax logic.",
    h1: "IR35 Contractor Calculator",
  },
  "/cost-of-living": {
    path: "/cost-of-living",
    title: "UK Cost of Living Salary Adjuster 2026/27",
    description:
      "Compare salaries across UK cities adjusted for cost of living. See real purchasing-power take-home for 2026/27.",
    h1: "Cost-of-Living Adjuster",
  },
};

const SITE = "https://www.uknetpay.co.uk";

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
      step: meta.howTo.steps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s,
        text: s,
      })),
    });
  }

  return ld;
}
