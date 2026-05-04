import { Link } from "react-router-dom";
import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const SITE = "https://www.uknetpay.co.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE}/about`,
  name: "About UK Net Pay",
  description:
    "Learn about UK Net Pay — the privacy-first salary and tax calculator for the 2026/27 tax year.",
};

const About = () => (
  <Shell>
    <Seo
      title="About Us — UK Net Pay"
      description="UK Net Pay is a free, privacy-first salary calculator for the 2026/27 UK tax year. Learn who we are and why we built it."
      path="/about"
      jsonLd={jsonLd}
    />
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-sm dark:prose-invert">
      <h1>About UK Net Pay</h1>
      <p className="lead">
        UK Net Pay is a free, privacy-first suite of salary and tax calculators built
        for the 2026/27 UK tax year. We exist because everyone deserves to understand
        their take-home pay without handing over personal data.
      </p>

      <h2>Why we built this</h2>
      <p>
        Most salary calculators ask you to register, collect your email, or send your
        financial data to a server. We believe salary information is deeply private.
        UK Net Pay runs every calculation entirely in your browser — your figures
        never leave your device.
      </p>

      <h2>What we offer</h2>
      <ul>
        <li><strong>12 specialist calculators</strong> covering salary, hourly, reverse, dividend, IR35, self-employed, cost of living, and more.</li>
        <li><strong>Privacy by design</strong> — no sign-up, no server storage, no tracking without consent.</li>
        <li><strong>HMRC-verified rates</strong> for the 2026/27 tax year, including Scotland's six-tier system.</li>
        <li><strong>In-depth guides</strong> on UK tax, National Insurance, student loans, and salary negotiation.</li>
      </ul>

      <h2>Our methodology</h2>
      <p>
        We verify our tax engine against HMRC-published thresholds, rates, and worked
        examples. Our{" "}
        <Link to="/methodology" className="text-accent underline underline-offset-4 hover:opacity-80">
          public methodology page
        </Link>{" "}
        explains the assumptions, verification steps, and where our simplified public
        model intentionally stops.
      </p>

      <h2>Important disclaimer</h2>
      <p>
        UK Net Pay is not regulated by the Financial Conduct Authority (FCA) and does
        not provide financial advice. The calculators produce illustrative estimates
        based on standard 2026/27 assumptions. Always consult a qualified accountant
        or independent financial adviser for decisions about your personal
        circumstances.
      </p>

      <h2>Get in touch</h2>
      <p>
        Questions, feedback, or partnership enquiries? Visit our{" "}
        <Link to="/contact" className="text-accent underline underline-offset-4 hover:opacity-80">
          contact page
        </Link>{" "}
        or email{" "}
        <a href="mailto:contact@uknetpay.co.uk" className="text-accent underline underline-offset-4 hover:opacity-80">
          contact@uknetpay.co.uk
        </a>.
      </p>
    </article>
  </Shell>
);

export default About;
