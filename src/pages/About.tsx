import { Link } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";
import { Shield, Calculator, BookOpen, Lock } from "lucide-react";

const SITE = "https://uknetpay.co.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE}/about`,
  name: "About UK Net Pay",
  description: "UK Net Pay is built and maintained by Amit Ahlawat. Free, privacy-first salary and tax calculators for the 2026/27 UK tax year, verified against HMRC published rates.",
  publisher: {
    "@type": "Organization",
    name: "UK Net Pay",
    url: SITE,
    founder: {
      "@type": "Person",
      name: "Amit Ahlawat",
      url: `${SITE}/about`,
    },
  },
};

const About = () => (
  <Shell>
    <Seo
      title="About UK Net Pay — Free Salary Calculators Built by Amit Ahlawat"
      description="UK Net Pay is built by Amit Ahlawat. Free, privacy-first salary and tax calculators for 2026/27. All calculations verified against HMRC published rates. No data collected."
      path="/about"
      jsonLd={jsonLd}
    />
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-sm dark:prose-invert">
      <h1>About UK Net Pay</h1>

      {/* Founder section — E-E-A-T signal */}
      <div className="not-prose flex items-start gap-4 rounded-xl border border-border bg-secondary/40 p-5 my-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary font-semibold text-foreground select-none">
          AA
        </div>
        <div>
          <p className="font-semibold text-foreground">Amit Ahlawat — Founder</p>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            I built UK Net Pay because I was frustrated with salary calculators that either required sign-up, collected financial data, or produced inaccurate results. Every calculation on this site is verified against HMRC published rates and ONS earnings data. The code is open — you can <a href="https://github.com/amitahlawatox/oxford-salary-engine" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">inspect every formula on GitHub</a>.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Questions or corrections: <a href="mailto:contact@uknetpay.co.uk" className="text-accent underline underline-offset-2">contact@uknetpay.co.uk</a>
          </p>
        </div>
      </div>

      <h2>What UK Net Pay is</h2>
      <p>
        UK Net Pay is a free, privacy-first suite of salary and tax calculators for the 2026/27 UK tax year.
        Every calculation runs entirely in your browser — your salary figures never leave your device and are never sent to our servers.
      </p>

      <div className="not-prose grid grid-cols-2 gap-4 my-6">
        {[
          { icon: Calculator, title: "14 calculators", desc: "Salary, hourly, reverse, IR35, dividend, self-employed, contractor, EV salary sacrifice, childcare, and more" },
          { icon: Lock, title: "Zero data collection", desc: "No sign-up, no cookies without consent, no server-side storage of your financial inputs" },
          { icon: Shield, title: "HMRC verified", desc: "All rates cross-referenced with HMRC published thresholds for 2026/27 including Scotland's six-band system" },
          { icon: BookOpen, title: "67 guides", desc: "In-depth articles on UK tax, salary benchmarks, NHS pay bands, teacher pay scales, and more" },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border p-4">
            <Icon className="h-5 w-5 text-muted-foreground mb-2" aria-hidden="true" />
            <p className="font-semibold text-foreground text-sm">{title}</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <h2>How we verify our calculations</h2>
      <p>
        Every tax rate, threshold, and NI band is sourced directly from HMRC's published documentation for the 2026/27 tax year. 
        Our calculation engine is verified against:
      </p>
      <ul>
        <li><a href="https://www.gov.uk/income-tax-rates" target="_blank" rel="noopener noreferrer">HMRC Income Tax rates and allowances</a></li>
        <li><a href="https://www.gov.uk/national-insurance-rates-letters" target="_blank" rel="noopener noreferrer">HMRC National Insurance rates</a></li>
        <li><a href="https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/earningsandworkinghours" target="_blank" rel="noopener noreferrer">ONS Annual Survey of Hours and Earnings (ASHE)</a></li>
        <li><a href="https://www.revenue.scot/income-tax/income-tax-rates-and-bands" target="_blank" rel="noopener noreferrer">Revenue Scotland — Scottish income tax bands</a></li>
      </ul>
      <p>
        Our full methodology — including assumptions, known limitations, and where to find professional advice — is documented on the{" "}
        <Link to="/methodology">methodology page</Link>.
      </p>

      <h2>What we are not</h2>
      <p>
        UK Net Pay is <strong>not regulated by the Financial Conduct Authority (FCA)</strong> and does not provide financial advice, tax advice, or legal advice.
        Results are illustrative estimates based on standard HMRC rates. Your individual tax code, employer arrangements, or other personal circumstances may produce different results.
        Always consult a qualified accountant, tax adviser, or FCA-regulated independent financial adviser before making financial decisions.
      </p>
      <p>
        See our full <Link to="/disclaimer">legal disclaimer</Link> and <Link to="/privacy">privacy policy</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        General enquiries: <a href="mailto:contact@uknetpay.co.uk">contact@uknetpay.co.uk</a><br />
        Privacy and data: <a href="mailto:privacy@uknetpay.co.uk">privacy@uknetpay.co.uk</a><br />
        Calculation corrections: <a href="mailto:contact@uknetpay.co.uk">contact@uknetpay.co.uk</a>
      </p>
    </article>
  </Shell>
);

export default About;
