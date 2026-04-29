import { Link } from "react-router-dom";
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
        <p>Use the <ToolLink to="/take-home">Take-Home calculator</ToolLink> with code <code>1257L</code> to see what you should be netting once the code is corrected.</p>
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
];
