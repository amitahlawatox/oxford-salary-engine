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
      "Free UK salary calculator for 2026/27. See your exact take-home pay after income tax, National Insurance, pension, and student loan. Results in seconds — no sign-up needed.",
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
      "What gross salary do you need to take home £X per month? Enter your desired net pay — the reverse calculator instantly shows the gross salary to negotiate, after UK income tax, NI, and pension.",
    h1: "Reverse Salary Calculator",
    faq: [
      { q: "What is a reverse salary calculator?", a: "A reverse salary calculator works backwards from your desired take-home pay to tell you the gross salary you need to negotiate. Enter the monthly net you want and it calculates the gross salary that would produce it after income tax and NI." },
      { q: "How much gross salary do I need for £2,500 take-home per month?", a: "To take home £2,500/month (£30,000/year net) in England 2026/27, you need a gross salary of approximately £38,200/year. The exact figure depends on pension contributions and student loan plan." },
      { q: "Can I use the reverse calculator for salary negotiations?", a: "Yes — this is exactly what it's designed for. If you know your current take-home and want to quote a gross figure to a new employer, enter your desired net and the calculator gives you the gross to ask for." },
    ],
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
    faq: [
      { q: "How do I compare two salaries after tax?", a: "Enter both gross salaries into the comparison calculator. It shows side-by-side take-home pay for each, including the monthly and annual difference after income tax, NI, and any pension contributions." },
      { q: "Is a £5,000 pay rise worth it if I move into the higher rate tax band?", a: "Yes — even though earnings above £50,270 are taxed at 40%, you still take home 58p of every extra pound (60p minus 2p NI). A £5,000 gross pay rise above £50,270 adds approximately £2,900 to your annual take-home." },
      { q: "Can I compare salaries from different tax years?", a: "Yes — the comparison tool lets you toggle between 2025/26 and 2026/27 to see exactly how frozen thresholds have affected your real take-home over time." },
    ],
  },
  "/pro-rata": {
    path: "/pro-rata",
    title: "Pro-Rata Salary Calculator UK 2026/27 - Part-Time Pay",
    description:
      "Adjust a full-time salary for part-time hours and calculate the pro-rata UK take-home pay for the 2026/27 tax year.",
    h1: "Pro-Rata Calculator",
    faq: [
      { q: "What does pro-rata salary mean?", a: "A pro-rata salary is a full-time salary adjusted proportionally for part-time hours. If a full-time salary is £40,000 for 37.5 hours/week, someone working 25 hours would earn a pro-rata salary of £26,667." },
      { q: "How is a pro-rata salary calculated?", a: "Pro-rata salary = (part-time hours ÷ full-time hours) × full-time annual salary. Then apply normal income tax and NI to calculate take-home pay." },
      { q: "Does working part-time affect my tax code?", a: "No — your Personal Allowance (£12,570) is the same regardless of hours. However, if you hold multiple part-time jobs, your employer may split your allowance between them, affecting how much tax each employer deducts." },
    ],
  },
  "/two-jobs": {
    path: "/two-jobs",
    title: "Two Jobs Tax Calculator UK 2026/27 - Combined Take-Home",
    description:
      "Combined Income Tax and NI across two UK employments. See your true net pay when working two jobs in 2026/27.",
    h1: "Two-Jobs Tax Calculator",
    faq: [
      { q: "How much tax do I pay on a second job?", a: "Your second job is taxed without a Personal Allowance (as your first job uses it). This means second job income is taxed from the first pound — at 20% if your total income is below £50,270, or 40% above it." },
      { q: "Will my second job always be on emergency tax?", a: "Initially, many second jobs are put on a BR (Basic Rate, 20%) or 0T emergency code. You should contact HMRC to confirm the correct code to avoid over or underpaying tax." },
      { q: "Can I split my Personal Allowance between two jobs?", a: "Yes — contact HMRC to request a split. This can be useful if your two jobs earn similar amounts, as it prevents all your allowance going to one employer while the other taxes you from £0." },
    ],
  },
  "/maternity": {
    path: "/maternity",
    title: "UK Maternity Pay Calculator 2026/27 - SMP Take-Home",
    description:
      "Statutory Maternity Pay take-home calculator. See how SMP and reduced pay periods affect your annual UK net income.",
    h1: "Maternity / SMP Calculator",
    faq: [
      { q: "How is Statutory Maternity Pay calculated?", a: "For the first 6 weeks: 90% of your average weekly earnings. For the following 33 weeks: £187.18/week (2026/27 rate) or 90% of average weekly earnings if lower. SMP is taxable income." },
      { q: "Is Statutory Maternity Pay taxable?", a: "Yes — SMP is taxable income and subject to income tax and National Insurance in the normal way. Your employer deducts these through PAYE." },
      { q: "What is the difference between SMP and enhanced maternity pay?", a: "SMP is the legal minimum paid by your employer (reimbursed by HMRC). Enhanced maternity pay is a contractual benefit some employers offer on top — for example, full pay for the first 3 months. Check your employment contract for your entitlement." },
    ],
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
    faq: [
      { q: "What is IR35?", a: "IR35 is HMRC legislation designed to prevent 'disguised employment' — where contractors work like employees but are paid through a limited company to reduce NI and income tax. If you are 'inside IR35', you pay the same tax and NI as an employee on that income." },
      { q: "How much more tax do you pay inside IR35?", a: "A contractor earning £600/day inside IR35 pays approximately £25,000–£35,000 more per year in tax and NI compared to being outside IR35, depending on their salary/dividend split. Use the calculator to see your specific difference." },
      { q: "Who determines IR35 status?", a: "Since April 2021, medium and large companies determine IR35 status for their contractors. Small companies (meeting 2 of 3: turnover under £10.2m, balance sheet under £5.1m, fewer than 50 employees) leave the determination to the contractor." },
    ],
  },
  "/cost-of-living": {
    path: "/cost-of-living",
    title: "UK Cost of Living Salary Adjuster 2026/27",
    description:
      "Compare salaries across UK cities adjusted for cost of living. See real purchasing-power take-home for 2026/27.",
    h1: "Cost-of-Living Adjuster",
    faq: [
      { q: "How does the cost of living adjuster work?", a: "It adjusts your salary for regional cost of living differences — primarily housing costs. A £40,000 salary in Manchester has more purchasing power than the same salary in London, and the tool quantifies that difference." },
      { q: "Which UK city has the best salary-to-cost-of-living ratio?", a: "Cities like Leeds, Sheffield, and Nottingham consistently offer strong purchasing power — competitive professional salaries combined with housing costs significantly below London and the South East." },
      { q: "Should I take a lower salary to move out of London?", a: "It depends. Use the cost of living calculator to compare your current London net income after housing against a lower gross salary elsewhere. Many workers find a £10,000 salary cut outside London leaves them with more disposable income." },
    ],
  },
};

const SITE = "https://uknetpay.co.uk";

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
