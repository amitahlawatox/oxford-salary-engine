import { Link } from "react-router-dom";
import { MiniCalculator } from "@/components/tools/MiniCalculator";
import { RelatedTools } from "@/components/article/RelatedTools";
import type { Article } from "./types";

const ToolLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-accent underline underline-offset-4 hover:opacity-80">{children}</Link>
);

export const ARTICLES: Article[] = [
  // 1
  {
    slug: "salary-calculator-uk-2026",
    title: "UK Salary Calculator 2026/27 — The Complete Guide",
    description: "Everything that changed in the 2026/27 UK tax year and how to work out your real take-home pay in under a minute.",
    excerpt: "Tax year 2026/27 brought frozen Personal Allowance, refreshed Student Loan thresholds, and a six-tier Scottish system. Here's exactly what it means for your payslip.",
    category: "Tax",
    keywords: ["salary calculator", "take home pay", "2026/27"],
    readMinutes: 7,
    publishedISO: "2026-04-08",
    updatedISO: "2026-04-29",
    faq: [
      { q: "What is the personal allowance for 2026/27?", a: "£12,570 — frozen since 2021/22 and locked in until at least April 2028." },
      { q: "How is take-home pay actually calculated?", a: "Gross salary, minus pension contributions (if salary sacrifice), minus Income Tax on the taxable portion, minus Class 1 National Insurance, minus any Student Loan repayment." },
    ],
    body: () => (
      <>
        <p>The 2026/27 UK tax year runs from <strong>6 April 2026 to 5 April 2027</strong>. If you're trying to work out your real monthly take-home pay, this is the only guide you need.</p>
        <p>Skip straight to the <ToolLink to="/take-home">Take-Home Pay Calculator</ToolLink> if you just want the number — but the explanations below are what most "salary calculator" sites quietly get wrong.</p>

        <h2 id="what-changed">What's actually changed for 2026/27</h2>
        <ul>
          <li><strong>Personal Allowance:</strong> still £12,570. The freeze continues — fiscal drag is doing the work of stealth tax rises.</li>
          <li><strong>Income Tax bands (rest of UK):</strong> unchanged at 20% / 40% / 45%.</li>
          <li><strong>Scotland:</strong> the six-tier system continues with rates of 19% / 20% / 21% / 42% / 45% / 48%.</li>
          <li><strong>National Insurance:</strong> 8% main rate / 2% above the upper earnings limit (£50,270).</li>
          <li><strong>Student Loans:</strong> Plan 1 threshold rose to £26,900, Plan 2 to £29,385, Plan 4 to £33,795.</li>
        </ul>

        <h2 id="how-it-works">How take-home is calculated, step by step</h2>
        <ol>
          <li>Start with your <strong>gross annual salary</strong> (and add bonus or overtime).</li>
          <li>Subtract any <strong>salary-sacrifice pension</strong> contributions — these come out before tax and NI.</li>
          <li>Apply your <strong>Personal Allowance</strong> (£12,570 by default; tapered above £100,000).</li>
          <li>Tax the remainder using your region's bands.</li>
          <li>Subtract <strong>Class 1 NI</strong> on earnings above the Primary Threshold.</li>
          <li>Subtract <strong>Student Loan</strong> repayments (9% above your plan threshold).</li>
        </ol>
        <p>Whatever's left is your annual net. Divide by 12 for monthly take-home, by 52 for weekly.</p>

        <h2 id="example">Worked example: £50,000 salary in England</h2>
        <table>
          <thead><tr><th>Component</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Gross salary</td><td>£50,000.00</td></tr>
            <tr><td>Personal Allowance</td><td>−£12,570.00</td></tr>
            <tr><td>Income Tax (20% × £37,430)</td><td>−£7,486.00</td></tr>
            <tr><td>National Insurance</td><td>−£2,994.40</td></tr>
            <tr><td><strong>Net take-home</strong></td><td><strong>£39,519.60</strong></td></tr>
          </tbody>
        </table>
        <p>That's £3,293 per month. The same salary in Scotland delivers about £38,024/year — a £1,496 difference, almost entirely from the Higher 42% kicking in earlier.</p>

        <h2 id="next-steps">Next steps</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Pay Calculator</ToolLink> to plug in your exact numbers, then compare it to last year using the built-in <strong>Compare YoY</strong> toggle. If you're a contractor, the <ToolLink to="/ir35">IR35 calculator</ToolLink> and <ToolLink to="/dividend">Dividend optimiser</ToolLink> are essential.</p>
      </>
    ),
  },

  // 2
  {
    slug: "scotland-vs-england-tax-2026",
    title: "Scotland vs England Take-Home Pay 2026/27",
    description: "How much more — or less — do you pay in Scotland in 2026/27? Side-by-side breakdowns at every salary level.",
    excerpt: "Scotland's six-tier income tax system means cross-border moves matter. Here's the exact monthly difference at £30k, £50k, £75k and £125k.",
    category: "Scotland",
    keywords: ["scotland", "tax", "comparison", "take home pay"],
    readMinutes: 6,
    publishedISO: "2026-04-10",
    updatedISO: "2026-04-29",
    faq: [
      { q: "When does Scottish income tax become more expensive than rUK?", a: "From around £29,000 the Intermediate rate begins to bite, and from £43,663 the Higher rate of 42% applies — well below England's £50,270 40% threshold." },
      { q: "Do I pay Scottish tax if I work remotely from Scotland for a London employer?", a: "Yes — your tax residence (where you live) determines whether you pay Scottish rates, not your employer's location." },
    ],
    body: () => (
      <>
        <p>Scotland and England have different income tax rates and bands. Since the Scottish Parliament gained full income tax-varying powers in 2017, Scottish taxpayers have paid increasingly different rates — and from 2023/24 onwards, the divergence for higher earners has become substantial. If you're comparing a job offer in Scotland versus England, or considering relocating, the tax difference is a material factor in the net financial outcome.</p>
        <h2 id="rates">Scotland vs England — income tax rates 2026/27</h2>
        <table>
          <thead><tr><th>Band</th><th>Scotland rate</th><th>England rate</th><th>Income range</th></tr></thead>
          <tbody>
            <tr><td>Starter rate</td><td>19%</td><td>20%</td><td>£12,571–£14,667</td></tr>
            <tr><td>Basic rate</td><td>20%</td><td>20%</td><td>£14,668–£25,296</td></tr>
            <tr><td>Intermediate rate</td><td>21%</td><td>20%</td><td>£25,297–£43,662</td></tr>
            <tr><td>Higher rate</td><td>42%</td><td>40%</td><td>£43,663–£75,000 (Scot) / £50,271 (Eng)</td></tr>
            <tr><td>Advanced rate</td><td>45%</td><td>40%</td><td>£75,001–£125,140 (Scot only)</td></tr>
            <tr><td>Top / Additional rate</td><td>48%</td><td>45%</td><td>Over £125,140</td></tr>
          </tbody>
        </table>
        <h2 id="real-difference">Real take-home difference in pounds per month</h2>
        <table>
          <thead><tr><th>Gross salary</th><th>England take-home</th><th>Scotland take-home</th><th>Scotland pays more by</th></tr></thead>
          <tbody>
            <tr><td>£25,000</td><td>£1,775/month</td><td>£1,770/month</td><td>~£5/month</td></tr>
            <tr><td>£35,000</td><td>£2,460/month</td><td>£2,432/month</td><td>~£28/month</td></tr>
            <tr><td>£50,000</td><td>£3,129/month</td><td>£2,978/month</td><td>~£151/month</td></tr>
            <tr><td>£60,000</td><td>£3,583/month</td><td>£3,365/month</td><td>~£218/month</td></tr>
            <tr><td>£80,000</td><td>£4,437/month</td><td>£4,082/month</td><td>~£355/month</td></tr>
            <tr><td>£100,000</td><td>£5,246/month</td><td>£4,773/month</td><td>~£473/month</td></tr>
          </tbody>
        </table>
        <p><small>No student loan, no pension, standard tax code. NI rates are the same in both countries — NI is reserved to Westminster.</small></p>
        <h2 id="offsets">What offsets the Scottish tax premium?</h2>
        <p>Scotland's higher income tax is partially offset by policy differences: there are no prescription charges in Scotland (worth up to £34.65 per item in England), university tuition is free for Scottish-domiciled students (versus £9,535/year in England for 2025 entry), and personal care for older people is free. Council tax rates vary by local authority and are not systematically higher or lower in Scotland. For most working-age professionals without prescription needs, the net effect is that Scotland is more expensive in income tax terms — particularly above £43,662.</p>
        <h2 id="pension">Pension relief: Scotland's one advantage for higher earners</h2>
        <p>Scottish higher rate taxpayers receive 42% pension tax relief (vs 40% in England) on salary sacrifice contributions. A £10,000 pension contribution saves a Scottish 42% taxpayer £4,200 in income tax — £200 more than an English higher-rate taxpayer saves. For those earning £43,663–£75,000 in Scotland, maximising pension contributions is especially valuable.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Scottish Take-Home Calculator"},{path:"/insights/scottish-income-tax-bands-2026-27",label:"Scottish Tax Bands Full Guide"}]}
          salaries={[{amount:35000},{amount:50000},{amount:60000},{amount:80000},{amount:100000}]}
        />
      </>
    ),
  },

  // 3
  {
    slug: "scottish-tax-hike-2026-explained",
    title: "How the 2026 Scottish Tax Hike Affects You",
    description: "What changed in Scottish income tax for 2026/27 and how to mitigate it through pension and salary sacrifice.",
    excerpt: "The Advanced and Top rates remain Scotland's defining feature. Here's the practical playbook for higher earners north of the border.",
    category: "Scotland",
    keywords: ["scotland", "tax", "pension"],
    readMinutes: 5,
    publishedISO: "2026-04-12",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>Scotland's income tax rates have diverged significantly from England since the Scottish Parliament gained tax-varying powers. The 2023 Scottish Budget introduced a new Advanced Rate of 45% (above the English higher rate of 40%) and maintained the intermediate rate of 21%, creating meaningful take-home pay differences for Scottish earners above £43,662. This guide explains exactly what changed and what it means for your payslip.</p>
        <h2 id="bands">Scottish income tax bands 2026/27</h2>
        <table>
          <thead><tr><th>Band</th><th>Rate</th><th>Threshold</th><th>England rate</th></tr></thead>
          <tbody>
            <tr><td>Starter</td><td>19%</td><td>£12,571–£14,667</td><td>20%</td></tr>
            <tr><td>Basic</td><td>20%</td><td>£14,668–£25,296</td><td>20%</td></tr>
            <tr><td>Intermediate</td><td>21%</td><td>£25,297–£43,662</td><td>20%</td></tr>
            <tr><td>Higher</td><td>42%</td><td>£43,663–£75,000</td><td>40%</td></tr>
            <tr><td>Advanced</td><td>45%</td><td>£75,001–£125,140</td><td>40%</td></tr>
            <tr><td>Top</td><td>48%</td><td>Over £125,140</td><td>45%</td></tr>
          </tbody>
        </table>
        <h2 id="real-difference">What the difference means in pounds</h2>
        <table>
          <thead><tr><th>Salary</th><th>Extra Scottish tax vs England</th><th>Monthly take-home difference</th></tr></thead>
          <tbody>
            <tr><td>£30,000</td><td>+£96/year</td><td>−£8/month</td></tr>
            <tr><td>£43,662</td><td>+£412/year</td><td>−£34/month</td></tr>
            <tr><td>£50,000</td><td>+£1,550/year</td><td>−£129/month</td></tr>
            <tr><td>£60,000</td><td>+£2,650/year</td><td>−£221/month</td></tr>
            <tr><td>£80,000</td><td>+£4,250/year</td><td>−£354/month</td></tr>
            <tr><td>£100,000</td><td>+£5,250/year</td><td>−£438/month</td></tr>
          </tbody>
        </table>
        <h2 id="offsets">What offsets the Scottish tax premium?</h2>
        <p>Scotland's higher income tax is partly offset by: no prescription charges (saving up to £34.65/year per person vs England's per-item charges), lower average council tax in many Scottish local authorities, free personal care for older people, and free university tuition for Scottish-domiciled students. Whether these offsets outweigh the tax premium depends on individual circumstances, but for high earners with no prescription needs and no university-age children, the tax premium is a net cost.</p>
        <h2 id="pension">Pension planning for Scottish taxpayers</h2>
        <p>The higher Scottish marginal rates make pension contributions especially valuable. A Scottish 42% taxpayer making a salary sacrifice pension contribution gets 42p relief per £1 contributed (vs 40p in England). A £10,000 salary sacrifice contribution saves £4,200 in Scottish Income Tax + £200 in NI = £4,400 total — leaving a net cost of only £5,600 for a £10,000 pension contribution.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Scottish Take-Home Calculator"},{path:"/insights/scottish-income-tax-bands-2026-27",label:"Full Scottish Tax Guide"}]}
          salaries={[{amount:43000},{amount:50000},{amount:60000},{amount:80000},{amount:100000}]}
        />
      </>
    ),
  },

  // 4
  {
    slug: "student-loan-plan-5-calculator",
    title: "Student Loan Plan 5 Explained — 2026/27 Calculator",
    description: "Plan 5 hits English/Welsh students who started uni after August 2023. Here's how the £25,000 threshold and 40-year term play out in 2026/27.",
    excerpt: "Plan 5 is the longest, lowest-threshold loan ever issued in the UK. Most graduates will repay for four decades. Here's what it costs you per month.",
    category: "Student Loans",
    keywords: ["student loan", "plan 5", "graduate"],
    readMinutes: 6,
    publishedISO: "2026-04-14",
    updatedISO: "2026-04-29",
    faq: [
      { q: "Who is on Plan 5?", a: "English and Welsh students who started undergraduate study from 1 August 2023 onwards." },
      { q: "What's the threshold?", a: "£25,000 per year — significantly lower than Plan 2's £29,385." },
      { q: "When is it written off?", a: "After 40 years from the April after graduation, or earlier on death/permanent disability." },
    ],
    body: () => (
      <>
        <p>Student Loan Plan 5 applies to English and Welsh students who started an undergraduate degree on or after 1 August 2023. It is the most significant change to student loan repayment terms in a generation — the threshold is lower, the term is longer, and most graduates will repay for the bulk of their working life. Understanding exactly what you repay month by month is essential for career and financial planning.</p>

        <h2 id="rates">Plan 5 repayment rates 2026/27</h2>
        <table>
          <thead><tr><th>Salary</th><th>Annual repayment</th><th>Monthly deduction</th><th>Effective rate on total salary</th></tr></thead>
          <tbody>
            <tr><td>£25,000 (threshold)</td><td>£0</td><td>£0</td><td>0%</td></tr>
            <tr><td>£28,000</td><td>£270</td><td>£23</td><td>1.0%</td></tr>
            <tr><td>£32,000</td><td>£630</td><td>£53</td><td>2.0%</td></tr>
            <tr><td>£37,430 (UK median)</td><td>£1,119</td><td>£93</td><td>3.0%</td></tr>
            <tr><td>£45,000</td><td>£1,800</td><td>£150</td><td>4.0%</td></tr>
            <tr><td>£60,000</td><td>£3,150</td><td>£263</td><td>5.3%</td></tr>
            <tr><td>£80,000</td><td>£4,950</td><td>£413</td><td>6.2%</td></tr>
          </tbody>
        </table>

        <h2 id="vs-other-plans">Plan 5 vs other plans — the key differences</h2>
        <table>
          <thead><tr><th>Feature</th><th>Plan 2 (pre-Aug 2023)</th><th>Plan 5 (from Aug 2023)</th></tr></thead>
          <tbody>
            <tr><td>Repayment threshold</td><td>£29,385/year</td><td>£25,000/year</td></tr>
            <tr><td>Repayment rate</td><td>9%</td><td>9%</td></tr>
            <tr><td>Write-off period</td><td>30 years</td><td>40 years</td></tr>
            <tr><td>Interest rate</td><td>RPI + 0–3%</td><td>RPI only (max)</td></tr>
            <tr><td>Who it affects</td><td>Starters 2012–Jul 2023</td><td>Starters Aug 2023+</td></tr>
          </tbody>
        </table>
        <p>The lower threshold (£25,000 vs £29,385 for Plan 2) means Plan 5 borrowers start repaying at a lower salary, and the 40-year term means most will not see the balance written off before they retire. The Office for Budget Responsibility estimated that 52% of Plan 5 graduates will repay their loan in full before write-off — compared to just 25% on Plan 2. For high earners, this makes Plan 5 closer to a conventional loan.</p>

        <h2 id="overpay">Should you make voluntary overpayments on Plan 5?</h2>
        <p>For Plan 5, voluntary overpayments can be financially rational in a way they rarely were on Plan 2. Because the interest rate is capped at RPI and the term is 40 years, a graduate expecting to earn above median salary for most of their career will likely repay the full amount regardless. Making overpayments reduces the total interest and shortens the repayment period. The break-even analysis: if your expected lifetime earnings suggest you will repay in full anyway, overpaying earlier is mathematically equivalent to paying down a debt at the RPI interest rate — which may or may not beat other uses of that money (ISA, pension). Seek independent financial advice for large overpayment decisions.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator with Student Loan"},{path:"/insights/salary-calculator-uk-2026",label:"Full 2026/27 Tax Guide"}]}
          salaries={[{amount:28000},{amount:35000},{amount:45000},{amount:60000},{amount:80000}]}
        />
      </>
    ),
  },

  // 5
  {
    slug: "emergency-tax-code-1257l-explained",
    title: "Emergency Tax Code 1257L Explained (2026/27)",
    description: "What 1257L means, why HMRC sometimes uses it on an emergency basis, and how to fix being on the wrong code.",
    excerpt: "1257L is the UK's standard tax code, but when applied on a Week 1/Month 1 basis it becomes an emergency code — usually overcharging you.",
    category: "Tax",
    keywords: ["tax code", "1257L", "PAYE"],
    readMinutes: 5,
    publishedISO: "2026-04-15",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>An emergency tax code is a temporary tax code HMRC assigns when your employer doesn't have enough information to use your correct code. The most common emergency code in 2026/27 is <strong>1257L W1</strong> (or 1257L M1, or simply 1257L X). The number 1257 reflects the £12,570 Personal Allowance, but the W1/M1/X suffix changes how it's applied — and this difference costs you money.</p>
        <h2 id="what-it-means">What the suffixes mean</h2>
        <p><strong>1257L W1</strong> — "Week 1 basis." Your employer treats every pay period as if it's the first week of the tax year. You get 1/52 of your annual Personal Allowance each week (£242) and nothing is carried forward. If you've already used some allowance earlier in the year, you don't get credit for it — meaning you may overpay tax.</p>
        <p><strong>1257L M1</strong> — "Month 1 basis." Same as W1 but for monthly payroll. You receive 1/12 of the allowance per month (£1,048) with no cumulative adjustment.</p>
        <p><strong>1257L X</strong> — Non-cumulative basis for irregular pay periods.</p>
        <p>The standard <strong>1257L</strong> without a suffix is cumulative — your employer calculates tax based on total earnings and total allowance used since April 6, meaning any overpayment earlier in the year gets corrected automatically. Emergency codes remove this safety net.</p>
        <h2 id="when">When do you get an emergency tax code?</h2>
        <p>Emergency codes are most commonly applied when you start a new job without providing a P45 from your previous employer, when you return to work after a gap, when HMRC has not yet sent your employer an updated code, or when you receive a one-off payment like a company car or benefit in kind that your employer hasn't coded for. They're also applied to second jobs before HMRC assigns a BR or D0 code.</p>
        <h2 id="fix">How to fix it</h2>
        <p>The fastest resolution is to contact HMRC directly: call 0300 200 3300 (Monday–Friday, 8am–6pm) with your National Insurance number, your employer's PAYE reference, and your approximate annual salary. HMRC will issue a corrected code to your employer, usually within 5–10 working days. Any overpaid tax from the emergency period will be automatically refunded through your payroll once the correct cumulative code is applied — you don't need to claim it back separately. Alternatively, if you have a Personal Tax Account at gov.uk/personal-tax-account, you can see and update your tax codes online without calling.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/national-insurance-2026-explained",label:"National Insurance Guide"}]}
          salaries={[{amount:25000},{amount:35000},{amount:45000},{amount:55000}]}
        />
      </>
    ),
  },

  // 6
  {
    slug: "net-pay-on-50k-salary",
    title: "Net Pay on a £50,000 Salary in 2026/27",
    description: "Exactly what £50,000 a year leaves in your pocket after Income Tax, NI and pension contributions.",
    excerpt: "£50k is the magic number — a hair below the Higher Rate threshold in England. Here's the precise monthly take-home with and without pension.",
    category: "Career",
    keywords: ["50k salary", "take home pay", "salary calculator"],
    readMinutes: 4,
    publishedISO: "2026-04-16",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>A £50,000 salary is a significant milestone in the UK — it sits just below the Higher Rate Income Tax threshold of £50,270, which means almost all of a £50,000 salary is taxed at the basic rate. Understanding exactly what you take home on £50,000 — including the impact of student loans, pension contributions, and location — is essential for financial planning.</p>
        <h2 id="breakdown">Take-home pay on £50,000 — 2026/27</h2>
        <table>
          <thead><tr><th>Component</th><th>Annual</th><th>Monthly</th></tr></thead>
          <tbody>
            <tr><td>Gross salary</td><td>£50,000</td><td>£4,167</td></tr>
            <tr><td>Income Tax (20% on £37,430)</td><td>−£7,486</td><td>−£624</td></tr>
            <tr><td>National Insurance (8% on £37,700)</td><td>−£3,016</td><td>−£251</td></tr>
            <tr><td><strong>Net take-home (no pension, no loan)</strong></td><td><strong>£39,498</strong></td><td><strong>£3,292</strong></td></tr>
          </tbody>
        </table>
        <h2 id="student-loan">With student loan deductions</h2>
        <table>
          <thead><tr><th>Plan</th><th>Annual deduction</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>No student loan</td><td>£0</td><td>£3,292</td></tr>
            <tr><td>Plan 1</td><td>−£2,097 (9% above £26,900)</td><td>£3,117</td></tr>
            <tr><td>Plan 2</td><td>−£1,856 (9% above £29,385)</td><td>£3,137</td></tr>
            <tr><td>Plan 5</td><td>−£2,250 (9% above £25,000)</td><td>£3,104</td></tr>
          </tbody>
        </table>
        <h2 id="scotland">Scotland vs England</h2>
        <p>A £50,000 salary in Scotland is taxed differently. Scottish intermediate rate (21%) applies on £25,297–£43,662, and the higher rate (42%) applies on £43,663–£50,000. Scottish Income Tax on £50,000 is approximately £9,035 — around £1,550 more than England (£7,486). Monthly take-home in Scotland on £50,000 is approximately £3,163 vs £3,292 in England.</p>
        <h2 id="pension">Impact of pension contributions</h2>
        <p>A 5% pension contribution on £50,000 reduces your pensionable salary to £47,500. Income Tax and NI are calculated on £47,500, saving approximately £840 in tax and NI. Your net take-home falls by only £1,660 (£50,000 × 5% = £2,500 gross contribution, but you save £840 in tax/NI). Auto-enrolment at 5% on qualifying earnings (£6,240–£50,270) deducts approximately £2,202/year from gross pay — reducing monthly take-home by about £134 after tax relief.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Calculate Any Salary"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:45000},{amount:50000},{amount:55000},{amount:60000},{amount:70000}]}
        />
      </>
    ),
  },

  // 7
  {
    slug: "salary-sacrifice-pension-explained",
    title: "Salary Sacrifice vs Personal Pension in 2026/27",
    description: "Why salary sacrifice almost always beats personal pension contributions for UK employees — with worked examples.",
    excerpt: "If your employer offers salary sacrifice, refusing it means voluntarily handing 8–13% of your pension contribution to HMRC.",
    category: "Pension",
    keywords: ["pension", "salary sacrifice", "tax relief"],
    readMinutes: 5,
    publishedISO: "2026-04-17",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>Salary sacrifice pension is an arrangement where you formally reduce your gross salary by the amount of your pension contribution, and your employer pays that amount directly into your pension instead. The result: you pay Income Tax and National Insurance on a lower salary, and your employer saves on the National Insurance they'd otherwise pay on that portion of your earnings. Most employers pass some or all of their NI saving back to you, making salary sacrifice the most tax-efficient way to save into a pension.</p>
        <h2 id="how-much">How much you save</h2>
        <table>
          <thead><tr><th>Tax band</th><th>Tax saved per £1 contributed</th><th>NI saved per £1</th><th>Total saving per £1</th></tr></thead>
          <tbody>
            <tr><td>Basic rate (20%)</td><td>20p</td><td>8p</td><td>28p</td></tr>
            <tr><td>Higher rate (40%)</td><td>40p</td><td>2p</td><td>42p</td></tr>
            <tr><td>£100K taper zone (60% effective)</td><td>60p</td><td>2p</td><td>62p</td></tr>
          </tbody>
        </table>
        <p>On a basic rate salary, a £200/month salary sacrifice pension contribution costs you just £144/month in reduced take-home. £200 goes into your pension for a net cost of £144 — an immediate 39% uplift on your money before any investment growth.</p>
        <h2 id="employer-ni">Employer NI saving — often shared with you</h2>
        <p>Your employer saves 15% NI on every pound you sacrifice. On a £5,000 annual sacrifice, that's £750 saved by your employer. Many employers add some or all of this saving to your pension contribution — effectively giving you free money. Ask your HR team whether your employer has an "NI sharing" arrangement. Even without sharing, salary sacrifice beats a personal pension contribution because it saves NI that a personal contribution cannot recover.</p>
        <h2 id="personal-vs-sacrifice">Salary sacrifice vs personal pension contribution</h2>
        <p>A personal pension contribution still gets basic rate tax relief added at source (the "relief at source" method), and higher/additional rate taxpayers can claim further relief through Self Assessment. But personal contributions do not save National Insurance. Salary sacrifice saves both tax and NI — making it worth up to 8 percentage points more per pound for basic rate taxpayers and 2 percentage points more for higher rate taxpayers.</p>
        <h2 id="watch-out">Things to watch out for</h2>
        <p>Salary sacrifice reduces your contractual salary, which can affect mortgage affordability assessments, life insurance and income protection cover based on salary multiples, and statutory payments like Statutory Maternity Pay (which is based on average weekly earnings from your actual salary). Ensure your sacrificed salary doesn't fall below the National Minimum Wage. Most employees find these impacts manageable, especially for modest contribution levels.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/salary-sacrifice/electric-car",label:"EV Salary Sacrifice Calculator"},{path:"/insights/pension-auto-enrolment-2026",label:"Pension Auto-Enrolment Guide"}]}
          salaries={[{amount:30000},{amount:45000},{amount:60000},{amount:80000},{amount:100000}]}
        />
      </>
    ),
  },

  // 8
  {
    slug: "self-employed-tax-calculator-2026",
    title: "Self-Employed Tax 2026/27 — A Practical Walkthrough",
    description: "Income Tax, Class 4 NI and payments on account explained for UK sole traders in 2026/27.",
    excerpt: "Class 2 NI is now voluntary for most. Class 4 sits at 6%/2%. Here's exactly what to set aside from each invoice.",
    category: "Self-Employed",
    keywords: ["self employed", "tax", "sole trader"],
    readMinutes: 7,
    publishedISO: "2026-04-18",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>Self-employed people in the UK pay tax differently from employees — there is no employer to withhold PAYE on your behalf, so you calculate and pay your own tax through Self Assessment. Understanding exactly what you owe — and when — is essential to avoid underpaying and facing unexpected bills or penalties.</p>

        <h2 id="rates">2026/27 self-employed tax rates</h2>
        <table>
          <thead><tr><th>Tax</th><th>Band</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Income Tax</td><td>£0–£12,570</td><td>0% (Personal Allowance)</td></tr>
            <tr><td>Income Tax</td><td>£12,571–£50,270</td><td>20%</td></tr>
            <tr><td>Income Tax</td><td>£50,271–£125,140</td><td>40%</td></tr>
            <tr><td>Income Tax</td><td>Over £125,140</td><td>45%</td></tr>
            <tr><td>Class 4 NI</td><td>£12,571–£50,270</td><td>6%</td></tr>
            <tr><td>Class 4 NI</td><td>Over £50,270</td><td>2%</td></tr>
            <tr><td>Class 2 NI</td><td>All profits</td><td>Voluntary; £3.50/week</td></tr>
          </tbody>
        </table>

        <h2 id="example">Worked example: £50,000 profit as a sole trader</h2>
        <table>
          <thead><tr><th>Component</th><th>Calculation</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Gross profit</td><td>—</td><td>£50,000</td></tr>
            <tr><td>Income Tax</td><td>20% × (£50,000 − £12,570)</td><td>−£7,486</td></tr>
            <tr><td>Class 4 NI</td><td>6% × (£50,000 − £12,570)</td><td>−£2,246</td></tr>
            <tr><td><strong>Net after tax</strong></td><td>—</td><td><strong>£40,268</strong></td></tr>
            <tr><td>Effective tax rate</td><td>—</td><td>19.5%</td></tr>
          </tbody>
        </table>
        <p>Notice the effective rate (19.5%) is lower than an equivalent employee earning £50,000 (approximately 19.4% for Income Tax + 5.9% NI = 25.3% combined). This is because Class 4 NI at 6% is lower than Class 1 employee NI at 8%, and there is no Employer NI coming from your own pocket.</p>

        <h2 id="payments">Payments on account — the cash flow trap</h2>
        <p>If your Self Assessment tax bill exceeds £1,000, HMRC requires you to make "payments on account" — advance payments toward next year's tax bill. Each payment is 50% of last year's bill, due in January and July. If your profit was £50,000 and your tax bill is approximately £9,732, HMRC will collect £9,732 for year 1 PLUS £4,866 on account for year 2 in the same January — a total of £14,598 in one payment. This catches many newly self-employed people off guard. Set aside 25–30% of every invoice for tax from day one.</p>

        <h2 id="allowable">Allowable expenses that reduce your tax bill</h2>
        <p>Sole traders pay tax on profit, not revenue. Allowable deductions include: office costs (a proportion of home bills if working from home), equipment and tools, vehicle expenses (mileage at 45p/mile for the first 10,000 miles), professional subscriptions and insurance, accountancy fees, marketing costs, and training directly related to your existing trade. Pension contributions made personally (not salary sacrifice, which isn't available to sole traders) reduce your adjusted net income and are fully deductible.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/self-employed",label:"Self-Employed Tax Calculator"},{path:"/take-home",label:"Employed Take-Home Calculator"},{path:"/ir35",label:"IR35 Calculator"}]}
          salaries={[{amount:25000},{amount:40000},{amount:60000},{amount:80000},{amount:100000}]}
        />
      </>
    ),
  },

  // 9
  {
    slug: "ir35-inside-vs-outside-2026",
    title: "IR35 Inside vs Outside — 2026/27 Take-Home Comparison",
    description: "Day rate to take-home pay comparison for contractors operating inside and outside IR35 in 2026/27.",
    excerpt: "Outside IR35 still wins by 20–30% in net retention, but the gap depends heavily on day rate and pension strategy.",
    category: "Self-Employed",
    keywords: ["IR35", "contractor", "ltd company"],
    readMinutes: 6,
    publishedISO: "2026-04-19",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>IR35 — formally the Intermediaries Legislation — determines whether HMRC views your contractor arrangement as genuine self-employment or "disguised employment." If you are inside IR35, the fee payer (your client or agency) must deduct PAYE Income Tax and National Insurance from your payments before they reach your limited company, just as if you were an employee. If outside IR35, you operate as a business, pay corporation tax on profits, and extract income as a combination of salary and dividends — keeping significantly more of your earnings.</p>
        <h2 id="difference">Financial impact: inside vs outside IR35</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Inside IR35</th><th>Outside IR35</th></tr></thead>
          <tbody>
            <tr><td>Day rate</td><td>£500/day</td><td>£500/day</td></tr>
            <tr><td>Working days/year</td><td>220</td><td>220</td></tr>
            <tr><td>Annual contract income</td><td>£110,000</td><td>£110,000</td></tr>
            <tr><td>Corporation Tax</td><td>N/A</td><td>−£5,415</td></tr>
            <tr><td>Income Tax + NI (PAYE equivalent)</td><td>−£38,500</td><td>−£6,000 (salary element only)</td></tr>
            <tr><td>Dividend Tax</td><td>N/A</td><td>−£5,800</td></tr>
            <tr><td><strong>Take-home</strong></td><td><strong>~£71,500</strong></td><td><strong>~£92,800</strong></td></tr>
          </tbody>
        </table>
        <p>The difference — approximately £21,300/year — represents the value of remaining outside IR35. At higher day rates, the gap grows. Use the <ToolLink to="/ir35">IR35 Calculator</ToolLink> to model your exact numbers at any day rate.</p>
        <h2 id="status">How IR35 status is determined</h2>
        <p>Since April 2021, medium and large private sector clients are responsible for determining IR35 status (the reformed off-payroll working rules). Only small companies (two of: turnover &lt;£10.2M, balance sheet &lt;£5.1M, &lt;50 employees) still allow contractors to self-determine status. The key factors in any determination are:</p>
        <p><strong>Substitution:</strong> Can you send a suitably qualified substitute to complete the work without the client's approval of the individual? A genuine right of substitution strongly indicates outside IR35.</p>
        <p><strong>Mutuality of obligation:</strong> Is the client obliged to offer work and are you obliged to accept? If there's no ongoing commitment, this points outside IR35.</p>
        <p><strong>Control:</strong> Does the client dictate how, when, and where you work? High levels of client control indicate inside IR35. Genuine autonomy over working methods indicates outside.</p>
        <p><strong>Integration:</strong> Are you treated as part of the client's workforce — included in team meetings, on internal directories, using client equipment? Integration signals inside IR35.</p>
        <h2 id="umbrella">Inside IR35 via umbrella</h2>
        <p>Many inside-IR35 contractors operate through umbrella companies rather than their own limited company. Umbrella companies act as the employer, handle PAYE, and charge a weekly margin (typically £20–£35). This simplifies administration but does not improve take-home pay — you still pay full PAYE rates. The advantage of umbrella over a limited company inside IR35 is reduced admin: no annual accounts, corporation tax returns, or director responsibilities.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/ir35",label:"IR35 Calculator"},{path:"/contractor/take-home",label:"Contractor vs Umbrella Calculator"},{path:"/insights/self-employed-tax-calculator-2026",label:"Self-Employed Tax Guide"}]}
          salaries={[{amount:60000},{amount:80000},{amount:110000},{amount:140000},{amount:180000}]}
        />
      </>
    ),
  },

  // 10
  {
    slug: "limited-company-dividend-strategy-2026",
    title: "Optimal Director Salary + Dividend Mix in 2026/27",
    description: "How much salary should a UK limited company director pay themselves in 2026/27, and why £12,570 is usually the answer.",
    excerpt: "The best salary level for a one-director Ltd in 2026/27 is £12,570 — matching both the Personal Allowance and Primary Threshold.",
    category: "Self-Employed",
    keywords: ["dividend", "director", "ltd company"],
    readMinutes: 5,
    publishedISO: "2026-04-20",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>Operating as a director of your own limited company gives you flexibility to structure your income in the most tax-efficient way. The standard strategy is to pay yourself a low salary (at or near the National Insurance threshold) and take the remainder of your income as dividends, which are taxed at lower rates than employment income. Here is how the optimal split works for 2026/27.</p>
        <h2 id="optimal-split">Optimal salary and dividend split 2026/27</h2>
        <p>For most directors, the tax-optimal salary is <strong>£12,570</strong> — exactly the Personal Allowance. This generates no Income Tax and no employee NI (salary is below the £12,570 primary threshold). The company pays no employer NI either (salary is below the £5,000 secondary threshold). Above £12,570, the next £500 — up to £13,070 — attracts no employer NI but costs personal NI at 8%. Dividend income above the £500 Dividend Allowance is taxed at 8.75% (basic rate), 33.75% (higher rate), or 39.35% (additional rate).</p>
        <table>
          <thead><tr><th>Profit level</th><th>Optimal split</th><th>Take-home</th><th>vs PAYE equivalent</th></tr></thead>
          <tbody>
            <tr><td>£60,000</td><td>£12,570 salary + £38,215 dividend</td><td>~£47,900</td><td>+£4,200 better</td></tr>
            <tr><td>£80,000</td><td>£12,570 salary + £56,215 dividend</td><td>~£61,200</td><td>+£5,800 better</td></tr>
            <tr><td>£100,000</td><td>£12,570 salary + £74,215 dividend</td><td>~£73,500</td><td>+£7,400 better</td></tr>
            <tr><td>£150,000</td><td>£12,570 salary + complex split</td><td>~£101,000</td><td>+£10,000+ better</td></tr>
          </tbody>
        </table>
        <p><small>Figures assume corporation tax at 19–25% on profits (small profits rate applies below £50,000 profit). Estimates only — see a contractor accountant for your exact position.</small></p>
        <h2 id="corporation-tax">Corporation tax rates 2026/27</h2>
        <p>The small profits rate of 19% applies to profits up to £50,000. The main rate of 25% applies above £250,000. Between £50,000 and £250,000, marginal relief applies — the effective rate tapers from 19% to 25%. For most owner-managed businesses earning £60,000–£120,000 profit, effective corporation tax is approximately 21–23%.</p>
        <h2 id="dividend-allowance">Dividend Allowance 2026/27</h2>
        <p>The first £500 of dividend income per year is tax-free (reduced from £1,000 in 2023/24 and £2,000 in 2022/23). Dividend income above £500 is taxed at 8.75% (basic rate), 33.75% (higher rate, applies when total income exceeds £50,270), or 39.35% (additional rate above £125,140). Dividends do not attract National Insurance at any rate — this is the core reason directors choose this structure.</p>
        <h2 id="pension">Pension contributions from a limited company</h2>
        <p>One of the most powerful advantages of a limited company structure is the ability to make employer pension contributions directly from the company — these are a deductible business expense that reduces corporation tax. A £20,000 employer pension contribution saves £3,800–£5,000 in corporation tax (at 19–25%), in addition to the pension growth. Combined with no NI on the contribution (versus salary), company pension contributions are exceptionally tax-efficient.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/dividend",label:"Dividend Tax Calculator"},{path:"/ir35",label:"IR35 Calculator"},{path:"/insights/ir35-inside-vs-outside-2026",label:"IR35 Inside vs Outside"}]}
          salaries={[{amount:60000},{amount:80000},{amount:100000},{amount:150000}]}
        />
      </>
    ),
  },

  // 11
  {
    slug: "two-jobs-tax-uk-2026",
    title: "Two Jobs Tax in the UK — How Much Will You Lose?",
    description: "Working two jobs in 2026/27? Here's how Personal Allowance and BR codes affect your combined take-home.",
    excerpt: "Your second job rarely uses any Personal Allowance, so it's typically taxed at the BR (20%) code from £1.",
    category: "Career",
    keywords: ["two jobs", "tax code", "second job"],
    readMinutes: 5,
    publishedISO: "2026-04-21",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>Working two jobs in the UK is perfectly legal and increasingly common — but the tax treatment is often misunderstood. HMRC does not tax your second job differently by design; rather, the system works by assigning your full Personal Allowance to one job, which means your second employer deducts tax from the first penny of earnings. This guide explains exactly how it works and what you can do about it.</p>

        <h2 id="how-it-works">How two-job tax works in 2026/27</h2>
        <p>Your Personal Allowance (£12,570) can only be used by one employer at a time. HMRC assigns it to your primary job via your tax code (usually 1257L). Your second employer is instructed to use a BR (Basic Rate) code — meaning 20% Income Tax is deducted on every pound from the second job, with no tax-free allowance applied.</p>
        <table>
          <thead><tr><th>Job</th><th>Tax code</th><th>How tax is deducted</th></tr></thead>
          <tbody>
            <tr><td>Primary job (£25,000)</td><td>1257L</td><td>No tax on first £12,570; 20% on remainder = £2,486 tax</td></tr>
            <tr><td>Secondary job (£10,000)</td><td>BR</td><td>20% on full £10,000 = £2,000 tax</td></tr>
            <tr><td>Combined</td><td>—</td><td>Total tax £4,486; effective combined rate 12.7%</td></tr>
          </tbody>
        </table>
        <p>Importantly, <strong>the total tax you pay is the same as if all income came from one employer</strong>. On combined income of £35,000, you owe £4,486 regardless of how it is split. The BR code is not a penalty — it simply ensures tax is collected at source rather than via a year-end bill.</p>

        <h2 id="higher-rate">When two jobs push you into the higher rate</h2>
        <p>If your combined income from both jobs exceeds £50,270, some earnings are taxed at 40%. A common scenario: Job 1 pays £45,000 (code 1257L) and Job 2 pays £8,000 (code BR). Total income is £53,000. The first £4,730 above £50,270 from Job 2 is taxed at 40% (D0 code), not 20%. HMRC will usually detect this through RTI (Real Time Information) and issue an updated tax code to Job 2 automatically, but there can be a lag — which means you may owe tax at year end.</p>

        <h2 id="ni">National Insurance on two jobs</h2>
        <p>NI is calculated per-employment, not across combined income. This is one area where two jobs can genuinely cost you more tax overall. If Job 1 pays £50,270 and Job 2 pays £10,000, you pay:</p>
        <table>
          <thead><tr><th>Job</th><th>NI calculation</th><th>NI owed</th></tr></thead>
          <tbody>
            <tr><td>Job 1</td><td>8% on £37,700 (£12,570–£50,270)</td><td>£3,016</td></tr>
            <tr><td>Job 2</td><td>8% on £10,000 (above threshold again)</td><td>£800</td></tr>
            <tr><td>Single employer at £60,270</td><td>8% on £37,700 + 2% on £10,000</td><td>£3,216</td></tr>
          </tbody>
        </table>
        <p>In this example, the two-job NI totals £3,816 — £600 more than a single employer scenario. You can reclaim the overpaid NI from HMRC after the tax year by contacting them directly.</p>

        <h2 id="selfassessment">Do you need to complete Self Assessment?</h2>
        <p>If your total income from all sources exceeds £100,000, or if HMRC cannot collect all the tax owed through your tax codes, you will need to complete a Self Assessment tax return. At lower income levels with standard employment, HMRC usually adjusts your codes automatically and no return is needed.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/two-jobs",label:"Two Jobs Calculator"},{path:"/take-home",label:"Take-Home Calculator"}]}
          salaries={[{amount:20000},{amount:30000},{amount:45000},{amount:55000},{amount:70000}]}
        />
      </>
    ),
  },

  // 12
  {
    slug: "pay-rise-after-tax-calculator-uk",
    title: "How Much of Your Pay Rise Do You Actually Keep?",
    description: "The marginal tax stack means a 10% pay rise rarely lands as 10% extra in your bank. Here's why.",
    excerpt: "A pay rise that crosses a band threshold can lose 32%, 42% or even 70% to tax stacking. The trick is knowing which band you're entering.",
    category: "Career",
    keywords: ["pay rise", "marginal tax", "raise"],
    readMinutes: 5,
    publishedISO: "2026-04-22",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>A pay rise sounds straightforward, but the amount that actually reaches your bank account depends on your current salary, the size of the rise, and whether the increase pushes you across a tax band boundary. Understanding the marginal rate you pay — what you keep on the next £1 — is essential for evaluating job offers, negotiating salary, or comparing a raise to a pension contribution.</p>

        <h2 id="marginal">Marginal tax rates in 2026/27 (England)</h2>
        <table>
          <thead><tr><th>Salary band</th><th>Income Tax</th><th>NI</th><th>What you keep per £1</th></tr></thead>
          <tbody>
            <tr><td>£0 – £12,570</td><td>0%</td><td>0%</td><td>£1.00</td></tr>
            <tr><td>£12,571 – £50,270</td><td>20%</td><td>8%</td><td>£0.72</td></tr>
            <tr><td>£50,271 – £100,000</td><td>40%</td><td>2%</td><td>£0.58</td></tr>
            <tr><td>£100,001 – £125,140</td><td>60% (incl. taper)</td><td>2%</td><td>£0.38</td></tr>
            <tr><td>£125,141+</td><td>45%</td><td>2%</td><td>£0.53</td></tr>
          </tbody>
        </table>

        <h2 id="examples">What a pay rise is worth after tax — examples</h2>
        <table>
          <thead><tr><th>Current salary</th><th>Pay rise</th><th>Gross increase</th><th>Net monthly increase</th></tr></thead>
          <tbody>
            <tr><td>£28,000</td><td>£2,000</td><td>£2,000</td><td>+£120/month</td></tr>
            <tr><td>£35,000</td><td>£5,000</td><td>£5,000</td><td>+£300/month</td></tr>
            <tr><td>£45,000</td><td>£10,000 (into higher rate)</td><td>£10,000</td><td>+£432/month</td></tr>
            <tr><td>£95,000</td><td>£10,000 (into taper zone)</td><td>£10,000</td><td>+£317/month</td></tr>
            <tr><td>£95,000</td><td>£30,000 (salary sacrifice instead)</td><td>£0 take-home</td><td>Same take-home, +£12,000 pension</td></tr>
          </tbody>
        </table>

        <h2 id="threshold">Crossing the £50,270 threshold</h2>
        <p>The jump from basic to higher rate at £50,270 is the most common pay rise complication. If you earn £46,000 and receive a £6,000 pay rise, the first £4,270 is taxed at the basic rate (28% combined IT + NI) and the remaining £1,730 is taxed at the higher rate (42%). Your average marginal rate across the rise is approximately 33% — you keep £4,020 of the £6,000 rise, or £335/month extra.</p>

        <h2 id="negotiate">How to use this when negotiating</h2>
        <p>If you are currently earning £48,000 and your employer offers a £5,000 rise to £53,000, your take-home increase is approximately £2,900/year (£242/month) — less than half the gross value. An alternative worth discussing: a smaller cash rise combined with an employer pension contribution, or a salary sacrifice arrangement for an EV or additional pension, can produce the same or better outcome in after-tax wealth terms. Use the Pay Rise Calculator to model any scenario before your next negotiation.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/pay-rise",label:"Pay Rise Calculator"},{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/personal-allowance-taper-100k-trap",label:"The £100K Tax Trap"}]}
          salaries={[{amount:28000},{amount:35000},{amount:50000},{amount:65000},{amount:100000}]}
        />
      </>
    ),
  },

  // 13
  {
    slug: "national-insurance-2026-explained",
    title: "UK National Insurance 2026/27 — A Plain-English Guide",
    description: "Class 1, 2 and 4 NI for 2026/27 explained, with thresholds and what you actually fund.",
    excerpt: "NI funds the State Pension and contributory benefits. In 2026/27 you pay 8% main / 2% upper as an employee.",
    category: "Tax",
    keywords: ["national insurance", "NI", "tax"],
    readMinutes: 5,
    publishedISO: "2026-04-23",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>National Insurance (NI) is a tax on earnings paid by employees, employers, and the self-employed. It funds the NHS, State Pension, and certain benefits. Unlike Income Tax, NI has separate classes depending on your employment status — and each class has different rates and thresholds for 2026/27.</p>

        <h2 id="class1">Class 1 — Employees</h2>
        <p>Class 1 NI is paid by employees on their wages. Your employer deducts it automatically through PAYE before you see your pay. The rates for 2026/27 are:</p>
        <table>
          <thead><tr><th>Earnings band</th><th>Annual</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Below Primary Threshold</td><td>Below £12,570</td><td>0%</td></tr>
            <tr><td>Primary Threshold to UEL</td><td>£12,570–£50,270</td><td>8%</td></tr>
            <tr><td>Above Upper Earnings Limit</td><td>Above £50,270</td><td>2%</td></tr>
          </tbody>
        </table>
        <p>On a typical £35,000 salary, Class 1 NI costs approximately £1,794 per year — or £150 per month. On £50,000 it costs approximately £2,994 (£250/month). Once you earn above £50,270, every additional pound is only taxed at 2% NI, making the combined Income Tax + NI marginal rate fall from 48% to 42%.</p>

        <h2 id="employer">Employer NI — What Your Employer Pays on Top</h2>
        <p>Your employer also pays Class 1 NI at 15% on your earnings above £5,000 per year. This is not deducted from your pay — it is an additional employment cost your employer bears. On a £35,000 salary, your employer pays approximately £4,500/year in NI on top of your gross wage. This is why total employment cost is always higher than the headline salary figure.</p>

        <h2 id="class4">Class 4 — Self-Employed</h2>
        <table>
          <thead><tr><th>Profit band</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Below £12,570</td><td>0%</td></tr>
            <tr><td>£12,570 – £50,270</td><td>6%</td></tr>
            <tr><td>Above £50,270</td><td>2%</td></tr>
          </tbody>
        </table>
        <p>Self-employed people pay Class 4 NI on their profits through Self Assessment. The 6% rate is lower than the employee rate of 8% — but self-employed workers don't receive employer contributions, sick pay, or employment rights in exchange. Class 2 NI (a flat weekly contribution) was effectively abolished for most self-employed people from April 2024, though voluntary payments of £3.50/week remain available to protect State Pension entitlement.</p>

        <h2 id="state-pension">NI and Your State Pension</h2>
        <p>You need 35 qualifying NI years to receive the full new State Pension (£221.20/week from April 2026). Each year you earn above the Lower Earnings Limit (£6,396 in 2026/27) counts as a qualifying year — even if you pay no NI because you earn below the Primary Threshold. Gaps in your record can be filled by buying voluntary Class 3 NI contributions (£824.20 per year in 2026/27).</p>

        <h2 id="reduce">How to Reduce Your NI Bill</h2>
        <p>The most effective way to reduce employee NI is <strong>salary sacrifice</strong>. By contributing to a pension or paying for an EV through salary sacrifice, you reduce your gross pay before NI is calculated. A basic-rate taxpayer making a £5,000 salary sacrifice pension contribution saves £400 in NI (8% of £5,000). A higher-rate taxpayer saves £100 (2% above £50,270). Employers also save 15% in NI on sacrificed amounts, which is why many employers pass some of this saving back to employees.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/salary-sacrifice/electric-car",label:"EV Salary Sacrifice"},{path:"/self-employed",label:"Self-Employed NI Calculator"}]}
          salaries={[{amount:20000},{amount:35000},{amount:50000},{amount:60000},{amount:100000}]}
        />
      </>
    ),
  },

  // 14
  {
    slug: "personal-allowance-taper-100k-trap",
    title: "The £100k Tax Trap — And How to Escape It in 2026/27",
    description: "Earnings between £100,000 and £125,140 face a marginal rate of 60–70%. Here's how to legally sidestep it.",
    excerpt: "Lose £1 of Personal Allowance for every £2 over £100,000. The result is a 60% marginal income tax band that catches a lot of people.",
    category: "Tax",
    keywords: ["personal allowance", "100k", "tax trap", "pension"],
    readMinutes: 6,
    publishedISO: "2026-04-25",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>The Personal Allowance taper is one of the UK tax system's most damaging quirks. If your income exceeds £100,000, HMRC reduces your Personal Allowance by £1 for every £2 you earn above that threshold. By £125,140, your allowance has been entirely eliminated — and while HMRC levies your income at the standard 40% higher rate, the simultaneous removal of the allowance creates an effective marginal tax rate of 60% on income in the £100,000–£125,140 band. Add 2% NI and the effective rate rises to 62%, making this the UK's highest marginal tax rate for employed individuals.</p>

        <h2 id="maths">The maths of the 60% trap</h2>
        <table>
          <thead><tr><th>Income range</th><th>Income Tax rate</th><th>NI rate</th><th>Effective marginal rate</th></tr></thead>
          <tbody>
            <tr><td>£0 – £12,570</td><td>0%</td><td>0%</td><td>0%</td></tr>
            <tr><td>£12,571 – £50,270</td><td>20%</td><td>8%</td><td>28%</td></tr>
            <tr><td>£50,271 – £100,000</td><td>40%</td><td>2%</td><td>42%</td></tr>
            <tr><td>£100,001 – £125,140</td><td>40% + 20% taper effect</td><td>2%</td><td>62%</td></tr>
            <tr><td>£125,141+</td><td>45%</td><td>2%</td><td>47%</td></tr>
          </tbody>
        </table>
        <p>The "60%" headline rate arises because: every £2 earned in this band costs you 40p in higher rate tax (40% × £1) plus loses you £1 of allowance worth another 20p of tax (20% × £1 = 40p tax that was previously avoided). So £1 earned costs 80p in tax, for an effective rate of 80%… wait, actually: 40p tax on £1 earned, plus £0.50 allowance lost that would have sheltered income at 20%, so 40p + 10p = 50p per £1, giving 60% before NI. Add 2% NI = 62% total. If you are on a Plan 2/4/5 Student Loan, the 9% deduction applies on top, bringing the effective rate to 71%.</p>

        <h2 id="escape">Three ways to escape the trap</h2>
        <p><strong>1. Pension salary sacrifice</strong> is the most effective. A salary sacrifice contribution directly reduces your "adjusted net income" — the figure HMRC uses for the taper calculation. Every £1 you sacrifice reclaims £0.60 of marginal tax + NI. A £25,140 salary sacrifice contribution on a £125,140 income reduces adjusted net income to exactly £100,000, fully restoring the £12,570 Personal Allowance and saving approximately £14,500 in tax (£5,028 from restored allowance + £9,456 from 40% relief on the contribution).</p>
        <p><strong>2. Gift Aid</strong>. Donations under Gift Aid extend your basic rate band, effectively reducing adjusted net income. A £1,000 gross Gift Aid donation (£800 cash + £200 HMRC top-up) reduces adjusted net income by £1,000, saving approximately £400 in the taper band.</p>
        <p><strong>3. Employer pension contributions</strong> (not salary sacrifice) reduce adjusted net income if claimed via Self Assessment, though less efficiently than salary sacrifice as NI is still paid on the gross salary.</p>

        <h2 id="selfassessment">Reporting and tax codes</h2>
        <p>If your income is over £100,000, HMRC will typically change your tax code to reflect the reduced allowance — often to a number like 0T (no allowance) or a restricted code. You should also complete a Self Assessment return annually to ensure the correct amount has been collected. Overpayments can be reclaimed; underpayments are collected through code adjustments or a balancing payment.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/salary-sacrifice/electric-car",label:"Salary Sacrifice Calculator"}]}
          salaries={[{amount:100000},{amount:110000},{amount:120000},{amount:125140},{amount:150000}]}
        />
      </>
    ),
  },

  // 15
  {
    slug: "uk-cost-of-living-salary-comparison",
    title: "UK Cost of Living — Real Take-Home by City in 2026",
    description: "What does your salary buy you across UK cities once rent and tax are factored in? 2026 league table.",
    excerpt: "London's £55k feels like a £38k in Manchester once rent is paid. Here's a purchasing-power view of UK take-home in 2026.",
    category: "Cost of Living",
    keywords: ["cost of living", "london", "manchester", "salary"],
    readMinutes: 5,
    publishedISO: "2026-04-27",
    updatedISO: "2026-04-29",
    body: () => (
      <>
        <p>Headline salaries are one thing — what you actually have left after housing, tax, and basic living costs is what matters. The UK's significant regional variation in housing costs means that a £45,000 salary stretches very differently in London versus Manchester, Edinburgh, or Bristol. This guide shows post-tax, post-rent disposable income across the UK's major cities.</p>
        <h2 id="comparison">Post-tax, post-rent monthly disposable income (2026)</h2>
        <table>
          <thead><tr><th>City</th><th>Salary used</th><th>Monthly take-home</th><th>Typical 1-bed rent</th><th>Disposable income</th></tr></thead>
          <tbody>
            <tr><td>London</td><td>£55,000</td><td>£3,380</td><td>£2,000</td><td>£1,380/month</td></tr>
            <tr><td>Manchester</td><td>£42,000</td><td>£2,820</td><td>£1,200</td><td>£1,620/month</td></tr>
            <tr><td>Birmingham</td><td>£40,000</td><td>£2,690</td><td>£1,150</td><td>£1,540/month</td></tr>
            <tr><td>Leeds</td><td>£40,000</td><td>£2,690</td><td>£1,100</td><td>£1,590/month</td></tr>
            <tr><td>Bristol</td><td>£43,000</td><td>£2,870</td><td>£1,500</td><td>£1,370/month</td></tr>
            <tr><td>Edinburgh</td><td>£42,000</td><td>£2,790 (Scot)</td><td>£1,350</td><td>£1,440/month</td></tr>
            <tr><td>Glasgow</td><td>£38,000</td><td>£2,565 (Scot)</td><td>£1,000</td><td>£1,565/month</td></tr>
            <tr><td>Sheffield</td><td>£36,000</td><td>£2,520</td><td>£900</td><td>£1,620/month</td></tr>
            <tr><td>Liverpool</td><td>£36,000</td><td>£2,520</td><td>£950</td><td>£1,570/month</td></tr>
            <tr><td>Newcastle</td><td>£35,000</td><td>£2,460</td><td>£900</td><td>£1,560/month</td></tr>
          </tbody>
        </table>
        <p><small>Salaries reflect typical professional roles in each city. Rent is indicative city-centre 1-bed. Individual results vary. Use the city salary articles and take-home calculator for your exact numbers.</small></p>
        <h2 id="insight">The London paradox</h2>
        <p>Despite the highest salaries in the UK, London frequently delivers the lowest post-housing disposable income of any major city for professional workers. A professional earning £55,000 in London (£3,380/month take-home) who pays £2,000/month rent retains £1,380 — less than equivalent professionals in Manchester, Leeds, Sheffield, or Glasgow earning substantially less gross. The London premium compensates for commuting costs, higher council tax, and London's overall cost level — but the apparent salary advantage disappears almost entirely once housing is accounted for for most earners below £80,000.</p>
        <h2 id="remote">Remote work and the arbitrage opportunity</h2>
        <p>Remote work has created a genuine salary arbitrage opportunity. A software engineer or financial analyst earning £75,000 at a London-headquartered company while living in Sheffield, Newcastle, or Glasgow retains approximately £2,500–£2,800/month more disposable income than a London-based colleague on the same salary. Over five years, this difference compounds to £150,000–£170,000 in additional retained earnings — equivalent to a substantial deposit or investment portfolio.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/cost-of-living",label:"Cost of Living Calculator"},{path:"/take-home",label:"Take-Home Calculator"},{path:"/compare",label:"Compare Two Salaries"}]}
          salaries={[{amount:35000},{amount:45000},{amount:55000},{amount:70000},{amount:85000}]}
        />
      </>
    ),
  },

  // 16
  {
    slug: "minimum-wage-uk-2026",
    title: "UK Minimum Wage 2026/27 — Rates & Take-Home",
    description: "National Living Wage rises to £12.71/hr from April 2026. See what it means for your annual salary and monthly take-home pay.",
    excerpt: "The National Living Wage jumped to £12.71 per hour in April 2026 — a 4.1% rise. Here's what full-time minimum-wage workers actually take home.",
    category: "Wages",
    keywords: ["minimum wage", "national living wage", "2026/27", "hourly rate"],
    readMinutes: 6,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "What is the UK minimum wage in 2026?", a: "£12.71 per hour for workers aged 21 and over (National Living Wage). For 18–20 year olds it's £10.85, and for under-18s and apprentices it's £8.00." },
      { q: "What is the annual salary on minimum wage?", a: "Working 37.5 hours per week at £12.71/hr gives a gross annual salary of approximately £24,783. After tax and NI, take-home is around £21,892." },
      { q: "When did the new minimum wage start?", a: "The new rates took effect on 1 April 2026, following Low Pay Commission recommendations accepted at the Autumn Budget 2025." },
    ],
    body: () => (
      <>
        <p>From <strong>1 April 2026</strong>, the National Living Wage (NLW) for workers aged 21 and over rose to <strong>£12.71 per hour</strong> — up 50p from £12.21. That's a 4.1% increase, broadly matching inflation.</p>

        <h2 id="rates">All minimum wage rates from April 2026</h2>
        <table>
          <thead><tr><th>Category</th><th>Hourly rate</th><th>Increase</th></tr></thead>
          <tbody>
            <tr><td>21 and over (NLW)</td><td>£12.71</td><td>+£0.50 (4.1%)</td></tr>
            <tr><td>18 to 20</td><td>£10.85</td><td>+£0.85 (8.5%)</td></tr>
            <tr><td>Under 18</td><td>£8.00</td><td>+£0.45 (6.0%)</td></tr>
            <tr><td>Apprentice</td><td>£8.00</td><td>+£0.45 (6.0%)</td></tr>
          </tbody>
        </table>

        <h2 id="annual">What minimum wage looks like as an annual salary</h2>
        <p>Most full-time contracts are 37.5 hours per week. At £12.71/hr that gives:</p>
        <table>
          <thead><tr><th>Hours/week</th><th>Gross annual</th><th>Take-home (annual)</th><th>Take-home (monthly)</th></tr></thead>
          <tbody>
            <tr><td>35</td><td>£23,129</td><td>£20,486</td><td>£1,707</td></tr>
            <tr><td>37.5</td><td>£24,783</td><td>£21,892</td><td>£1,824</td></tr>
            <tr><td>40</td><td>£26,437</td><td>£23,298</td><td>£1,942</td></tr>
          </tbody>
        </table>
        <p>These assume no pension, no Student Loan, and tax code 1257L. Use the <ToolLink to="/hourly">Hourly Wage Calculator</ToolLink> to model your exact hours.</p>

        <h2 id="young-workers">18–20 year olds: the biggest jump</h2>
        <p>The 18–20 rate rose 8.5% — the largest percentage increase of any band. At £10.85/hr and 37.5 hours, that's a gross salary of £21,157 and roughly £19,032 after tax.</p>

        <h2 id="next-steps">Check your take-home</h2>
        <p>Plug your hourly rate into the <ToolLink to="/hourly">Hourly Wage Calculator</ToolLink> or use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> with the annual figure to see your exact monthly pay after all deductions.</p>
      </>
    ),
  },

  // 17
  {
    slug: "average-salary-uk-2026",
    title: "Average UK Salary 2026: £35,000 Median by Region, Age & Job",
    description: "The median UK salary is £35,000 in 2026 (ONS data). See how you compare by region — London £43.5k, Scotland £34k, Wales £31.5k — plus age and industry breakdowns.",
    excerpt: "Is your salary above or below average? The latest ONS data shows a median of £35,000. Here's the full breakdown by region, age and sector.",
    category: "Career",
    keywords: ["average salary", "median salary", "UK salary", "salary comparison"],
    readMinutes: 7,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "What is the average salary in the UK in 2026?", a: "The median full-time salary is approximately £35,000 per year (ONS ASHE 2025 data). The mean is higher at around £39,500, pulled up by high earners." },
      { q: "What is a good salary in the UK?", a: "Anything above the median of £35,000 puts you in the top half of earners. A salary above £50,270 puts you in the higher-rate tax bracket." },
      { q: "What is the average salary in London?", a: "The median full-time salary in London is approximately £43,500 — about 24% above the national median." },
    ],
    body: () => (
      <>
        <p>The average UK salary in 2026 is £37,430 at the median (the midpoint salary where half earn more and half earn less), based on ONS Annual Survey of Hours and Earnings (ASHE) data. The mean (arithmetic average) is higher at approximately £42,500, pulled upward by high earners. For most purposes — understanding whether your salary is competitive, benchmarking pay, or planning finances — the median is the more useful figure.</p>

        <h2 id="median">UK average salary 2026 — key figures</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual</th><th>Monthly gross</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time salary</td><td>£37,430</td><td>£3,119</td><td>~£2,590/month</td></tr>
            <tr><td>Mean full-time salary</td><td>£42,500</td><td>£3,542</td><td>~£2,850/month</td></tr>
            <tr><td>Median all employees (inc. part-time)</td><td>£29,800</td><td>£2,483</td><td>~£2,110/month</td></tr>
            <tr><td>Median male (full-time)</td><td>£39,200</td><td>£3,267</td><td>~£2,690/month</td></tr>
            <tr><td>Median female (full-time)</td><td>£35,300</td><td>£2,942</td><td>~£2,460/month</td></tr>
          </tbody>
        </table>

        <h2 id="by-region">Average salary by UK region (2026)</h2>
        <table>
          <thead><tr><th>Region</th><th>Median full-time</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>London</td><td>£46,500</td><td>~£3,060/month</td></tr>
            <tr><td>South East</td><td>£40,500</td><td>~£2,770/month</td></tr>
            <tr><td>East of England</td><td>£38,500</td><td>~£2,650/month</td></tr>
            <tr><td>South West</td><td>£36,800</td><td>~£2,560/month</td></tr>
            <tr><td>East Midlands</td><td>£36,200</td><td>~£2,530/month</td></tr>
            <tr><td>West Midlands</td><td>£36,100</td><td>~£2,520/month</td></tr>
            <tr><td>North West</td><td>£35,800</td><td>~£2,500/month</td></tr>
            <tr><td>Yorkshire &amp; Humber</td><td>£35,200</td><td>~£2,470/month</td></tr>
            <tr><td>North East</td><td>£34,100</td><td>~£2,410/month</td></tr>
            <tr><td>Wales</td><td>£33,800</td><td>~£2,390/month</td></tr>
            <tr><td>Scotland</td><td>£36,900</td><td>~£2,560/month</td></tr>
            <tr><td>Northern Ireland</td><td>£32,800</td><td>~£2,330/month</td></tr>
          </tbody>
        </table>

        <h2 id="by-age">Average salary by age group</h2>
        <table>
          <thead><tr><th>Age group</th><th>Median salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>18–21</td><td>£22,400</td><td>~£1,720/month</td></tr>
            <tr><td>22–29</td><td>£29,800</td><td>~£2,110/month</td></tr>
            <tr><td>30–39</td><td>£38,500</td><td>~£2,650/month</td></tr>
            <tr><td>40–49</td><td>£41,200</td><td>~£2,800/month</td></tr>
            <tr><td>50–59</td><td>£39,800</td><td>~£2,720/month</td></tr>
            <tr><td>60+</td><td>£36,000</td><td>~£2,520/month</td></tr>
          </tbody>
        </table>

        <h2 id="context">What does the average salary mean for your take-home?</h2>
        <p>The median salary of £37,430 puts you in the basic rate income tax band. After the Personal Allowance of £12,570, you pay 20% tax on £24,860 = £4,972. National Insurance is 8% on £37,430 − £12,570 = £24,860, costing £1,989. Monthly take-home is approximately £37,430 − £4,972 − £1,989 = £30,469/year, or £2,539/month. This does not include any Student Loan repayments or pension contributions, which would reduce take-home further.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Calculate Your Take-Home Pay"},{path:"/insights/average-salary-london-2026",label:"Average London Salary"},{path:"/insights/what-is-a-good-salary-uk-2026",label:"What Is a Good Salary?"}]}
          salaries={[{amount:25000},{amount:35000},{amount:37430},{amount:45000},{amount:60000}]}
        />
      </>
    ),
  },

  // 18
  {
    slug: "marriage-allowance-uk-2026",
    title: "Marriage Allowance UK 2026/27 — Save Up to £252",
    description: "Transfer £1,260 of your Personal Allowance to your spouse and save up to £252 in tax. Full eligibility guide for 2026/27.",
    excerpt: "Marriage Allowance lets one partner transfer £1,260 of unused Personal Allowance to the other — saving up to £252 per year. Most eligible couples don't claim it.",
    category: "Tax",
    keywords: ["marriage allowance", "tax", "personal allowance", "couples"],
    readMinutes: 5,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "How much can you save with Marriage Allowance?", a: "Up to £252 per year in the 2026/27 tax year. You can also backdate claims for up to 4 previous tax years, potentially saving up to £1,260 in total." },
      { q: "Who is eligible for Marriage Allowance?", a: "Married couples or civil partners where one partner earns below the Personal Allowance (£12,570) and the other pays basic-rate tax (earning between £12,571 and £50,270)." },
      { q: "Does Marriage Allowance affect my tax code?", a: "Yes — the lower earner's tax code changes to reflect the reduced Personal Allowance (£11,310), and the higher earner's code increases to reflect the extra £1,260." },
    ],
    body: () => (
      <>
        <p>Marriage Allowance lets one partner in a marriage or civil partnership transfer up to £1,260 of their unused Personal Allowance to the other. It's free to claim, takes about 10 minutes online, and saves the couple up to £252 per year in income tax. You can also backdate claims for up to four previous tax years, potentially reclaiming over £1,000 in one go.</p>
        <h2 id="eligibility">Who qualifies</h2>
        <p>To claim Marriage Allowance in 2026/27, both of the following must apply: the lower-earning partner must earn below £12,570 (the Personal Allowance — either because they don't work, work part-time, or are in education), and the higher-earning partner must be a basic rate taxpayer earning between £12,570 and £50,270. Marriage Allowance is not available if either partner pays the higher rate (40%) or additional rate (45%) Income Tax. It's also not available to unmarried couples living together — you must be legally married or in a civil partnership.</p>
        <h2 id="how-much">How much it saves</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Annual saving</th></tr></thead>
          <tbody>
            <tr><td>Full £1,260 transfer, basic rate taxpayer</td><td>£252/year</td></tr>
            <tr><td>Backdated 4 years (2022/23–2025/26)</td><td>Up to £1,008 lump sum</td></tr>
            <tr><td>Total over 5 years if claimed now</td><td>Up to £1,260</td></tr>
          </tbody>
        </table>
        <p>The transfer reduces the higher earner's tax bill by making 20% of the additional £1,260 allowance tax-free — saving £252. The lower earner's tax code changes from 1257L to 1131L (£12,570 minus £1,260 = £11,310), while the higher earner receives a code of 1383L (£12,570 plus £1,260 = £13,830).</p>
        <h2 id="how-to-claim">How to claim</h2>
        <p>The lower-earning partner makes the application at gov.uk/apply-marriage-allowance. You'll need both National Insurance numbers and to verify your identity. Once approved, HMRC updates both partners' tax codes and the higher earner will see reduced tax deductions from their next payroll run. For backdated claims, the refund comes as a cheque or bank transfer, not through payroll. Claims can be made by the lower earner only — the higher earner cannot initiate the transfer.</p>
        <h2 id="cancel">When to cancel</h2>
        <p>If circumstances change — the lower earner finds work and exceeds £12,570, or the higher earner moves into the 40% band — Marriage Allowance should be cancelled via HMRC to avoid incorrect coding. HMRC reviews eligibility annually through Self Assessment or PAYE records, but it's your responsibility to report changes promptly.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/personal-allowance-taper-100k-trap",label:"Personal Allowance Guide"}]}
          salaries={[{amount:15000},{amount:25000},{amount:35000},{amount:45000}]}
        />
      </>
    ),
  },

  // 19
  {
    slug: "pension-auto-enrolment-2026",
    title: "UK Pension Auto-Enrolment 2026/27: Rates, Thresholds & How It Works",
    description: "Workplace pension auto-enrolment in 2026/27 is 8% of qualifying earnings — 3% from employer, 5% from employee. Qualifying earnings £6,240–£50,270 and tax relief explained.",
    excerpt: "Auto-enrolment means at least 8% of your qualifying earnings go into a pension — but it also reduces your tax bill. Here's the real cost to your take-home.",
    category: "Pension",
    keywords: ["pension", "auto enrolment", "workplace pension", "employer contribution"],
    readMinutes: 6,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "What is the minimum pension contribution in 2026?", a: "8% of qualifying earnings — at least 3% from the employer and 5% from the employee. Qualifying earnings are between £6,240 and £50,270." },
      { q: "Can I opt out of auto-enrolment?", a: "Yes, but your employer must re-enrol you every 3 years. You lose both the employer contribution and the tax relief if you opt out." },
      { q: "Does pension reduce my tax?", a: "Yes — contributions via salary sacrifice come out before tax and NI, so a £100 pension contribution might only cost £68 from your take-home (for a basic-rate taxpayer)." },
    ],
    body: () => (
      <>
        <p>Since 2019, every eligible worker in the UK is automatically enrolled into a workplace pension. The minimum total contribution is <strong>8% of qualifying earnings</strong> — your employer pays at least 3% and you pay at least 5%.</p>

        <h2 id="qualifying">What counts as qualifying earnings</h2>
        <p>Contributions are calculated on earnings between <strong>£6,240</strong> and <strong>£50,270</strong> per year (2025/26 thresholds — 2026/27 figures to be confirmed). Earnings below and above this band are ignored for minimum contribution purposes.</p>

        <h2 id="example">Worked example: £30,000 salary</h2>
        <table>
          <thead><tr><th>Component</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Qualifying earnings</td><td>£30,000 − £6,240 = £23,760</td></tr>
            <tr><td>Employer 3%</td><td>£713/year</td></tr>
            <tr><td>Employee 5%</td><td>£1,188/year</td></tr>
            <tr><td>Total into pension</td><td>£1,901/year</td></tr>
          </tbody>
        </table>

        <h2 id="salary-sacrifice">Salary sacrifice: the smart way</h2>
        <p>If your employer offers salary sacrifice, pension contributions come out <em>before</em> tax and NI. This means:</p>
        <ul>
          <li>A £1,188 pension contribution via sacrifice costs you roughly <strong>£808</strong> from take-home (basic rate).</li>
          <li>Your employer also saves on NI — some pass this saving into your pension too.</li>
        </ul>
        <p>Model the difference in the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> by adjusting the pension percentage slider.</p>

        <h2 id="opt-out">Should you opt out?</h2>
        <p>In almost all cases, <strong>no</strong>. Opting out means losing free money from your employer's contribution and from tax relief. The only scenario where it might make sense is if you have problem debt with interest rates significantly above your pension's expected return.</p>
      </>
    ),
  },

  // 20
  {
    slug: "how-paye-works-uk",
    title: "How PAYE Works in the UK — Step-by-Step Guide",
    description: "PAYE (Pay As You Earn) is how UK employers deduct tax and NI from your wages. Simple explanation of how it works.",
    excerpt: "PAYE deducts Income Tax and National Insurance from your salary before you receive it. Here's exactly how the system calculates what you owe each month.",
    category: "Tax",
    keywords: ["PAYE", "tax code", "how tax works", "employer deductions"],
    readMinutes: 6,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "What does PAYE stand for?", a: "Pay As You Earn — the system by which UK employers deduct Income Tax and National Insurance from employees' wages before paying them." },
      { q: "Do I need to do anything for PAYE?", a: "Usually no — your employer handles everything. You just need to check your tax code is correct on your payslip. If it's wrong, contact HMRC." },
      { q: "Is PAYE the same as Income Tax?", a: "No — PAYE is the collection mechanism. Income Tax is the actual tax. PAYE also collects National Insurance and Student Loan repayments from your wages." },
    ],
    body: () => (
      <>
        <p>Pay As You Earn (PAYE) is the system HMRC uses to collect Income Tax and National Insurance from employees before they receive their salary. Your employer deducts the correct amounts each pay period and sends them directly to HMRC — meaning most employees never need to calculate their own tax. Here's exactly how it works in 2026/27.</p>
        <h2 id="tax-code">Step 1 — Your tax code</h2>
        <p>Your tax code tells your employer how much of your income is tax-free. The standard code for 2026/27 is <strong>1257L</strong> — the "1257" means your tax-free allowance is £12,570 (drop the last digit, add a zero). The "L" means you're entitled to the standard Personal Allowance. Codes change if you have unpaid tax from previous years (e.g. 1000L meaning a reduced allowance), untaxed benefits like a company car, or multiple jobs.</p>
        <h2 id="calculation">Step 2 — How your employer calculates each month's deduction</h2>
        <p>PAYE uses a <strong>cumulative basis</strong> — your employer calculates tax based on all your earnings since April 6, then deducts what's already been paid. This means if you earn a bonus in month 8, your employer recalculates your full year's expected tax and adjusts the deduction automatically. It also means tax errors from earlier in the year get corrected without you doing anything.</p>
        <h2 id="rates">Step 3 — Income Tax and NI rates applied (2026/27)</h2>
        <table>
          <thead><tr><th>Deduction</th><th>Rate</th><th>On earnings between</th></tr></thead>
          <tbody>
            <tr><td>Income Tax — basic rate</td><td>20%</td><td>£12,571–£50,270</td></tr>
            <tr><td>Income Tax — higher rate</td><td>40%</td><td>£50,271–£125,140</td></tr>
            <tr><td>Employee NI — primary</td><td>8%</td><td>£12,571–£50,270</td></tr>
            <tr><td>Employee NI — upper</td><td>2%</td><td>Over £50,270</td></tr>
          </tbody>
        </table>
        <h2 id="payslip">What appears on your payslip</h2>
        <p>Your payslip must show: gross pay, itemised deductions (Income Tax, NI, pension, student loan if applicable), net pay, and your tax code. If your tax code changes mid-year, your employer will show the new code from the first pay period it applies. Employer NI (15% above £5,000) does not appear on your payslip — it's paid separately by your employer on top of your gross salary and is not deducted from your take-home.</p>
        <h2 id="end-of-year">P60 and year-end reconciliation</h2>
        <p>At the end of each tax year (April 5), your employer issues a <strong>P60</strong> showing your total earnings and tax paid. If HMRC's records show you've overpaid tax — perhaps because you changed jobs, had multiple periods of employment, or had an incorrect tax code — HMRC will send a P800 tax calculation and either refund the overpayment automatically to your bank account or collect an underpayment through next year's PAYE code.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/emergency-tax-code-1257l-explained",label:"Emergency Tax Code Explained"},{path:"/insights/national-insurance-2026-explained",label:"National Insurance Guide"}]}
          salaries={[{amount:25000},{amount:35000},{amount:50000},{amount:65000}]}
        />
      </>
    ),
  },

  // 21
  {
    slug: "tax-refund-uk-guide",
    title: "How to Claim a Tax Refund in the UK (2026/27)",
    description: "Overpaid tax? Here's how to check if HMRC owes you money and claim a tax refund — step by step.",
    excerpt: "HMRC issues over £1 billion in tax refunds every year. Most go unclaimed because people don't know they're owed. Here's how to check and claim yours.",
    category: "Tax",
    keywords: ["tax refund", "overpaid tax", "HMRC", "tax rebate"],
    readMinutes: 5,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "How do I know if I'm owed a tax refund?", a: "Compare actual deductions (from payslips or P60) against the calculated liability using a salary calculator. Common causes include wrong tax codes, emergency tax, or working part of the year." },
      { q: "How long does a tax refund take?", a: "Online claims via your HMRC personal tax account typically take 5–6 weeks. Postal claims (P50 form) can take 6–8 weeks." },
      { q: "Can I claim a tax refund for previous years?", a: "Yes — you can claim overpaid tax for the previous 4 tax years. For 2026/27, you can go back to 2022/23." },
    ],
    body: () => (
      <>
        <p>Millions of UK workers overpay income tax every year — and most don't realise they're owed a refund. The most common causes are an incorrect tax code, starting or leaving a job mid-year, claiming work-related expenses, or making charitable donations through Gift Aid. HMRC repays overpaid tax automatically in many cases, but for some situations you need to claim actively.</p>
        <h2 id="automatic">When HMRC refunds automatically</h2>
        <p>After each tax year ends on April 5, HMRC runs a reconciliation of PAYE records. If you've overpaid — typically because you changed jobs, had multiple employments, or had a wrong tax code — HMRC issues a <strong>P800 tax calculation</strong> in the summer (June–October). If it shows an overpayment, you can claim online at gov.uk and receive the refund directly into your bank account within 5 days. If you don't claim online, HMRC sends a cheque automatically after 45 days.</p>
        <h2 id="claim">When you need to claim yourself</h2>
        <p><strong>Work expenses:</strong> Employees can claim tax relief on expenses incurred wholly in performing their job — professional subscriptions, tools, uniforms, and mileage above 45p/mile. Claims go back four tax years. A £1,000 expense claim saves a basic rate taxpayer £200 in tax.</p>
        <p><strong>Working from home:</strong> HMRC allows a flat rate of £6/week (£312/year) for home working without receipts, or higher amounts with evidence. A basic rate taxpayer claiming the flat rate saves £62/year. Claims for the COVID-19 period (2020/21 and 2021/22) must be made by April 5, 2025.</p>
        <p><strong>Marriage Allowance:</strong> Backdated claims for up to four previous years can produce a lump sum refund of over £1,000 if you've been eligible but not claimed.</p>
        <p><strong>Leaving work mid-year:</strong> If you stop working and don't take another job before April 5, you may have overpaid tax because PAYE assumed you'd earn the same for the rest of the year. Claim using form P50 or wait for a P800.</p>
        <h2 id="how-to-claim">How to claim a tax refund</h2>
        <p>The fastest route is the HMRC Personal Tax Account at gov.uk/personal-tax-account. You can check your tax code, see estimated refunds, and claim online with payment to your bank within 5 working days. For employment expenses, use form P87 online or by post. For self-employed income or multiple income sources, you'll need a Self Assessment return.</p>
        <h2 id="scams">Tax refund scams</h2>
        <p>HMRC will never contact you by text, WhatsApp, or email asking for your bank details to process a refund — these are always scams. HMRC communicates refunds via post (P800) or through your Personal Tax Account. If you receive an unexpected "tax refund" text or email, report it to HMRC at phishing@hmrc.gov.uk and delete it.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/emergency-tax-code-1257l-explained",label:"Emergency Tax Code Guide"}]}
          salaries={[{amount:25000},{amount:35000},{amount:45000},{amount:60000}]}
        />
      </>
    ),
  },

  // 22
  {
    slug: "employer-ni-guide-2026",
    title: "Employer National Insurance Rates 2026/27 — 15%, £5,000 Threshold",
    description: "Employer NI rate is 15% on earnings above the £5,000 secondary threshold in 2026/27. Calculate exact employer NI costs per employee with our free calculator. Full Employment Allowance guide and worked examples.",
    excerpt: "Employer National Insurance is the hidden cost of every hire. At 15% above the threshold, a £40,000 salary actually costs the employer £44,410.",
    category: "Employer",
    keywords: ["employer NI", "national insurance", "employer cost", "hiring"],
    readMinutes: 5,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "What is the employer NI rate in 2026/27?", a: "15% on earnings above the Secondary Threshold of £5,000 per year (reduced from £9,100 in April 2025)." },
      { q: "How much does it cost to employ someone on £30,000?", a: "Employer NI is 15% × (£30,000 − £5,000) = £3,750. Total employment cost: £33,750, plus any pension contributions." },
      { q: "Is there an Employment Allowance?", a: "Yes — eligible employers can claim up to £10,500 per year off their employer NI bill. Most small businesses qualify." },
    ],
    body: () => (
      <>
        <p>When you employ someone, their salary isn't the full cost. <strong>Employer National Insurance</strong> at <strong>15%</strong> is charged on all earnings above the Secondary Threshold — and it's the employer's cost, not the employee's.</p>

        <h2 id="rates">Employer NI rates 2026/27</h2>
        <table>
          <thead><tr><th>Component</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td>Rate</td><td>15%</td></tr>
            <tr><td>Secondary Threshold</td><td>£5,000/year</td></tr>
            <tr><td>No upper limit</td><td>15% on all earnings above £5,000</td></tr>
          </tbody>
        </table>

        <h2 id="true-cost">True cost of employment</h2>
        <table>
          <thead><tr><th>Gross salary</th><th>Employer NI</th><th>Pension (3%)</th><th>Total cost</th></tr></thead>
          <tbody>
            <tr><td>£25,000</td><td>£3,000</td><td>£563</td><td>£28,563</td></tr>
            <tr><td>£35,000</td><td>£4,500</td><td>£863</td><td>£40,363</td></tr>
            <tr><td>£50,000</td><td>£6,750</td><td>£1,313</td><td>£58,063</td></tr>
            <tr><td>£75,000</td><td>£10,500</td><td>£1,321</td><td>£86,821</td></tr>
          </tbody>
        </table>

        <h2 id="employment-allowance">Employment Allowance</h2>
        <p>Eligible employers can claim up to <strong>£10,500 per year</strong> off their employer NI bill. You qualify if your total employer NI was under £100,000 in the previous tax year. For a small business hiring one person on £30,000, this could eliminate the entire NI cost.</p>

        <h2 id="calculator">Calculate your employment costs</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to model the employee's net pay, then add employer NI and pension on top to see the true cost of a hire.</p>
      </>
    ),
  },

  // 23
  {
    slug: "working-from-home-tax-relief-uk",
    title: "Working From Home Tax Relief UK 2026/27",
    description: "Claim up to £6/week tax relief for working from home — if your employer requires it. Here's who qualifies and how to claim.",
    excerpt: "If your employer requires you to work from home, you can claim tax relief of £6/week (£312/year) — saving up to £62 for basic-rate taxpayers.",
    category: "Tax",
    keywords: ["working from home", "tax relief", "WFH", "home office"],
    readMinutes: 5,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "Can I claim tax relief for working from home?", a: "Only if your employer requires you to work from home — choosing to WFH when an office is available doesn't qualify. The COVID-era blanket eligibility ended in April 2022." },
      { q: "How much is WFH tax relief?", a: "£6 per week (£312/year). At 20% basic rate, this saves £62.40/year. At 40% higher rate, it saves £124.80/year." },
      { q: "How do I claim?", a: "Apply online at gov.uk/tax-relief-for-employees/working-at-home. HMRC adjusts your tax code so you get relief automatically through PAYE." },
    ],
    body: () => (
      <>
        <p>If you work from home, you may be able to claim tax relief on the extra household costs — heating, electricity, and broadband — that arise from working at home. HMRC offers either a flat-rate claim with no receipts required, or a higher claim if you can evidence actual costs. The relief applies to employees who are required to work from home, not those who choose to.</p>
        <h2 id="flat-rate">Flat-rate relief — no receipts needed</h2>
        <p>HMRC allows <strong>£6 per week</strong> (£312 per year) without any receipts or calculation. For a basic rate (20%) taxpayer, this saves <strong>£62.40 per year</strong>. For a higher rate (40%) taxpayer, the saving is <strong>£124.80 per year</strong>. Small amounts individually, but the claims can be backdated four tax years — meaning a new claim in 2026/27 could recover relief back to 2022/23, worth £250–£500 in total for most employees.</p>
        <table>
          <thead><tr><th>Tax rate</th><th>Annual saving (flat rate)</th><th>4-year backdated claim</th></tr></thead>
          <tbody>
            <tr><td>Basic rate (20%)</td><td>£62.40/year</td><td>~£250</td></tr>
            <tr><td>Higher rate (40%)</td><td>£124.80/year</td><td>~£499</td></tr>
          </tbody>
        </table>
        <h2 id="actual-costs">Claiming actual costs — higher amounts</h2>
        <p>If your additional household costs exceed £6/week, you can claim the higher amount with evidence. You'll need to calculate the proportion of your home used for work and the additional cost incurred. HMRC accepts a reasonable calculation method — for example, total annual heating bill divided by number of rooms, multiplied by the fraction of the day the room is used for work. This is more complex but can yield significantly higher relief for people with high energy bills or dedicated home offices.</p>
        <h2 id="eligibility">Who can claim</h2>
        <p>You can claim if your employer requires you to work from home — either full-time or on designated home-working days — and you're not simply choosing to work from home occasionally. A formal homeworking agreement or contract clause helps evidence the requirement. During the pandemic years (2020/21 and 2021/22), HMRC allowed all home workers to claim regardless of whether they were required to — those claims must be made by April 5, 2025.</p>
        <h2 id="how-to-claim">How to claim</h2>
        <p>Employees claim via their HMRC Personal Tax Account at gov.uk/personal-tax-account, or by submitting form P87. HMRC adjusts your PAYE tax code to give you the relief through your salary going forward, rather than as a cash payment. Self-employed workers claim home-working costs as a business expense on their Self Assessment tax return — typically using the simplified expenses flat rate of £10–£26/month depending on hours worked from home.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/tax-refund-uk-guide",label:"How to Claim a Tax Refund"}]}
          salaries={[{amount:25000},{amount:35000},{amount:50000},{amount:65000}]}
        />
      </>
    ),
  },

  // 24
  {
    slug: "tax-free-childcare-uk-2026",
    title: "Tax-Free Childcare UK 2026 — How It Works",
    description: "Get up to £2,000/year per child (£4,000 if disabled) from the government towards childcare costs. Full eligibility guide.",
    excerpt: "For every £8 you pay into your Tax-Free Childcare account, the government adds £2 — up to £2,000 per child per year. Here's who qualifies.",
    category: "Benefits",
    keywords: ["tax-free childcare", "childcare", "benefits", "working parents"],
    readMinutes: 5,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "How does Tax-Free Childcare work?", a: "You pay into an online account and the government tops up every £8 with £2 — a 20% bonus. The maximum top-up is £2,000 per child per year (£4,000 for disabled children)." },
      { q: "Who is eligible for Tax-Free Childcare?", a: "Both parents must be working and each earning at least the National Minimum Wage for 16 hours/week (about £10,581/year), but neither earning over £100,000." },
      { q: "Can I use it with childcare vouchers?", a: "No — only one scheme applies at a time. Childcare vouchers and Tax-Free Childcare cannot be used simultaneously. Compare both options to see which produces the better outcome for your circumstances before making any change." },
    ],
    body: () => (
      <>
        <p><strong>Tax-Free Childcare</strong> is a government scheme where for every <strong>£8</strong> you pay into a special online account, the government adds <strong>£2</strong>. That's a 20% bonus on childcare costs, up to <strong>£2,000 per child per year</strong>.</p>

        <h2 id="eligibility">Eligibility requirements</h2>
        <ul>
          <li><strong>Both parents working</strong> (or one working and one on disability benefits).</li>
          <li>Each parent earns at least the <strong>National Minimum Wage × 16 hours/week</strong> — approximately £10,581/year.</li>
          <li>Neither parent earns over <strong>£100,000</strong> per year.</li>
          <li>Child is under 12 (or under 17 if disabled).</li>
          <li>Not receiving Universal Credit (you'd use the childcare element instead).</li>
        </ul>

        <h2 id="how-much">How much you can get</h2>
        <table>
          <thead><tr><th>Category</th><th>Max govt top-up/year</th><th>Max you pay in</th></tr></thead>
          <tbody>
            <tr><td>Per child</td><td>£2,000</td><td>£8,000</td></tr>
            <tr><td>Disabled child</td><td>£4,000</td><td>£16,000</td></tr>
          </tbody>
        </table>
        <p>With two children, a family can receive up to <strong>£4,000 per year</strong> in government top-ups.</p>

        <h2 id="vs-vouchers">Tax-Free Childcare vs Childcare Vouchers</h2>
        <p>Childcare vouchers (now closed to new applicants) offered salary-sacrifice savings. If you're already on vouchers, they may be better value for higher earners. Otherwise, Tax-Free Childcare is usually the better option for most families.</p>

        <h2 id="apply">How to apply</h2>
        <p>Apply through the <strong>Childcare Choices</strong> website at gov.uk/tax-free-childcare. You can set up your account in about 20 minutes and start using it immediately with any registered childcare provider.</p>

        <h2 id="impact">Impact on your finances</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to see your household income after tax, then factor in the childcare top-up to understand your true disposable income.</p>
      </>
    ),
  },

  // 25
  {
    slug: "uk-tax-bands-explained-2026",
    title: "UK Tax Bands & Rates 2026/27 — Complete Guide",
    description: "All UK Income Tax bands and rates for 2026/27 in one place — England, Scotland, Wales and NI with worked examples.",
    excerpt: "The 2026/27 tax year keeps the frozen bands that have existed since 2021. Here's every rate, threshold and worked example you need.",
    category: "Tax",
    keywords: ["tax bands", "income tax rates", "tax brackets", "2026/27"],
    readMinutes: 7,
    publishedISO: "2026-04-30",
    updatedISO: "2026-04-30",
    faq: [
      { q: "What are the UK tax bands for 2026/27?", a: "For England, Wales and NI: Personal Allowance £0–£12,570 (0%), Basic Rate £12,571–£50,270 (20%), Higher Rate £50,271–£125,140 (40%), Additional Rate over £125,140 (45%)." },
      { q: "Are tax bands different in Scotland?", a: "Yes — Scotland has six rates: Starter 19%, Basic 20%, Intermediate 21%, Higher 42%, Advanced 45%, and Top 48%. The thresholds also differ." },
      { q: "What is the Personal Allowance taper?", a: "Your Personal Allowance reduces by £1 for every £2 earned over £100,000. It reaches zero at £125,140, creating a hidden 60% marginal rate between £100,000 and £125,140." },
    ],
    body: () => (
      <>
        <p>Income Tax in the UK is charged in bands — you only pay each rate on the portion of income that falls within that band. The bands have been <strong>frozen since 2021/22</strong> and remain unchanged for 2026/27.</p>

        <h2 id="england">England, Wales & Northern Ireland</h2>
        <table>
          <thead><tr><th>Band</th><th>Taxable income</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Personal Allowance</td><td>Up to £12,570</td><td>0%</td></tr>
            <tr><td>Basic Rate</td><td>£12,571 – £50,270</td><td>20%</td></tr>
            <tr><td>Higher Rate</td><td>£50,271 – £125,140</td><td>40%</td></tr>
            <tr><td>Additional Rate</td><td>Over £125,140</td><td>45%</td></tr>
          </tbody>
        </table>

        <h2 id="scotland">Scotland</h2>
        <table>
          <thead><tr><th>Band</th><th>Taxable income</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Personal Allowance</td><td>Up to £12,570</td><td>0%</td></tr>
            <tr><td>Starter</td><td>£12,571 – £16,537</td><td>19%</td></tr>
            <tr><td>Basic</td><td>£16,538 – £29,526</td><td>20%</td></tr>
            <tr><td>Intermediate</td><td>£29,527 – £43,662</td><td>21%</td></tr>
            <tr><td>Higher</td><td>£43,663 – £75,000</td><td>42%</td></tr>
            <tr><td>Advanced</td><td>£75,001 – £125,140</td><td>45%</td></tr>
            <tr><td>Top</td><td>Over £125,140</td><td>48%</td></tr>
          </tbody>
        </table>

        <h2 id="example">Worked example: £45,000 in England</h2>
        <ol>
          <li>First £12,570: <strong>£0</strong> tax (Personal Allowance).</li>
          <li>Next £32,430 (£12,571 to £45,000): <strong>£6,486</strong> at 20%.</li>
          <li>Total Income Tax: <strong>£6,486</strong>.</li>
          <li>Plus NI: <strong>£2,594</strong> (8% on earnings above £12,570).</li>
          <li>Take-home: <strong>£35,920</strong> (£2,993/month).</li>
        </ol>

        <h2 id="taper">The £100k trap</h2>
        <p>Between £100,000 and £125,140, your Personal Allowance is clawed back at £1 for every £2 earned. Combined with the 40% tax rate, this creates a <strong>60% effective marginal rate</strong>. Read our detailed guide on the <ToolLink to="/insights/personal-allowance-taper-100k-trap">£100k trap</ToolLink>.</p>

        <h2 id="calculator">Calculate your exact tax</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to see exactly how each band applies to your salary. Toggle between England and Scotland to compare.</p>
      </>
    ),
  },

  // 26
  {
    slug: "average-salary-by-age-uk-2026",
    title: "Average UK Salary by Age 2026: What Should You Earn?",
    description: "Full breakdown of average UK salaries by age group in 2026, from 18–21 to 60+, with take-home pay for each bracket.",
    excerpt: "Salaries in the UK peak between 40–49. Here's exactly what the median earner takes home at every age bracket in 2026 — and how you compare.",
    category: "Career",
    keywords: ["average salary by age uk 2026", "uk salary by age", "what salary should i earn at 30 uk", "average earnings by age uk"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average salary for a 30-year-old in the UK?", a: "The median annual salary for workers aged 30–39 in the UK is approximately £36,800 in 2026, giving a monthly take-home of around £2,580 after income tax and National Insurance." },
      { q: "At what age do UK salaries peak?", a: "UK salaries typically peak between ages 40–49, where the median gross salary reaches around £41,200. After 50, many workers shift to part-time roles or less senior positions, pulling the median down." },
      { q: "How much does a graduate earn more than a non-graduate?", a: "University graduates earn approximately £12,000 more per year at age 30–34 than non-graduates. This gap narrows significantly by age 50 as vocational experience becomes more valuable." },
    ],
    body: () => (
      <>
        <p>Your salary at 25 and your salary at 45 can look completely different — and that's by design. The UK labour market rewards experience, seniority, and specialisation. Here's exactly what the data shows for 2026.</p>

        <h2 id="breakdown">Average UK salary by age group (2026)</h2>
        <table>
          <thead><tr><th>Age group</th><th>Median gross salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>18–21</td><td>£18,500</td><td>£1,430</td></tr>
            <tr><td>22–29</td><td>£28,400</td><td>£2,065</td></tr>
            <tr><td>30–39</td><td>£36,800</td><td>£2,580</td></tr>
            <tr><td>40–49</td><td>£41,200</td><td>£2,840</td></tr>
            <tr><td>50–59</td><td>£38,600</td><td>£2,700</td></tr>
            <tr><td>60+</td><td>£33,100</td><td>£2,380</td></tr>
          </tbody>
        </table>
        <p><small>Source: ONS Annual Survey of Hours and Earnings (ASHE) 2025/26. Take-home figures calculated using 2026/27 tax rates, no pension or student loan deductions.</small></p>

        <h2 id="why-peak">Why do salaries peak in your 40s?</h2>
        <p>Workers accumulate skills, seniority, and bargaining power through their 30s. By their 40s, many reach management or senior specialist roles. After 50, career choices often shift — part-time working, semi-retirement, or transitioning to lower-pressure roles all pull the median down.</p>

        <h2 id="graduate">Graduate vs non-graduate earnings</h2>
        <p>At age 30–34, university graduates earn approximately <strong>£12,000 more per year</strong> than non-graduates. By age 50, that gap has largely closed as vocational skills and industry experience become equally valuable to employers.</p>

        <h2 id="calculate">How does your salary compare?</h2>
        <p>Use our <ToolLink to="/take-home">take-home pay calculator</ToolLink> to see exactly what your salary leaves in your pocket after income tax, National Insurance, and pension contributions. If you're considering a new role, our <ToolLink to="/pay-rise">pay rise calculator</ToolLink> shows the exact after-tax benefit of any increase.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/pay-rise",label:"Pay Rise Calculator"}]}
          salaries={[{amount:18500},{amount:28000},{amount:35000},{amount:40000},{amount:50000}]}
          cities={["London","Manchester"]}
        />
      </>
    ),
  },

  // 27
  {
    slug: "what-is-a-good-salary-uk-2026",
    title: "What Is a Good Salary in the UK in 2026?",
    description: "Is £35,000 a good salary in the UK? We break down what counts as good, average, and high pay in 2026, with real take-home figures.",
    excerpt: "The UK median salary is £34,963. But what actually counts as \"good\" depends on where you live, your age, and your cost of living. Here's the full picture.",
    category: "Wages",
    keywords: ["what is a good salary uk 2026", "good salary uk", "is 35000 a good salary uk", "is 50000 a good salary uk 2026", "above average salary uk"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "Is £35,000 a good salary in the UK?", a: "Yes — £35,000 puts you just above the UK median and ahead of around 55% of all workers. After tax you take home approximately £2,496 per month. In most cities outside London this is a comfortable income." },
      { q: "Is £50,000 a good salary in the UK in 2026?", a: "£50,000 places you in the top 25% of UK earners. Your monthly take-home is approximately £3,217. Note that earnings above £50,270 are taxed at 40%, so each extra £1,000 gross only adds £600 to your take-home." },
      { q: "What salary puts you in the top 10% in the UK?", a: "Approximately £65,000 gross places you in the top 10% of UK earners in 2026. Take-home is around £3,934 per month." },
    ],
    body: () => (
      <>
        <p>There's no single answer — but clear benchmarks help. Here's where different salary levels actually sit in the UK earnings distribution for 2026.</p>

        <h2 id="benchmarks">UK salary benchmarks 2026</h2>
        <table>
          <thead><tr><th>Salary</th><th>Monthly take-home</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>£22,308</td><td>£1,698</td><td>National Living Wage (full-time, 21+)</td></tr>
            <tr><td>£25,168</td><td>£1,895</td><td>Real Living Wage (UK, outside London)</td></tr>
            <tr><td>£34,963</td><td>£2,493</td><td>UK median — the exact middle earner</td></tr>
            <tr><td>£45,000</td><td>£3,060</td><td>Above 70% of UK workers</td></tr>
            <tr><td>£60,000</td><td>£3,800</td><td>Top 15% of earners</td></tr>
            <tr><td>£100,000</td><td>£5,662</td><td>Top 4% — personal allowance begins tapering</td></tr>
          </tbody>
        </table>
        <p><small>Take-home figures for 2026/27, England, no pension or student loan deductions.</small></p>

        <h2 id="35k">Is £35,000 a good salary in the UK?</h2>
        <p>Yes. £35,000 sits just above the UK median, placing you ahead of roughly 55% of all workers. You take home approximately <strong>£2,496 per month</strong>. In most cities outside London — Manchester, Leeds, Birmingham, Bristol — this is genuinely comfortable.</p>

        <h2 id="50k">Is £50,000 a good salary?</h2>
        <p>£50,000 puts you in the top 25% of UK earners at <strong>£3,217 per month</strong> take-home. One important threshold: at £50,270, the Higher Rate (40%) kicks in, so every £1 above this costs you 40p in tax plus 2p in NI.</p>

        <h2 id="london">Does London change the picture?</h2>
        <p>Significantly. A £44,000 salary in London roughly matches a £32,000 salary in Manchester once housing costs are factored in. Our <ToolLink to="/cost-of-living">cost of living calculator</ToolLink> lets you compare net income across regions.</p>

        <h2 id="calculate">Calculate your exact take-home</h2>
        <p>Use our <ToolLink to="/take-home">salary calculator</ToolLink> to see precisely what any gross salary means for your monthly budget — including pension, student loan, and Scottish tax rates.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/compare",label:"Compare Salaries"},{path:"/cost-of-living",label:"Cost of Living"}]}
          salaries={[{amount:25000},{amount:35000},{amount:45000},{amount:50000},{amount:60000},{amount:100000}]}
          cities={["London","Manchester","Birmingham"]}
        />
      </>
    ),
  },

  // 28
  {
    slug: "income-tax-bands-2026-27",
    title: "UK Income Tax Bands 2026/27: Personal Allowance, Higher Rate & Scottish Rates",
    description: "All UK income tax bands for 2026/27. Personal allowance £12,570 (frozen), basic 20% to £50,270, higher 40%, additional 45%. Plus full Scottish rates and worked examples.",
    excerpt: "The personal allowance is still frozen at £12,570. Here are all the UK income tax bands for 2026/27 — England, Wales, and Scotland — with take-home examples.",
    category: "Tax",
    keywords: ["income tax bands 2026 27", "uk tax rates 2026", "income tax thresholds 2026", "higher rate tax threshold 2026", "personal allowance 2026"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the personal allowance for 2026/27?", a: "£12,570 — unchanged since 2021/22. It is frozen until at least April 2028, creating a fiscal drag effect as more wages are pulled into the tax net." },
      { q: "When does the higher rate of income tax kick in for 2026/27?", a: "The Higher Rate (40%) applies to taxable income above £50,270 in England, Wales, and Northern Ireland. In Scotland the Higher Rate is 42% and applies from £43,663." },
      { q: "What is the 60% tax trap?", a: "Between £100,000 and £125,140, your Personal Allowance is clawed back at £1 for every £2 earned. Combined with the 40% Higher Rate, this creates an effective 60% marginal rate on every pound in this band." },
    ],
    body: () => (
      <>
        <p>Income tax in the UK is applied in bands — you don't pay one flat rate on your whole salary. Each band has a different rate, and you pay that rate only on the portion of your income that falls within it.</p>

        <h2 id="bands">UK income tax bands 2026/27 (England, Wales, Northern Ireland)</h2>
        <table>
          <thead><tr><th>Band</th><th>Taxable income</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Personal Allowance</td><td>Up to £12,570</td><td>0%</td></tr>
            <tr><td>Basic Rate</td><td>£12,571–£50,270</td><td>20%</td></tr>
            <tr><td>Higher Rate</td><td>£50,271–£125,140</td><td>40%</td></tr>
            <tr><td>Additional Rate</td><td>Over £125,140</td><td>45%</td></tr>
          </tbody>
        </table>

        <h2 id="scotland">Scottish income tax rates 2026/27</h2>
        <table>
          <thead><tr><th>Band</th><th>Income range</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Starter Rate</td><td>£12,571–£15,397</td><td>19%</td></tr>
            <tr><td>Basic Rate</td><td>£15,398–£27,491</td><td>20%</td></tr>
            <tr><td>Intermediate Rate</td><td>£27,492–£43,662</td><td>21%</td></tr>
            <tr><td>Higher Rate</td><td>£43,663–£75,000</td><td>42%</td></tr>
            <tr><td>Advanced Rate</td><td>£75,001–£125,140</td><td>45%</td></tr>
            <tr><td>Top Rate</td><td>Over £125,140</td><td>48%</td></tr>
          </tbody>
        </table>

        <h2 id="ni">National Insurance 2026/27</h2>
        <p>Employees also pay Class 1 National Insurance: <strong>8%</strong> on earnings between £12,570 and £50,270, and <strong>2%</strong> on anything above. NI is separate from income tax — both are deducted from your pay.</p>

        <h2 id="trap">The 60% tax trap between £100k and £125,140</h2>
        <p>Above £100,000, your Personal Allowance is withdrawn — £1 of allowance for every £2 earned. This means you effectively pay 60% marginal tax in this band. Our <ToolLink to="/take-home">calculator</ToolLink> shows this clearly — enter £100,000 then £110,000 and compare.</p>

        <h2 id="calculate">See your exact take-home</h2>
        <p>Tax bands are only part of the picture. Use our <ToolLink to="/take-home">take-home pay calculator</ToolLink> to see your net pay after income tax, NI, pension, and student loan — with one-click Scotland comparison.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/compare",label:"Compare Salaries"},{path:"/self-employed",label:"Self-Employed Calculator"}]}
          salaries={[{amount:25000},{amount:35000},{amount:50000},{amount:60000},{amount:100000},{amount:125000}]}
        />
      </>
    ),
  },

  // 29
  {
    slug: "average-salary-london-2026",
    title: "Average Salary in London 2026: What Do Londoners Earn?",
    description: "The average salary in London is £44,370 in 2026. See salaries by sector, exact take-home pay, and whether London wages really offset the higher cost of living.",
    excerpt: "London workers earn £9,400 more than the UK median — but housing costs a lot more too. Here's the full breakdown of average London salaries by sector and take-home figures.",
    category: "Wages",
    keywords: ["average salary london 2026", "average wage london", "london salary 2026", "average income london", "median salary london 2026"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average salary in London in 2026?", a: "The median gross annual salary in London is £44,370 in 2026 — approximately £9,400 above the UK median. After tax this gives a monthly take-home of around £2,993." },
      { q: "Is a £40,000 salary good in London?", a: "It is above the UK median but below the London median. After tax your monthly take-home is £2,766. In central London this feels tight; in outer zones it is more manageable." },
      { q: "Does London pay more tax than the rest of the UK?", a: "No — London workers pay exactly the same national income tax rates as anyone else in England. There is no London-specific tax. However, many employers pay a London weighting allowance on top of base salary." },
    ],
    body: () => (
      <>
        <p>London workers earn more than anywhere else in the UK — but they also spend more. Here's the data on what Londoners actually earn in 2026, and what it means in practice.</p>

        <h2 id="median">Average London salary 2026</h2>
        <p>The median gross annual salary in London is <strong>£44,370</strong> — compared to the UK median of £34,963. After tax and National Insurance, that gives a monthly take-home of approximately <strong>£2,993</strong>.</p>

        <h2 id="by-sector">Average London salaries by sector</h2>
        <table>
          <thead><tr><th>Sector</th><th>Median annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Finance and banking</td><td>£68,500</td><td>£3,980</td></tr>
            <tr><td>Technology</td><td>£62,000</td><td>£3,723</td></tr>
            <tr><td>Legal</td><td>£58,000</td><td>£3,550</td></tr>
            <tr><td>Marketing</td><td>£42,000</td><td>£2,866</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£38,500</td><td>£2,678</td></tr>
            <tr><td>Education</td><td>£36,200</td><td>£2,562</td></tr>
            <tr><td>Retail</td><td>£28,500</td><td>£2,073</td></tr>
          </tbody>
        </table>

        <h2 id="worth-it">Is higher London pay worth it?</h2>
        <p>Not always. London housing costs approximately 2.3× the UK average. A £44,370 salary in London competes with a £32,000 salary in Manchester once housing is accounted for. Use our <ToolLink to="/cost-of-living">cost of living tool</ToolLink> to compare net income after housing across regions.</p>

        <h2 id="living-wage">London Living Wage 2026</h2>
        <p>The Real Living Wage for London is <strong>£13.85/hr</strong> (£28,808/year full-time) — versus £12.10/hr outside London. This is set annually by the Living Wage Foundation, separate from the government's National Living Wage.</p>

        <h2 id="calculate">Calculate your London take-home</h2>
        <p>Use our <ToolLink to="/take-home">take-home calculator</ToolLink> to see exactly what any London salary means monthly. Toggle Scotland to compare if you're considering a move.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/cost-of-living",label:"Cost of Living"},{path:"/compare",label:"Compare Salaries"}]}
          salaries={[{amount:35000},{amount:40000},{amount:44000},{amount:50000},{amount:60000},{amount:68000}]}
          cities={["Manchester","Birmingham","Leeds","Bristol","Edinburgh"]}
        />
      </>
    ),
  },

  // 30
  {
    slug: "how-to-calculate-take-home-pay",
    title: "How to Calculate Take-Home Pay in the UK (2026/27)",
    description: "Step-by-step guide to calculating UK take-home pay. Covers income tax, National Insurance, pension, and student loan deductions for 2026/27.",
    excerpt: "Take-home pay is gross salary minus income tax, National Insurance, pension, and student loan. Here's exactly how each deduction works — with a worked example for £35,000.",
    category: "Tax",
    keywords: ["how to calculate take home pay uk", "calculate net salary uk", "gross to net salary uk", "uk take home pay calculation", "how much take home from salary"],
    readMinutes: 6,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "How do I calculate my take-home pay from my gross salary?", a: "Subtract income tax (using UK tax bands), National Insurance (8% on earnings £12,570–£50,270, 2% above), any pension contributions, and student loan repayments if applicable. Our calculator does all of this instantly." },
      { q: "What is the take-home pay on a £35,000 salary?", a: "On a £35,000 salary in England with no pension or student loan, your take-home is approximately £28,720 per year — £2,393 per month. Tax: £4,486. NI: £1,794." },
      { q: "Does pension reduce my take-home pay?", a: "Yes, but salary sacrifice pensions reduce your tax and NI too, so the net cost to you is less than the contribution amount. A 5% pension contribution on £35,000 reduces take-home by about £108/month, not the full £146 gross amount." },
    ],
    body: () => (
      <>
        <p>Your take-home pay (net pay) is everything left after four main deductions. Here's exactly how each one works — with a step-by-step worked example.</p>

        <h2 id="deductions">The four main deductions</h2>
        <ol>
          <li><strong>Income tax</strong> — applied in bands: 0% up to £12,570, then 20% to £50,270, then 40% above</li>
          <li><strong>National Insurance</strong> — 8% on earnings between £12,570 and £50,270; 2% above</li>
          <li><strong>Pension contributions</strong> — minimum 5% employee under auto-enrolment (3% from employer)</li>
          <li><strong>Student loan repayments</strong> — 9% of income above your plan threshold (if applicable)</li>
        </ol>

        <h2 id="example">Worked example: £35,000 salary (England, 2026/27)</h2>
        <table>
          <thead><tr><th>Deduction</th><th>Calculation</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Taxable income</td><td>£35,000 − £12,570</td><td>£22,430</td></tr>
            <tr><td>Income tax (20%)</td><td>£22,430 × 20%</td><td>−£4,486</td></tr>
            <tr><td>National Insurance (8%)</td><td>£22,430 × 8%</td><td>−£1,794</td></tr>
            <tr><td><strong>Take-home (annual)</strong></td><td></td><td><strong>£28,720</strong></td></tr>
            <tr><td><strong>Take-home (monthly)</strong></td><td></td><td><strong>£2,393</strong></td></tr>
          </tbody>
        </table>

        <h2 id="pension">Adding pension contributions</h2>
        <p>A 5% salary sacrifice pension contribution on £35,000 (£1,750/year) reduces your taxable income, saving you both income tax and NI. Your actual take-home reduction is approximately <strong>£108/month</strong> — not the full £146 gross contribution.</p>

        <h2 id="student-loan">Student loan repayments</h2>
        <p>Plan 2 (most graduates from 2012–2023) repays 9% of income above £29,385. On a £35,000 salary, that's 9% × (£35,000 − £29,385) = £505/year — about £42/month.</p>

        <h2 id="calculator">Skip the maths — use the calculator</h2>
        <p>Our <ToolLink to="/take-home">take-home pay calculator</ToolLink> handles all of this instantly, including salary sacrifice pension, all student loan plans, Scottish rates, and dividend income. Enter your salary and get your exact monthly net in under 10 seconds.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/reverse",label:"Reverse Calculator"},{path:"/hourly",label:"Hourly Rate Calculator"}]}
          salaries={[{amount:25000},{amount:30000},{amount:35000},{amount:40000},{amount:50000}]}
        />
      </>
    ),
  },

  // ── CITY SALARY ARTICLES ────────────────────────────────────────────────

  // 31
  {
    slug: "average-salary-manchester-2026",
    title: "Average Salary in Manchester 2026",
    description: "The average salary in Manchester is £34,100 in 2026. See take-home pay, top-paying sectors, and how Manchester compares to the UK median.",
    excerpt: "Manchester's average salary sits just below the UK median — but lower housing costs mean it often goes further than an equivalent London wage.",
    category: "Wages",
    keywords: ["average salary manchester 2026","average wage manchester","manchester salary 2026","median salary manchester"],
    readMinutes: 4,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average salary in Manchester in 2026?", a: "The median gross annual salary in Manchester is approximately £34,100 in 2026, giving a monthly take-home of around £2,444 after income tax and National Insurance." },
      { q: "Is Manchester a good place to earn a high salary?", a: "Yes — Manchester has strong tech, finance, media and professional services sectors. The average tech salary in Manchester is around £52,000, well above the city median." },
    ],
    body: () => (
      <>
        <p>Manchester is the UK's second-largest economy outside London. Salaries are competitive — especially in tech, media, and financial services — while living costs remain significantly lower than the capital.</p>
        <h2 id="median">Average Manchester salary 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Amount</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median salary</td><td>£34,100</td><td>£2,444</td></tr>
            <tr><td>Mean salary</td><td>£37,800</td><td>£2,646</td></tr>
            <tr><td>UK median (comparison)</td><td>£34,963</td><td>£2,493</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Top-paying sectors in Manchester</h2>
        <table>
          <thead><tr><th>Sector</th><th>Median salary</th></tr></thead>
          <tbody>
            <tr><td>Technology</td><td>£52,000</td></tr>
            <tr><td>Financial services</td><td>£48,500</td></tr>
            <tr><td>Legal</td><td>£44,000</td></tr>
            <tr><td>Engineering</td><td>£42,000</td></tr>
            <tr><td>Marketing</td><td>£36,000</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£35,500</td></tr>
            <tr><td>Education</td><td>£33,800</td></tr>
            <tr><td>Retail</td><td>£24,000</td></tr>
          </tbody>
        </table>
        <h2 id="vs-london">Manchester vs London: does the pay gap matter?</h2>
        <p>London's average salary is £44,370 — about £10,000 more than Manchester. But average rent in Manchester is roughly £1,050/month versus £2,200 in London. For many workers, a Manchester salary leaves more disposable income than a higher London wage.</p>
        <p>Use our <ToolLink to="/cost-of-living">cost of living calculator</ToolLink> to compare your net position in different cities.</p>
        <h2 id="calculate">Calculate your Manchester take-home</h2>
        <p>Use our <ToolLink to="/take-home">take-home calculator</ToolLink> for your exact net pay after income tax, NI, and pension.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/cost-of-living",label:"Cost of Living"}]}
          salaries={[{amount:30000},{amount:35000},{amount:40000},{amount:50000},{amount:52000}]}
          cities={["London","Birmingham","Leeds","Bristol","Edinburgh"]}
        />
      </>
    ),
  },

  // 32
  {
    slug: "average-salary-birmingham-2026",
    title: "Average Salary in Birmingham 2026",
    description: "The average salary in Birmingham is £32,400 in 2026. Breakdown by sector, take-home pay figures, and how Birmingham salaries compare to the UK average.",
    excerpt: "Birmingham salaries sit below the UK median, but the city's growing tech and professional services sectors are pushing wages up fast.",
    category: "Wages",
    keywords: ["average salary birmingham 2026","average wage birmingham","birmingham salary 2026","median salary birmingham"],
    readMinutes: 4,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average salary in Birmingham in 2026?", a: "The median gross annual salary in Birmingham is approximately £32,400 in 2026, giving a monthly take-home of around £2,340 after income tax and National Insurance." },
      { q: "Is Birmingham a good city for salaries?", a: "Birmingham is improving rapidly. The tech and professional services sectors offer salaries well above the city median, and lower living costs than London or Manchester mean your money goes further." },
    ],
    body: () => (
      <>
        <p>Birmingham is the UK's second-largest city and the economic centre of the West Midlands. Following major investment driven by the 2022 Commonwealth Games, HSBC's UK headquarters relocation, and a growing professional services cluster, Birmingham salaries have grown faster than the national average over the past three years.</p>

        <h2 id="average">Average salary in Birmingham 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Birmingham)</td><td>£32,400</td><td>~£2,340/month</td></tr>
            <tr><td>Mean full-time (Birmingham)</td><td>£35,600</td><td>~£2,528/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Birmingham salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Financial services (HSBC, KPMG)</td><td>£35,000–£90,000</td></tr>
            <tr><td>Technology / digital</td><td>£38,000–£85,000</td></tr>
            <tr><td>Legal (national and regional firms)</td><td>£30,000–£80,000</td></tr>
            <tr><td>Manufacturing and engineering</td><td>£30,000–£65,000</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Education</td><td>£28,000–£55,000</td></tr>
            <tr><td>Retail and hospitality</td><td>£21,000–£32,000</td></tr>
          </tbody>
        </table>

        <h2 id="growth">Why Birmingham salaries are rising</h2>
        <p>Several factors are driving above-average salary growth in Birmingham. HSBC's UK headquarters employs around 2,500 staff, anchoring a growing financial services cluster and bringing City-adjacent pay scales to the region. KPMG, PwC, Deloitte, and EY all operate significant Birmingham offices. The Birmingham City Council's Growth Zones initiative and HS2 (now City Centre Connectivity) investment continue to attract employers. Goldman Sachs opened a technology hub in Birmingham in 2022, bringing high-paying tech roles that were previously London-only.</p>

        <h2 id="cost">Salary vs cost of living in Birmingham</h2>
        <p>On a £32,400 median salary, monthly take-home is approximately £2,340. Average rent for a one-bedroom flat in Birmingham city centre is £1,100–£1,400/month — significantly cheaper than London (£1,800–£2,400) and comparable to Manchester. The net result is that Birmingham professionals retain more disposable income as a percentage of take-home pay than equivalent earners in London or Bristol.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"},{path:"/insights/average-salary-manchester-2026",label:"Manchester Salary 2026"}]}
          salaries={[{amount:32400},{amount:38000},{amount:50000},{amount:65000},{amount:85000}]}
        />
      </>
    ),
  },

  // 33
  {
    slug: "average-salary-leeds-2026",
    title: "Average Salary in Leeds 2026",
    description: "The average salary in Leeds is £33,800 in 2026. See take-home pay by sector, how Leeds compares to UK average, and what your salary is worth.",
    excerpt: "Leeds punches above its weight — financial and legal services salaries rival Manchester, while the cost of living remains lower than most major UK cities.",
    category: "Wages",
    keywords: ["average salary leeds 2026","average wage leeds","leeds salary 2026","median salary leeds"],
    readMinutes: 4,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average salary in Leeds in 2026?", a: "The median gross annual salary in Leeds is approximately £33,800 in 2026, giving a monthly take-home of around £2,427 after income tax and National Insurance." },
      { q: "What are the best-paid jobs in Leeds?", a: "Financial services, legal, and technology are the top-paying sectors in Leeds. Senior roles in these sectors commonly offer £50,000–£80,000." },
    ],
    body: () => (
      <>
        <p>Leeds is one of the UK's strongest regional economies — the largest city in Yorkshire and a major hub for financial and professional services. Its salary levels are competitive with Manchester, while housing costs remain lower than most comparable UK cities, making it increasingly attractive to professionals relocating from London.</p>

        <h2 id="average">Average salary in Leeds 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Leeds)</td><td>£33,800</td><td>~£2,420/month</td></tr>
            <tr><td>Mean full-time (Leeds)</td><td>£37,200</td><td>~£2,610/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Leeds salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Financial services</td><td>£35,000–£100,000</td></tr>
            <tr><td>Technology</td><td>£38,000–£90,000</td></tr>
            <tr><td>Legal</td><td>£30,000–£85,000</td></tr>
            <tr><td>Healthcare (NHS Leeds)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Engineering and manufacturing</td><td>£32,000–£65,000</td></tr>
            <tr><td>Education (Leeds Beckett, Uni of Leeds)</td><td>£28,000–£60,000</td></tr>
          </tbody>
        </table>

        <h2 id="financial-hub">Leeds as a financial hub</h2>
        <p>Leeds is the UK's second-largest financial centre outside London, home to major operations for banks including NatWest, Lloyds, and Barclays, as well as large insurance (Direct Line, Aviva) and legal services employers. Senior financial professionals in Leeds earn £60,000–£100,000+, significantly below London equivalents but with housing costs roughly 50% lower. Law firm partners at national firms including Addleshaw Goddard, Eversheds, and DLA Piper based in Leeds earn £150,000–£400,000, comparable to many London roles.</p>

        <h2 id="cost">Cost of living comparison</h2>
        <p>The average rent for a one-bedroom flat in Leeds city centre is £1,000–£1,300/month. On a £33,800 median salary, take-home is approximately £2,420/month — leaving around £1,100–£1,400 in disposable income after rent, broadly comparable to a London professional earning £50,000+ after London rents. Leeds is frequently cited by relocation surveys as offering the best balance of salary, career opportunity, and cost of living outside London.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"},{path:"/insights/average-salary-sheffield-2026",label:"Sheffield Salary 2026"}]}
          salaries={[{amount:33800},{amount:40000},{amount:52000},{amount:70000},{amount:90000}]}
        />
      </>
    ),
  },

  // 34
  {
    slug: "average-salary-bristol-2026",
    title: "Average Salary in Bristol 2026",
    description: "The average salary in Bristol is £36,200 in 2026 — above the UK median. See take-home figures, top sectors, and how Bristol compares to other UK cities.",
    excerpt: "Bristol is one of the UK's highest-paying cities outside London, driven by aerospace, tech, and financial services.",
    category: "Wages",
    keywords: ["average salary bristol 2026","average wage bristol","bristol salary 2026","median salary bristol"],
    readMinutes: 4,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average salary in Bristol in 2026?", a: "The median gross annual salary in Bristol is approximately £36,200 in 2026, giving a monthly take-home of around £2,562 after income tax and National Insurance." },
      { q: "Why are Bristol salaries above the UK average?", a: "Bristol has a strong concentration of aerospace, defence, technology, and financial services employers. Companies including Airbus, Rolls-Royce, and several major banks have significant operations there." },
    ],
    body: () => (
      <>
        <p>Bristol consistently ranks as one of the UK's highest-paying cities outside London. The city has an exceptionally high concentration of aerospace, defence, technology, and financial services employers — driving median salaries well above the national average and above most comparable UK cities.</p>

        <h2 id="average">Average salary in Bristol 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Bristol)</td><td>£36,200</td><td>~£2,530/month</td></tr>
            <tr><td>Mean full-time (Bristol)</td><td>£40,100</td><td>~£2,760/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Bristol salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Aerospace and defence (Airbus, BAE, Rolls-Royce)</td><td>£40,000–£90,000</td></tr>
            <tr><td>Technology / software</td><td>£42,000–£95,000</td></tr>
            <tr><td>Financial services</td><td>£38,000–£85,000</td></tr>
            <tr><td>Legal</td><td>£32,000–£80,000</td></tr>
            <tr><td>Healthcare (North Bristol NHS, UHB)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Creative and media</td><td>£28,000–£60,000</td></tr>
          </tbody>
        </table>

        <h2 id="aerospace">The aerospace and defence premium</h2>
        <p>Bristol's most distinctive employment feature is its aerospace cluster. Airbus's UK wing design operations, Rolls-Royce's civil aerospace business, BAE Systems, and GKN Aerospace all maintain major Bristol presences. Senior aerospace engineers and programme managers earn £65,000–£100,000+. The MOD's Defence Equipment and Support (DE&S) procurement organisation, based in nearby Filton, employs thousands of procurement and programme management professionals at Civil Service pay grades equivalent to £40,000–£80,000.</p>

        <h2 id="cost">Bristol vs London: the real financial comparison</h2>
        <p>Average rent for a one-bedroom flat in Bristol city centre is £1,350–£1,700/month, significantly below London (£1,800–£2,400) but notably higher than other regional cities like Leeds or Manchester. Bristol's salary premium over the national average, combined with lower costs than London, makes it an attractive relocation destination — but it has the narrowest cost-of-living advantage of any major UK city outside the South East.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"},{path:"/insights/average-salary-manchester-2026",label:"Manchester Salary 2026"}]}
          salaries={[{amount:36200},{amount:42000},{amount:55000},{amount:72000},{amount:95000}]}
        />
      </>
    ),
  },

  // 35
  {
    slug: "average-salary-edinburgh-2026",
    title: "Average Salary in Edinburgh 2026",
    description: "The average salary in Edinburgh is £37,500 in 2026. See take-home under Scottish tax rates, top-paying sectors, and how Edinburgh compares to Glasgow.",
    excerpt: "Edinburgh has the highest average salary in Scotland — but Scottish income tax rates mean your take-home differs from the rest of the UK at the same gross salary.",
    category: "Wages",
    keywords: ["average salary edinburgh 2026","average wage edinburgh","edinburgh salary 2026","median salary edinburgh","scottish salary calculator"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average salary in Edinburgh in 2026?", a: "The median gross annual salary in Edinburgh is approximately £37,500 in 2026. Under Scottish income tax rates, this gives a monthly take-home of around £2,600." },
      { q: "Do Edinburgh workers pay more tax than English workers?", a: "Yes, for most salary levels. Scottish income tax rates are higher from around £29,000 upwards. On a £37,500 salary, a Scottish worker pays roughly £400 more per year in income tax than an equivalent worker in England." },
    ],
    body: () => (
      <>
        <p>Edinburgh is Scotland's capital and its highest-paying city, driven by a concentration of financial services (Standard Life Aberdeen, Baillie Gifford, Royal Bank of Scotland), a thriving technology sector, and significant public sector employment. Salaries consistently exceed Glasgow and Scotland's average, though Scottish income tax rates mean take-home pay is lower than an equivalent salary in England above £43,662.</p>
        <h2 id="average">Average salary in Edinburgh 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home (Scottish tax)</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Edinburgh)</td><td>£36,800</td><td>~£2,540/month</td></tr>
            <tr><td>Mean full-time (Edinburgh)</td><td>£41,500</td><td>~£2,810/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590 (Eng)/~£2,545 (Scot)</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Edinburgh salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Financial services / asset management</td><td>£40,000–£120,000</td></tr>
            <tr><td>Technology / fintech</td><td>£38,000–£95,000</td></tr>
            <tr><td>Legal (Scots law firms)</td><td>£30,000–£85,000</td></tr>
            <tr><td>Public sector / Scottish Government</td><td>£28,000–£75,000</td></tr>
            <tr><td>Healthcare (NHS Lothian)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Tourism and hospitality</td><td>£22,000–£38,000</td></tr>
          </tbody>
        </table>
        <h2 id="financial-hub">Edinburgh as a financial centre</h2>
        <p>Edinburgh is the UK's second-largest financial centre and one of Europe's most significant. Abrdn (Standard Life Aberdeen), Baillie Gifford, and Edinburgh-based teams of Royal Bank of Scotland, Lloyds Banking Group, and Tesco Bank employ thousands of finance, technology, and compliance professionals at salaries well above the Scottish average. Fund managers and investment analysts at Baillie Gifford and Abrdn earn £60,000–£120,000 at senior levels.</p>
        <h2 id="cost">Cost of living: Edinburgh's trade-off</h2>
        <p>Edinburgh is Scotland's most expensive city to live in. Average rent for a one-bedroom city centre flat is £1,200–£1,600/month — significantly above Glasgow and other Scottish cities. House prices average £280,000–£340,000 in central areas. However, Edinburgh salaries are commensurately higher, and the city consistently ranks in top-ten quality-of-life surveys for UK cities.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Scottish Take-Home Calculator"},{path:"/insights/average-salary-glasgow-2026",label:"Glasgow Salary 2026"}]}
          salaries={[{amount:36800},{amount:45000},{amount:60000},{amount:80000},{amount:110000}]}
        />
      </>
    ),
  },

  // ── JOB TITLE SALARY ARTICLES ───────────────────────────────────────────

  // 36
  {
    slug: "nurse-salary-uk-2026",
    title: "Nurse Salary UK 2026: Take-Home Pay on Every NHS Band",
    description: "Full breakdown of NHS nurse salaries in 2026 by band (Band 5–8). See exact take-home pay after tax and NI, plus agency nurse rates.",
    excerpt: "An NHS Band 5 nurse earns £29,970–£36,483 in 2026. After tax and NI, that's £2,050–£2,490/month. Here's take-home for every nursing band.",
    category: "Career",
    keywords: ["nurse salary uk 2026","nhs nurse pay 2026","band 5 nurse salary take home","nursing salary uk after tax","nhs pay bands 2026"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the take-home pay for a Band 5 nurse in 2026?", a: "A Band 5 nurse earns £29,970–£36,483 gross. After income tax and NI, take-home pay ranges from approximately £2,050 to £2,490 per month. The exact figure depends on your point on the pay scale and pension contribution rate." },
      { q: "How much does a Band 6 nurse earn after tax?", a: "A Band 6 nurse earns £37,338–£44,962 gross. Monthly take-home ranges from approximately £2,610 to £3,010 after tax and NI, before pension deductions." },
      { q: "Do NHS nurses pay a pension?", a: "Yes — NHS nurses are enrolled in the NHS Pension Scheme. Employee contributions range from 5.2% to 12.5% depending on salary, reducing take-home pay but building a valuable defined-benefit pension." },
    ],
    body: () => (
      <>
        <p>NHS nurses are employed under the Agenda for Change (AfC) pay framework and progress through bands based on role, responsibility, and years of service. Following the 2023/24 pay award — a one-off 5% payment plus a consolidated increase — AfC pay has been partially restored after years of real-terms cuts, though the BMA and Royal College of Nursing continue to press for further increases in 2026/27.</p>
        <h2 id="bands">NHS nurse salary by band (2026/27)</h2>
        <table>
          <thead><tr><th>Band / Role</th><th>Salary range</th><th>Monthly take-home (mid)</th></tr></thead>
          <tbody>
            <tr><td>Band 3 — Healthcare Assistant</td><td>£24,625–£26,259</td><td>~£1,810/month</td></tr>
            <tr><td>Band 5 — Newly qualified Staff Nurse</td><td>£29,970–£36,483</td><td>~£2,270/month</td></tr>
            <tr><td>Band 6 — Senior Staff Nurse / Specialist</td><td>£37,338–£44,962</td><td>~£2,810/month</td></tr>
            <tr><td>Band 7 — Advanced Nurse Practitioner</td><td>£46,148–£52,809</td><td>~£3,140/month</td></tr>
            <tr><td>Band 8a — Consultant Nurse / Lead</td><td>£53,755–£60,504</td><td>~£3,530/month</td></tr>
            <tr><td>Band 8b — Deputy Director of Nursing</td><td>£62,215–£72,293</td><td>~£3,940–£4,340/month</td></tr>
          </tbody>
        </table>
        <p><small>Monthly take-home at mid-point, England (outside London), before NHS pension contributions. NHS pension employee contributions range from 5.2% to 12.5% depending on pay band.</small></p>
        <h2 id="london">London weighting</h2>
        <p>Nurses in London receive a High Cost Area Supplement (HCAS). Inner London nurses receive a supplement of 20% of basic salary (minimum £4,629, maximum £8,461). Outer London nurses receive 15% (minimum £4,072, maximum £5,765). A Band 5 nurse in Inner London earns approximately £35,964–£43,780 with HCAS, compared to £29,970–£36,483 outside London.</p>
        <h2 id="unsocial">Unsocial hours supplements</h2>
        <p>Nurses regularly work evenings, nights, weekends, and bank holidays. AfC unsocial hours supplements add 30% for Saturday and Sunday work, and 60% for nights and bank holidays. A Band 5 nurse working a standard mixed shift pattern typically earns an additional £3,000–£5,500 per year from unsocial hours supplements, which are included in pensionable pay.</p>
        <h2 id="pension">NHS pension — the hidden value</h2>
        <p>NHS nurses contribute 5.2%–12.5% to the NHS Pension Scheme depending on earnings. At Band 5 mid-point (~£33,000), that's approximately £1,440–£4,125/year. These contributions are significant but build one of the UK's most secure defined-benefit pensions. The 2015 Career Average scheme provides a pension based on career average earnings — its actuarial value is typically 30–40% more per pound contributed than an equivalent private sector defined-contribution pension.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/paramedic-salary-uk-2026",label:"Paramedic Salary 2026"},{path:"/insights/pharmacist-salary-uk-2026",label:"Pharmacist Salary 2026"}]}
          salaries={[{amount:29970},{amount:33000},{amount:37338},{amount:46148},{amount:53755}]}
        />
      </>
    ),
  },

  // 37
  {
    slug: "teacher-salary-uk-2026",
    title: "Teacher Pay Scale 2026/27: £31,650–£135,000 — Take-Home at Every Point",
    description: "Full 2026/27 teacher pay scales with monthly take-home pay. Main Pay Range £31,650–£43,685, Upper Pay £46,525–£50,500, Leadership to £135,000+. Inner, Outer London and fringe rates.",
    excerpt: "A newly qualified teacher earns £31,650 in 2026 (£42,637 in Inner London). After tax and NI, that's £2,212/month outside London. Here's every scale point with exact take-home.",
    category: "Career",
    keywords: ["teacher salary uk 2026","teacher pay 2026","newly qualified teacher salary take home","uk teacher salary after tax","teacher pay scale 2026"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the take-home pay for a newly qualified teacher in 2026?", a: "A newly qualified teacher earns £31,650 outside London in 2026. After income tax and National Insurance, take-home pay is approximately £2,212 per month." },
      { q: "What does a teacher earn on the Upper Pay Range?", a: "Teachers on the Upper Pay Range earn £46,525–£50,500 outside London in 2026. Monthly take-home is approximately £3,130–£3,340 after tax and NI." },
      { q: "How much more do London teachers earn?", a: "Inner London teachers earn approximately £10,000–£15,000 more than their counterparts outside London at each scale point, thanks to the Inner London and Outer London allowances." },
    ],
    body: () => (
      <>
        <p>Teacher pay in England is set by the School Teachers' Pay and Conditions Document (STPCD), reviewed annually by the Secretary of State following recommendations from the School Teachers' Review Body (STRB). The 2026/27 pay award delivered a further increase after the landmark 6.5% award in 2023 that ended industrial action. Scotland, Wales and Northern Ireland set their own teacher pay scales separately.</p>

        <h2 id="main-pay">Main Pay Range — NQT to experienced classroom teacher</h2>
        <table>
          <thead><tr><th>Scale</th><th>Outside London</th><th>Inner London</th><th>Monthly take-home (outside London)</th></tr></thead>
          <tbody>
            <tr><td>M1 (NQT)</td><td>£31,650</td><td>£42,637</td><td>£2,212/month</td></tr>
            <tr><td>M2</td><td>£33,483</td><td>£44,305</td><td>£2,330/month</td></tr>
            <tr><td>M3</td><td>£35,674</td><td>£46,235</td><td>£2,473/month</td></tr>
            <tr><td>M4</td><td>£37,935</td><td>£48,235</td><td>£2,630/month</td></tr>
            <tr><td>M5</td><td>£40,625</td><td>£50,471</td><td>£2,804/month</td></tr>
            <tr><td>M6</td><td>£43,685</td><td>£53,482</td><td>£2,987/month</td></tr>
          </tbody>
        </table>
        <p>Progression through the Main Pay Range is not automatic — it is subject to the school's pay policy and performance management. Most teachers move one point per year, reaching M6 after approximately five years in the classroom. Schools outside local authority control (academies, free schools) can technically set their own pay, though most follow the national framework.</p>

        <h2 id="upper-pay">Upper Pay Range — experienced teachers</h2>
        <table>
          <thead><tr><th>Scale</th><th>Outside London</th><th>Inner London</th><th>Monthly take-home (outside London)</th></tr></thead>
          <tbody>
            <tr><td>U1</td><td>£46,525</td><td>£57,959</td><td>£3,130/month</td></tr>
            <tr><td>U2</td><td>£48,389</td><td>£59,965</td><td>£3,238/month</td></tr>
            <tr><td>U3</td><td>£50,500</td><td>£62,138</td><td>£3,339/month</td></tr>
          </tbody>
        </table>
        <p>Upper Pay Range requires a formal application and school approval. Teachers must demonstrate sustained and substantial contribution to school improvement. Moving from M6 to U1 is not guaranteed and some teachers remain on M6 for their entire career.</p>

        <h2 id="leadership">Leadership Pay Range</h2>
        <table>
          <thead><tr><th>Role</th><th>Typical salary range</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Assistant Headteacher</td><td>£52,000–£65,000</td><td>~£3,310–£3,870/month</td></tr>
            <tr><td>Deputy Headteacher</td><td>£65,000–£85,000</td><td>~£3,870–£4,700/month</td></tr>
            <tr><td>Headteacher (medium school)</td><td>£75,000–£95,000</td><td>~£4,340–£5,200/month</td></tr>
            <tr><td>Headteacher (large school)</td><td>£90,000–£125,000</td><td>~£4,970–£6,200/month</td></tr>
          </tbody>
        </table>

        <h2 id="pension">Teachers' Pension Scheme</h2>
        <p>Teachers are enrolled in the Teachers' Pension Scheme (TPS), one of the UK's most valuable public sector pensions. Employee contributions range from 7.4% to 11.7% of pensionable pay. At M1 (£31,650), monthly pension contributions are approximately £195. At M6 (£43,685), they rise to approximately £374. These contributions come from your gross pay after Income Tax, so they don't reduce your tax bill directly — but the pension benefit in retirement is substantial. The TPS provides a defined benefit based on career average earnings.</p>

        <h2 id="scotland">Teacher pay in Scotland</h2>
        <p>Scottish teacher pay is set separately by the Scottish Negotiating Committee for Teachers (SNCT). Main Grade teachers in Scotland earn £32,217 (Probationer) rising to £48,765 (Main Grade top). The key difference from England is that all teachers on the Main Grade in Scotland automatically progress through the scale without a formal application, reaching the top after approximately five years. Scottish teachers are also subject to higher income tax rates on earnings above £43,662, reducing take-home pay relative to English counterparts at the same gross salary.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Calculate Your Teacher Take-Home"},{path:"/insights/nurse-salary-uk-2026",label:"NHS Nurse Salary 2026"}]}
          salaries={[{amount:31650},{amount:37935},{amount:43685},{amount:50500},{amount:75000}]}
        />
      </>
    ),
  },

  // 38
  {
    slug: "software-engineer-salary-uk-2026",
    title: "Software Engineer Salary UK 2026: Junior to Senior Take-Home Pay",
    description: "Software engineer salaries in the UK range from £35k to £120k+ in 2026. See take-home pay at every level from junior to principal engineer.",
    excerpt: "UK software engineers earn £35k–£120k+ depending on seniority. Here's the exact take-home at every level — and what switching from PAYE to contractor status means for your income.",
    category: "Career",
    keywords: ["software engineer salary uk 2026","developer salary uk 2026","software developer take home pay uk","junior developer salary uk","senior software engineer salary uk"],
    readMinutes: 5,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average software engineer salary in the UK in 2026?", a: "The median software engineer salary in the UK is approximately £58,000 in 2026. Monthly take-home after tax and NI is approximately £3,553." },
      { q: "What does a junior developer earn after tax in the UK?", a: "Junior software engineers typically earn £28,000–£38,000. At £33,000, monthly take-home is approximately £2,380 after income tax and NI." },
      { q: "Is it more tax-efficient to contract as a software engineer?", a: "Often yes — contractors operating through a limited company can take a salary/dividend split, reducing NI significantly. Our dividend calculator shows the exact saving for your income level." },
    ],
    body: () => (
      <>
        <p>Software engineering remains one of the UK's highest-paying and most in-demand professions. Salaries have moderated slightly from the 2021–2022 peak but remain well above the national average at every experience level, with London and remote-first tech companies paying substantially more than regional averages.</p>

        <h2 id="by-level">Software engineer salary by level (UK, 2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Typical salary range</th><th>Monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Graduate / Junior (0–2 years)</td><td>£28,000–£38,000</td><td>~£2,380/month</td></tr>
            <tr><td>Mid-level (2–5 years)</td><td>£40,000–£55,000</td><td>~£2,960/month</td></tr>
            <tr><td>Senior (5–8 years)</td><td>£60,000–£85,000</td><td>~£3,820/month</td></tr>
            <tr><td>Lead / Staff Engineer</td><td>£80,000–£110,000</td><td>~£4,760/month</td></tr>
            <tr><td>Principal / Architect</td><td>£100,000–£140,000</td><td>~£5,740/month</td></tr>
            <tr><td>Engineering Director / VP</td><td>£130,000–£200,000+</td><td>~£6,400+/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home at mid-point, England, no student loan. London salaries are typically 20–30% above these figures. Senior+ roles often include equity (RSUs/options) not reflected in cash take-home.</small></p>

        <h2 id="by-specialism">Salary by specialism (2026)</h2>
        <table>
          <thead><tr><th>Specialism</th><th>Mid-level salary</th><th>Senior salary</th></tr></thead>
          <tbody>
            <tr><td>Machine Learning / AI</td><td>£60,000–£80,000</td><td>£90,000–£140,000</td></tr>
            <tr><td>DevOps / Platform / SRE</td><td>£55,000–£75,000</td><td>£80,000–£120,000</td></tr>
            <tr><td>Backend (Go, Rust, Java)</td><td>£50,000–£70,000</td><td>£75,000–£110,000</td></tr>
            <tr><td>Full-Stack</td><td>£45,000–£65,000</td><td>£70,000–£100,000</td></tr>
            <tr><td>Frontend (React, TypeScript)</td><td>£42,000–£62,000</td><td>£65,000–£95,000</td></tr>
            <tr><td>Mobile (iOS / Android)</td><td>£45,000–£65,000</td><td>£68,000–£100,000</td></tr>
            <tr><td>Embedded / Systems</td><td>£45,000–£65,000</td><td>£70,000–£105,000</td></tr>
          </tbody>
        </table>

        <h2 id="london-vs-regional">London vs regional salaries</h2>
        <p>A senior software engineer in London typically earns £80,000–£110,000. An equivalent role in Manchester, Leeds, or Bristol pays £60,000–£85,000. The gap has narrowed since widespread remote work adoption — many London-based companies now hire UK-wide at near-London salaries. Cambridge's Silicon Fen cluster (ARM, Arm Holdings ecosystem, AstraZeneca) pays London-comparable rates for deep tech roles.</p>

        <h2 id="contractor">Employed vs contracting</h2>
        <p>Senior software engineers who move to day-rate contracting typically charge £450–£700/day (£100,000–£160,000/year before tax). Outside IR35, a contractor on £500/day over 230 working days can take home approximately £95,000–£100,000 after corporation tax and dividend tax — materially more than an equivalent permanent salary. The trade-off is no employment rights, employer pension, or sick pay. Use our <ToolLink to="/ir35">IR35 Calculator</ToolLink> to compare inside vs outside take-home on your day rate.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/ir35",label:"IR35 Calculator"},{path:"/insights/data-analyst-salary-uk-2026",label:"Data Analyst Salary 2026"}]}
          salaries={[{amount:35000},{amount:50000},{amount:70000},{amount:90000},{amount:120000}]}
        />
      </>
    ),
  },

  // 39
  {
    slug: "accountant-salary-uk-2026",
    title: "Accountant Salary UK 2026: Take-Home Pay by Qualification",
    description: "UK accountant salaries range from £26k (AAT trainee) to £90k+ (FCA partner) in 2026. See exact take-home pay by qualification and experience level.",
    excerpt: "Accounting is one of the UK's most reliable high-earning career paths. Here's take-home pay from trainee to qualified accountant in 2026.",
    category: "Career",
    keywords: ["accountant salary uk 2026","chartered accountant salary uk","aca salary uk 2026","accountant take home pay","cima salary uk 2026"],
    readMinutes: 4,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What is the average accountant salary in the UK in 2026?", a: "The median salary for a qualified (ACA/ACCA/CIMA) accountant in the UK is approximately £52,000 in 2026, giving a monthly take-home of around £3,217." },
      { q: "How much does a trainee accountant earn after tax?", a: "AAT or ACA/ACCA trainees typically earn £22,000–£28,000. At £25,000, monthly take-home is approximately £1,886 after income tax and NI." },
    ],
    body: () => (
      <>
        <p>Accountancy is one of the UK's most structured professions in terms of salary progression — qualifications (ACA, ACCA, CIMA, CTA) have a direct and predictable impact on earnings. The profession spans public practice (audit, tax advisory) and industry (management accounting, financial control), with notably different pay scales between them.</p>

        <h2 id="by-level">UK accountant salary by level and qualification (2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Typical salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>AAT trainee / school leaver</td><td>£22,000–£26,000</td><td>~£1,760/month</td></tr>
            <tr><td>Part-qualified (ACA/ACCA studying)</td><td>£28,000–£38,000</td><td>~£2,380/month</td></tr>
            <tr><td>Newly qualified (ACA/ACCA/CIMA)</td><td>£42,000–£52,000</td><td>~£3,060/month</td></tr>
            <tr><td>Manager (3–5 years PQE)</td><td>£55,000–£70,000</td><td>~£3,740/month</td></tr>
            <tr><td>Senior Manager</td><td>£70,000–£90,000</td><td>~£4,430/month</td></tr>
            <tr><td>Director (Big 4 / Large firm)</td><td>£90,000–£130,000</td><td>~£5,300/month</td></tr>
            <tr><td>Partner</td><td>£150,000–£500,000+</td><td>Varies by profit share</td></tr>
            <tr><td>CFO / Finance Director</td><td>£100,000–£250,000+</td><td>~£5,600–£9,500/month</td></tr>
          </tbody>
        </table>

        <h2 id="practice-vs-industry">Practice vs industry: which pays more?</h2>
        <p>At the newly qualified stage, industry (moving from an accountancy firm into a corporate finance role) typically pays 10–20% more than remaining in practice. A newly qualified ACA who moves from a Big 4 firm into a finance manager role at a FTSE 250 company can expect £50,000–£60,000 vs £42,000–£48,000 in practice. However, Big 4 directors and partners can earn well above equivalent industry FD roles at a comparable career stage.</p>

        <h2 id="big4">Big 4 vs smaller firms</h2>
        <table>
          <thead><tr><th>Firm type</th><th>Newly qualified</th><th>Manager</th><th>Director</th></tr></thead>
          <tbody>
            <tr><td>Big 4 (London)</td><td>£52,000–£58,000</td><td>£75,000–£90,000</td><td>£110,000–£140,000</td></tr>
            <tr><td>Big 4 (Regional)</td><td>£42,000–£52,000</td><td>£62,000–£80,000</td><td>£90,000–£120,000</td></tr>
            <tr><td>Top 10 firm</td><td>£38,000–£48,000</td><td>£55,000–£72,000</td><td>£80,000–£110,000</td></tr>
            <tr><td>Regional practice</td><td>£32,000–£42,000</td><td>£45,000–£60,000</td><td>£65,000–£85,000</td></tr>
          </tbody>
        </table>

        <h2 id="tax-specialist">Tax specialists command a premium</h2>
        <p>Chartered Tax Advisers (CTA-qualified) typically earn 15–25% above equivalent ACA/ACCA holders at manager level and above. Corporate tax, international tax, and transfer pricing specialists at senior levels command £90,000–£150,000+ in the Big 4 and major law firms. Private client tax advisers serving UHNW individuals earn comparable amounts, often with significant relationship-based bonuses.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/dividend",label:"Dividend Tax Calculator"}]}
          salaries={[{amount:35000},{amount:52000},{amount:70000},{amount:90000},{amount:130000}]}
        />
      </>
    ),
  },

  // 40
  {
    slug: "average-salary-uk-by-profession-2026",
    title: "Average UK Salary by Profession 2026: 40+ Jobs Ranked",
    description: "Average UK salaries for 40+ professions in 2026, with monthly take-home pay for each. From nurses and teachers to software engineers and solicitors.",
    excerpt: "From £22k for retail workers to £120k+ for surgeons — here are average UK salaries for 40+ professions in 2026, with exact take-home calculations.",
    category: "Career",
    keywords: ["average salary by profession uk 2026","uk salary by job 2026","average salary by occupation uk","uk job salary comparison 2026","highest paying jobs uk 2026"],
    readMinutes: 7,
    publishedISO: "2026-05-07",
    updatedISO: "2026-05-07",
    faq: [
      { q: "What are the highest-paying jobs in the UK in 2026?", a: "The highest-paying professions in the UK include surgeons (£100k–£200k), senior software engineers (£80k–£120k), investment bankers (£80k–£150k+), barristers (£80k–£200k+), and commercial pilots (£80k–£120k)." },
      { q: "What is the best-paid graduate job in the UK?", a: "Investment banking, management consulting, and technology (software engineering) are consistently the highest-paid graduate entry routes, with starting salaries of £45,000–£60,000 at major firms." },
      { q: "Which public sector jobs pay the most?", a: "Medical consultants, headteachers of large schools, senior civil servants, and senior NHS managers are the highest-paid public sector roles, typically earning £80,000–£150,000." },
    ],
    body: () => (
      <>
        <p>UK salaries vary enormously by profession — a newly qualified nurse earns £29,970 while a senior barrister earns £200,000+. Understanding how your profession's pay compares to the national median (£37,430 in 2026) and what you actually take home after tax is essential for career planning, salary negotiation, and financial decisions.</p>
        <h2 id="professions">Average UK salary by profession (2026)</h2>
        <table>
          <thead><tr><th>Profession</th><th>Typical salary range</th><th>Mid-point take-home</th></tr></thead>
          <tbody>
            <tr><td>Software Engineer</td><td>£40,000–£85,000</td><td>~£3,100–£4,680/month</td></tr>
            <tr><td>GP / Doctor</td><td>£70,000–£135,000</td><td>~£3,990–£6,400/month</td></tr>
            <tr><td>Solicitor (NQ–5PQE)</td><td>£38,000–£90,000</td><td>~£2,640–£4,950/month</td></tr>
            <tr><td>Accountant (qualified)</td><td>£42,000–£90,000</td><td>~£2,820–£4,950/month</td></tr>
            <tr><td>Teacher (Main Pay Range)</td><td>£31,650–£43,685</td><td>~£2,212–£2,987/month</td></tr>
            <tr><td>NHS Nurse (Band 5–7)</td><td>£29,970–£52,809</td><td>~£2,050–£3,140/month</td></tr>
            <tr><td>Police Constable</td><td>£26,682–£46,044</td><td>~£1,870–£2,940/month</td></tr>
            <tr><td>Electrician (employed)</td><td>£30,000–£45,000</td><td>~£2,115–£2,940/month</td></tr>
            <tr><td>HGV Driver (Class 1)</td><td>£36,000–£48,000</td><td>~£2,530–£3,060/month</td></tr>
            <tr><td>Project Manager</td><td>£42,000–£75,000</td><td>~£2,820–£4,340/month</td></tr>
            <tr><td>Data Analyst</td><td>£35,000–£70,000</td><td>~£2,460–£4,040/month</td></tr>
            <tr><td>Pharmacist (NHS Band 6–7)</td><td>£37,338–£52,809</td><td>~£2,610–£3,140/month</td></tr>
            <tr><td>Social Worker</td><td>£28,000–£50,000</td><td>~£2,060–£3,190/month</td></tr>
            <tr><td>Firefighter</td><td>£33,019–£47,396</td><td>~£2,350–£2,960/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home estimated at mid-point, England, no student loan, no pension, standard tax code 2026/27. NHS roles exclude pension contributions which typically reduce take-home by 5–14%.</small></p>
        <h2 id="public-vs-private">Public sector vs private sector</h2>
        <p>Public sector salaries are generally lower than private sector equivalents at mid-level and above, but public sector workers typically receive more generous pension provision (defined-benefit schemes versus defined-contribution), more job security, and structured pay progression. The NHS Pension, Teachers' Pension Scheme, and Police Pension Scheme are substantially more valuable than typical private sector auto-enrolment pensions — adding 20–40% of employer contribution value on top of the headline salary.</p>
        <h2 id="london">London premium by profession</h2>
        <p>The London pay premium varies significantly by profession. Solicitors and finance professionals in London earn 40–100% more than regional counterparts. Teachers in Inner London earn a weighting allowance adding £5,000–£10,000. NHS nurses receive a London weighting of 20% (High Cost Area Supplement). Firefighters and police officers receive a specific London supplement. Software engineers and data professionals in London earn approximately 20–30% more than regional equivalents — a gap that has narrowed since widespread remote work adoption.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Calculate Your Take-Home"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:30000},{amount:40000},{amount:55000},{amount:70000},{amount:90000}]}
        />
      </>
    ),
  },

  // 41 — "uk tax calculator 2026" = 71 impressions/day, pos 9.92, no dedicated page
  {
    slug: "uk-tax-calculator-guide-2026",
    title: "UK Tax Calculator 2026/27: Income Tax, NI and Take-Home Explained",
    description: "Use our free UK tax calculator for 2026/27 to see income tax, National Insurance, and exact take-home pay. Covers all UK tax bands, Scotland, and student loans.",
    excerpt: "Getting a clear answer to 'how much tax do I pay?' shouldn't require an accountant. Here's how UK tax is calculated in 2026/27 — with a free calculator to show your exact figure.",
    category: "Tax",
    keywords: ["uk tax calculator 2026","uk tax calculator 2026/27","income tax calculator uk 2026","how much tax do i pay uk 2026","uk tax and ni calculator"],
    readMinutes: 5,
    publishedISO: "2026-05-14",
    updatedISO: "2026-05-14",
    faq: [
      { q: "How do I calculate my UK income tax for 2026/27?", a: "Your income tax is calculated in bands. You pay 0% on the first £12,570 (personal allowance), 20% on earnings from £12,571 to £50,270, and 40% on earnings above £50,270. Use our take-home calculator for the exact figure including National Insurance." },
      { q: "How much National Insurance do I pay in 2026/27?", a: "Employees pay 8% NI on earnings between £12,570 and £50,270, and 2% on earnings above £50,270. Employers pay 15% on earnings above £5,000." },
      { q: "Is there a free UK tax calculator for 2026/27?", a: "Yes — UK Net Pay offers a free take-home pay calculator for 2026/27 that calculates income tax, National Insurance, pension contributions, and student loan repayments instantly with no sign-up required." },
      { q: "Does Scotland have different tax rates in 2026/27?", a: "Yes — Scotland has its own income tax bands set by the Scottish Parliament, with an Intermediate Rate of 21% and a Higher Rate of 42%. The take-home calculator has a Scotland toggle to compare rates." },
    ],
    body: () => (
      <>
        <p>The UK tax system applies multiple deductions to your gross salary. Understanding each one — and how they stack — is the key to knowing your real take-home pay.</p>

        <h2 id="how">How UK tax is calculated in 2026/27</h2>
        <p>Your employer deducts three main things from your gross pay each month:</p>
        <ol>
          <li><strong>Income tax</strong> — applied in bands from 0% to 45%</li>
          <li><strong>National Insurance (NI)</strong> — 8% on earnings £12,570–£50,270; 2% above</li>
          <li><strong>Pension contributions</strong> — minimum 5% employee under auto-enrolment (optional, but very common)</li>
        </ol>

        <h2 id="bands">UK income tax bands 2026/27</h2>
        <table>
          <thead><tr><th>Band</th><th>Income range</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Personal Allowance</td><td>Up to £12,570</td><td>0%</td></tr>
            <tr><td>Basic Rate</td><td>£12,571 – £50,270</td><td>20%</td></tr>
            <tr><td>Higher Rate</td><td>£50,271 – £125,140</td><td>40%</td></tr>
            <tr><td>Additional Rate</td><td>Over £125,140</td><td>45%</td></tr>
          </tbody>
        </table>

        <h2 id="examples">Tax on common salaries (2026/27)</h2>
        <table>
          <thead><tr><th>Gross salary</th><th>Income tax</th><th>NI</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>£25,000</td><td>£2,486</td><td>£1,000</td><td>£1,793</td></tr>
            <tr><td>£30,000</td><td>£3,486</td><td>£1,400</td><td>£2,093</td></tr>
            <tr><td>£35,000</td><td>£4,486</td><td>£1,794</td><td>£2,393</td></tr>
            <tr><td>£40,000</td><td>£5,486</td><td>£2,194</td><td>£2,693</td></tr>
            <tr><td>£50,000</td><td>£7,486</td><td>£2,994</td><td>£3,293</td></tr>
            <tr><td>£60,000</td><td>£11,432</td><td>£3,394</td><td>£3,765</td></tr>
            <tr><td>£80,000</td><td>£19,432</td><td>£4,194</td><td>£4,698</td></tr>
            <tr><td>£100,000</td><td>£27,432</td><td>£4,994</td><td>£5,631</td></tr>
          </tbody>
        </table>
        <p><small>England, Wales, Northern Ireland. No pension or student loan deductions. 2026/27 rates.</small></p>

        <h2 id="scotland">Scotland: different rates apply</h2>
        <p>Scottish taxpayers pay the Intermediate Rate (21%) on income between £27,492 and £43,662 — higher than the 20% basic rate in England. Above £43,663, the Scottish Higher Rate is 42% vs 40% in England.</p>
        <p>Use our <ToolLink to="/take-home">calculator</ToolLink> and toggle Scotland to see the exact difference for your salary.</p>

        <h2 id="student-loan">Student loan on top</h2>
        <p>Plan 2 graduates repay 9% of income above £29,385. On a £35,000 salary that's ~£42/month. Our <ToolLink to="/take-home">take-home calculator</ToolLink> handles all plans (1, 2, 4, and 5).</p>

        <h2 id="calculator">Calculate your exact tax now</h2>
        <p>Enter any gross salary into our <ToolLink to="/take-home">UK tax calculator</ToolLink> to see your exact income tax, NI, pension deduction, and monthly take-home for 2026/27.</p>
      </>
    ),
  },

  // 42 — "scottish income tax bands 2026/27" = 24 impressions/day, pos 8.67
  {
    slug: "scottish-income-tax-bands-2026-27",
    title: "Scottish Income Tax Bands 2026/27: Rates, Thresholds & Calculator",
    description: "Scottish income tax bands for 2026/27: Starter 19%, Basic 20%, Intermediate 21%, Higher 42%, Advanced 45%, Top 48%. See how much more Scots pay vs England with examples.",
    excerpt: "Scotland has 6 income tax bands in 2026/27, including a 21% Intermediate Rate and 42% Higher Rate. Here's exactly how Scottish tax differs from England — with take-home calculations for every level.",
    category: "Scotland",
    keywords: ["scottish income tax bands 2026/27","scotland income tax 2026","scottish tax rates 2026 27","scotland vs england tax 2026","scottish higher rate tax 2026"],
    readMinutes: 5,
    publishedISO: "2026-05-14",
    updatedISO: "2026-05-14",
    faq: [
      { q: "What are the Scottish income tax bands for 2026/27?", a: "Scotland has 6 bands: Starter Rate 19% (£12,571–£15,397), Basic Rate 20% (£15,398–£27,491), Intermediate Rate 21% (£27,492–£43,662), Higher Rate 42% (£43,663–£75,000), Advanced Rate 45% (£75,001–£125,140), and Top Rate 48% (over £125,140)." },
      { q: "Do Scottish taxpayers pay more tax than English taxpayers?", a: "For most earnings above £27,491 yes — the Intermediate Rate (21%) and Higher Rate (42%) are both higher than their English equivalents (20% and 40%). On a £50,000 salary, a Scottish taxpayer pays approximately £1,500 more per year than an equivalent English taxpayer." },
      { q: "How do I know if I pay Scottish income tax?", a: "You pay Scottish income tax if your main home is in Scotland. HMRC will issue you an S-prefix tax code (e.g. S1257L). Your employer uses this code to apply Scottish rates." },
      { q: "Is National Insurance the same in Scotland as England?", a: "Yes — National Insurance is a UK-wide tax and is the same rate in Scotland as in England. Only income tax rates differ between Scotland and the rest of the UK." },
    ],
    body: () => (
      <>
        <p>Scotland sets its own income tax rates through the Scottish Parliament. In 2026/27, Scotland has <strong>six income tax bands</strong> compared to England's four — and most Scottish taxpayers above £27,491 pay more tax than their English counterparts.</p>

        <h2 id="bands">Scottish income tax bands 2026/27</h2>
        <table>
          <thead><tr><th>Band</th><th>Income range</th><th>Rate</th><th>vs England</th></tr></thead>
          <tbody>
            <tr><td>Personal Allowance</td><td>Up to £12,570</td><td>0%</td><td>Same</td></tr>
            <tr><td>Starter Rate</td><td>£12,571 – £15,397</td><td>19%</td><td>−1% vs England</td></tr>
            <tr><td>Basic Rate</td><td>£15,398 – £27,491</td><td>20%</td><td>Same</td></tr>
            <tr><td>Intermediate Rate</td><td>£27,492 – £43,662</td><td>21%</td><td>+1% vs England</td></tr>
            <tr><td>Higher Rate</td><td>£43,663 – £75,000</td><td>42%</td><td>+2% vs England</td></tr>
            <tr><td>Advanced Rate</td><td>£75,001 – £125,140</td><td>45%</td><td>Same</td></tr>
            <tr><td>Top Rate</td><td>Over £125,140</td><td>48%</td><td>+3% vs England</td></tr>
          </tbody>
        </table>

        <h2 id="comparison">Scotland vs England: side-by-side take-home</h2>
        <table>
          <thead><tr><th>Gross salary</th><th>Scotland take-home</th><th>England take-home</th><th>Difference/year</th></tr></thead>
          <tbody>
            <tr><td>£25,000</td><td>£1,801/month</td><td>£1,793/month</td><td>+£96 Scotland</td></tr>
            <tr><td>£35,000</td><td>£2,358/month</td><td>£2,393/month</td><td>−£420 Scotland</td></tr>
            <tr><td>£50,000</td><td>£3,156/month</td><td>£3,293/month</td><td>−£1,644 Scotland</td></tr>
            <tr><td>£60,000</td><td>£3,580/month</td><td>£3,765/month</td><td>−£2,220 Scotland</td></tr>
            <tr><td>£80,000</td><td>£4,374/month</td><td>£4,698/month</td><td>−£3,888 Scotland</td></tr>
          </tbody>
        </table>
        <p><small>No pension or student loan deductions. Scotland figures use Scottish income tax rates; National Insurance is the same.</small></p>

        <h2 id="ni">National Insurance: same in Scotland</h2>
        <p>NI is a UK-wide tax — Scottish residents pay exactly the same rates as English residents. Only income tax differs. On a £50,000 salary, NI is £2,994 whether you live in Edinburgh or London.</p>

        <h2 id="s-code">How to know if you're a Scottish taxpayer</h2>
        <p>If your main home is in Scotland, HMRC issues you an <strong>S-prefix tax code</strong> (e.g. S1257L). Your employer applies Scottish rates using this code. If you've moved to or from Scotland, contact HMRC to update your code.</p>

        <h2 id="calculate">Compare your exact Scotland vs England take-home</h2>
        <p>Use our <ToolLink to="/take-home">take-home calculator</ToolLink> — toggle the Scotland switch to see the exact monthly difference for your salary.</p>
      </>
    ),
  },

  // 43 — "teacher pay scale 2026-27" = 22 impressions at pos 11 — article exists but ranking low
  // Adding a dedicated pay scale article to capture this specific query
  {
    slug: "teacher-pay-scale-2026-27",
    title: "Teacher Pay Scale 2026-27: Every Point on MPS, UPS and Leadership",
    description: "Complete UK teacher pay scale for 2026-27. Every point on Main Pay Scale, Upper Pay Scale and Leadership Group, inside and outside London, with monthly take-home pay.",
    excerpt: "The teacher pay scale for 2026-27 runs from £31,650 (M1, outside London) to £135,000+ (Headteacher Group 9, Inner London). Here's every point with exact take-home pay.",
    category: "Career",
    keywords: ["teacher pay scale 2026-27","teacher pay scale 2026","teacher salary scale 2026","mps teacher pay 2026","ups teacher pay 2026","teacher pay outside london 2026"],
    readMinutes: 5,
    publishedISO: "2026-05-14",
    updatedISO: "2026-05-14",
    faq: [
      { q: "What is the teacher pay scale for 2026-27?", a: "The Main Pay Scale (MPS) runs from £31,650 (M1, outside London) to £43,685 (M6). The Upper Pay Scale (UPS) runs from £46,525 (U1) to £50,500 (U3). Inner London adds a substantial allowance — M1 in Inner London is £42,637." },
      { q: "How much does a newly qualified teacher earn after tax in 2026-27?", a: "An NQT on M1 (£31,650 outside London) takes home approximately £2,212/month after income tax and National Insurance. In Inner London at £42,637, take-home is approximately £2,912/month." },
      { q: "When does the 2026-27 teacher pay award take effect?", a: "Teacher pay awards in England typically take effect from September of the academic year. The 2026-27 figures shown here are based on the STPCD (School Teachers' Pay and Conditions Document) for the 2026-27 academic year." },
    ],
    body: () => (
      <>
        <p>The teacher pay scale in England is set by the School Teachers' Pay and Conditions Document (STPCD), updated annually following recommendations from the School Teachers' Review Body (STRB). This page shows every scale point, the gross salary, and what teachers actually take home after Income Tax, National Insurance, and Teachers' Pension contributions in 2026/27.</p>
        <h2 id="main">Main Pay Range — classroom teachers</h2>
        <table>
          <thead><tr><th>Point</th><th>Outer London</th><th>Fringe</th><th>Rest of England</th><th>Take-home (rest of England)</th></tr></thead>
          <tbody>
            <tr><td>M1 (NQT)</td><td>£38,765</td><td>£33,075</td><td>£31,650</td><td>~£2,212/month</td></tr>
            <tr><td>M2</td><td>£40,568</td><td>£34,502</td><td>£33,483</td><td>~£2,330/month</td></tr>
            <tr><td>M3</td><td>£42,842</td><td>£36,360</td><td>£35,674</td><td>~£2,473/month</td></tr>
            <tr><td>M4</td><td>£45,201</td><td>£38,513</td><td>£37,935</td><td>~£2,630/month</td></tr>
            <tr><td>M5</td><td>£48,062</td><td>£41,065</td><td>£40,625</td><td>~£2,804/month</td></tr>
            <tr><td>M6</td><td>£51,179</td><td>£44,103</td><td>£43,685</td><td>~£2,987/month</td></tr>
          </tbody>
        </table>
        <h2 id="upper">Upper Pay Range</h2>
        <table>
          <thead><tr><th>Point</th><th>Outer London</th><th>Fringe</th><th>Rest of England</th><th>Take-home (rest of England)</th></tr></thead>
          <tbody>
            <tr><td>U1</td><td>£54,455</td><td>£47,153</td><td>£46,525</td><td>~£3,130/month</td></tr>
            <tr><td>U2</td><td>£56,561</td><td>£48,981</td><td>£48,389</td><td>~£3,238/month</td></tr>
            <tr><td>U3</td><td>£58,833</td><td>£51,004</td><td>£50,500</td><td>~£3,339/month</td></tr>
          </tbody>
        </table>
        <p><small>Inner London scale is higher again — Inner London M1 is £42,637, U3 is £62,138. Take-home estimates are before Teachers' Pension Scheme contributions (8.3–11.7% of salary). Pension reduces monthly take-home by approximately £220–£490 depending on scale point.</small></p>
        <h2 id="inner-london">Inner London scale</h2>
        <table>
          <thead><tr><th>Point</th><th>Inner London gross</th><th>Take-home (before pension)</th></tr></thead>
          <tbody>
            <tr><td>M1 Inner London</td><td>£42,637</td><td>~£2,864/month</td></tr>
            <tr><td>M6 Inner London</td><td>£53,482</td><td>~£3,354/month</td></tr>
            <tr><td>U3 Inner London</td><td>£62,138</td><td>~£3,764/month</td></tr>
          </tbody>
        </table>
        <h2 id="pension">Teachers' Pension Scheme contributions</h2>
        <p>All teachers in state schools are automatically enrolled in the Teachers' Pension Scheme (TPS), which provides a defined-benefit (career average) pension. Employee contribution rates for 2026/27 are tiered: 8.3% on salaries up to £32,135; 9.7% on £32,136–£43,259; 10.2% on £43,260–£51,292; 11.7% above £51,292. At M1 (£31,650), monthly pension contributions are approximately £219, reducing take-home to approximately £1,993/month. At M6 (£43,685), contributions are approximately £445/month, reducing take-home to approximately £2,542/month.</p>
        <h2 id="scotland">Teacher pay in Scotland (2026/27)</h2>
        <p>Scottish teacher pay is set separately by the Scottish Negotiating Committee for Teachers (SNCT). The probationer rate is £32,217, rising through the scale to £48,765 at the top of the Main Grade. Scottish teachers progress through the scale automatically without a formal application — unlike England where UPR requires a specific application. Scottish teachers also pay Scottish income tax rates, which are higher than England above £43,662, reducing take-home by approximately £650–£1,300/year at senior scale points.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Calculate Your Teacher Take-Home"},{path:"/insights/teacher-salary-uk-2026",label:"Full Teacher Salary Guide"}]}
          salaries={[{amount:31650},{amount:37935},{amount:43685},{amount:50500},{amount:62138}]}
        />
      </>
    ),
  },

  // ── SPRINT 5: CITY + NATION + JOB ARTICLES ──────────────────────────

  // 44
  {
    slug: "average-salary-glasgow-2026",
    title: "Average Salary in Glasgow 2026",
    description: "The average salary in Glasgow is £33,200 in 2026. See take-home pay under Scottish tax rates, top sectors, and how Glasgow compares to Edinburgh and the UK median.",
    excerpt: "Glasgow salaries are competitive with Edinburgh in several sectors — but Scottish tax rates mean your take-home differs from England at the same gross.",
    category: "Wages",
    keywords: ["average salary glasgow 2026","average wage glasgow","glasgow salary 2026","median salary glasgow"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Glasgow in 2026?", a: "The median gross annual salary in Glasgow is approximately £33,200 in 2026. Under Scottish income tax rates, monthly take-home is around £2,310." },
      { q: "Is Glasgow cheaper than Edinburgh?", a: "Yes — Glasgow housing costs are approximately 15–20% lower than Edinburgh. A £33,200 salary in Glasgow can offer similar purchasing power to a £37,000+ salary in Edinburgh." },
    ],
    body: () => (
      <>
        <p>Glasgow is Scotland's largest city and the economic engine of the west of Scotland. It has a diverse economy spanning financial services, manufacturing, healthcare, technology, and one of the UK's largest creative sectors. Glasgow salaries sit slightly below Edinburgh's but above most other Scottish cities, and housing costs are among the lowest of any major UK city.</p>
        <h2 id="average">Average salary in Glasgow 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home (Scottish tax)</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Glasgow)</td><td>£33,500</td><td>~£2,370/month</td></tr>
            <tr><td>Mean full-time (Glasgow)</td><td>£36,800</td><td>~£2,560/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590 (Eng)/~£2,545 (Scot)</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Glasgow salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Financial services (Standard Life, Barclays)</td><td>£32,000–£90,000</td></tr>
            <tr><td>Technology / digital</td><td>£35,000–£85,000</td></tr>
            <tr><td>Legal</td><td>£28,000–£80,000</td></tr>
            <tr><td>Healthcare (NHS Greater Glasgow)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Engineering / manufacturing</td><td>£30,000–£65,000</td></tr>
            <tr><td>Creative / media</td><td>£25,000–£55,000</td></tr>
          </tbody>
        </table>
        <h2 id="scottish-tax">Scottish income tax impact</h2>
        <p>Glasgow workers pay Scottish income tax rates, which are higher than England for earnings above £43,662. A Glasgow professional earning £50,000 pays approximately £1,300 more in income tax per year than an equivalent English worker. However, Scotland has no prescription charges and lower average council tax, partially offsetting the income tax difference. Use the Take-Home Calculator and select "Scotland" to see your exact net pay.</p>
        <h2 id="cost">Cost of living</h2>
        <p>Glasgow is one of the UK's best-value major cities. Average rent for a one-bedroom city centre flat is £900–£1,150/month, and house prices average £180,000–£230,000 in accessible neighbourhoods like Shawlands, Hyndland, and Partick. The combination of decent professional salaries and low housing costs makes Glasgow's disposable income outlook considerably better than the headline salary figures suggest.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Scottish Take-Home Calculator"},{path:"/insights/average-salary-edinburgh-2026",label:"Edinburgh Salary 2026"},{path:"/insights/average-salary-scotland-2026",label:"Scotland Average Salary"}]}
          salaries={[{amount:33500},{amount:40000},{amount:50000},{amount:65000},{amount:85000}]}
        />
      </>
    ),
  },

  // 45
  {
    slug: "average-salary-liverpool-2026",
    title: "Average Salary in Liverpool 2026",
    description: "The average salary in Liverpool is £31,800 in 2026. See take-home pay, top-paying sectors, and how Liverpool compares to Manchester and the UK median.",
    excerpt: "Liverpool salaries sit below the UK median, but a strong public sector and growing digital economy are pushing wages up — and housing costs remain among the lowest of any major city.",
    category: "Wages",
    keywords: ["average salary liverpool 2026","average wage liverpool","liverpool salary 2026","median salary liverpool"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Liverpool in 2026?", a: "The median gross annual salary in Liverpool is approximately £31,800 in 2026, giving a monthly take-home of around £2,300." },
    ],
    body: () => (
      <>
        <p>Liverpool has one of the fastest-growing digital and life sciences economies in the UK. While median salaries remain below the national average, a cluster of high-value employers — particularly in health tech, pharma, and digital — are driving salaries in specialised roles well above regional norms.</p>

        <h2 id="average">Average salary in Liverpool 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Liverpool)</td><td>£31,800</td><td>~£2,300/month</td></tr>
            <tr><td>Mean full-time (Liverpool)</td><td>£34,500</td><td>~£2,470/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Liverpool salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Technology / digital</td><td>£35,000–£80,000</td></tr>
            <tr><td>Life sciences / pharma (Alder Hey, RLUH)</td><td>£30,000–£90,000</td></tr>
            <tr><td>Financial services</td><td>£32,000–£75,000</td></tr>
            <tr><td>Maritime and logistics</td><td>£30,000–£65,000</td></tr>
            <tr><td>Healthcare (NHS Mersey)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Education (Liverpool, Liverpool John Moores)</td><td>£28,000–£60,000</td></tr>
          </tbody>
        </table>

        <h2 id="cost">Value for money: Liverpool's key advantage</h2>
        <p>Liverpool offers some of the best value for money of any UK city. Average rent for a one-bedroom city centre flat is £850–£1,100/month — among the lowest of any major UK city. On a £31,800 median salary, take-home is approximately £2,300/month, leaving £1,200–£1,450 per month after a typical city centre rent. This disposable income figure is comparable to what a Londoner earning £55,000 retains after London rents. For professionals working remotely or in roles that exist across multiple cities, Liverpool offers an outstanding quality of life per pound.</p>

        <h2 id="growth">Growth sectors driving higher wages</h2>
        <p>Liverpool's Knowledge Quarter — home to the Royal Liverpool University Hospital, University of Liverpool, Liverpool School of Tropical Medicine, and multiple biotech companies — is one of the UK's emerging life sciences clusters. Digital health, genomics, and clinical research roles pay £45,000–£85,000 for experienced professionals. The city's port and logistics sector, anchored by Peel Ports, employs thousands at salaries above the regional average in logistics management, engineering, and commercial roles.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"},{path:"/insights/average-salary-manchester-2026",label:"Manchester Salary 2026"}]}
          salaries={[{amount:31800},{amount:38000},{amount:50000},{amount:65000},{amount:85000}]}
        />
      </>
    ),
  },

  // 46
  {
    slug: "average-salary-sheffield-2026",
    title: "Average Salary in Sheffield 2026",
    description: "The average salary in Sheffield is £31,500 in 2026. See take-home pay, top-paying sectors, and how Sheffield compares to Leeds and the UK median.",
    excerpt: "Sheffield offers strong engineering and advanced manufacturing salaries with housing costs well below the national average.",
    category: "Wages",
    keywords: ["average salary sheffield 2026","average wage sheffield","sheffield salary 2026"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Sheffield in 2026?", a: "The median gross annual salary in Sheffield is approximately £31,500 in 2026, giving a monthly take-home of around £2,282." },
    ],
    body: () => (
      <>
        <p>Sheffield is the UK's fourth-largest city and a centre for advanced manufacturing, engineering, and an increasingly significant digital economy. Historically known for steel and cutlery manufacturing, Sheffield's economy has diversified substantially — it is now home to a major NHS research cluster (Sheffield Teaching Hospitals is one of the largest NHS trusts), two research universities, and a growing technology sector.</p>

        <h2 id="average">Average salary in Sheffield 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Sheffield)</td><td>£31,500</td><td>~£2,280/month</td></tr>
            <tr><td>Mean full-time (Sheffield)</td><td>£34,200</td><td>~£2,453/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Sheffield salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Advanced manufacturing / steel</td><td>£35,000–£70,000</td></tr>
            <tr><td>Engineering</td><td>£32,000–£70,000</td></tr>
            <tr><td>Technology / digital</td><td>£35,000–£80,000</td></tr>
            <tr><td>Healthcare (Sheffield Teaching Hospitals)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Education (University of Sheffield, Sheffield Hallam)</td><td>£28,000–£60,000</td></tr>
            <tr><td>Public sector / local government</td><td>£25,000–£60,000</td></tr>
          </tbody>
        </table>

        <h2 id="manufacturing">Advanced manufacturing and engineering premium</h2>
        <p>Sheffield's advanced manufacturing sector — specialising in high-value steel alloys, aerospace components, and nuclear engineering — commands significant pay premiums over the city median. Materials engineers, metallurgists, and manufacturing process engineers at companies like Sheffield Forgemasters, Liberty Steel, and Devclad earn £45,000–£75,000. The University of Sheffield's Advanced Manufacturing Research Centre (AMRC) and the Nuclear AMRC employ researchers and engineers at £40,000–£65,000.</p>

        <h2 id="cost">Cost of living: Sheffield's strongest advantage</h2>
        <p>Sheffield consistently ranks among the UK's most affordable cities. Average rent for a one-bedroom city centre flat is £800–£1,050/month. A professional on the Sheffield median of £31,500 (£2,280 take-home/month) retains approximately £1,230–£1,480 per month after a typical city centre rent — a higher disposable income percentage than in London, Bristol, or Manchester. House prices average £220,000–£260,000 in accessible suburbs like Crookes, Walkley, and Hillsborough, making home ownership feasible on two professional incomes.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-leeds-2026",label:"Leeds Salary 2026"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:31500},{amount:36000},{amount:45000},{amount:58000},{amount:75000}]}
        />
      </>
    ),
  },

  // 47
  {
    slug: "average-salary-nottingham-2026",
    title: "Average Salary in Nottingham 2026",
    description: "The average salary in Nottingham is £31,200 in 2026. See take-home pay, top sectors, and how Nottingham compares to Birmingham and the UK median.",
    excerpt: "Nottingham offers a strong mix of pharma, financial services, and public sector employment with very competitive housing costs.",
    category: "Wages",
    keywords: ["average salary nottingham 2026","average wage nottingham","nottingham salary 2026"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Nottingham in 2026?", a: "The median gross annual salary in Nottingham is approximately £31,200 in 2026, giving a monthly take-home of around £2,264." },
    ],
    body: () => (
      <>
        <p>Nottingham is one of the East Midlands' largest employment centres, with particular strength in pharmaceutical manufacturing (Boots headquarters, Experian, Capital One), NHS services, and a large student-driven economy from two major universities. It consistently offers lower living costs than most comparable UK cities while maintaining a reasonable salary base across the public and private sectors.</p>

        <h2 id="average">Average salary in Nottingham 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Nottingham)</td><td>£31,200</td><td>~£2,264/month</td></tr>
            <tr><td>Mean full-time (Nottingham)</td><td>£33,800</td><td>~£2,420/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Nottingham salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Pharmaceuticals / life sciences (Boots, AstraZeneca Nottm)</td><td>£35,000–£90,000</td></tr>
            <tr><td>Financial services (Experian, Capital One)</td><td>£35,000–£85,000</td></tr>
            <tr><td>Technology</td><td>£35,000–£80,000</td></tr>
            <tr><td>Healthcare (Nottingham University Hospitals)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Retail / distribution (next HQ nearby)</td><td>£25,000–£60,000</td></tr>
            <tr><td>Education</td><td>£28,000–£55,000</td></tr>
          </tbody>
        </table>

        <h2 id="major-employers">Anchor employers and their pay scales</h2>
        <p>Boots UK headquarters in Beeston employs around 6,500 people in pharmacy, retail, logistics, and corporate functions. Graduate roles start at £26,000–£32,000; experienced pharmacists earn £38,000–£55,000; senior commercial and marketing roles reach £60,000–£90,000. Experian's Nottingham operations (data analytics and financial technology) pay significantly above the city average — data analysts earn £35,000–£55,000, senior technology roles reach £70,000–£95,000. Capital One UK employs around 1,000 people at its Nottingham technology and operations centre, paying technology roles at £40,000–£85,000.</p>

        <h2 id="cost">Salary stretch in Nottingham</h2>
        <p>Nottingham offers excellent value for money. Average rent for a one-bedroom flat in the city centre is £850–£1,100/month. House prices average £180,000–£230,000, making home ownership achievable on a single professional income. A professional earning £31,200 (the city median, ~£2,264/month take-home) retains approximately £1,164–£1,414 after rent — a reasonable disposable position that improves significantly with dual incomes.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:31200},{amount:38000},{amount:50000},{amount:65000},{amount:85000}]}
        />
      </>
    ),
  },

  // 48
  {
    slug: "average-salary-cardiff-2026",
    title: "Average Salary in Cardiff 2026",
    description: "The average salary in Cardiff is £31,000 in 2026. See take-home pay, top sectors, and how Cardiff compares to Bristol and the UK median.",
    excerpt: "Cardiff is the highest-paying city in Wales, with strong public sector and financial services employment. Housing costs are among the lowest of any UK capital city.",
    category: "Wages",
    keywords: ["average salary cardiff 2026","average wage cardiff","cardiff salary 2026","average salary wales 2026"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Cardiff in 2026?", a: "The median gross annual salary in Cardiff is approximately £31,000 in 2026, giving a monthly take-home of around £2,252." },
      { q: "Does Wales have different tax rates?", a: "No — Wales currently uses the same income tax rates as England. Welsh Rate of Income Tax exists but is set at the same level. National Insurance is also the same UK-wide." },
    ],
    body: () => (
      <>
        <p>Cardiff is the capital of Wales and its largest employer. The city has a strong concentration of public sector, financial services, and media roles — BBC Wales, S4C, and ITV Wales all have significant Cardiff presences. Cardiff salaries sit below the UK average but housing costs are substantially lower than most English cities of comparable size.</p>

        <h2 id="average">Average salary in Cardiff 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Cardiff)</td><td>£31,000</td><td>~£2,252/month</td></tr>
            <tr><td>Mean full-time (Cardiff)</td><td>£33,500</td><td>~£2,410/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>England median (comparison)</td><td>£38,200</td><td>~£2,640/month</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Cardiff salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Financial services (Legal &amp; General, Admiral)</td><td>£32,000–£85,000</td></tr>
            <tr><td>Public sector (Welsh Government, civil service)</td><td>£26,000–£75,000</td></tr>
            <tr><td>Technology / digital</td><td>£32,000–£80,000</td></tr>
            <tr><td>Healthcare (Cardiff and Vale UHB)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Media (BBC Wales, ITV, S4C)</td><td>£25,000–£65,000</td></tr>
            <tr><td>Legal</td><td>£28,000–£70,000</td></tr>
          </tbody>
        </table>

        <h2 id="welsh-tax">Welsh income tax — does it differ?</h2>
        <p>The Welsh Rate of Income Tax (WRIT) exists as a mechanism but is currently set identically to England and Northern Ireland — 20% basic, 40% higher, 45% additional. Welsh taxpayers use the prefix "C" on their tax code (e.g. C1257L). In practice, the tax you pay in Cardiff is identical to the tax you'd pay on the same salary in Birmingham or Manchester. This contrasts with Scotland, which sets its own rates and has higher tax for most earners above £43,662.</p>

        <h2 id="cost">Cardiff vs Bristol: the Severn crossing comparison</h2>
        <p>Cardiff and Bristol are 45 minutes apart — yet average Cardiff house prices (£250,000–£290,000) are roughly 30–40% below Bristol (£350,000–£420,000), and rents are similarly lower. A professional who works remotely or commutes can potentially access Bristol or London employer pay scales while enjoying Cardiff living costs. Average rent for a one-bedroom city centre flat in Cardiff is £950–£1,200/month.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-wales-2026",label:"Average Wales Salary 2026"}]}
          salaries={[{amount:31000},{amount:36000},{amount:48000},{amount:65000},{amount:85000}]}
        />
      </>
    ),
  },

  // 49 — "average salary scotland 2026" = 11 impressions at pos 10
  {
    slug: "average-salary-scotland-2026",
    title: "Average Salary in Scotland 2026: Take-Home Under Scottish Tax",
    description: "The average salary in Scotland is £33,800 in 2026. See exact take-home pay under Scottish tax rates, salary by city, and how Scotland compares to England.",
    excerpt: "Scotland's median salary is close to the UK average — but Scottish tax rates mean your take-home is different. Here's the full breakdown with city-by-city figures.",
    category: "Wages",
    keywords: ["average salary scotland 2026","average scottish salary 2026","median salary scotland","scotland average wage 2026","average salary in scotland"],
    readMinutes: 5,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Scotland in 2026?", a: "The median gross annual salary in Scotland is approximately £33,800 in 2026. Under Scottish income tax rates, monthly take-home is around £2,346 — approximately £50/month less than the same salary in England due to higher Scottish tax rates above £27,491." },
      { q: "Which Scottish city has the highest salary?", a: "Edinburgh has the highest average salary in Scotland at approximately £37,500, followed by Aberdeen at £36,000 and Glasgow at £33,200." },
    ],
    body: () => (
      <>
        <p>Scotland has a higher median salary than Wales and Northern Ireland, broadly in line with the UK average, with Edinburgh significantly above the Scottish norm and rural areas considerably below it. Scotland sets its own income tax rates — the six-band Scottish system differs from the rest of the UK for earnings above £12,570, meaning take-home pay on the same gross salary is lower in Scotland than England for most higher earners.</p>
        <h2 id="average">Average salary in Scotland 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home (Scottish tax)</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Scotland)</td><td>£36,900</td><td>~£2,545/month</td></tr>
            <tr><td>Mean full-time (Scotland)</td><td>£40,500</td><td>~£2,760/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590 (England)</td></tr>
          </tbody>
        </table>
        <h2 id="by-city">Average salary by Scottish city (2026)</h2>
        <table>
          <thead><tr><th>City</th><th>Median salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Edinburgh</td><td>£36,800</td><td>~£2,540/month</td></tr>
            <tr><td>Aberdeen</td><td>£36,200</td><td>~£2,500/month</td></tr>
            <tr><td>Glasgow</td><td>£33,500</td><td>~£2,370/month</td></tr>
            <tr><td>Dundee</td><td>£30,500</td><td>~£2,200/month</td></tr>
            <tr><td>Inverness</td><td>£29,800</td><td>~£2,160/month</td></tr>
            <tr><td>Rural Scotland</td><td>£26,000–£29,000</td><td>~£1,950–£2,110/month</td></tr>
          </tbody>
        </table>
        <h2 id="scottish-tax">Scottish income tax — 2026/27 rates</h2>
        <table>
          <thead><tr><th>Band</th><th>Rate</th><th>Income range</th></tr></thead>
          <tbody>
            <tr><td>Starter rate</td><td>19%</td><td>£12,571–£14,667</td></tr>
            <tr><td>Basic rate</td><td>20%</td><td>£14,668–£25,296</td></tr>
            <tr><td>Intermediate rate</td><td>21%</td><td>£25,297–£43,662</td></tr>
            <tr><td>Higher rate</td><td>42%</td><td>£43,663–£75,000</td></tr>
            <tr><td>Advanced rate</td><td>45%</td><td>£75,001–£125,140</td></tr>
            <tr><td>Top rate</td><td>48%</td><td>Over £125,140</td></tr>
          </tbody>
        </table>
        <p>A Scottish taxpayer earning £50,000 pays approximately £1,300 more in income tax than an equivalent English taxpayer. At £75,000, the difference is approximately £3,500/year. Pension salary sacrifice is especially valuable for Scottish higher-rate taxpayers — relief is given at 42% rather than 40%.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Scottish Take-Home Calculator"},{path:"/insights/scottish-income-tax-bands-2026-27",label:"Scottish Tax Bands Explained"},{path:"/insights/average-salary-edinburgh-2026",label:"Edinburgh Salary 2026"}]}
          salaries={[{amount:36900},{amount:43000},{amount:55000},{amount:75000},{amount:100000}]}
        />
      </>
    ),
  },

  // 50 — "average salary wales 2026" = 3 impressions at pos 8.67
  {
    slug: "average-salary-wales-2026",
    title: "Average Salary in Wales 2026",
    description: "The average salary in Wales is £30,500 in 2026. See take-home pay, salary by city, top sectors, and how Wales compares to the UK median.",
    excerpt: "Wales has the lowest median salary of the UK nations, but housing costs are significantly lower — and the same income tax rates as England apply.",
    category: "Wages",
    keywords: ["average salary wales 2026","average wage wales","wales salary 2026","median salary wales"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Wales in 2026?", a: "The median gross annual salary in Wales is approximately £30,500 in 2026, giving a monthly take-home of around £2,218." },
      { q: "Does Wales have different tax rates?", a: "Wales has the Welsh Rate of Income Tax, but it is currently set at the same level as England's rates. Practically, Welsh taxpayers pay the same income tax as English taxpayers." },
    ],
    body: () => (
      <>
        <p>Wales has the lowest median full-time salary of the four UK nations, but also the lowest housing and living costs — particularly outside Cardiff. The Welsh economy has a high concentration of public sector employment (NHS Wales, Welsh Government, local authorities), manufacturing, and tourism, with a growing but smaller private professional services sector compared to England.</p>

        <h2 id="average">Average salary in Wales 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Wales)</td><td>£30,500</td><td>~£2,218/month</td></tr>
            <tr><td>Mean full-time (Wales)</td><td>£32,800</td><td>~£2,372/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
          </tbody>
        </table>

        <h2 id="by-city">Average salary by Welsh city (2026)</h2>
        <table>
          <thead><tr><th>City / area</th><th>Median salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Cardiff</td><td>£31,000</td><td>~£2,252/month</td></tr>
            <tr><td>Newport</td><td>£30,000</td><td>~£2,184/month</td></tr>
            <tr><td>Swansea</td><td>£29,500</td><td>~£2,152/month</td></tr>
            <tr><td>Wrexham</td><td>£29,000</td><td>~£2,120/month</td></tr>
            <tr><td>Bridgend</td><td>£28,500</td><td>~£2,088/month</td></tr>
            <tr><td>Rural Wales (Powys, Ceredigion)</td><td>£26,000–£28,000</td><td>~£1,950–£2,060/month</td></tr>
          </tbody>
        </table>

        <h2 id="tax">Welsh income tax in 2026</h2>
        <p>The Welsh Rate of Income Tax is devolved but currently set identically to England — 20% basic rate, 40% higher rate, 45% additional rate. Welsh taxpayers are identified by a "C" prefix on their tax code. This means take-home pay for a Welsh employee is identical to an English employee on the same salary. This is a political choice — the Welsh Government could in future set different rates, as Scotland does.</p>

        <h2 id="value">Real purchasing power: Wales vs England</h2>
        <p>Despite lower nominal salaries, Wales offers strong real purchasing power. Average house prices in Wales are approximately £210,000–£240,000, compared to £310,000 across England. In rural areas of Powys or Ceredigion, properties sell for £150,000–£200,000. For professionals who can work remotely — increasingly common in tech, finance, and consulting — living in Wales while earning London or Bristol salaries creates exceptional financial outcomes.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-cardiff-2026",label:"Cardiff Salary 2026"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:30500},{amount:35000},{amount:45000},{amount:60000},{amount:80000}]}
        />
      </>
    ),
  },

  // 51 — "average salary northern ireland 2026" = 4 impressions at pos 10.25
  {
    slug: "average-salary-northern-ireland-2026",
    title: "Average Salary in Northern Ireland 2026",
    description: "The average salary in Northern Ireland is £30,200 in 2026. See take-home pay, top sectors, and how NI compares to the Republic of Ireland and UK median.",
    excerpt: "Northern Ireland has the UK's lowest median salary but also the lowest housing costs of any region — and the same tax rates as England and Wales.",
    category: "Wages",
    keywords: ["average salary northern ireland 2026","average wage northern ireland","northern ireland salary 2026"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average salary in Northern Ireland in 2026?", a: "The median gross annual salary in Northern Ireland is approximately £30,200 in 2026, giving a monthly take-home of around £2,200." },
    ],
    body: () => (
      <>
        <p>Northern Ireland has the lowest median full-time salary of any UK region or nation, but also among the lowest costs of living — particularly for housing. Belfast has a growing financial services, technology, and legal outsourcing sector that pays significantly above the Northern Ireland average, drawing professionals from across the UK attracted by the combination of career opportunities and affordable living.</p>

        <h2 id="average">Average salary in Northern Ireland 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Northern Ireland)</td><td>£30,200</td><td>~£2,200/month</td></tr>
            <tr><td>Mean full-time (Northern Ireland)</td><td>£32,500</td><td>~£2,355/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>

        <h2 id="by-sector">Northern Ireland salaries by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Financial services / legal outsourcing (Belfast)</td><td>£28,000–£75,000</td></tr>
            <tr><td>Technology / cybersecurity</td><td>£32,000–£85,000</td></tr>
            <tr><td>Healthcare (Health and Social Care)</td><td>£26,000–£80,000+</td></tr>
            <tr><td>Advanced manufacturing</td><td>£28,000–£60,000</td></tr>
            <tr><td>Education</td><td>£26,000–£55,000</td></tr>
            <tr><td>Civil service (NICS)</td><td>£24,000–£65,000</td></tr>
          </tbody>
        </table>

        <h2 id="belfast-tech">Belfast's growing tech and legal sector</h2>
        <p>Belfast has attracted significant financial services and legal outsourcing investment over the past decade. Allen &amp; Overy (now A&O Shearman), Herbert Smith Freehills, Baker McKenzie, and Citibank all operate significant Belfast operations employing lawyers, compliance, and financial analysts at £30,000–£65,000 — well above the Northern Ireland median but substantially below London rates for equivalent work. Concentrix, Liberty Mutual, and Citi technology operations bring software engineering roles paying £40,000–£80,000.</p>

        <h2 id="housing">The housing advantage</h2>
        <p>Northern Ireland's strongest financial advantage is housing. Average house prices in Belfast are approximately £185,000–£210,000 — around 40% below the UK average and 70% below London. Monthly rent for a one-bedroom city centre flat in Belfast is £750–£950. A professional on £30,200 (£2,200 take-home) retains approximately £1,250–£1,450 per month after rent — a better post-housing disposable income than many Londoners earning double the salary.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"},{path:"/insights/average-salary-scotland-2026",label:"Scotland Salary 2026"}]}
          salaries={[{amount:30200},{amount:36000},{amount:45000},{amount:60000},{amount:80000}]}
        />
      </>
    ),
  },

  // 52–56: Job title articles
  {
    slug: "solicitor-salary-uk-2026",
    title: "Solicitor Salary UK 2026: NQ to Partner Take-Home Pay",
    description: "UK solicitor salaries range from £42k (NQ, regional) to £180k+ (equity partner, City). See exact take-home pay at every level for 2026/27.",
    excerpt: "Solicitor salaries vary enormously — from £42,000 newly qualified at a regional firm to £180,000+ as a City equity partner. Here's take-home at every level.",
    category: "Career",
    keywords: ["solicitor salary uk 2026","lawyer salary uk 2026","nq solicitor salary","solicitor take home pay"],
    readMinutes: 5,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What does a newly qualified solicitor earn in the UK?", a: "NQ solicitor salaries range from £38,000–£42,000 at regional firms to £100,000–£150,000 at Magic Circle firms in London in 2026." },
    ],
    body: () => (
      <>
        <p>Solicitor salaries in the UK vary more than almost any other profession — from £26,000 for a first-year trainee at a regional firm to £200,000+ for a senior associate at a Magic Circle firm. The primary driver is firm type and location, followed by practice area. Here is the complete picture for 2026.</p>

        <h2 id="by-firm">Solicitor salary by firm type and level (2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Regional firm</th><th>National / City</th><th>Magic Circle</th></tr></thead>
          <tbody>
            <tr><td>Trainee (year 1)</td><td>£26,000</td><td>£38,000</td><td>£52,000</td></tr>
            <tr><td>Trainee (year 2)</td><td>£28,000</td><td>£42,000</td><td>£58,000</td></tr>
            <tr><td>NQ (newly qualified)</td><td>£38,000–£42,000</td><td>£55,000–£70,000</td><td>£100,000–£150,000</td></tr>
            <tr><td>3–5 PQE</td><td>£45,000–£55,000</td><td>£70,000–£90,000</td><td>£130,000–£175,000</td></tr>
            <tr><td>Senior Associate (6–8 PQE)</td><td>£55,000–£70,000</td><td>£90,000–£120,000</td><td>£160,000–£220,000</td></tr>
            <tr><td>Partner (equity)</td><td>£80,000–£150,000</td><td>£150,000–£400,000</td><td>£500,000–£2M+</td></tr>
          </tbody>
        </table>
        <p><small>Magic Circle firms: Allen &amp; Overy, Clifford Chance, Freshfields, Linklaters, Slaughter and May. "National/City" includes the Silver Circle and large US firms in London.</small></p>

        <h2 id="by-area">Salary by practice area</h2>
        <p>Within the same firm tier, practice area significantly affects earnings — both salary and bonus potential. Corporate/M&A and Finance lawyers earn the most; family law, legal aid, and criminal defence the least.</p>
        <table>
          <thead><tr><th>Practice area</th><th>5 PQE salary range</th></tr></thead>
          <tbody>
            <tr><td>Corporate / M&amp;A (City)</td><td>£130,000–£180,000</td></tr>
            <tr><td>Banking and Finance (City)</td><td>£120,000–£170,000</td></tr>
            <tr><td>Real Estate (City)</td><td>£90,000–£130,000</td></tr>
            <tr><td>Employment (National)</td><td>£55,000–£85,000</td></tr>
            <tr><td>Private Client / Family</td><td>£45,000–£75,000</td></tr>
            <tr><td>Criminal / Legal Aid</td><td>£30,000–£55,000</td></tr>
          </tbody>
        </table>

        <h2 id="takehome">Take-home pay examples</h2>
        <p>A newly qualified solicitor at a Magic Circle firm earning £110,000 takes home approximately £5,550/month after income tax and NI. The £100,000–£125,140 Personal Allowance taper applies, creating an effective 60% marginal rate in that band — meaning pension contributions or salary sacrifice are especially valuable. An NQ at a regional firm on £40,000 takes home approximately £2,750/month.</p>

        <h2 id="location">Regional vs London salaries</h2>
        <p>London pay premiums for solicitors are substantial at senior levels but narrow at junior levels. A trainee at a regional firm in Manchester or Bristol earns £26,000–£30,000 — similar to London regional firms but significantly below City firms. However, housing costs in regional cities are 40–60% lower than London, often making the real-terms financial position comparable or better at junior levels.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/personal-allowance-taper",label:"£100K Tax Trap Explained"}]}
          salaries={[{amount:38000},{amount:65000},{amount:100000},{amount:135000},{amount:180000}]}
        />
      </>
    ),
  },

  {
    slug: "gp-doctor-salary-uk-2026",
    title: "GP Doctor Salary UK 2026: Salaried, Partner & Locum Pay",
    description: "UK GP salaries in 2026: salaried GPs earn £70,300–£85,000, partners £100k–£130k+. See exact take-home pay for each type plus locum day rates.",
    excerpt: "Salaried GPs earn £70,300–£85,000 while GP partners can earn £100k–£130k+. Here is take-home pay for every type of GP role in 2026.",
    category: "Career",
    keywords: ["gp salary uk 2026","doctor salary uk 2026","gp take home pay","salaried gp salary 2026","gp partner salary"],
    readMinutes: 5,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is a GP salary in the UK in 2026?", a: "Salaried GPs earn £70,300–£85,000 per year in 2026. GP partners typically earn £100,000–£130,000+ from their share of practice profits. Locum GPs charge £700–£1,000 per day." },
    ],
    body: () => (
      <>
        <p>GP salaries in the UK vary significantly depending on employment model — salaried, partner, or locum. Following the 2023 contract disputes and the 2024/25 pay settlements, GP pay has improved but remains a source of ongoing negotiation between the BMA and NHS England.</p>

        <h2 id="by-type">GP salary by employment type (2026)</h2>
        <table>
          <thead><tr><th>Role</th><th>Gross earnings</th><th>Monthly take-home (est.)</th></tr></thead>
          <tbody>
            <tr><td>Salaried GP — BMA minimum</td><td>£70,300/year</td><td>~£3,990/month</td></tr>
            <tr><td>Salaried GP — experienced</td><td>£85,000–£100,000/year</td><td>~£4,630–£5,280/month</td></tr>
            <tr><td>GP Partner — average</td><td>£115,000–£135,000/year</td><td>~£5,630–£6,400/month</td></tr>
            <tr><td>Locum GP — day rate</td><td>£700–£1,200/day</td><td>Varies (self-employed)</td></tr>
          </tbody>
        </table>
        <p><small>Partner earnings are profit distributions, not salary. Take-home assumes PAYE for salaried GPs. Partners are self-employed and pay Income Tax through Self Assessment. Estimates before NHS pension contributions.</small></p>

        <h2 id="partners-vs-salaried">Partners vs salaried: the real financial difference</h2>
        <p>GP partners buy into a practice and receive a share of profits rather than a fixed salary. Average partner drawings are £115,000–£135,000, but partners also bear financial risk — NHS contract changes, property costs, and staffing costs come out of profit before distribution. Salaried GPs have employment rights and employer pension contributions but less earning upside. Partners who have owned premises can also benefit significantly from building equity.</p>

        <h2 id="pension">NHS pension — the hidden value</h2>
        <p>GP partners contribute 14.5% of pensionable pay to the NHS Pension Scheme. At £115,000, that is approximately £13,900/year, reducing net income significantly. However, the NHS Pension is a defined-benefit scheme based on career average earnings — its value in retirement is typically worth 30–40% more per pound contributed than a private defined-contribution pension. Salaried GPs contribute 12.5% and receive a 23.7% employer contribution on top.</p>

        <h2 id="junior-doctors">Junior doctor and training grade pay</h2>
        <table>
          <thead><tr><th>Grade</th><th>Basic salary (2026)</th><th>With typical additional hours</th></tr></thead>
          <tbody>
            <tr><td>Foundation Year 1 (FY1)</td><td>£36,616</td><td>£40,000–£46,000</td></tr>
            <tr><td>Foundation Year 2 (FY2)</td><td>£42,008</td><td>£46,000–£54,000</td></tr>
            <tr><td>ST1–ST2 (Core Training)</td><td>£55,329</td><td>£60,000–£70,000</td></tr>
            <tr><td>ST3–ST8 (Higher Specialty)</td><td>£63,152–£93,666</td><td>£70,000–£105,000</td></tr>
            <tr><td>Consultant</td><td>£99,532–£131,964</td><td>£105,000–£145,000</td></tr>
          </tbody>
        </table>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/nurse-salary-uk-2026",label:"NHS Nurse Salary 2026"},{path:"/insights/pharmacist-salary-uk-2026",label:"Pharmacist Salary 2026"}]}
          salaries={[{amount:70300},{amount:85000},{amount:115000},{amount:135000},{amount:160000}]}
        />
      </>
    ),
  },

  {
    slug: "project-manager-salary-uk-2026",
    title: "Project Manager Salary UK 2026: Junior to Director Take-Home",
    description: "UK project manager salaries range from £32k (junior) to £90k+ (director/head of PMO) in 2026. See exact take-home pay at every level.",
    excerpt: "Project management is one of the UK's most in-demand career paths. Here is take-home pay from junior PM to director of PMO in 2026.",
    category: "Career",
    keywords: ["project manager salary uk 2026","pm salary uk","project manager take home pay","senior project manager salary uk"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "What is the average project manager salary in the UK in 2026?", a: "The median project manager salary in the UK is approximately £48,000 in 2026, giving a monthly take-home of around £3,139." },
    ],
    body: () => (
      <>
        <p>Project management is one of the UK's most transferable professions — PMs work across technology, construction, finance, healthcare, and government. Salaries depend heavily on sector, the scale of projects managed, and certifications (PRINCE2, PMP, AgilePM, MSP). IT project managers consistently earn the most; construction and public sector PMs typically earn less but often have stronger job security and pension provision.</p>

        <h2 id="by-level">Project manager salary by level (2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Typical salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Junior / Associate PM</td><td>£30,000–£38,000</td><td>~£2,250/month</td></tr>
            <tr><td>Project Manager</td><td>£42,000–£58,000</td><td>~£2,960/month</td></tr>
            <tr><td>Senior Project Manager</td><td>£58,000–£75,000</td><td>~£3,600/month</td></tr>
            <tr><td>Programme Manager</td><td>£70,000–£95,000</td><td>~£4,280/month</td></tr>
            <tr><td>Portfolio / Director</td><td>£90,000–£130,000</td><td>~£5,100/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home at mid-point, England, no student loan. Senior+ roles in financial services and technology can exceed these figures substantially.</small></p>

        <h2 id="by-sector">Project manager salary by sector (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Mid-level PM salary</th><th>Senior PM salary</th></tr></thead>
          <tbody>
            <tr><td>Technology / IT</td><td>£52,000–£68,000</td><td>£70,000–£95,000</td></tr>
            <tr><td>Financial Services</td><td>£55,000–£72,000</td><td>£75,000–£105,000</td></tr>
            <tr><td>Pharmaceutical</td><td>£50,000–£68,000</td><td>£68,000–£95,000</td></tr>
            <tr><td>Construction / Infrastructure</td><td>£45,000–£60,000</td><td>£60,000–£85,000</td></tr>
            <tr><td>Central Government</td><td>£42,000–£58,000</td><td>£58,000–£80,000</td></tr>
            <tr><td>NHS / Healthcare</td><td>£42,000–£55,000</td><td>£55,000–£75,000</td></tr>
          </tbody>
        </table>

        <h2 id="certifications">The value of PM certifications</h2>
        <p>PMP (Project Management Professional) and PRINCE2 Practitioner are the most widely required certifications in UK job postings. A PMP-certified PM typically earns 10–20% more than an uncertified counterpart at the same experience level. Agile certifications (Scrum Master, SAFe) are increasingly valued in technology roles, particularly where scrum teams or product delivery is involved. The APM Project Management Qualification (PMQ) is the most widely recognised UK-specific qualification.</p>

        <h2 id="contracting">Contracting rates for PMs</h2>
        <p>Experienced PMs who move to contract roles typically charge £400–£700/day for technology and financial services projects. Central government digital projects frequently hire contract PMs at £500–£650/day. At £550/day over 220 days, gross income is £121,000 — substantially more than a permanent equivalent, though with no employer contributions, holiday pay, or job security.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/ir35",label:"IR35 Contractor Calculator"}]}
          salaries={[{amount:42000},{amount:58000},{amount:75000},{amount:95000},{amount:120000}]}
        />
      </>
    ),
  },

  {
    slug: "electrician-salary-uk-2026",
    title: "Electrician Salary UK 2026: Employed vs Self-Employed Take-Home",
    description: "UK electrician salaries in 2026: employed £34k–£48k, self-employed £40k–£70k+. See take-home pay for both — including the self-employed tax advantage.",
    excerpt: "Electricians earn £34k–£48k employed and £40k–£70k+ self-employed in 2026. The self-employed route keeps more — here is exactly how much.",
    category: "Career",
    keywords: ["electrician salary uk 2026","electrician take home pay","self employed electrician salary","electrician wages uk"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "How much does an electrician earn in the UK in 2026?", a: "Employed electricians earn £34,000–£48,000 depending on experience and region. Self-employed electricians typically earn £40,000–£70,000+ and retain more due to tax-deductible business expenses." },
    ],
    body: () => (
      <>
        <p>Electricians are among the best-paid skilled tradespeople in the UK. Demand has risen sharply with the growth in EV charging infrastructure, solar panel installation, and the drive to upgrade the UK's housing stock to net-zero standards. Fully qualified electricians with 18th Edition wiring regulations and ECS Gold Cards command premium rates.</p>

        <h2 id="employed">Employed electrician salary (2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Annual salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Apprentice (year 1–2)</td><td>£12,000–£18,000</td><td>~£1,050–£1,380/month</td></tr>
            <tr><td>Apprentice (year 3–4)</td><td>£18,000–£25,000</td><td>~£1,380–£1,775/month</td></tr>
            <tr><td>Newly qualified (JIB Grade A)</td><td>£30,000–£34,000</td><td>~£2,115–£2,385/month</td></tr>
            <tr><td>Experienced (5+ years)</td><td>£38,000–£45,000</td><td>~£2,640–£2,940/month</td></tr>
            <tr><td>Supervisor / Foreman</td><td>£42,000–£55,000</td><td>~£2,820–£3,380/month</td></tr>
            <tr><td>Electrical Engineer / Designer</td><td>£50,000–£70,000</td><td>~£3,190–£4,040/month</td></tr>
          </tbody>
        </table>

        <h2 id="selfemployed">Self-employed electrician earnings</h2>
        <p>Self-employed electricians charging £200–£350/day (domestic and small commercial) on 200–230 working days earn gross revenue of £40,000–£80,000/year before materials. After tools, van, insurance, and material costs (typically £10,000–£20,000/year), net profit before tax is £30,000–£60,000 for a busy sole trader. Industrial and commercial electricians charging £350–£600/day can earn considerably more.</p>
        <p>Self-employed electricians pay Income Tax and Class 4 NI on profit through Self Assessment. On £50,000 profit, after the Personal Allowance, take-home is approximately £34,800 — a lower effective rate than employed status partly because there is no employer NI. Use our <ToolLink to="/self-employed">self-employed calculator</ToolLink> to model your take-home on any profit level.</p>

        <h2 id="specialisms">Highest-earning specialisms</h2>
        <p><strong>EV charging installation:</strong> Rising demand from domestic EV owners and commercial fleet operators. Qualified EV charge point installers (OZEV-approved) typically charge £150–£300 per installation plus equipment, with experienced operators fitting 3–5 units per day.</p>
        <p><strong>Solar PV and battery storage:</strong> MCS-accredited solar installers combining electrical work with solar design can charge £600–£1,000/day for commercial installations.</p>
        <p><strong>Industrial maintenance:</strong> Electricians working in manufacturing, utilities, or data centres on contract rates earn £350–£600/day, with some specialist roles (HV authorised person) commanding £700–£900/day.</p>
        <p><strong>London premium:</strong> London electricians earn approximately 20–30% above national averages due to higher labour market rates, travel time costs, and complex commercial/heritage building work.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/self-employed",label:"Self-Employed Tax Calculator"},{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/hgv-driver-salary-uk-2026",label:"HGV Driver Salary 2026"}]}
          salaries={[{amount:32000},{amount:40000},{amount:50000},{amount:65000},{amount:80000}]}
        />
      </>
    ),
  },

  {
    slug: "hgv-driver-salary-uk-2026",
    title: "HGV Driver Salary UK 2026: Cat C, Cat C+E & Agency Take-Home",
    description: "UK HGV driver salaries in 2026: Cat C £32k–£38k, Cat C+E £36k–£48k, agency/tramping £45k–£60k+. See exact take-home pay for each type.",
    excerpt: "HGV driver salaries remain elevated after post-pandemic shortages. Cat C+E drivers earn £36k–£48k with agency and tramping work pushing well above £50k.",
    category: "Career",
    keywords: ["hgv driver salary uk 2026","lorry driver salary uk","hgv driver take home pay","cat c+e driver salary","class 1 hgv driver salary"],
    readMinutes: 4,
    publishedISO: "2026-05-24",
    updatedISO: "2026-05-24",
    faq: [
      { q: "How much does an HGV driver earn in the UK in 2026?", a: "A Cat C (rigid) HGV driver earns £32,000–£38,000. A Cat C+E (articulated) driver earns £36,000–£48,000. Agency and tramping drivers can earn £45,000–£60,000+." },
    ],
    body: () => (
      <>
        <p>HGV driver salaries have remained elevated since the acute shortage of 2021, which saw pay rise by 15–25% in a single year. While the shortage has eased, structural demand — particularly from last-mile delivery, cold chain logistics, and supermarket distribution — continues to support pay well above pre-shortage levels.</p>

        <h2 id="by-licence">HGV driver salary by licence type (2026)</h2>
        <table>
          <thead><tr><th>Licence</th><th>Salary range</th><th>Monthly take-home (mid)</th></tr></thead>
          <tbody>
            <tr><td>Cat C1 (medium goods, 3.5–7.5t)</td><td>£28,000–£33,000</td><td>~£2,060/month</td></tr>
            <tr><td>Cat C (Class 2 rigid, 7.5t+)</td><td>£32,000–£38,000</td><td>~£2,440/month</td></tr>
            <tr><td>Cat C+E (Class 1 articulated)</td><td>£36,000–£48,000</td><td>~£2,850/month</td></tr>
            <tr><td>Agency / temp (Class 1)</td><td>£40,000–£55,000</td><td>~£3,200/month</td></tr>
            <tr><td>Owner-driver / self-employed</td><td>£50,000–£80,000+</td><td>Varies</td></tr>
          </tbody>
        </table>

        <h2 id="sectors">Best-paying sectors for HGV drivers</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical annual salary</th><th>Notes</th></tr></thead>
          <tbody>
            <tr><td>Fuel tanker</td><td>£48,000–£60,000</td><td>ADR qualification required; premium for hazmat</td></tr>
            <tr><td>Cold chain / refrigerated</td><td>£38,000–£50,000</td><td>Temperature-controlled licence premium</td></tr>
            <tr><td>Supermarket distribution</td><td>£36,000–£48,000</td><td>Regular hours; good benefits; pension</td></tr>
            <tr><td>Parcel delivery (Class 1)</td><td>£34,000–£44,000</td><td>High mileage; night work common</td></tr>
            <tr><td>Construction / tipper</td><td>£34,000–£44,000</td><td>CSCS often required</td></tr>
            <tr><td>General haulage</td><td>£30,000–£40,000</td><td>Most common; competitive market</td></tr>
          </tbody>
        </table>

        <h2 id="agency-vs-employed">Agency vs direct employment</h2>
        <p>Agency HGV drivers typically earn 15–25% more per hour than equivalent directly employed drivers, but with no guaranteed hours, no holiday pay (unless PAYE umbrella), and no employer pension contributions. A Class 1 agency driver working through a PAYE umbrella company on £19–£22/hour for 48 hours/week can earn £47,000–£55,000 gross — but the umbrella company takes margin (typically £20–£30/week), and take-home holidays must be self-managed. Direct employment generally offers better stability, benefits, and pension, while agency offers higher earning potential for those who can secure consistent work.</p>

        <h2 id="owner-driver">Owner-drivers and self-employed</h2>
        <p>Owner-drivers operating their own vehicle under an operator's licence can earn £60,000–£100,000+ gross revenue, but bear significant costs: truck finance or purchase (£400–£1,200/month), insurance (£3,000–£8,000/year), fuel, maintenance, and compliance costs. Net profit after running costs for a busy owner-driver is typically £35,000–£60,000 — broadly comparable to top-end employed rates but with asset ownership and business risk.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/self-employed",label:"Self-Employed Calculator"},{path:"/hourly",label:"Hourly Rate Calculator"}]}
          salaries={[{amount:32000},{amount:40000},{amount:48000},{amount:55000},{amount:70000}]}
        />
      </>
    ),
  },

  // --- PROFESSION SALARY ARTICLES ---

  {
    slug: "police-officer-salary-uk-2026",
    title: "Police Officer Salary UK 2026: Take-Home Pay by Rank",
    description: "UK police officer salaries 2026 by rank — from Constable to Chief Superintendent. See exact monthly take-home pay after tax and NI.",
    excerpt: "A newly qualified Police Constable earns £26,682 in 2026. After tax and NI, that's approximately £1,870/month. Here's take-home for every rank.",
    category: "Career",
    keywords: ["police officer salary uk 2026","police constable salary take home","uk police pay 2026","police sergeant salary uk","inspector salary uk 2026"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "How much does a Police Constable earn in 2026?", a: "A newly joined Police Constable earns £26,682 during their probationary period. After two years' service, pay rises to the constable scale of £30,456–£46,044, depending on force and service length. Monthly take-home at the starting rate is approximately £1,870 after income tax and National Insurance." },
      { q: "How much more do Metropolitan Police officers earn?", a: "Metropolitan Police officers receive a London weighting allowance on top of the national pay scale. A Metropolitan PC earns £31,011 on appointment, rising to £46,044 at the top of the scale. Inner London officers additionally receive a £1,000–£2,000 per year location allowance." },
      { q: "Do police officers pay pension contributions?", a: "Yes — police officers contribute to the Police Pension Scheme. Contribution rates range from 12.44% to 13.78% of pensionable pay depending on earnings. These come after income tax and NI, so they reduce take-home further but build a substantial defined-benefit pension." },
    ],
    body: () => (
      <>
        <p>Police officer pay in England and Wales is set by the Police Remuneration Review Body. Here's every rank's salary and monthly take-home for 2026.</p>
        <h2 id="ranks">Police salary by rank (2026)</h2>
        <table>
          <thead><tr><th>Rank</th><th>Salary range</th><th>Est. monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Police Constable (on appointment)</td><td>£26,682</td><td>~£1,870/month</td></tr>
            <tr><td>Police Constable (scale)</td><td>£30,456–£46,044</td><td>~£2,120–£2,940/month</td></tr>
            <tr><td>Sergeant</td><td>£47,472–£49,977</td><td>~£3,010–£3,160/month</td></tr>
            <tr><td>Inspector</td><td>£58,332–£62,532</td><td>~£3,560–£3,790/month</td></tr>
            <tr><td>Chief Inspector</td><td>£65,621–£70,533</td><td>~£3,920–£4,190/month</td></tr>
            <tr><td>Superintendent</td><td>£83,931–£88,440</td><td>~£4,740–£4,980/month</td></tr>
            <tr><td>Chief Superintendent</td><td>£92,058–£96,483</td><td>~£5,140–£5,370/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home estimates assume England (outside London), no student loan, before pension contributions. Metropolitan Police officers receive a London weighting on top of the figures above.</small></p>
        <h2 id="allowances">Additional allowances</h2>
        <p>Police officers may receive additional pensionable allowances, including shift disturbance allowance (up to £3,399/year), on-call allowance, and, for detectives, a detective allowance. Officers in London receive a London weighting that adds £1,000–£2,500/year to gross pay.</p>
        <h2 id="pension">Police pension impact on take-home</h2>
        <p>Police pension contributions are 12.44%–13.78% of pensionable pay, taken after tax and NI. At a Constable mid-point salary of ~£38,000, contributions are approximately £460–£520/month. This reduces take-home significantly but builds one of the most generous defined-benefit pensions in the public sector.</p>
        <h2 id="scotland">Scotland</h2>
        <p>Police Scotland officers are paid on the same national framework but subject to Scottish income tax rates, which are higher for earnings above £43,662. A Constable on £38,000 in Scotland pays approximately £470 more per year in income tax than an equivalent officer in England.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/take-home",label:"Scottish Take-Home"}]}
          salaries={[{amount:26682},{amount:38000},{amount:47472},{amount:58332},{amount:83931}]}
        />
      </>
    ),
  },

  {
    slug: "paramedic-salary-uk-2026",
    title: "Paramedic Salary UK 2026: NHS Take-Home Pay by Band",
    description: "NHS paramedic salaries 2026 — from Student Paramedic to Consultant. Take-home pay after tax and NI for every AfC band, plus private sector rates.",
    excerpt: "An NHS Band 5 paramedic earns £29,970–£36,483 in 2026. Monthly take-home at the midpoint is approximately £2,270 after tax and NI.",
    category: "Career",
    keywords: ["paramedic salary uk 2026","nhs paramedic pay bands 2026","band 5 paramedic take home","ambulance technician salary uk","advanced paramedic salary 2026"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "What is the starting salary for a paramedic in the UK in 2026?", a: "A newly qualified NHS paramedic starts on Agenda for Change Band 5, which pays £29,970–£36,483 per year. Monthly take-home at the starting point is approximately £2,050 after income tax and National Insurance." },
      { q: "How much does a specialist paramedic earn?", a: "Specialist Paramedics are typically Band 6, earning £37,338–£44,962 per year. Monthly take-home ranges from approximately £2,610 to £3,010 after tax and NI." },
      { q: "Can paramedics earn more in the private sector?", a: "Yes. Private ambulance operators pay £28,000–£40,000 for qualified paramedics, broadly in line with NHS Band 5–6. Offshore, aviation, and event medical roles can pay £40,000–£60,000+, though these lack NHS benefits and the defined-benefit pension." },
    ],
    body: () => (
      <>
        <p>NHS paramedics are employed under the Agenda for Change (AfC) pay framework, the same as nurses and other NHS clinical staff. Here's every relevant band's gross salary and monthly take-home for 2026.</p>
        <h2 id="bands">NHS paramedic salary by band (2026)</h2>
        <table>
          <thead><tr><th>Role / Band</th><th>Gross salary range</th><th>Monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Emergency Care Assistant (Band 3)</td><td>£24,625–£26,259</td><td>~£1,810/month</td></tr>
            <tr><td>Ambulance Technician (Band 4)</td><td>£26,530–£29,114</td><td>~£1,930/month</td></tr>
            <tr><td>Paramedic — newly qualified (Band 5)</td><td>£29,970–£36,483</td><td>~£2,270/month</td></tr>
            <tr><td>Specialist Paramedic (Band 6)</td><td>£37,338–£44,962</td><td>~£2,810/month</td></tr>
            <tr><td>Advanced Paramedic (Band 7)</td><td>£46,148–£52,809</td><td>~£3,140/month</td></tr>
            <tr><td>Consultant Paramedic (Band 8a)</td><td>£53,755–£60,504</td><td>~£3,530/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home estimated at mid-point, England, no student loan, before NHS pension contribution.</small></p>
        <h2 id="unsocial">Unsocial hours supplements</h2>
        <p>Paramedics regularly work nights, weekends, and bank holidays. AfC unsocial hours supplements add 30% for Saturday evenings and Sunday work and 50–60% for nights and bank holidays. A Band 5 paramedic working a standard mixed shift pattern typically earns an additional £2,500–£4,500/year from these supplements, which are pensionable.</p>
        <h2 id="pension">NHS pension for paramedics</h2>
        <p>NHS paramedics contribute 5.2%–12.5% to the NHS Pension Scheme depending on earnings. At Band 5 (mid-point ~£33,000), contributions are approximately £143/month, reducing take-home further but building a defined-benefit pension.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/nurse-salary-uk-2026",label:"NHS Nurse Salary 2026"}]}
          salaries={[{amount:29970},{amount:33000},{amount:37338},{amount:46148},{amount:53755}]}
        />
      </>
    ),
  },

  {
    slug: "dentist-salary-uk-2026",
    title: "Dentist Salary UK 2026: NHS vs Private Take-Home Pay",
    description: "UK dentist salaries in 2026 — NHS salaried, NHS associate, private and mixed practice. Exact monthly take-home after tax and NI for each career stage.",
    excerpt: "An NHS salaried dentist earns £42,000–£83,000 in 2026. Private associate dentists can earn £70,000–£150,000+. Here's the full salary picture.",
    category: "Career",
    keywords: ["dentist salary uk 2026","nhs dentist salary take home","private dentist salary uk 2026","associate dentist earnings uk","dental foundation training salary 2026"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "How much does a dentist earn in the UK in 2026?", a: "It depends on the employment model. NHS salaried dentists earn £42,000–£83,000. NHS associate dentists earn £40,000–£70,000 depending on NHS Unit of Dental Activity (UDA) targets. Private associate dentists earn £70,000–£150,000+, and principal/partner dentists in well-established practices can earn significantly more." },
      { q: "What is the take-home pay for a foundation dentist?", a: "Dental Foundation Trainees earn a salary of approximately £32,000–£35,000 in 2026. After income tax and National Insurance, monthly take-home is approximately £2,240–£2,440." },
      { q: "Do dentists pay more tax as self-employed associates?", a: "NHS associate dentists are typically self-employed and must register for Self Assessment. They pay Income Tax and Class 4 NI on profits, but can deduct allowable business expenses (instruments, indemnity insurance, lab fees). Many structure their practice through a limited company once earnings are sufficient to make it tax-efficient." },
    ],
    body: () => (
      <>
        <p>Dentist earnings in the UK vary dramatically depending on whether you work for the NHS, privately, or in a mixed practice, and at what career stage you are.</p>
        <h2 id="career-stages">Dentist salary by career stage (2026)</h2>
        <table>
          <thead><tr><th>Career Stage</th><th>Gross salary / earnings</th><th>Est. monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Dental Foundation Trainee</td><td>£32,000–£35,000</td><td>~£2,340/month</td></tr>
            <tr><td>Dental Core Trainee (DCT 1–3)</td><td>£37,000–£48,000</td><td>~£2,640–£3,100/month</td></tr>
            <tr><td>NHS Salaried Dentist</td><td>£42,000–£83,000</td><td>~£2,820–£4,630/month</td></tr>
            <tr><td>NHS Associate Dentist</td><td>£40,000–£70,000</td><td>~£2,750–£4,100/month</td></tr>
            <tr><td>Private Associate Dentist</td><td>£70,000–£150,000</td><td>~£4,100–£7,200/month</td></tr>
            <tr><td>Principal / Partner Dentist</td><td>£80,000–£200,000+</td><td>~£4,600–£8,500+/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home estimated assuming employed status (PAYE). Self-employed associates will differ based on business expenses and structure. Estimates before pension contributions.</small></p>
        <h2 id="nhs-vs-private">NHS vs private: which pays more?</h2>
        <p>Private dentistry almost always pays more gross — but comes with higher overhead risk for principals, and no NHS pension for self-employed associates. NHS salaried dentists benefit from the NHS Pension Scheme (a defined-benefit pension) and employment rights. Many dentists work a mixed model: NHS for stability, private for earnings growth.</p>
        <h2 id="london">London premium</h2>
        <p>London private dentists typically earn 20–40% above the national average, driven by patient spending power and higher patient fees. NHS salaried dentists in London receive a High-Cost Area Supplement (18–20% of salary), adding approximately £7,500–£16,000/year for central London roles.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/self-employed",label:"Self-Employed Tax Calculator"}]}
          salaries={[{amount:35000},{amount:48000},{amount:70000},{amount:100000},{amount:150000}]}
        />
      </>
    ),
  },

  {
    slug: "pharmacist-salary-uk-2026",
    title: "Pharmacist Salary UK 2026: NHS, Community and Hospital Pay",
    description: "UK pharmacist salaries in 2026 — NHS Bands 6–8, community pharmacy and hospital. Monthly take-home after tax and NI for every career level.",
    excerpt: "A newly qualified NHS pharmacist earns £37,338–£44,962 on Band 6. Monthly take-home at the midpoint is approximately £2,810 after tax and NI.",
    category: "Career",
    keywords: ["pharmacist salary uk 2026","nhs pharmacist pay bands 2026","community pharmacist salary uk","hospital pharmacist salary 2026","band 6 pharmacist take home"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "What band is a newly qualified pharmacist in the NHS?", a: "Most newly qualified pharmacists enter the NHS on Band 6, which pays £37,338–£44,962 per year in 2026. Monthly take-home at the starting point is approximately £2,610 after income tax and National Insurance." },
      { q: "How much does a community pharmacist earn in 2026?", a: "Community pharmacists (working in high-street or supermarket pharmacies) typically earn £32,000–£55,000 depending on experience and responsibility. Superintendent Pharmacists overseeing multiple branches can earn £60,000–£90,000+." },
      { q: "Can pharmacists increase their earnings?", a: "Yes — through Independent Prescriber qualifications, which allow pharmacists to prescribe medicines and command a Band 7 or higher salary in the NHS. Specialist and clinical pharmacists in areas like oncology or critical care earn Band 7–8a. Sector moves to industry (medical affairs, pharma) can reach £60,000–£100,000+." },
    ],
    body: () => (
      <>
        <p>Pharmacist salaries in the UK span a wide range depending on sector (NHS, community, hospital, industry) and level of responsibility. Here's the full picture for 2026.</p>
        <h2 id="nhs-bands">NHS pharmacist salary by band (2026)</h2>
        <table>
          <thead><tr><th>Role / Band</th><th>Gross salary range</th><th>Monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Pre-registration Trainee (Band 5)</td><td>£29,970–£36,483</td><td>~£2,270/month</td></tr>
            <tr><td>Pharmacist — newly qualified (Band 6)</td><td>£37,338–£44,962</td><td>~£2,810/month</td></tr>
            <tr><td>Clinical / Specialist Pharmacist (Band 7)</td><td>£46,148–£52,809</td><td>~£3,140/month</td></tr>
            <tr><td>Principal Pharmacist (Band 8a)</td><td>£53,755–£60,504</td><td>~£3,530/month</td></tr>
            <tr><td>Deputy Chief Pharmacist (Band 8b)</td><td>£62,215–£72,293</td><td>~£3,940–£4,340/month</td></tr>
            <tr><td>Chief Pharmacist (Band 8c–8d)</td><td>£74,290–£101,677</td><td>~£4,410–£5,580/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home at mid-point, England, no student loan, before NHS pension contribution.</small></p>
        <h2 id="community">Community pharmacy</h2>
        <p>Community pharmacists working in Boots, Lloyds, Well, or independent pharmacies earn £32,000–£50,000 typically. Experienced Superintendent Pharmacists overseeing multiple stores earn £60,000–£90,000+. Community pay is often above NHS Band 6 at entry level but lacks the NHS Pension Scheme's defined benefit.</p>
        <h2 id="industry">Pharmaceutical industry</h2>
        <p>Pharmacists moving into medical affairs, regulatory, clinical research or medical science liaison (MSL) roles typically earn £50,000–£90,000 with strong bonus structures. Senior director-level industry roles can exceed £120,000.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/nurse-salary-uk-2026",label:"NHS Nurse Pay 2026"}]}
          salaries={[{amount:37338},{amount:41000},{amount:46148},{amount:53755},{amount:75000}]}
        />
      </>
    ),
  },

  {
    slug: "physiotherapist-salary-uk-2026",
    title: "Physiotherapist Salary UK 2026: NHS Bands + Private Pay",
    description: "UK physiotherapist salaries in 2026 — NHS AfC Bands 5–8, private clinic and MSK pay. Monthly take-home after tax and NI for every career stage.",
    excerpt: "A newly qualified NHS physiotherapist earns £29,970–£36,483 on Band 5. Monthly take-home at the midpoint is approximately £2,270 after tax and NI.",
    category: "Career",
    keywords: ["physiotherapist salary uk 2026","nhs physiotherapist pay 2026","band 6 physiotherapist salary take home","private physiotherapist earnings uk","advanced physiotherapist salary 2026"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "How much does a newly qualified physiotherapist earn in the UK?", a: "A newly qualified NHS physiotherapist starts on Band 5, earning £29,970–£36,483 per year in 2026. Monthly take-home at the starting point is approximately £2,050 after income tax and National Insurance." },
      { q: "How much can a senior physiotherapist earn?", a: "Senior (Band 7) physiotherapists earn £46,148–£52,809. At mid-point, monthly take-home is approximately £3,140 after tax and NI. Advanced and Consultant Physiotherapists on Band 8a earn £53,755–£60,504." },
      { q: "Do private physiotherapists earn more than NHS?", a: "Self-employed private physiotherapists can earn more per hour — typically £40–£80/hour for MSK or sports physiotherapy — but bear clinic costs, indemnity insurance, and business risk. Net earnings for a busy private physiotherapist (20–25 clinical hours/week) are typically £45,000–£75,000, higher than NHS Band 5–6 but with less job security." },
    ],
    body: () => (
      <>
        <p>Physiotherapists in the NHS are employed on the Agenda for Change (AfC) pay framework. Here's every relevant band and monthly take-home for 2026, plus private sector comparisons.</p>
        <h2 id="nhs-bands">NHS physiotherapist salary by band (2026)</h2>
        <table>
          <thead><tr><th>Role / Band</th><th>Gross salary range</th><th>Monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Physiotherapist — newly qualified (Band 5)</td><td>£29,970–£36,483</td><td>~£2,270/month</td></tr>
            <tr><td>Specialist Physiotherapist (Band 6)</td><td>£37,338–£44,962</td><td>~£2,810/month</td></tr>
            <tr><td>Advanced Physiotherapist (Band 7)</td><td>£46,148–£52,809</td><td>~£3,140/month</td></tr>
            <tr><td>Consultant Physiotherapist (Band 8a)</td><td>£53,755–£60,504</td><td>~£3,530/month</td></tr>
            <tr><td>Head of Physiotherapy (Band 8b)</td><td>£62,215–£72,293</td><td>~£3,940–£4,340/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home at mid-point, England, no student loan, before NHS pension contribution.</small></p>
        <h2 id="private">Private physiotherapy earnings</h2>
        <p>Private physiotherapists charge £50–£100/hour for MSK, sports, and neuro rehab sessions. A busy sole trader seeing 20 clinical hours per week earns gross revenue of approximately £52,000–£104,000/year, before clinic costs of typically £15,000–£25,000. Net earnings for an established private practice typically reach £45,000–£75,000.</p>
        <h2 id="specialisms">High-earning specialisms</h2>
        <p>Sports physiotherapists at Premier League clubs earn £60,000–£90,000+. Occupational health physiotherapists employed by large employers typically earn £45,000–£65,000. Those moving into extended scope practice (e.g., first contact practitioners in GP surgeries) sit at Band 7–8a NHS equivalent.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/self-employed",label:"Self-Employed Tax Calculator"}]}
          salaries={[{amount:29970},{amount:37338},{amount:46148},{amount:53755},{amount:65000}]}
        />
      </>
    ),
  },

  {
    slug: "firefighter-salary-uk-2026",
    title: "Firefighter Salary UK 2026: Take-Home Pay by Watch and Rank",
    description: "UK firefighter salaries 2026 — from Trainee to Group Manager. See monthly take-home pay after tax and NI, plus retained and on-call rates.",
    excerpt: "A competent UK firefighter earns £33,019–£37,937 in 2026. Monthly take-home at mid-range is approximately £2,350. Here's the full pay picture.",
    category: "Career",
    keywords: ["firefighter salary uk 2026","fire service pay 2026","crew manager salary uk","watch manager salary uk","firefighter take home pay 2026"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "How much does a firefighter earn in the UK in 2026?", a: "A competent (fully qualified) firefighter in England earns £33,019–£37,937 per year in 2026, depending on their fire service. Monthly take-home at the midpoint is approximately £2,350 after income tax and National Insurance." },
      { q: "How much do retained (on-call) firefighters earn?", a: "Retained and on-call firefighters receive an annual retaining fee (typically £2,500–£5,000) plus a drill fee per training session and a fire call fee per incident. Active retained firefighters typically earn £8,000–£18,000 per year on top of their primary employment." },
      { q: "Do firefighters get a good pension?", a: "Firefighters who joined before April 2015 are on the Firefighters' Pension Scheme 1992, one of the most generous public sector pensions. Those joining since 2015 are on the 2015 Career Average Revalued Earnings (CARE) scheme, which is still above most private sector provision. Employee contributions are 14.5%–15.5% of pensionable pay." },
    ],
    body: () => (
      <>
        <p>Firefighter pay is negotiated nationally between the National Joint Council (NJC) for Local Authority Fire and Rescue Services and the Fire Brigades Union (FBU). Here's every rank's salary and take-home for 2026.</p>
        <h2 id="ranks">Firefighter salary by rank (2026)</h2>
        <table>
          <thead><tr><th>Rank</th><th>Salary range</th><th>Est. monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Trainee Firefighter (year 1)</td><td>£25,584</td><td>~£1,800/month</td></tr>
            <tr><td>Competent Firefighter</td><td>£33,019–£37,937</td><td>~£2,350/month</td></tr>
            <tr><td>Crew Manager</td><td>£39,427–£42,195</td><td>~£2,680/month</td></tr>
            <tr><td>Watch Manager</td><td>£44,357–£47,396</td><td>~£2,960/month</td></tr>
            <tr><td>Station Manager</td><td>£52,428–£56,141</td><td>~£3,280/month</td></tr>
            <tr><td>Group Manager</td><td>£60,939–£65,393</td><td>~£3,730/month</td></tr>
            <tr><td>Area Manager</td><td>£70,993–£78,001</td><td>~£4,200/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home at mid-point, England, no student loan, before pension contributions. Salary ranges reflect national NJC rates; some metropolitan brigades pay above these figures.</small></p>
        <h2 id="pension">Firefighter pension contributions</h2>
        <p>Firefighters on the 2015 CARE Scheme contribute 14.5%–15.5% of pensionable pay. On a competent firefighter salary of £35,000, contributions are approximately £425–£455/month — substantial, but building a strong final salary-linked pension.</p>
        <h2 id="london">London Fire Brigade</h2>
        <p>London Fire Brigade firefighters earn approximately 10–15% above the national rate to reflect London's cost of living. A competent LFB firefighter earns approximately £39,000–£44,000, with monthly take-home around £2,610–£2,890 before pension.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/police-officer-salary-uk-2026",label:"Police Officer Salary 2026"}]}
          salaries={[{amount:25584},{amount:35000},{amount:39427},{amount:44357},{amount:52428}]}
        />
      </>
    ),
  },

  {
    slug: "social-worker-salary-uk-2026",
    title: "Social Worker Salary UK 2026: Council and NHS Take-Home Pay",
    description: "UK social worker salaries 2026 — from Newly Qualified (ASYE) to Team Manager. Monthly take-home after tax and NI, plus London and agency rates.",
    excerpt: "A Newly Qualified Social Worker earns £28,000–£35,000 in 2026. Monthly take-home at midpoint is approximately £2,060. Team managers earn £48,000–£58,000.",
    category: "Career",
    keywords: ["social worker salary uk 2026","nqsw salary uk 2026","team manager social worker salary","social worker take home pay 2026","local authority social worker salary 2026"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "How much does a newly qualified social worker earn in 2026?", a: "A Newly Qualified Social Worker (NQSW) completing the Assessed and Supported Year in Employment (ASYE) earns £28,000–£35,000 depending on local authority and region. Monthly take-home at the midpoint is approximately £2,060 after income tax and National Insurance." },
      { q: "Do London social workers earn significantly more?", a: "Yes. Local authorities in Inner London pay a London weighting allowance of £5,000–£8,000 on top of the base salary. Social workers employed in Inner London boroughs can earn £38,000–£45,000 as NQSWs, and £50,000–£65,000 as Team Managers." },
      { q: "Can social workers earn more as agency workers?", a: "Agency social workers typically earn £30–£45 per hour, which can result in gross income of £60,000–£90,000+ per year for those working full-time. However, agency workers are self-employed (or via umbrella/limited company), meaning they pay all their own NI, receive no employer pension, and have no employment rights." },
    ],
    body: () => (
      <>
        <p>Social worker salaries are set by individual local authorities and NHS trusts, within nationally recommended pay grades from the Local Government Employers. Here's a clear picture for 2026.</p>
        <h2 id="career">Social worker salary by career stage (2026)</h2>
        <table>
          <thead><tr><th>Role</th><th>Salary range</th><th>Est. monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Newly Qualified Social Worker (ASYE)</td><td>£28,000–£35,000</td><td>~£2,060/month</td></tr>
            <tr><td>Qualified Social Worker</td><td>£35,000–£42,000</td><td>~£2,530/month</td></tr>
            <tr><td>Senior / Experienced Social Worker</td><td>£42,000–£50,000</td><td>~£2,950/month</td></tr>
            <tr><td>Advanced Practitioner</td><td>£48,000–£56,000</td><td>~£3,180/month</td></tr>
            <tr><td>Team Manager / Practice Lead</td><td>£48,000–£58,000</td><td>~£3,210/month</td></tr>
            <tr><td>Service Manager / Head of Service</td><td>£58,000–£75,000</td><td>~£3,590/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home at mid-point, England (outside London), before pension contributions. Local government pension contributions (LGPS) are typically 5.5%–12.5% and will reduce take-home further.</small></p>
        <h2 id="pension">Local Government Pension Scheme</h2>
        <p>Most local authority social workers are enrolled in the Local Government Pension Scheme (LGPS). Employee contributions are 5.5%–12.5% depending on earnings. These contributions are taken before NI but after income tax, reducing take-home but building a defined-benefit pension.</p>
        <h2 id="specialisms">Highest-paid specialisms</h2>
        <p>Children's Services social workers — particularly in child protection and looked-after children — are in highest demand and attract the largest salaries and retention packages. Adult mental health and CAMHS social workers also attract premiums. Agency social workers in child protection earn the most in gross terms, though net income varies by tax structure.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/two-jobs",label:"Two Jobs Calculator"}]}
          salaries={[{amount:31500},{amount:38500},{amount:46000},{amount:53000},{amount:65000}]}
        />
      </>
    ),
  },

  {
    slug: "data-analyst-salary-uk-2026",
    title: "Data Analyst Salary UK 2026: Take-Home Pay by Experience Level",
    description: "UK data analyst salaries in 2026 — from junior to senior and lead. Monthly take-home after tax and NI, plus data scientist and engineer comparisons.",
    excerpt: "A junior UK data analyst earns £26,000–£35,000 in 2026. Senior data analysts earn £50,000–£70,000. Here's take-home pay at every level.",
    category: "Career",
    keywords: ["data analyst salary uk 2026","junior data analyst salary uk","senior data analyst salary uk 2026","data scientist salary uk 2026","analytics salary uk take home"],
    readMinutes: 5,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "What is the starting salary for a data analyst in the UK?", a: "A junior or graduate data analyst typically earns £26,000–£35,000 in the UK in 2026. Monthly take-home at the midpoint is approximately £2,100 after income tax and National Insurance." },
      { q: "How much does a senior data analyst earn?", a: "Senior data analysts with 4–7 years of experience earn £50,000–£70,000 in 2026. Monthly take-home at the midpoint is approximately £3,400 after tax and NI. London-based senior analysts typically earn £55,000–£80,000." },
      { q: "How does a data analyst salary compare to a data scientist?", a: "Data scientists with machine learning and modelling skills typically earn 15–25% more than equivalent-level data analysts. A mid-level data scientist earns £50,000–£70,000 vs £40,000–£55,000 for an equivalent data analyst. The gap narrows at senior level where domain expertise becomes paramount." },
    ],
    body: () => (
      <>
        <p>Data analytics is one of the UK's fastest-growing career fields. Salaries vary significantly by experience, specialism, and industry. Here's the full pay picture for 2026.</p>
        <h2 id="levels">Data analyst salary by experience (2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Salary range</th><th>Est. monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Graduate / Junior (0–2 years)</td><td>£26,000–£35,000</td><td>~£2,100/month</td></tr>
            <tr><td>Mid-Level (2–5 years)</td><td>£35,000–£50,000</td><td>~£2,720/month</td></tr>
            <tr><td>Senior Data Analyst (5–8 years)</td><td>£50,000–£70,000</td><td>~£3,400/month</td></tr>
            <tr><td>Principal / Lead Data Analyst</td><td>£65,000–£85,000</td><td>~£3,970/month</td></tr>
            <tr><td>Head of Analytics / Data Director</td><td>£80,000–£130,000</td><td>~£4,600–£6,500/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home at mid-point, England, no student loan. London salaries are typically 15–25% above these figures.</small></p>
        <h2 id="industries">Highest-paying industries</h2>
        <p>Finance and fintech pay the most — senior data analysts at banks and investment firms earn £65,000–£95,000. Tech and e-commerce follow, with salaries of £55,000–£80,000 at senior level. Public sector data analysts (NHS, government) typically earn 15–25% less than private sector equivalents, but with better pension provisions.</p>
        <h2 id="comparison">Data analyst vs data scientist vs data engineer</h2>
        <table>
          <thead><tr><th>Role</th><th>Typical mid-level salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Data Analyst</td><td>£42,000</td><td>~£2,820/month</td></tr>
            <tr><td>Data Scientist</td><td>£55,000</td><td>~£3,380/month</td></tr>
            <tr><td>Data Engineer</td><td>£58,000</td><td>~£3,540/month</td></tr>
            <tr><td>ML Engineer</td><td>£68,000</td><td>~£4,020/month</td></tr>
          </tbody>
        </table>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/software-engineer-salary-uk-2026",label:"Software Engineer Salary 2026"}]}
          salaries={[{amount:30000},{amount:42000},{amount:60000},{amount:75000},{amount:100000}]}
        />
      </>
    ),
  },

  // --- CITY SALARY ARTICLES ---

  {
    slug: "average-salary-newcastle-2026",
    title: "Average Salary in Newcastle 2026 | UK Net Pay",
    description: "Average salaries in Newcastle upon Tyne in 2026 by sector and experience. See take-home pay after tax and NI and how Newcastle compares to UK average.",
    excerpt: "The average salary in Newcastle is approximately £32,500 in 2026, below the UK median of £37,430. After tax and NI, that's £2,270/month take-home.",
    category: "Wages",
    keywords: ["average salary newcastle 2026","newcastle upon tyne salary 2026","take home pay newcastle 2026","newcastle wages 2026","salary comparison newcastle uk"],
    readMinutes: 4,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "What is the average salary in Newcastle in 2026?", a: "The median full-time salary in Newcastle upon Tyne is approximately £32,500 in 2026, based on ONS ASHE data. After income tax and National Insurance, this gives a monthly take-home of approximately £2,270." },
      { q: "How does Newcastle compare to the UK average salary?", a: "The UK median full-time salary is £37,430 in 2026. Newcastle sits approximately £4,900 below that — making it notably cheaper to live in but also a lower-wage market than the South East and London." },
      { q: "What are the best-paying industries in Newcastle?", a: "The highest-paying sectors in Newcastle are financial and professional services, technology and digital (with a growing cluster of fintech and software firms), energy (offshore and renewable energy), and healthcare. Offshore energy roles can pay particularly well given Newcastle's proximity to North Sea operations." },
    ],
    body: () => (
      <>
        <p>Newcastle upon Tyne is the economic hub of the North East, home to a growing technology sector, strong financial services, and one of the UK's largest universities. Here's the full salary picture for 2026.</p>
        <h2 id="average">Average salary in Newcastle 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home (after tax &amp; NI)</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Newcastle)</td><td>£32,500</td><td>~£2,270/month</td></tr>
            <tr><td>Mean full-time (Newcastle)</td><td>£36,200</td><td>~£2,500/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Average salary by sector in Newcastle (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Technology / Software</td><td>£35,000–£75,000</td></tr>
            <tr><td>Financial Services</td><td>£32,000–£65,000</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£29,000–£80,000+</td></tr>
            <tr><td>Energy (Offshore / Renewables)</td><td>£40,000–£90,000+</td></tr>
            <tr><td>Education</td><td>£28,000–£55,000</td></tr>
            <tr><td>Retail / Hospitality</td><td>£21,000–£35,000</td></tr>
            <tr><td>Public Sector / Local Government</td><td>£26,000–£65,000</td></tr>
          </tbody>
        </table>
        <h2 id="cost">Salary vs cost of living in Newcastle</h2>
        <p>Although salaries in Newcastle are below the UK average, so is the cost of living. Average monthly rent for a one-bedroom flat in Newcastle city centre is approximately £850–£1,100, compared to £1,600–£2,200 in London. On a £32,500 salary, you take home £2,270/month — leaving more disposable income than an equivalent salary in the South East.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:32500},{amount:36200},{amount:45000},{amount:55000},{amount:70000}]}
        />
      </>
    ),
  },

  {
    slug: "average-salary-oxford-2026",
    title: "Average Salary in Oxford 2026 | UK Net Pay",
    description: "Average salaries in Oxford in 2026 by sector. See monthly take-home after tax and NI, and how Oxford compares to the UK and London average.",
    excerpt: "The average salary in Oxford is approximately £38,500 in 2026, above the UK median. Oxford's biotech, tech and university sectors drive salaries well above the regional average.",
    category: "Wages",
    keywords: ["average salary oxford 2026","oxford salary 2026","take home pay oxford","oxford wages 2026","salary comparison oxford uk"],
    readMinutes: 4,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "What is the average salary in Oxford in 2026?", a: "The median full-time salary in Oxford is approximately £38,500 in 2026, slightly above the UK median of £37,430. Monthly take-home at this salary is approximately £2,650 after income tax and National Insurance." },
      { q: "Does Oxford pay as well as London?", a: "Oxford salaries are notably above the UK average but below London. A tech or biotech professional in Oxford typically earns 15–20% less than an equivalent London role, but housing costs are also around 30% lower, often making Oxford a financially better choice on a net basis." },
      { q: "What are the highest-paying jobs in Oxford?", a: "The highest-paying roles in Oxford are in pharmaceutical/biotech (senior researchers and directors earn £70,000–£150,000+), technology (software engineers and data scientists earn £55,000–£100,000+), and finance. The University of Oxford pays senior academics and administrators £60,000–£100,000+." },
    ],
    body: () => (
      <>
        <p>Oxford is one of the UK's most economically significant cities outside London, driven by the university, a world-class life sciences cluster, and a thriving technology sector. Salaries reflect this — Oxford is a premium market outside the capital.</p>
        <h2 id="average">Average salary in Oxford 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home (after tax &amp; NI)</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Oxford)</td><td>£38,500</td><td>~£2,650/month</td></tr>
            <tr><td>Mean full-time (Oxford)</td><td>£44,200</td><td>~£2,950/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Average salary by sector in Oxford (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Pharmaceutical / Biotech</td><td>£45,000–£150,000+</td></tr>
            <tr><td>Technology / Software</td><td>£45,000–£100,000</td></tr>
            <tr><td>University / Academic Research</td><td>£35,000–£100,000+</td></tr>
            <tr><td>Financial Services</td><td>£38,000–£85,000</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£29,000–£80,000+</td></tr>
            <tr><td>Education (Schools)</td><td>£31,650–£50,500</td></tr>
            <tr><td>Retail / Hospitality</td><td>£22,000–£35,000</td></tr>
          </tbody>
        </table>
        <h2 id="cost">Oxford salary vs cost of living</h2>
        <p>Oxford is one of the most expensive cities outside London for housing. Average rent for a one-bedroom flat is £1,400–£1,900/month. On a £38,500 salary, monthly take-home is ~£2,650 — leaving relatively modest disposable income. Many Oxford professionals commute from Didcot, Abingdon, or Banbury to reduce housing costs.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:38500},{amount:44200},{amount:55000},{amount:70000},{amount:100000}]}
        />
      </>
    ),
  },

  {
    slug: "average-salary-cambridge-2026",
    title: "Average Salary in Cambridge 2026 | UK Net Pay",
    description: "Average salaries in Cambridge in 2026 by sector. Take-home pay after tax and NI, and how Cambridge compares to the UK and London average.",
    excerpt: "The average salary in Cambridge is approximately £40,000 in 2026, well above the UK median. Cambridge's tech and biotech cluster pays among the highest outside London.",
    category: "Wages",
    keywords: ["average salary cambridge 2026","cambridge salary 2026","take home pay cambridge","cambridge silicon fen salaries 2026","salary comparison cambridge uk"],
    readMinutes: 4,
    publishedISO: "2026-06-16",
    updatedISO: "2026-06-16",
    faq: [
      { q: "What is the average salary in Cambridge in 2026?", a: "The median full-time salary in Cambridge is approximately £40,000 in 2026, significantly above the UK median of £37,430. Monthly take-home at this salary is approximately £2,750 after income tax and National Insurance." },
      { q: "Why are Cambridge salaries so high?", a: "Cambridge is home to one of Europe's densest technology and biotech clusters — known as Silicon Fen. Companies including ARM, AstraZeneca, Microsoft Research, and hundreds of biotech startups compete for highly skilled graduates from the University of Cambridge, pushing salaries above UK norms. A software engineer at an ARM or deep tech firm earns £60,000–£120,000+." },
      { q: "How does Cambridge compare to London for salaries?", a: "Cambridge salaries in tech and biotech are typically 10–20% below London equivalents, but housing is also 20–30% cheaper. For many professionals, Cambridge offers superior net financial outcomes versus London once commuting costs, rent, and quality of life are considered." },
    ],
    body: () => (
      <>
        <p>Cambridge is one of the UK's most dynamic salary markets outside London, driven by its world-renowned university and an extraordinary density of high-technology and life sciences employers.</p>
        <h2 id="average">Average salary in Cambridge 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Annual salary</th><th>Monthly take-home (after tax &amp; NI)</th></tr></thead>
          <tbody>
            <tr><td>Median full-time (Cambridge)</td><td>£40,000</td><td>~£2,750/month</td></tr>
            <tr><td>Mean full-time (Cambridge)</td><td>£46,800</td><td>~£3,080/month</td></tr>
            <tr><td>UK median (comparison)</td><td>£37,430</td><td>~£2,590/month</td></tr>
            <tr><td>London median (comparison)</td><td>£46,500</td><td>~£3,060/month</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Average salary by sector in Cambridge (2026)</h2>
        <table>
          <thead><tr><th>Sector</th><th>Typical salary range</th></tr></thead>
          <tbody>
            <tr><td>Semiconductor / Chip Design (ARM etc.)</td><td>£60,000–£150,000+</td></tr>
            <tr><td>Biotech / Pharma (AstraZeneca etc.)</td><td>£50,000–£130,000</td></tr>
            <tr><td>Technology / Software</td><td>£45,000–£110,000</td></tr>
            <tr><td>University / Academic Research</td><td>£35,000–£100,000+</td></tr>
            <tr><td>Financial Services</td><td>£38,000–£75,000</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£29,000–£80,000+</td></tr>
            <tr><td>Retail / Hospitality</td><td>£22,000–£36,000</td></tr>
          </tbody>
        </table>
        <h2 id="silicon-fen">Silicon Fen premium</h2>
        <p>Professionals working in Cambridge's technology cluster typically earn 20–30% above equivalent roles in other UK cities outside London. The concentration of ARM, AstraZeneca, Illumina, Moderna, and hundreds of early-stage deep tech and biotech firms creates intense competition for engineering, research, and senior commercial talent. Equity and RSU packages are also more common in Cambridge than most UK cities, adding significantly to total compensation.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary 2026"}]}
          salaries={[{amount:40000},{amount:46800},{amount:60000},{amount:80000},{amount:110000}]}
        />
      </>
    ),
  },

  // ─── SEMRUSH ZERO-COMPETITION ARTICLES ────────────────────────────────────

  {
    slug: "nhs-pay-bands-2026-27",
    title: "NHS Pay Bands 2026/27: Agenda for Change Salary Scales (Bands 2–9)",
    description: "Full NHS Agenda for Change pay bands 2026/27 — every band and spine point from Band 2 to Band 9. Monthly take-home after tax, NI, and NHS pension for every AfC grade.",
    excerpt: "NHS Band 5 pays £29,970–£36,483 in 2026/27. After NHS pension contributions, monthly take-home at the Band 5 minimum is approximately £1,805. Here are all bands, all spine points.",
    category: "Guides",
    keywords: ["nhs pay bands 2026","agenda for change pay scales 2026","nhs band 5 salary 2026","nhs band 6 salary 2026","nhs band 7 pay 2026","nhs salary bands","afc pay scales 2026"],
    readMinutes: 5,
    publishedISO: "2026-06-19",
    updatedISO: "2026-06-19",
    faq: [
      { q: "What is NHS Band 5 salary in 2026/27?", a: "NHS Band 5 pays £29,970–£36,483 in 2026/27 under the Agenda for Change framework. This covers newly qualified nurses, paramedics, radiographers, and other healthcare professionals. At the Band 5 minimum, monthly take-home (before NHS pension) is approximately £2,050. After 8.3% TPS pension contributions, take-home is approximately £1,805." },
      { q: "What is the Agenda for Change (AfC) framework?", a: "Agenda for Change is the national pay framework for most NHS staff in England, Scotland, Wales and Northern Ireland. It replaced dozens of separate pay scales with a single unified structure of 9 bands, each with a series of spine points. Progression through spine points is based on years of service and performance." },
      { q: "Do all NHS staff use AfC pay bands?", a: "Most NHS staff use AfC bands. The main exceptions are doctors and dentists (who use separate pay scales set by the Review Body on Doctors' and Dentists' Remuneration) and some very senior managers on executive pay scales." },
    ],
    body: () => (
      <>
        <p>The NHS Agenda for Change (AfC) pay framework covers the vast majority of NHS employees — approximately 1.2 million staff in England alone. Every band from 2 to 9 has a defined salary range with spine points. Here are all 2026/27 rates with monthly take-home figures.</p>

        <h2 id="all-bands">All NHS AfC Pay Bands 2026/27 (England)</h2>
        <table>
          <thead><tr><th>Band</th><th>Typical roles</th><th>Salary range</th><th>Min take-home (before pension)</th></tr></thead>
          <tbody>
            <tr><td>Band 2</td><td>Healthcare assistant, porter, admin</td><td>£23,615–£25,674</td><td>~£1,745/month</td></tr>
            <tr><td>Band 3</td><td>Senior HCA, receptionist, admin lead</td><td>£24,625–£26,259</td><td>~£1,810/month</td></tr>
            <tr><td>Band 4</td><td>Technician, clinical support specialist</td><td>£26,530–£29,114</td><td>~£1,930/month</td></tr>
            <tr><td>Band 5</td><td>Staff nurse, paramedic, radiographer, physio (NQ)</td><td>£29,970–£36,483</td><td>~£2,050/month</td></tr>
            <tr><td>Band 6</td><td>Senior nurse, specialist practitioner, ODP</td><td>£37,338–£44,962</td><td>~£2,610/month</td></tr>
            <tr><td>Band 7</td><td>Advanced nurse practitioner, ward sister, team manager</td><td>£46,148–£52,809</td><td>~£3,050/month</td></tr>
            <tr><td>Band 8a</td><td>Consultant nurse, lead AHP, department manager</td><td>£53,755–£60,504</td><td>~£3,420/month</td></tr>
            <tr><td>Band 8b</td><td>Deputy director, senior consultant</td><td>£62,215–£72,293</td><td>~£3,820/month</td></tr>
            <tr><td>Band 8c</td><td>Director of service, divisional nurse</td><td>£74,290–£85,601</td><td>~£4,380/month</td></tr>
            <tr><td>Band 8d</td><td>Deputy chief executive, executive director</td><td>£88,168–£101,677</td><td>~£4,930/month</td></tr>
            <tr><td>Band 9</td><td>Chief executive (smaller trusts)</td><td>£105,385–£121,271</td><td>~£5,580/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home before NHS pension contribution. NHS pension employee contributions range from 5.2% to 12.5% depending on earnings. London HCAS supplement applies to London staff on top of these figures.</small></p>

        <h2 id="band5-detail">Band 5 — All Spine Points (England, 2026/27)</h2>
        <table>
          <thead><tr><th>Spine point</th><th>Annual gross</th><th>Monthly take-home (before pension)</th><th>After 8.3% NHS pension</th></tr></thead>
          <tbody>
            <tr><td>Band 5 Min</td><td>£29,970</td><td>£2,050/month</td><td>~£1,843/month</td></tr>
            <tr><td>Band 5 Year 2</td><td>£31,534</td><td>£2,159/month</td><td>~£1,929/month</td></tr>
            <tr><td>Band 5 Year 3</td><td>£33,310</td><td>£2,282/month</td><td>~£2,028/month</td></tr>
            <tr><td>Band 5 Year 4</td><td>£35,177</td><td>£2,411/month</td><td>~£2,120/month</td></tr>
            <tr><td>Band 5 Max</td><td>£36,483</td><td>£2,531/month</td><td>~£2,223/month</td></tr>
          </tbody>
        </table>

        <h2 id="band6-detail">Band 6 — All Spine Points (England, 2026/27)</h2>
        <table>
          <thead><tr><th>Spine point</th><th>Annual gross</th><th>Monthly take-home (before pension)</th></tr></thead>
          <tbody>
            <tr><td>Band 6 Min</td><td>£37,338</td><td>£2,610/month</td></tr>
            <tr><td>Band 6 Year 2</td><td>£39,339</td><td>£2,752/month</td></tr>
            <tr><td>Band 6 Year 3</td><td>£41,659</td><td>£2,879/month</td></tr>
            <tr><td>Band 6 Year 4</td><td>£43,150</td><td>£2,961/month</td></tr>
            <tr><td>Band 6 Max</td><td>£44,962</td><td>~£3,021/month</td></tr>
          </tbody>
        </table>

        <h2 id="pension">NHS Pension Contribution Tiers 2026/27</h2>
        <table>
          <thead><tr><th>Gross earnings</th><th>Employee contribution</th><th>Monthly cost at band min</th></tr></thead>
          <tbody>
            <tr><td>Up to £13,259</td><td>5.2%</td><td>~£57/month</td></tr>
            <tr><td>£13,260–£26,831</td><td>6.5%</td><td>~£128/month</td></tr>
            <tr><td>£26,832–£34,189</td><td>8.3%</td><td>~£207/month</td></tr>
            <tr><td>£34,190–£43,805</td><td>9.8%</td><td>~£306/month</td></tr>
            <tr><td>£43,806–£111,376</td><td>11.5%</td><td>~£419/month</td></tr>
            <tr><td>Over £111,376</td><td>12.5%</td><td>~£1,160/month</td></tr>
          </tbody>
        </table>
        <p>Employer contributions are 23.7% — among the most generous in the UK. The combined defined-benefit pension these contributions buy is substantially more valuable than an equivalent defined-contribution auto-enrolment scheme. Use our <ToolLink to="/nhs">NHS Pay Calculator</ToolLink> to model your exact take-home at any band and spine point.</p>

        <h2 id="london">London Weighting (HCAS)</h2>
        <p>NHS staff working in London receive a High Cost Area Supplement on top of their AfC band salary. Inner London: 20% of salary (minimum £4,629, maximum £8,461 per year). Outer London: 15% (minimum £4,072, maximum £5,765 per year). A Band 5 nurse at the minimum in Inner London earns approximately £29,970 + £4,629 = £34,599/year.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/nhs",label:"NHS Pay Calculator"},{path:"/insights/nurse-salary-uk-2026",label:"NHS Nurse Salary Guide"},{path:"/insights/paramedic-salary-uk-2026",label:"Paramedic Salary Guide"}]}
          salaries={[{amount:29970},{amount:37338},{amount:46148},{amount:53755},{amount:74290}]}
        />
      </>
    ),
  },

  {
    slug: "what-does-pro-rata-mean-uk",
    title: "What Does Pro Rata Mean? UK Salary Guide 2026",
    description: "What does pro rata mean for UK salaries? How to calculate pro rata pay, what it means on a job offer, and what take-home pay looks like for part-time hours in 2026/27.",
    excerpt: "Pro rata means 'in proportion'. A pro rata salary is a full-time salary reduced proportionally for part-time hours. If a full-time role pays £40,000 and you work 3 days a week, your pro rata salary is £24,000.",
    category: "Guides",
    keywords: ["what does pro rata mean","pro rata meaning","pro rata salary meaning","what does pro rata salary mean","pro rata definition uk","how to calculate pro rata","pro rata meaning salary"],
    readMinutes: 4,
    publishedISO: "2026-06-19",
    updatedISO: "2026-06-19",
    faq: [
      { q: "What does pro rata mean?", a: "Pro rata is Latin for 'in proportion'. In employment, a pro rata salary means your pay is scaled proportionally to the hours or days you work compared to a full-time employee. If a full-time role pays £40,000 per year for 5 days a week, a 3-day-a-week employee earns £40,000 × (3÷5) = £24,000 pro rata." },
      { q: "How do I calculate my pro rata salary?", a: "Pro rata salary = (your working hours or days) ÷ (full-time hours or days) × full-time annual salary. For example: full-time is 37.5 hours/week at £45,000. You work 22.5 hours/week. Pro rata salary = 22.5 ÷ 37.5 × £45,000 = £27,000." },
      { q: "Does pro rata affect my tax or National Insurance?", a: "No — your tax and NI are calculated on your actual pro rata salary, not the full-time equivalent. Your Personal Allowance (£12,570) applies in full regardless of how many hours you work." },
    ],
    body: () => (
      <>
        <p>Pro rata is one of the most commonly searched salary terms in the UK — with over 14,000 searches per month. Here's exactly what it means, how to calculate it, and what it looks like on your payslip.</p>

        <h2 id="what-it-means">What does pro rata mean in salary terms?</h2>
        <p>Pro rata (Latin: "in proportion") means your salary is a proportional share of a full-time equivalent (FTE) salary. If a job is advertised at "£40,000 pro rata" and it's a 3-day-per-week role at a company where full-time is 5 days, your actual annual salary is £40,000 × (3÷5) = £24,000.</p>
        <p>The full-time equivalent salary (sometimes written FTE salary) is always the reference point. Your pro rata salary is always lower than the FTE figure, scaled by the proportion of full-time hours you work.</p>

        <h2 id="formula">The pro rata calculation formula</h2>
        <p><strong>Pro rata salary = (your hours or days ÷ full-time hours or days) × full-time annual salary</strong></p>
        <table>
          <thead><tr><th>FTE salary</th><th>FTE hours</th><th>Your hours</th><th>Pro rata salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>£30,000</td><td>37.5h</td><td>22.5h (3 days)</td><td>£18,000</td><td>~£1,396/month</td></tr>
            <tr><td>£40,000</td><td>37.5h</td><td>30h (4 days)</td><td>£32,000</td><td>~£2,272/month</td></tr>
            <tr><td>£50,000</td><td>37.5h</td><td>18.75h (2.5 days)</td><td>£25,000</td><td>~£1,786/month</td></tr>
            <tr><td>£60,000</td><td>37.5h</td><td>22.5h (3 days)</td><td>£36,000</td><td>~£2,520/month</td></tr>
          </tbody>
        </table>

        <h2 id="job-offer">Pro rata on a job offer — what to check</h2>
        <p>When a job advert says "£45,000 pro rata", it always refers to the full-time equivalent. To work out what you'd actually earn, you need to know two things: what hours per week the role involves, and what the company defines as full-time. Most companies use 37.5 or 40 hours/week as full-time. If the advert doesn't specify, ask before accepting.</p>
        <p><strong>Common trap:</strong> "£45,000 pro rata (3 days)" sounds generous — but if full-time is 5 days, your actual salary is £27,000. Always work out the actual salary, not the FTE figure, before comparing job offers.</p>

        <h2 id="tax">Does working pro rata change how I'm taxed?</h2>
        <p>No — your Personal Allowance (£12,570 in 2026/27) is the same whether you work 5 days or 1 day per week. Tax and NI are calculated on your actual pro rata annual salary, not the full-time equivalent. If your pro rata salary is £18,000, you pay tax only on £18,000 − £12,570 = £5,430 at 20% = £1,086/year. Use our <ToolLink to="/pro-rata">Pro Rata Calculator</ToolLink> to see your exact take-home.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/pro-rata",label:"Pro Rata Calculator"},{path:"/hourly",label:"Hourly Rate Calculator"},{path:"/two-jobs",label:"Two Jobs Calculator"}]}
          salaries={[{amount:18000},{amount:24000},{amount:30000},{amount:36000}]}
        />
      </>
    ),
  },

  {
    slug: "uk-salary-percentiles-2026",
    title: "UK Salary Percentiles 2026: Are You in the Top 10%?",
    description: "UK salary percentile data for 2026 — the top 1%, 5%, 10%, 25% and 50% salary thresholds. Find out where your earnings rank and what take-home pay looks like at each percentile.",
    excerpt: "To be in the top 10% of UK earners in 2026, you need a salary of approximately £60,000+. The top 1% starts at approximately £180,000. The median (50th percentile) is £37,430.",
    category: "Wages",
    keywords: ["uk salary percentiles 2026","what percentile is my salary uk","top 10 percent income uk","top 1 percent income uk","top 5 percent salary uk","median salary uk 2026","average uk salary percentile"],
    readMinutes: 4,
    publishedISO: "2026-06-19",
    updatedISO: "2026-06-19",
    faq: [
      { q: "What salary puts you in the top 10% in the UK in 2026?", a: "To be in the top 10% of UK full-time earners in 2026, you need a gross salary of approximately £60,000 or above. Monthly take-home at £60,000 is approximately £3,583 in England after income tax and NI." },
      { q: "What is the top 1% income threshold in the UK?", a: "The top 1% of UK taxpayers earn approximately £180,000 or more per year. At this level, the additional rate of income tax (45%) applies above £125,140, and the Personal Allowance has been fully withdrawn above £125,140." },
      { q: "What is the median UK salary in 2026?", a: "The median full-time salary in the UK is approximately £37,430 in 2026, based on ONS Annual Survey of Hours and Earnings data. Monthly take-home at the median is approximately £2,590 in England after income tax and NI." },
    ],
    body: () => (
      <>
        <p>Understanding where your salary sits in the UK earnings distribution helps you benchmark your pay, negotiate raises, and plan finances. Here are the key UK salary percentile thresholds for 2026, based on ONS ASHE data.</p>

        <h2 id="percentile-table">UK Salary Percentile Table (Full-Time, 2026)</h2>
        <table>
          <thead><tr><th>Percentile</th><th>Annual salary (gross)</th><th>Monthly take-home (England)</th><th>What it means</th></tr></thead>
          <tbody>
            <tr><td>10th (bottom 10%)</td><td>~£18,500</td><td>~£1,430/month</td><td>You earn more than 10% of full-time workers</td></tr>
            <tr><td>25th</td><td>~£26,500</td><td>~£1,870/month</td><td>Lower quartile — earn more than 25%</td></tr>
            <tr><td>50th (median)</td><td>~£37,430</td><td>~£2,590/month</td><td>Median — earn more than half of UK workers</td></tr>
            <tr><td>75th</td><td>~£52,000</td><td>~£3,270/month</td><td>Upper quartile — earn more than 75%</td></tr>
            <tr><td>90th (top 10%)</td><td>~£60,000</td><td>~£3,583/month</td><td>Top 10% of full-time earners</td></tr>
            <tr><td>95th (top 5%)</td><td>~£82,000</td><td>~£4,580/month</td><td>Top 5% of full-time earners</td></tr>
            <tr><td>99th (top 1%)</td><td>~£180,000</td><td>~£7,800/month</td><td>Top 1% — additional rate taxpayer</td></tr>
          </tbody>
        </table>
        <p><small>Based on ONS ASHE 2025/26 data extrapolated for 2026. Take-home estimated at each threshold, England, no student loan, no pension. "Full-time" = working 30+ hours per week.</small></p>

        <h2 id="london-vs-uk">London vs the rest of the UK</h2>
        <p>London salaries are substantially higher at every percentile. The London median is approximately £46,500 vs the UK median of £37,430. This means a Londoner needs to earn approximately £72,000 to be in the top 10% of London earners — versus around £60,000 nationally. However, London's cost of living — particularly housing — offsets much of this premium. On a disposable-income basis, many London workers in the 70th–85th percentile are no better off than equivalent earners in Manchester or Leeds.</p>

        <h2 id="by-age">Salary percentiles by age group</h2>
        <table>
          <thead><tr><th>Age group</th><th>Median salary</th><th>Top 25% threshold</th><th>Top 10% threshold</th></tr></thead>
          <tbody>
            <tr><td>22–29</td><td>~£27,000</td><td>~£35,000</td><td>~£48,000</td></tr>
            <tr><td>30–39</td><td>~£38,000</td><td>~£52,000</td><td>~£72,000</td></tr>
            <tr><td>40–49</td><td>~£42,000</td><td>~£60,000</td><td>~£85,000</td></tr>
            <tr><td>50–59</td><td>~£40,000</td><td>~£57,000</td><td>~£80,000</td></tr>
          </tbody>
        </table>
        <p>Earnings peak in the 40–49 age band for most professions, reflecting years of experience and seniority. The top 10% threshold is substantially higher for those in their 40s than for new graduates, reflecting the compound effect of career progression and specialisation.</p>
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Calculate Your Take-Home"},{path:"/insights/average-salary-uk-2026",label:"UK Average Salary Guide"},{path:"/compare",label:"Compare Two Salaries"}]}
          salaries={[{amount:26500},{amount:37430},{amount:52000},{amount:60000},{amount:82000}]}
        />
      </>
    ),
  },
];
