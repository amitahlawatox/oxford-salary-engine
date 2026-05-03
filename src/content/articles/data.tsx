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
    title: "Average UK Salary 2026 — Median by Region & Age",
    description: "The median UK salary is £35,000 in 2025/26. See how you compare by region, age group and industry.",
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
    title: "Pension Auto-Enrolment 2026 — Rates & Impact",
    description: "Workplace pension minimum is 8% (3% employer + 5% employee). See how auto-enrolment affects your take-home pay.",
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
      { q: "How do I know if I'm owed a tax refund?", a: "Compare your actual deductions (from payslips or P60) against what you should have paid using a salary calculator. Common causes include wrong tax codes, emergency tax, or working part of the year." },
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

        <h2 id="calculator">Check what you should be paying</h2>
        <p>Use the <ToolLink to="/take-home">Take-Home Calculator</ToolLink> to compare what you <em>should</em> be deducted against what your payslip shows. A persistent gap means a refund may be due.</p>
      </>
    ),
  },

  // 22
  {
    slug: "employer-ni-guide-2026",
    title: "Employer National Insurance 2026/27 — Rates Guide",
    description: "Employer NI rose to 15% from April 2025. See the full cost of employing someone and how it affects hiring decisions.",
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
      { q: "Can I use it with childcare vouchers?", a: "No — you must choose one or the other. If you're already on childcare vouchers through your employer, compare which scheme saves you more before switching." },
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
];
