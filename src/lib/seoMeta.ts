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
    title: "UK Salary Calculator 2026/27 — Take-Home Pay, PAYE & Tax Checker",
    description:
      "Free UK salary calculator and PAYE tax checker for 2026/27. Figure out your net pay after income tax, National Insurance, pension and student loan. Works for England, Scotland, Wales and NI. Instant results.",
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
    title: "Pro Rata Calculator UK 2026/27 — What Does Pro Rata Mean + Take-Home",
    description:
      "Calculate pro rata salary for part-time hours and see monthly take-home after UK tax and NI. What does pro rata mean? FTE calculator, term-time and any working pattern. 2026/27 rates.",
    h1: "Pro Rata Salary Calculator",
    faq: [
      { q: "What does pro-rata salary mean?", a: "A pro-rata salary is a full-time salary adjusted proportionally for part-time hours. If a full-time salary is £40,000 for 37.5 hours/week, someone working 25 hours would earn a pro-rata salary of £26,667." },
      { q: "How is a pro-rata salary calculated?", a: "Pro-rata salary = (part-time hours ÷ full-time hours) × full-time annual salary. Then apply normal income tax and NI to calculate take-home pay." },
      { q: "Does working part-time affect my tax code?", a: "No — your Personal Allowance (£12,570) is the same regardless of hours. However, if you hold multiple part-time jobs, your employer may split your allowance between them, affecting how much tax each employer deducts." },
      { q: "How do I calculate pro rata pay for maternity return?", a: "If you return from maternity leave on reduced hours, multiply your full-time equivalent salary by (your new hours ÷ full-time hours). For example, returning to 3 days/week from 5: £35,000 × (3 ÷ 5) = £21,000 pro-rata." },
    ],
    howTo: {
      name: "How to calculate pro rata salary",
      steps: [
        "Enter your full-time equivalent salary",
        "Set the standard full-time hours per week",
        "Adjust the slider to your actual working hours",
        "Read your pro-rata salary and take-home pay",
      ],
    },
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
    title: "Inside IR35 Calculator UK 2026/27 — Contractor Take-Home Inside vs Outside",
    description:
      "Free inside IR35 calculator for 2026/27. Compare contractor take-home pay inside vs outside IR35 from your day rate. See the exact difference in net income with NI and dividend tax.",
    h1: "Inside IR35 Calculator",
    faq: [
      { q: "What is IR35?", a: "IR35 is HMRC legislation designed to prevent 'disguised employment' — where contractors work like employees but are paid through a limited company to reduce NI and income tax. If you are 'inside IR35', you pay the same tax and NI as an employee on that income." },
      { q: "How much more tax do you pay inside IR35?", a: "A contractor earning £600/day inside IR35 pays approximately £25,000–£35,000 more per year in tax and NI compared to being outside IR35, depending on their salary/dividend split. Use the calculator to see your specific difference." },
      { q: "Who determines IR35 status?", a: "Since April 2021, medium and large companies determine IR35 status for their contractors. Small companies (meeting 2 of 3: turnover under £10.2m, balance sheet under £5.1m, fewer than 50 employees) leave the determination to the contractor." },
      { q: "What happens if you are caught inside IR35?", a: "If HMRC determines your contract is inside IR35, the client (or agency) must deduct income tax and employee NI from your fees. You lose the ability to take dividends from a limited company on that income, and the client pays employer NI on top. Back-tax plus interest and penalties can apply to previous years." },
    ],
    howTo: {
      name: "How to calculate IR35 take-home pay",
      steps: [
        "Enter your contractor day rate",
        "Set the number of billable days per year",
        "Add your annual business expenses",
        "Compare inside IR35 vs outside IR35 net pay",
      ],
    },
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

  "/childcare": {
    path: "/childcare",
    title: "Childcare Cost Calculator UK 2026 — After Free Hours & Tax-Free Childcare",
    description: "Calculate monthly childcare costs after government-funded hours. Covers 30 hours free childcare, Tax-Free Childcare 20% top-up, and salary sacrifice savings. Based on gov.uk 2026 rules.",
    h1: "Childcare Cost Calculator 2026",
    faq: [
      { q: "How do I calculate childcare costs after funded hours?", a: "Subtract your government-funded hours (15 or 30 per week) from your total hours needed. Multiply remaining hours by your local hourly rate. Use Tax-Free Childcare to reduce costs further by 20%, up to £2,000/year." },
      { q: "Can I use Tax-Free Childcare and the 30 hours free childcare together?", a: "Yes — you can use both Tax-Free Childcare and the 30 funded hours simultaneously. The 30 hours covers the childcare hours; Tax-Free Childcare gives you a 20% government top-up on what you pay for additional hours." },
      { q: "What is salary sacrifice childcare?", a: "Some employers offer childcare via salary sacrifice, where you pay for childcare from your pre-tax salary, saving income tax and National Insurance on the amount sacrificed." },
    ],
  },
  "/salary-sacrifice/electric-car": {
    path: "/salary-sacrifice/electric-car",
    title: "EV Salary Sacrifice Calculator UK 2026 — Electric Car Tax Saving",
    description: "Calculate your EV salary sacrifice saving for 2026/27. Income tax and NI saved vs BiK at 4%. See your true net monthly cost for an electric company car.",
    h1: "EV Salary Sacrifice Calculator",
    faq: [
      { q: "What is the BiK rate for electric cars in 2026/27?", a: "The Benefit in Kind rate for fully electric cars is 4% of the car's P11D list price in 2026/27 — the lowest BiK rate of any car type." },
      { q: "How much can I save with EV salary sacrifice?", a: "On a £45,000 salary with a £35,000 EV at £450/month sacrifice, you save approximately £1,800/year in income tax and NI, reduced by the BiK tax cost — giving a true net monthly cost significantly below the gross sacrifice amount." },
    ],
  },
  "/nhs": {
    path: "/nhs",
    title: "NHS Salary Calculator 2026/27 — Take-Home Pay by Band",
    description:
      "Free NHS take-home pay calculator for 2026/27. Select your Agenda for Change band, see exact net pay after income tax, NI, and NHS Pension. All bands from Band 1 to Band 9.",
    h1: "NHS Take-Home Pay Calculator",
    faq: [
      { q: "How much do NHS nurses take home after tax?", a: "A newly qualified Band 5 nurse earning £30,820 takes home approximately £1,956/month after tax, NI, and 10% NHS Pension. At the top of Band 5 (£38,352), monthly take-home rises to approximately £2,350." },
      { q: "Is the NHS Pension worth it?", a: "Yes — the NHS Pension is a defined benefit scheme with a 23.7% employer contribution. Even accounting for employee contributions of 5.2%–12.5%, it provides significantly more retirement income than typical workplace pensions. Opting out means losing the employer contribution entirely." },
      { q: "What are the NHS pension contribution tiers in 2026/27?", a: "NHS pension tiers range from 5.2% (earnings up to £13,246) to 12.5% (earnings above £43,693). Contributions are deducted before tax via salary sacrifice, reducing your tax bill." },
      { q: "Do NHS unsocial hours affect take-home pay?", a: "Yes — enhancements for nights, weekends, and bank holidays are taxable income. Enter your total annual salary including enhancements for an accurate take-home figure." },
    ],
    howTo: {
      name: "How to calculate NHS take-home pay",
      steps: [
        "Select your Agenda for Change pay band",
        "Adjust the salary to your point on the pay spine",
        "Choose your NHS Pension contribution tier",
        "Read your monthly and annual take-home pay",
      ],
    },
  },
  "/umbrella": {
    path: "/umbrella",
    title: "Umbrella Company Calculator UK 2026/27 — Take-Home Pay from Assignment Rate",
    description:
      "Free umbrella company take-home pay calculator for 2026/27. Enter your assignment rate to see net pay after employer NI, umbrella margin, and PAYE. Compare with limited company.",
    h1: "Umbrella Company Calculator",
    faq: [
      { q: "What is a good umbrella company margin?", a: "Typical umbrella margins range from £20 to £30 per week. Be wary of very low margins — they may recoup costs through hidden fees or deducting employer NI after quoting your 'gross salary'." },
      { q: "Can I claim expenses through an umbrella company?", a: "Since April 2016, umbrella company workers under the supervision, direction, or control of the client generally cannot claim tax relief on travel and subsistence expenses." },
      { q: "Is umbrella or limited company better?", a: "For day rates above £400/day outside IR35, a limited company typically saves £5,000–£15,000/year vs umbrella. Inside IR35, the difference is minimal. Use the calculator to see your specific numbers." },
      { q: "Why is my umbrella take-home so low?", a: "Employer NI (15% above £5,000) is the main culprit. Unlike permanent employment where the employer absorbs this cost, in an umbrella setup it is deducted from your assignment rate before calculating your gross pay." },
    ],
    howTo: {
      name: "How to calculate umbrella company take-home pay",
      steps: [
        "Enter your annual assignment rate",
        "Set the umbrella company margin per week",
        "Optionally add a pension contribution percentage",
        "Read your monthly take-home after all deductions",
      ],
    },
  },
  "/day-rate": {
    path: "/day-rate",
    title: "Day Rate Calculator UK 2026/27 — Contractor Salary & Take-Home",
    description:
      "Free day rate calculator for UK contractors 2026/27. Convert your day rate to annual salary and take-home pay. Compare umbrella, limited company, and permanent PAYE equivalents.",
    h1: "Day Rate Calculator",
    faq: [
      { q: "How do I convert a day rate to annual salary?", a: "Multiply your day rate by billable days per year. Most UK contractors use 220 days (52 weeks × 5 days minus 30 days for holidays and bank holidays). So £500/day × 220 = £110,000 annual equivalent." },
      { q: "What is a good day rate in the UK?", a: "Day rates vary by industry: junior developer £250–£350, senior developer £400–£600, IT architect £600–£900, management consultant £500–£1,200. Use the calculator to see what each rate means for take-home." },
      { q: "How many billable days should I use?", a: "220 days is standard (52 weeks × 5 days minus 25 holiday days and 8 bank holidays). IT contractors often use 230 days, while those with more time off use 200." },
      { q: "Should I go umbrella or limited company?", a: "For day rates above £400 outside IR35, limited company typically saves £5,000–£15,000/year. Inside IR35, umbrella is simpler with similar net pay. The calculator shows both side by side." },
    ],
    howTo: {
      name: "How to calculate take-home from a day rate",
      steps: [
        "Enter your day rate",
        "Set billable days per year (220 typical)",
        "Add annual expenses for limited company",
        "Compare umbrella, Ltd, and PAYE take-home",
      ],
    },
  },
  "/teacher": {
    path: "/teacher",
    title: "Teacher Pay Calculator 2026/27 — STPCD Scale Points M1–U3 Take-Home",
    description:
      "Free teacher salary calculator covering the full STPCD 2026/27 pay scale. Select M1–U3 or Leadership point, region, FTE and TPS pension. See exact monthly take-home for every teacher pay scale point.",
    h1: "Teacher Pay Calculator 2026/27",
    faq: [
      { q: "How much does an NQT teacher take home per month in 2026/27?", a: "An NQT on M1 (£31,650 outside London) takes home approximately £2,212/month before TPS pension contributions. After 8.3% pension, monthly take-home is approximately £1,993. In Inner London on M1 (£42,637), take-home before pension is approximately £2,864/month." },
      { q: "How does the Teachers' Pension Scheme affect take-home pay?", a: "TPS contributions are tiered from 8.3% to 11.7% of pensionable pay. On M3 (£35,674), the 8.3% contribution is approximately £247/month, reducing take-home from ~£2,473 to ~£2,226/month. In return, teachers build a defined-benefit career average pension — one of the most valuable workplace pensions in the UK." },
      { q: "How is part-time teacher pay calculated?", a: "Part-time teachers are paid on a pro-rata basis. A 0.6 FTE teacher on M1 earns £31,650 × 0.6 = £18,990 gross annually. Use the FTE slider to model any working pattern." },
    ],
  },

  "/bonus": {
    path: "/bonus",
    title: "Bonus Tax Calculator UK 2026/27 — How Much of Your Bonus Do You Keep?",
    description:
      "Calculate exactly how much of your UK bonus you keep after income tax and NI. Enter your salary and bonus to see tax deducted, net bonus, and effective rate. 2026/27.",
    h1: "Bonus Tax Calculator",
    faq: [
      { q: "How is a bonus taxed in the UK?", a: "Your bonus is added to your salary and taxed at your marginal rate. In the basic rate band, 28% combined (20% tax + 8% NI) is deducted. In the higher rate band, 42% (40% + 2%). If your bonus pushes total income above £100,000, you lose £1 of Personal Allowance per £2 earned, creating a 62% effective rate." },
      { q: "Can I reduce tax on my bonus?", a: "Yes — the most effective method is salary sacrifice into your pension. Ask your employer to pay the bonus directly as an employer pension contribution. This avoids both Income Tax and NI entirely, meaning the full gross amount goes into your pension." },
    ],
  },

  "/overtime": {
    path: "/overtime",
    title: "Overtime Calculator UK 2026/27 — Net Pay After Tax on Overtime",
    description:
      "Calculate UK overtime take-home pay after income tax and NI. Supports 1×, 1.25×, 1.5× and 2× rates. See annual and monthly net overtime pay for 2026/27.",
    h1: "Overtime Pay Calculator",
    faq: [
      { q: "How is overtime taxed in the UK?", a: "Overtime is taxed exactly like regular salary — HMRC does not have a separate rate. Your employer adds overtime to your gross pay for the period and applies PAYE income tax and NI to the total. If overtime pushes your earnings into a higher band, the excess is taxed at 40%." },
      { q: "What is the minimum overtime rate in the UK?", a: "There is no statutory minimum for overtime rates — your employer can pay basic rate (1×) for overtime as long as average pay across all hours meets National Living Wage (£12.21/hour for 21+). Many contracts specify time-and-a-quarter (1.25×) or time-and-a-half (1.5×)." },
    ],
  },

  "/contractor/take-home": {
    path: "/contractor/take-home",
    title: "Contractor Take-Home Calculator UK 2026 — Umbrella vs Limited Company",
    description: "Compare umbrella company vs limited company (outside IR35) take-home pay from your day rate. Uses 2026/27 corporation tax, dividend tax, and NI rates.",
    h1: "Contractor Take-Home Calculator",
    faq: [
      { q: "Is a limited company always better than umbrella for contractors?", a: "For higher day rates (£400+/day), limited company typically takes home £5,000–£15,000 more per year than umbrella. For lower day rates or if inside IR35, the difference narrows significantly." },
      { q: "What salary/dividend split should I use for my limited company?", a: "The most tax-efficient split in 2026/27 is typically £12,570 salary (using the full personal allowance) with remaining profits taken as dividends. This minimises National Insurance while using all available allowances." },
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
