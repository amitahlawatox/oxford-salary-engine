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
        <p>Scotland and the rest of the UK have shared a Personal Allowance since devolution but diverged sharply on band design. In 2026/27 the gap is wider than ever in the middle and upper-middle salary range.</p>

        <h2 id="bands-2026">Scottish income tax bands 2026/27</h2>
        <table>
          <thead><tr><th>Band</th><th>Range</th><th>Rate</th></tr></thead>
          <tbody>
            <tr><td>Starter</td><td>£12,571–£16,537</td><td>19%</td></tr>
            <tr><td>Basic</td><td>£16,538–£29,526</td><td>20%</td></tr>
            <tr><td>Intermediate</td><td>£29,527–£43,662</td><td>21%</td></tr>
            <tr><td>Higher</td><td>£43,663–£75,000</td><td>42%</td></tr>
            <tr><td>Advanced</td><td>£75,001–£125,140</td><td>45%</td></tr>
            <tr><td>Top</td><td>Over £125,140</td><td>48%</td></tr>
          </tbody>
        </table>

        <h2 id="comparison">Side-by-side take-home comparison</h2>
        <table>
          <thead><tr><th>Gross</th><th>Scotland net</th><th>England net</th><th>Difference</th></tr></thead>
          <tbody>
            <tr><td>£30,000</td><td>£25,098</td><td>£25,119</td><td>−£21</td></tr>
            <tr><td>£50,000</td><td>£38,024</td><td>£39,520</td><td>−£1,496</td></tr>
            <tr><td>£75,000</td><td>£52,099</td><td>£54,520</td><td>−£2,421</td></tr>
            <tr><td>£125,000</td><td>£77,824</td><td>£81,920</td><td>−£4,096</td></tr>
          </tbody>
        </table>
        <p>Two practical takeaways:</p>
        <ul>
          <li>If you earn under <strong>£28,867</strong>, you actually pay slightly <em>less</em> tax in Scotland thanks to the 19% Starter band.</li>
          <li>Above £43,663, the gap grows quickly because Scotland's Higher rate is 42% versus 40% — and starts £6,607 lower.</li>
        </ul>

        <h2 id="calculator">Run your own number</h2>
        <p>Toggle "Scotland" in the <ToolLink to="/take-home">Take-Home Pay Calculator</ToolLink> to see your exact figure with pension and Student Loan factored in.</p>
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
        <p>If you earn above £43,663 in Scotland, the Higher rate of 42% combines with 8% NI for an effective marginal rate of <strong>50%</strong> on every additional pound — before Student Loan. Above £75,000, it's 53%. Above £100,000 (with Personal Allowance taper) it's a punishing 70%.</p>

        <h2>Three legal mitigation moves</h2>
        <ol>
          <li><strong>Salary sacrifice pension.</strong> A £5,000 sacrifice at the 42% band saves £2,100 income tax and £400 NI. Net cost: £2,500 for £5,000 in your pension.</li>
          <li><strong>Charity Gift Aid carry-back.</strong> Scottish higher-rate relief is claimed via Self Assessment — don't leave it on the table.</li>
          <li><strong>EV salary sacrifice.</strong> A growing employer benefit; the BIK rate stays low into 2027/28.</li>
        </ol>
        <p>Model the impact instantly in the <ToolLink to="/take-home">Take-Home calculator</ToolLink> — set Region to Scotland and slide the pension percentage up.</p>
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
        <p>Plan 5 is the loan plan introduced for English and Welsh students who started university in or after September 2023. It pairs a <strong>lower repayment threshold (£25,000)</strong> with a <strong>longer 40-year term</strong> — meaning most graduates will repay for the bulk of their working life.</p>

        <h2>What you repay in 2026/27</h2>
        <p>9% of every pound you earn above £25,000.</p>
        <table>
          <thead><tr><th>Salary</th><th>Annual Plan 5 deduction</th><th>Per month</th></tr></thead>
          <tbody>
            <tr><td>£28,000</td><td>£270</td><td>£23</td></tr>
            <tr><td>£35,000</td><td>£900</td><td>£75</td></tr>
            <tr><td>£45,000</td><td>£1,800</td><td>£150</td></tr>
            <tr><td>£60,000</td><td>£3,150</td><td>£263</td></tr>
          </tbody>
        </table>

        <h2>Should you overpay?</h2>
        <p>For Plan 5, unlike Plan 2, voluntary overpayments often <em>do</em> make sense — the lower threshold and 40-year term mean most middle earners will repay the loan in full. Run a what-if in the <ToolLink to="/take-home">calculator</ToolLink> with Plan 5 selected to see the deduction.</p>
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
        <p><strong>1257L</strong> is the most common UK tax code. The <strong>1257</strong> is your Personal Allowance (£12,570) divided by 10. The <strong>L</strong> means you're entitled to the standard allowance.</p>

        <h2>When does it become an "emergency" code?</h2>
        <p>HMRC issues it as <strong>1257L W1/M1</strong> (Week 1 / Month 1) when they don't yet have your full earnings history — typical scenarios:</p>
        <ul>
          <li>Starting a new job without a P45.</li>
          <li>Returning to work after self-employment.</li>
          <li>A first job after university.</li>
        </ul>
        <p>On the W1/M1 basis, each pay period is taxed in isolation, ignoring the cumulative allowance you may not have used yet — so you usually overpay.</p>

        <h2>How to fix it</h2>
        <ol>
          <li>Sign in to your HMRC personal tax account.</li>
          <li>Submit your starter checklist information (your employer should give you this on day one).</li>
          <li>HMRC reissues the cumulative 1257L code. Refunds appear in your next payslip — automatically.</li>
        </ol>
        <p>Use the <ToolLink to="/take-home">Take-Home calculator</ToolLink> with code <code>1257L</code> to see the expected net once the correct code is applied.</p>
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
        <p>£50,000 sits £270 below the Higher Rate threshold in the rest of the UK — every £1 you earn above it costs an extra 20p in tax. That makes £50k one of the most tax-efficient salary points in the country.</p>

        <h2>Headline numbers (England, no pension, no Student Loan)</h2>
        <ul>
          <li><strong>Annual net:</strong> £39,519.60</li>
          <li><strong>Monthly:</strong> £3,293.30</li>
          <li><strong>Weekly:</strong> £760.00</li>
          <li><strong>Effective rate:</strong> 21.0%</li>
        </ul>

        <h2>With a 5% salary-sacrifice pension</h2>
        <ul>
          <li>Pension contribution: £2,500</li>
          <li><strong>Annual net:</strong> £37,769</li>
          <li><strong>Monthly:</strong> £3,147</li>
          <li>Effective tax saving: £450 — your £2,500 pension cost £2,050.</li>
        </ul>

        <h2>Other regions</h2>
        <table>
          <thead><tr><th>Region</th><th>Annual net</th><th>Monthly</th></tr></thead>
          <tbody>
            <tr><td>England / Wales / NI</td><td>£39,520</td><td>£3,293</td></tr>
            <tr><td>Scotland</td><td>£38,024</td><td>£3,169</td></tr>
          </tbody>
        </table>

        <p>Adjust the bonus, pension and Student Loan in the <ToolLink to="/take-home">Take-Home calculator</ToolLink> to see your specific number.</p>
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
        <p>The two ways to fund a workplace pension look almost identical on paper. They're not.</p>
        <h2>Personal contribution</h2>
        <p>You receive your full salary, then pay into the pension from net pay. The pension provider claims 20% basic-rate relief from HMRC. Higher-rate taxpayers must claim the extra 20% via Self Assessment.</p>
        <h2>Salary sacrifice</h2>
        <p>You agree to a lower salary; your employer pays the difference into your pension. Because the contribution leaves before PAYE, you save income tax <strong>and</strong> Class 1 NI (8% main, 2% upper) — and your employer also saves 13.8% Employer NI, which they may pass back to you.</p>
        <h2>£5,000 contribution at £60,000 salary (England)</h2>
        <table>
          <thead><tr><th>Method</th><th>Cost to you</th><th>Into pension</th></tr></thead>
          <tbody>
            <tr><td>Personal pension</td><td>£3,000 (after higher-rate refund)</td><td>£5,000</td></tr>
            <tr><td>Salary sacrifice</td><td>£2,600</td><td>£5,000+</td></tr>
          </tbody>
        </table>
        <p>That's an extra £400 every £5,000 — and your employer often tops up some of their NI saving too.</p>
        <p>Model both modes by switching the toggle in the <ToolLink to="/take-home">calculator</ToolLink>.</p>
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
        <p>Sole traders pay Income Tax on profit (revenue minus allowable expenses) plus Class 4 NI. There's no Class 1 NI because you're not an employee — but Class 2 voluntary contributions can still protect your State Pension entitlement.</p>

        <h2>2026/27 self-employed rates</h2>
        <ul>
          <li><strong>Class 4 NI:</strong> 6% on profits between £12,570 and £50,270; 2% above £50,270.</li>
          <li><strong>Income Tax:</strong> identical bands to employees (20/40/45 in rUK).</li>
          <li><strong>Class 2:</strong> abolished for most, voluntary at £3.50/week for State Pension purposes.</li>
        </ul>

        <h2>How much to set aside</h2>
        <p>A safe rule of thumb for a basic-rate sole trader: <strong>30% of profit</strong>. For higher-rate, set aside 45%.</p>
        <p>Plug your number into the <ToolLink to="/self-employed">Self-Employed Calculator</ToolLink> for the exact split between Income Tax, Class 4 NI and your first payment on account.</p>
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
        <p>IR35 ("off-payroll working rules") determines whether HMRC views your contract as employment-in-disguise. Inside IR35 means PAYE deductions; outside means you can keep operating through a limited company and benefit from dividend extraction.</p>
        <h2>Worked example: £500/day, 220 days/year</h2>
        <table>
          <thead><tr><th>Scenario</th><th>Annual gross</th><th>Take-home</th></tr></thead>
          <tbody>
            <tr><td>Inside IR35 (PAYE via umbrella)</td><td>£110,000</td><td>≈ £67,000</td></tr>
            <tr><td>Outside IR35 (Ltd, optimal split)</td><td>£110,000</td><td>≈ £80,000</td></tr>
          </tbody>
        </table>
        <p>That's a £13,000 annual difference — enough to fund a workplace pension and an ISA combined. Model your day rate in the <ToolLink to="/ir35">IR35 calculator</ToolLink>.</p>
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
        <p>A single-director Ltd has two extraction levers: salary (deductible against Corporation Tax) and dividends (paid from post-tax profit, but taxed at lower rates personally).</p>
        <h2>Why £12,570 salary?</h2>
        <ul>
          <li>It uses your full Personal Allowance — no Income Tax due on the salary itself.</li>
          <li>It sits at the Primary Threshold — no employee NI.</li>
          <li>It maintains your State Pension qualifying year.</li>
        </ul>
        <p>You then top up via dividends, taxed at 8.75% (basic), 33.75% (higher) and 39.35% (additional) above the £500 Dividend Allowance.</p>
        <p>Use the <ToolLink to="/dividend">Dividend Optimiser</ToolLink> — it brute-forces the best split for your total target extraction.</p>
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
        <p>If you take a second job in the UK, HMRC almost always assigns it a <strong>BR (basic rate) tax code</strong> — meaning every pound is taxed at 20% from the first penny. Your full Personal Allowance stays with the primary employer.</p>
        <h2>What it looks like in practice</h2>
        <p>Job 1: £25,000 with code 1257L → Personal Allowance applied normally.<br />Job 2: £10,000 with code BR → £2,000 income tax (20%), no allowance.</p>
        <p>If your combined income pushes you over the £50,270 Higher Rate threshold, the second job may need a <strong>D0 code</strong> (40% from the first pound) instead. HMRC adjusts this once they see both PAYE feeds.</p>
        <p>Use the <ToolLink to="/two-jobs">Two-Jobs calculator</ToolLink> for a true combined picture.</p>
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
        <p>The marginal rate — what you keep on the <em>next</em> £1 — is what matters when negotiating a pay rise. In rUK 2026/27:</p>
        <table>
          <thead><tr><th>Band</th><th>Marginal stack</th></tr></thead>
          <tbody>
            <tr><td>Up to £12,570</td><td>0%</td></tr>
            <tr><td>£12,570 – £50,270</td><td>20% IT + 8% NI = <strong>28%</strong></td></tr>
            <tr><td>£50,270 – £100,000</td><td>40% IT + 2% NI = <strong>42%</strong></td></tr>
            <tr><td>£100,000 – £125,140</td><td>40% IT + 2% NI + 20% PA taper = <strong>62%</strong></td></tr>
            <tr><td>£125,140+</td><td>45% IT + 2% NI = <strong>47%</strong></td></tr>
          </tbody>
        </table>
        <p>Add 9% if you're on a Student Loan plan. The <ToolLink to="/pay-rise">Pay Rise Simulator</ToolLink> shows exactly what your raise becomes after tax.</p>
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
        <h2>Class 1 (employees)</h2>
        <ul>
          <li>0% below £242/week (£12,570/year)</li>
          <li>8% on £242–£967/week (£12,570–£50,270/year)</li>
          <li>2% above £967/week</li>
        </ul>
        <h2>Class 2 (self-employed)</h2>
        <p>Effectively abolished — voluntary £3.50/week if you want to bank a State Pension qualifying year and your profits are below the lower limit.</p>
        <h2>Class 4 (self-employed)</h2>
        <ul>
          <li>6% on profits £12,570–£50,270</li>
          <li>2% above £50,270</li>
        </ul>
        <p>NI counts towards 35 qualifying years for a full new State Pension.</p>
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
        <p>If your "adjusted net income" exceeds £100,000, your Personal Allowance shrinks by £1 for every £2 above. By £125,140 it's fully gone — that's an effective <strong>60% income tax</strong> rate inside the trap, plus 2% NI for 62%, plus 9% if on Plan 2 / 4 / 5 Student Loan = up to 71%.</p>
        <h2>Three escape routes</h2>
        <ol>
          <li><strong>Pension contributions</strong> reduce adjusted net income, restoring your Personal Allowance pound-for-pound. A £25,140 contribution turns £125,140 into £100,000 and reclaims the entire £12,570 allowance.</li>
          <li><strong>Charitable giving via Gift Aid</strong> works the same way.</li>
          <li><strong>Salary sacrifice</strong> bonuses into pension before they hit your gross.</li>
        </ol>
        <p>Use the <ToolLink to="/take-home">Take-Home calculator</ToolLink> at £125,000 — then slide pension % up and watch the marginal saving land at 62%+.</p>
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
        <p>Headline salaries are misleading. The real measure is "post-tax, post-rent" — what's left for everything else.</p>
        <table>
          <thead><tr><th>City</th><th>£55k net</th><th>Avg 1-bed rent</th><th>Disposable</th></tr></thead>
          <tbody>
            <tr><td>London</td><td>£42,520</td><td>£24,000</td><td>£18,520</td></tr>
            <tr><td>Manchester</td><td>£42,520</td><td>£14,400</td><td>£28,120</td></tr>
            <tr><td>Glasgow</td><td>£40,824</td><td>£12,000</td><td>£28,824</td></tr>
            <tr><td>Bristol</td><td>£42,520</td><td>£18,000</td><td>£24,520</td></tr>
          </tbody>
        </table>
        <p>Try your own combo in the <ToolLink to="/cost-of-living">Cost-of-Living Adjuster</ToolLink>.</p>
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
        <p>Understanding where your salary sits relative to the national average helps with job negotiations, budgeting, and tax planning. The most reliable source is the ONS Annual Survey of Hours and Earnings (ASHE).</p>

        <h2 id="headline">Headline numbers (2025/26)</h2>
        <ul>
          <li><strong>Median full-time salary:</strong> £35,000/year</li>
          <li><strong>Mean full-time salary:</strong> £39,500/year</li>
          <li><strong>Median take-home:</strong> approximately £28,720/year (£2,393/month)</li>
        </ul>
        <p>The median is more useful than the mean — a handful of very high earners skew the mean upward.</p>

        <h2 id="by-region">Average salary by region</h2>
        <table>
          <thead><tr><th>Region</th><th>Median salary</th><th>Take-home (monthly)</th></tr></thead>
          <tbody>
            <tr><td>London</td><td>£43,500</td><td>£2,841</td></tr>
            <tr><td>South East</td><td>£37,000</td><td>£2,497</td></tr>
            <tr><td>East of England</td><td>£35,500</td><td>£2,409</td></tr>
            <tr><td>South West</td><td>£33,000</td><td>£2,262</td></tr>
            <tr><td>West Midlands</td><td>£33,000</td><td>£2,262</td></tr>
            <tr><td>East Midlands</td><td>£32,500</td><td>£2,232</td></tr>
            <tr><td>Yorkshire</td><td>£32,000</td><td>£2,202</td></tr>
            <tr><td>North West</td><td>£33,500</td><td>£2,292</td></tr>
            <tr><td>North East</td><td>£31,000</td><td>£2,142</td></tr>
            <tr><td>Wales</td><td>£31,500</td><td>£2,172</td></tr>
            <tr><td>Scotland</td><td>£34,000</td><td>£2,325</td></tr>
            <tr><td>N. Ireland</td><td>£31,000</td><td>£2,142</td></tr>
          </tbody>
        </table>

        <h2 id="by-age">Average salary by age</h2>
        <table>
          <thead><tr><th>Age group</th><th>Median salary</th></tr></thead>
          <tbody>
            <tr><td>18–21</td><td>£22,000</td></tr>
            <tr><td>22–29</td><td>£29,000</td></tr>
            <tr><td>30–39</td><td>£35,000</td></tr>
            <tr><td>40–49</td><td>£38,000</td></tr>
            <tr><td>50–59</td><td>£36,500</td></tr>
            <tr><td>60+</td><td>£33,000</td></tr>
          </tbody>
        </table>

        <h2 id="calculator">See where you stand</h2>
        <p>Enter your salary in the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to see your exact net pay, then use the <ToolLink to="/compare">Compare tool</ToolLink> to benchmark against the median for your region.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/reverse",label:"Reverse Calculator"},{path:"/compare",label:"Compare Salaries"}]}
          salaries={[{amount:25000},{amount:30000},{amount:35000},{amount:40000},{amount:50000},{amount:60000},{amount:80000},{amount:100000}]}
          cities={["London","Manchester","Birmingham","Leeds","Bristol","Edinburgh"]}
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
        <p><strong>Marriage Allowance</strong> lets one partner transfer £1,260 of their Personal Allowance to the other, reducing the couple's combined tax bill by up to <strong>£252 per year</strong>. HMRC estimates over 2 million eligible couples still haven't claimed.</p>

        <h2 id="eligibility">Who can claim</h2>
        <ul>
          <li>You're married or in a civil partnership.</li>
          <li>The <strong>lower earner</strong> has income below £12,570 (the Personal Allowance).</li>
          <li>The <strong>higher earner</strong> pays basic-rate tax only — income between £12,571 and £50,270.</li>
        </ul>
        <p>It does <em>not</em> apply if the higher earner pays 40% or 45% tax.</p>

        <h2 id="how-it-works">How it works</h2>
        <ol>
          <li>The lower earner transfers £1,260 of their Personal Allowance to their partner.</li>
          <li>The lower earner's Personal Allowance drops from £12,570 to £11,310.</li>
          <li>The higher earner's tax-free amount increases by £1,260.</li>
          <li>At 20% basic rate, that saves <strong>£252 in tax</strong>.</li>
        </ol>

        <h2 id="backdate">Backdating your claim</h2>
        <p>You can backdate Marriage Allowance claims by up to 4 tax years. If you were eligible since 2022/23 and never claimed, you could receive a lump sum of up to <strong>£1,260</strong>.</p>

        <h2 id="apply">How to apply</h2>
        <p>Apply online at <strong>gov.uk/apply-marriage-allowance</strong> — you need both partners' National Insurance numbers. The change is then applied automatically via PAYE each month.</p>

        <h2 id="calculator">Check your saving</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to see the difference with and without Marriage Allowance applied to your partner's salary.</p>
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
        <p><strong>PAYE</strong> (Pay As You Earn) is the system HMRC uses to collect Income Tax and National Insurance directly from your wages. If you're employed, you don't file a tax return — your employer does the calculation on every payslip.</p>

        <h2 id="step-by-step">How PAYE calculates your deductions</h2>
        <ol>
          <li><strong>HMRC issues your tax code</strong> (usually 1257L) — this tells your employer how much tax-free income you get.</li>
          <li><strong>Gross pay is calculated</strong> — salary plus any bonus, overtime, or benefits in kind.</li>
          <li><strong>Tax-free amount is subtracted</strong> — for 1257L, that's £12,570/year or £1,047.50/month.</li>
          <li><strong>Income Tax is applied</strong> to the taxable portion using the correct bands (20%, 40%, 45%).</li>
          <li><strong>National Insurance is deducted</strong> — 8% on earnings between £12,570 and £50,270, then 2% above.</li>
          <li><strong>Student Loan repayments</strong> are taken if applicable (9% above your plan threshold).</li>
          <li><strong>Pension contributions</strong> are deducted (before or after tax, depending on the scheme type).</li>
        </ol>

        <h2 id="cumulative">Cumulative vs Week 1/Month 1</h2>
        <p>Normal PAYE is <strong>cumulative</strong> — HMRC tracks your year-to-date earnings and adjusts each month so you pay the right amount over the full year. This means if you start mid-year, early payslips may show less tax (using up your unused allowance).</p>
        <p><strong>Week 1/Month 1</strong> (emergency) basis taxes each pay period in isolation — this usually means overpaying. See our guide on <ToolLink to="/insights/emergency-tax-code-1257l-explained">emergency tax codes</ToolLink>.</p>

        <h2 id="common-issues">Common PAYE issues</h2>
        <ul>
          <li><strong>Wrong tax code:</strong> check your payslip — if it's not 1257L (or the expected code), call HMRC on 0300 200 3300.</li>
          <li><strong>Two jobs:</strong> your second job often uses a BR code (basic rate on all earnings). See our <ToolLink to="/insights/two-jobs-tax-uk-2026">two jobs guide</ToolLink>.</li>
          <li><strong>Underpayment:</strong> if HMRC discovers you underpaid, they spread the recovery over the following year via a reduced tax code.</li>
        </ul>

        <h2 id="check">Check your PAYE deductions</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to verify that your payslip deductions match what they should be for your salary and tax code.</p>
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
        <p>If you've been on the wrong tax code, worked part of the year, or had emergency tax applied, HMRC may owe you money. Over <strong>£1 billion</strong> in overpaid tax goes unclaimed each year.</p>

        <h2 id="reasons">Common reasons for overpaying tax</h2>
        <ul>
          <li><strong>Emergency tax code</strong> — taxed on Week 1/Month 1 basis after starting a new job.</li>
          <li><strong>Working part-year</strong> — your tax-free allowance is annual, so leaving a job mid-year means you may have been over-deducted.</li>
          <li><strong>Wrong tax code</strong> — if a benefit in kind was added incorrectly or an old Student Loan deduction persists.</li>
          <li><strong>Expenses not claimed</strong> — working from home, professional subscriptions, or uniform costs.</li>
        </ul>

        <h2 id="how-to-check">How to check</h2>
        <ol>
          <li>Sign in to your <strong>HMRC personal tax account</strong> at gov.uk/personal-tax-account.</li>
          <li>Check your tax code and PAYE summary for the current and previous years.</li>
          <li>If it shows "You are owed a refund" — click through to claim.</li>
        </ol>

        <h2 id="claim-methods">Ways to claim</h2>
        <table>
          <thead><tr><th>Method</th><th>Best for</th><th>Timeframe</th></tr></thead>
          <tbody>
            <tr><td>HMRC online account</td><td>Current tax year adjustments</td><td>5–6 weeks</td></tr>
            <tr><td>Form P50</td><td>Left a job and not started a new one</td><td>6–8 weeks</td></tr>
            <tr><td>Phone HMRC (0300 200 3300)</td><td>Complex situations</td><td>Varies</td></tr>
            <tr><td>Self Assessment</td><td>Self-employed or high earners</td><td>After filing</td></tr>
          </tbody>
        </table>

        <h2 id="avoid-scams">Avoid tax refund scams</h2>
        <p>HMRC will <strong>never</strong> email, text, or call you to say you're owed a refund. If you receive such a message, it's a scam. Always go directly to gov.uk.</p>

        <h2 id="calculator">See the calculated tax liability</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to compare what you <em>should</em> be deducted against what your payslip shows. A persistent gap means a refund may be due.</p>
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
        <p>If your employer <strong>requires</strong> you to work from home — even part of the week — you may be able to claim tax relief on household costs. The flat-rate allowance is <strong>£6 per week</strong> (£312 per year).</p>

        <h2 id="eligibility">Who qualifies</h2>
        <ul>
          <li>Your employer <strong>requires</strong> you to work from home (having a hybrid policy counts).</li>
          <li>You have additional household costs as a result (heating, electricity, broadband).</li>
          <li>You do <strong>not</strong> qualify if you simply choose to WFH when office space is available.</li>
        </ul>

        <h2 id="how-much">How much you save</h2>
        <table>
          <thead><tr><th>Tax rate</th><th>Annual relief (£312)</th><th>Saving</th></tr></thead>
          <tbody>
            <tr><td>20% basic</td><td>£312</td><td>£62.40/year</td></tr>
            <tr><td>40% higher</td><td>£312</td><td>£124.80/year</td></tr>
            <tr><td>45% additional</td><td>£312</td><td>£140.40/year</td></tr>
          </tbody>
        </table>

        <h2 id="claim-more">Claiming actual costs instead</h2>
        <p>If your additional costs exceed £6/week, you can claim the actual amount — but you need receipts and evidence. For most people, the flat rate is simpler and sufficient.</p>

        <h2 id="how-to-claim">How to claim</h2>
        <ol>
          <li>Go to <strong>gov.uk/tax-relief-for-employees/working-at-home</strong>.</li>
          <li>Answer the eligibility questions.</li>
          <li>HMRC adjusts your tax code — the relief appears in your payslip automatically.</li>
        </ol>

        <h2 id="calculator">See the impact on your pay</h2>
        <p>The difference is small but real. Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to see your overall monthly take-home, then consider whether the WFH relief is worth claiming.</p>
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
        <p>Birmingham is the UK's second-largest city and a growing hub for technology, financial services, and professional services. Salaries are rising as major employers relocate from London.</p>
        <h2 id="median">Average Birmingham salary 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Amount</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median salary</td><td>£32,400</td><td>£2,340</td></tr>
            <tr><td>Mean salary</td><td>£35,600</td><td>£2,528</td></tr>
            <tr><td>UK median (comparison)</td><td>£34,963</td><td>£2,493</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Average Birmingham salaries by sector</h2>
        <table>
          <thead><tr><th>Sector</th><th>Median salary</th></tr></thead>
          <tbody>
            <tr><td>Technology</td><td>£48,000</td></tr>
            <tr><td>Financial services</td><td>£44,000</td></tr>
            <tr><td>Legal</td><td>£41,000</td></tr>
            <tr><td>Engineering</td><td>£39,500</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£35,000</td></tr>
            <tr><td>Education</td><td>£33,500</td></tr>
            <tr><td>Retail</td><td>£23,500</td></tr>
          </tbody>
        </table>
        <h2 id="calculate">Calculate your Birmingham take-home</h2>
        <p>Use our <ToolLink to="/take-home">take-home calculator</ToolLink> for your exact net pay.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/cost-of-living",label:"Cost of Living"}]}
          salaries={[{amount:28000},{amount:32000},{amount:35000},{amount:40000},{amount:48000}]}
          cities={["London","Manchester","Leeds","Bristol","Edinburgh"]}
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
        <p>Leeds is one of the UK's strongest regional economies, particularly in financial and legal services. Its salaries are competitive with Manchester, with a lower cost of living.</p>
        <h2 id="median">Average Leeds salary 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Amount</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median salary</td><td>£33,800</td><td>£2,427</td></tr>
            <tr><td>Mean salary</td><td>£37,200</td><td>£2,611</td></tr>
            <tr><td>UK median</td><td>£34,963</td><td>£2,493</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Leeds salaries by sector</h2>
        <table>
          <thead><tr><th>Sector</th><th>Median salary</th></tr></thead>
          <tbody>
            <tr><td>Financial services</td><td>£50,000</td></tr>
            <tr><td>Technology</td><td>£48,500</td></tr>
            <tr><td>Legal</td><td>£45,000</td></tr>
            <tr><td>Engineering</td><td>£40,000</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£35,200</td></tr>
            <tr><td>Education</td><td>£33,600</td></tr>
          </tbody>
        </table>
        <h2 id="calculate">Calculate your Leeds take-home pay</h2>
        <p>Use our <ToolLink to="/take-home">take-home calculator</ToolLink> for your exact net pay after all deductions.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/cost-of-living",label:"Cost of Living"}]}
          salaries={[{amount:30000},{amount:33800},{amount:40000},{amount:48500},{amount:50000}]}
          cities={["London","Manchester","Birmingham","Bristol","Edinburgh"]}
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
        <p>Bristol consistently ranks among the UK's highest-paying cities outside London. Aerospace, technology, and financial services drive salaries well above the national median.</p>
        <h2 id="median">Average Bristol salary 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Amount</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Median salary</td><td>£36,200</td><td>£2,562</td></tr>
            <tr><td>Mean salary</td><td>£40,100</td><td>£2,776</td></tr>
            <tr><td>UK median</td><td>£34,963</td><td>£2,493</td></tr>
          </tbody>
        </table>
        <h2 id="sectors">Bristol salaries by sector</h2>
        <table>
          <thead><tr><th>Sector</th><th>Median salary</th></tr></thead>
          <tbody>
            <tr><td>Aerospace and defence</td><td>£55,000</td></tr>
            <tr><td>Technology</td><td>£52,000</td></tr>
            <tr><td>Financial services</td><td>£48,000</td></tr>
            <tr><td>Legal</td><td>£44,000</td></tr>
            <tr><td>Healthcare (NHS)</td><td>£35,800</td></tr>
            <tr><td>Education</td><td>£34,500</td></tr>
          </tbody>
        </table>
        <h2 id="calculate">Calculate your Bristol take-home pay</h2>
        <p>Use our <ToolLink to="/take-home">salary calculator</ToolLink> to see your exact net pay.</p>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/cost-of-living",label:"Cost of Living"}]}
          salaries={[{amount:30000},{amount:36200},{amount:40000},{amount:48000},{amount:55000}]}
          cities={["London","Manchester","Birmingham","Leeds","Edinburgh"]}
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
        <p>Edinburgh is Scotland's financial and legal capital — and the highest-paying city in Scotland. Its strong financial services, tech, and public sector mean salaries sit comfortably above the UK median.</p>
        <h2 id="median">Average Edinburgh salary 2026</h2>
        <table>
          <thead><tr><th>Measure</th><th>Gross</th><th>Monthly take-home (Scottish rates)</th></tr></thead>
          <tbody>
            <tr><td>Median salary</td><td>£37,500</td><td>£2,600</td></tr>
            <tr><td>Mean salary</td><td>£42,200</td><td>£2,876</td></tr>
            <tr><td>Same salary in England</td><td>£37,500</td><td>£2,641 (+£41/month)</td></tr>
          </tbody>
        </table>
        <h2 id="scottish-tax">Scottish tax impact</h2>
        <p>Edinburgh workers pay Scottish income tax rates — which differ from the rest of the UK above £27,491. On a £37,500 salary, the Intermediate Rate (21%) applies to a portion of income, reducing take-home by approximately £400/year versus England.</p>
        <p>Use our <ToolLink to="/take-home">calculator</ToolLink> and toggle Scotland to see the exact difference for your salary.</p>
        <h2 id="sectors">Edinburgh salaries by sector</h2>
        <table>
          <thead><tr><th>Sector</th><th>Median salary</th></tr></thead>
          <tbody>
            <tr><td>Financial services</td><td>£58,000</td></tr>
            <tr><td>Technology</td><td>£52,000</td></tr>
            <tr><td>Legal</td><td>£46,000</td></tr>
            <tr><td>Public sector</td><td>£36,000</td></tr>
            <tr><td>Healthcare (NHS Scotland)</td><td>£35,500</td></tr>
          </tbody>
        </table>
      
        <MiniCalculator />
        <RelatedTools
          tools={[{path:"/take-home",label:"Take-Home Calculator"},{path:"/cost-of-living",label:"Cost of Living"}]}
          salaries={[{amount:32000},{amount:37500},{amount:42000},{amount:50000},{amount:58000}]}
          cities={["London","Manchester","Birmingham","Leeds","Bristol"]}
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
        <p>NHS nursing salaries are set by the Agenda for Change (AfC) pay framework. Here's every band's gross salary and exact monthly take-home for 2026.</p>
        <h2 id="bands">NHS nurse salary by band (2026)</h2>
        <table>
          <thead><tr><th>Band</th><th>Gross salary range</th><th>Monthly take-home (mid-point)</th></tr></thead>
          <tbody>
            <tr><td>Band 5 (Staff Nurse)</td><td>£29,970–£36,483</td><td>~£2,270/month</td></tr>
            <tr><td>Band 6 (Senior Nurse)</td><td>£37,338–£44,962</td><td>~£2,810/month</td></tr>
            <tr><td>Band 7 (Advanced Nurse)</td><td>£46,148–£52,809</td><td>~£3,140/month</td></tr>
            <tr><td>Band 8a (Consultant Nurse)</td><td>£53,755–£60,504</td><td>~£3,530/month</td></tr>
          </tbody>
        </table>
        <p><small>Take-home estimated at mid-point of each band, England, no student loan, before NHS pension contribution.</small></p>
        <h2 id="pension">NHS pension impact</h2>
        <p>NHS pension contributions reduce your take-home. At Band 5 mid-point (~£33,000), you contribute approximately 5.2% — about £143/month. This comes from your net pay (not salary sacrifice), so it doesn't reduce your tax bill.</p>
        <h2 id="london">London weighting</h2>
        <p>NHS staff in London receive a High-Cost Area Supplement of 20% of basic salary (min £5,132, max £7,746). This significantly increases take-home for London-based nurses.</p>
        <h2 id="calculate">Calculate your exact nurse take-home</h2>
        <p>Enter your exact band salary into our <ToolLink to="/take-home">take-home calculator</ToolLink> to see your precise monthly net after tax, NI, and pension.</p>
      </>
    ),
  },

  // 37
  {
    slug: "teacher-salary-uk-2026",
    title: "UK Teacher Pay Scale 2026/27: Salary by Scale Point + Take-Home",
    description: "Full 2026/27 UK teacher pay scales — Main Pay Range £31,650–£43,685, Upper Pay Range, leadership, plus Inner/Outer London allowances. Take-home pay after tax and NI for every step.",
    excerpt: "A newly qualified teacher earns £31,650 in 2026 (£38,765 in London). After tax and NI, that's £2,212/month outside London. Here's the full picture.",
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
        <p>Teacher pay in England is set by the School Teachers' Pay and Conditions Document (STPCD). Here's every scale point and its monthly take-home for 2026.</p>
        <h2 id="main-pay">Main Pay Range (NQT to experienced teacher)</h2>
        <table>
          <thead><tr><th>Scale</th><th>Outside London</th><th>Inner London</th><th>Take-home (outside London)</th></tr></thead>
          <tbody>
            <tr><td>M1 (NQT)</td><td>£31,650</td><td>£42,637</td><td>£2,212/month</td></tr>
            <tr><td>M2</td><td>£33,483</td><td>£44,305</td><td>£2,330/month</td></tr>
            <tr><td>M3</td><td>£35,674</td><td>£46,235</td><td>£2,473/month</td></tr>
            <tr><td>M4</td><td>£37,935</td><td>£48,235</td><td>£2,630/month</td></tr>
            <tr><td>M5</td><td>£40,625</td><td>£50,471</td><td>£2,804/month</td></tr>
            <tr><td>M6</td><td>£43,685</td><td>£53,482</td><td>£2,987/month</td></tr>
          </tbody>
        </table>
        <h2 id="upper-pay">Upper Pay Range (experienced teachers)</h2>
        <table>
          <thead><tr><th>Scale</th><th>Outside London</th><th>Take-home</th></tr></thead>
          <tbody>
            <tr><td>U1</td><td>£46,525</td><td>£3,130/month</td></tr>
            <tr><td>U2</td><td>£48,389</td><td>£3,238/month</td></tr>
            <tr><td>U3</td><td>£50,500</td><td>£3,339/month</td></tr>
          </tbody>
        </table>
        <h2 id="pension">Teachers' Pension Scheme</h2>
        <p>Teachers contribute between 7.4% and 11.7% of salary to the Teachers' Pension Scheme depending on earnings. On M1 (£31,650), contributions are approximately £195/month, reducing take-home accordingly.</p>
        <h2 id="calculate">Calculate your teacher take-home pay</h2>
        <p>Use our <ToolLink to="/take-home">salary calculator</ToolLink> — enter your scale point salary for your exact monthly net after tax, NI, and pension.</p>
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
        <p>Software engineering is one of the UK's best-paid professions at every level. Here's the full salary and take-home breakdown from graduate to principal engineer in 2026.</p>
        <h2 id="by-level">Software engineer salary by level (UK, 2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Typical salary range</th><th>Monthly take-home (mid)</th></tr></thead>
          <tbody>
            <tr><td>Graduate / Junior</td><td>£28,000–£38,000</td><td>~£2,380/month</td></tr>
            <tr><td>Mid-level</td><td>£40,000–£55,000</td><td>~£2,960/month</td></tr>
            <tr><td>Senior</td><td>£55,000–£80,000</td><td>~£3,820/month</td></tr>
            <tr><td>Lead / Staff</td><td>£75,000–£100,000</td><td>~£4,600/month</td></tr>
            <tr><td>Principal / Architect</td><td>£95,000–£130,000</td><td>~£5,800/month</td></tr>
          </tbody>
        </table>
        <h2 id="london">London vs remote</h2>
        <p>London software engineering salaries typically run 25–40% higher than equivalent roles elsewhere. However, many tech companies now pay London rates for fully remote roles — making location increasingly less relevant.</p>
        <h2 id="contracting">PAYE vs contracting</h2>
        <p>A contractor earning £600/day (£144,000/year) through a limited company taking salary + dividends can retain significantly more than a PAYE employee on the same earnings. Use our <ToolLink to="/dividend">dividend calculator</ToolLink> and <ToolLink to="/ir35">IR35 calculator</ToolLink> to compare.</p>
        <h2 id="calculate">Calculate your take-home</h2>
        <p>Use our <ToolLink to="/take-home">take-home calculator</ToolLink> for your exact net pay at any salary level.</p>
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
        <p>Accountancy offers one of the clearest salary progression paths in UK professional services. Here's take-home pay from training through to senior qualified roles.</p>
        <h2 id="by-level">UK accountant salary by qualification and level (2026)</h2>
        <table>
          <thead><tr><th>Level</th><th>Typical salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>AAT trainee / school leaver</td><td>£22,000–£26,000</td><td>~£1,760/month</td></tr>
            <tr><td>Part-qualified (ACA/ACCA)</td><td>£28,000–£38,000</td><td>~£2,380/month</td></tr>
            <tr><td>Newly qualified (ACA/ACCA/CIMA)</td><td>£42,000–£52,000</td><td>~£3,110/month</td></tr>
            <tr><td>Manager (3–5 yrs PQE)</td><td>£55,000–£70,000</td><td>~£3,740/month</td></tr>
            <tr><td>Senior manager / Director</td><td>£70,000–£100,000</td><td>~£4,920/month</td></tr>
            <tr><td>Partner / CFO</td><td>£90,000–£150,000+</td><td>~£6,300/month+</td></tr>
          </tbody>
        </table>
        <h2 id="big4">Big Four vs industry</h2>
        <p>Big Four (Deloitte, PwC, EY, KPMG) newly qualified salaries typically start at £48,000–£54,000. Industry (in-house) roles often pay slightly less but offer better work-life balance and faster progression to senior titles.</p>
        <h2 id="calculate">Calculate your accountant take-home</h2>
        <p>Use our <ToolLink to="/take-home">salary calculator</ToolLink> for your exact monthly net pay at any point in your career.</p>
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
        <p>Here are average gross salaries and monthly take-home pay for over 40 UK professions in 2026, from entry level to experienced.</p>
        <h2 id="healthcare">Healthcare</h2>
        <table>
          <thead><tr><th>Role</th><th>Average salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>GP (salaried)</td><td>£70,000</td><td>£4,010</td></tr>
            <tr><td>Hospital consultant</td><td>£105,000</td><td>£5,580</td></tr>
            <tr><td>Pharmacist</td><td>£46,000</td><td>£3,080</td></tr>
            <tr><td>Physiotherapist</td><td>£36,000</td><td>£2,555</td></tr>
            <tr><td>Nurse (Band 5–6)</td><td>£33,000</td><td>£2,380</td></tr>
            <tr><td>Paramedic</td><td>£36,000</td><td>£2,555</td></tr>
          </tbody>
        </table>
        <h2 id="tech">Technology</h2>
        <table>
          <thead><tr><th>Role</th><th>Average salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Senior software engineer</td><td>£72,000</td><td>£4,090</td></tr>
            <tr><td>Data scientist</td><td>£62,000</td><td>£3,723</td></tr>
            <tr><td>Product manager</td><td>£68,000</td><td>£3,934</td></tr>
            <tr><td>DevOps engineer</td><td>£65,000</td><td>£3,856</td></tr>
            <tr><td>UX designer</td><td>£52,000</td><td>£3,217</td></tr>
            <tr><td>IT support</td><td>£28,000</td><td>£2,040</td></tr>
          </tbody>
        </table>
        <h2 id="legal-finance">Legal and finance</h2>
        <table>
          <thead><tr><th>Role</th><th>Average salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Solicitor (5 yrs PQE)</td><td>£65,000</td><td>£3,856</td></tr>
            <tr><td>Chartered accountant</td><td>£52,000</td><td>£3,217</td></tr>
            <tr><td>Financial adviser</td><td>£55,000</td><td>£3,392</td></tr>
            <tr><td>Investment analyst</td><td>£62,000</td><td>£3,723</td></tr>
            <tr><td>Mortgage broker</td><td>£48,000</td><td>£3,139</td></tr>
          </tbody>
        </table>
        <h2 id="education">Education</h2>
        <table>
          <thead><tr><th>Role</th><th>Average salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Headteacher</td><td>£75,000</td><td>£4,224</td></tr>
            <tr><td>Secondary teacher</td><td>£40,000</td><td>£2,776</td></tr>
            <tr><td>Primary teacher</td><td>£36,000</td><td>£2,555</td></tr>
            <tr><td>Teaching assistant</td><td>£22,000</td><td>£1,717</td></tr>
            <tr><td>University lecturer</td><td>£48,000</td><td>£3,139</td></tr>
          </tbody>
        </table>
        <h2 id="trades">Skilled trades</h2>
        <table>
          <thead><tr><th>Role</th><th>Average salary</th><th>Monthly take-home</th></tr></thead>
          <tbody>
            <tr><td>Electrician</td><td>£40,000</td><td>£2,776</td></tr>
            <tr><td>Plumber</td><td>£38,000</td><td>£2,646</td></tr>
            <tr><td>Carpenter</td><td>£34,000</td><td>£2,437</td></tr>
            <tr><td>HGV driver</td><td>£36,000</td><td>£2,555</td></tr>
            <tr><td>Bricklayer</td><td>£36,500</td><td>£2,583</td></tr>
          </tbody>
        </table>
        <h2 id="calculate">Calculate your exact take-home</h2>
        <p>Every figure above is before pension and student loan deductions. Use our <ToolLink to="/take-home">take-home calculator</ToolLink> for your exact monthly net.</p>
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
        <p>Teacher salaries in England are set by the School Teachers' Pay and Conditions Document (STPCD). Here is every scale point for 2026-27 with exact monthly take-home pay.</p>

        <h2 id="mps">Main Pay Scale (MPS) 2026-27</h2>
        <table>
          <thead><tr><th>Point</th><th>Outer London</th><th>Inner London</th><th>Outside London</th><th>Take-home (outside London)</th></tr></thead>
          <tbody>
            <tr><td>M1 (NQT)</td><td>£36,413</td><td>£42,637</td><td>£31,650</td><td>£2,212/month</td></tr>
            <tr><td>M2</td><td>£37,902</td><td>£44,305</td><td>£33,483</td><td>£2,330/month</td></tr>
            <tr><td>M3</td><td>£39,650</td><td>£46,235</td><td>£35,674</td><td>£2,473/month</td></tr>
            <tr><td>M4</td><td>£41,719</td><td>£48,235</td><td>£37,935</td><td>£2,630/month</td></tr>
            <tr><td>M5</td><td>£44,270</td><td>£50,471</td><td>£40,625</td><td>£2,804/month</td></tr>
            <tr><td>M6</td><td>£47,185</td><td>£53,482</td><td>£43,685</td><td>£2,987/month</td></tr>
          </tbody>
        </table>

        <h2 id="ups">Upper Pay Scale (UPS) 2026-27</h2>
        <table>
          <thead><tr><th>Point</th><th>Outer London</th><th>Inner London</th><th>Outside London</th><th>Take-home (outside London)</th></tr></thead>
          <tbody>
            <tr><td>U1</td><td>£50,151</td><td>£56,660</td><td>£46,525</td><td>£3,130/month</td></tr>
            <tr><td>U2</td><td>£51,482</td><td>£57,958</td><td>£48,389</td><td>£3,238/month</td></tr>
            <tr><td>U3</td><td>£53,482</td><td>£60,321</td><td>£50,500</td><td>£3,339/month</td></tr>
          </tbody>
        </table>

        <h2 id="leadership">Leadership Group pay range 2026-27</h2>
        <table>
          <thead><tr><th>Group</th><th>Outside London</th><th>Inner London</th><th>Take-home (outside London)</th></tr></thead>
          <tbody>
            <tr><td>L1</td><td>£51,179</td><td>£61,342</td><td>£3,244/month</td></tr>
            <tr><td>L6 (Deputy HT, small school)</td><td>£62,570</td><td>£73,698</td><td>£3,755/month</td></tr>
            <tr><td>L18 (Headteacher, mid school)</td><td>£84,483</td><td>£99,018</td><td>£4,782/month</td></tr>
            <tr><td>L43 (Headteacher, large school)</td><td>£135,000+</td><td>£150,000+</td><td>£7,100+/month</td></tr>
          </tbody>
        </table>

        <h2 id="pension">Teachers' Pension Scheme deductions</h2>
        <p>Teachers contribute between <strong>7.4% and 11.7%</strong> of salary to the Teachers' Pension Scheme depending on earnings. At M1 (£31,650), this is approximately £195/month — reducing take-home figures above by that amount.</p>

        <h2 id="calculate">Calculate your exact teacher take-home</h2>
        <p>Enter your exact scale point salary into our <ToolLink to="/take-home">take-home calculator</ToolLink> for your precise monthly net after tax, NI, and pension.</p>
      </>
    ),
  },
];
