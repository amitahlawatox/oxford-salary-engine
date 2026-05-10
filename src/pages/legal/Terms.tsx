import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const UPDATED = "7 May 2026";
const YEAR = new Date().getFullYear();

const Terms = () => (
  <Shell>
    <Seo
      title="Terms of Use | UK Net Pay"
      description="Terms of use for UK Net Pay salary calculators. No personal data collected. Not financial advice. Free to use for personal and professional reference."
      path="/terms"
      robots="index,follow,max-image-preview:large"
    />
    <article className="prose prose-sm mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Terms of Use</h1>
      <p className="text-xs text-muted-foreground">Last updated: {UPDATED}</p>
      <p>
        By accessing or using UK Net Pay (<a href="https://uknetpay.co.uk">www.uknetpay.co.uk</a>),
        you agree to be bound by these Terms of Use. If you do not agree, please do not use this website.
      </p>

      <h2>1. Nature of the service</h2>
      <p>
        UK Net Pay provides free UK salary and tax calculators for <strong>general
        information and illustrative purposes only</strong>. The service:
      </p>
      <ul>
        <li>Is <strong>not financial advice</strong></li>
        <li>Is <strong>not tax advice</strong></li>
        <li>Is <strong>not legal advice</strong></li>
        <li>Does <strong>not</strong> create a professional relationship between you and UK Net Pay</li>
        <li>Is <strong>not regulated</strong> by the Financial Conduct Authority (FCA)</li>
      </ul>
      <p>
        Always consult a qualified professional — such as a chartered accountant, tax adviser,
        or FCA-regulated independent financial adviser — before making any financial decision.
      </p>

      <h2>2. No personal data collected</h2>
      <p>
        UK Net Pay is designed to be <strong>zero-data</strong>. We do not collect,
        store, or process:
      </p>
      <ul>
        <li>Your name</li>
        <li>Your email address</li>
        <li>Your telephone number or address</li>
        <li>Your salary figures or any financial data you enter into the calculators</li>
        <li>Any other personally identifiable information through the calculator tools</li>
      </ul>
      <p>
        All calculations are performed locally in your browser. Nothing you enter is
        transmitted to our servers. See our <a href="/privacy">Privacy Policy</a> for
        full details.
      </p>

      <h2>3. Accuracy and no warranty</h2>
      <p>
        We apply HMRC-published rates and verify our engine against official benchmarks.
        However, tax rules can change, and individual circumstances vary. We provide
        this service <strong>"as is" and "as available"</strong> without any warranty
        of accuracy, completeness, or fitness for any particular purpose.
      </p>
      <p>
        <strong>You use the calculators entirely at your own risk.</strong>
      </p>

      <h2>4. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by applicable law, UK Net Pay excludes all
        liability for any direct, indirect, incidental, consequential, or punitive loss
        or damage of any kind arising from:
      </p>
      <ul>
        <li>Your use of, or inability to use, this website</li>
        <li>Any reliance on calculation outputs or article content</li>
        <li>Any financial, tax, employment, or other decision made based on content from this site</li>
        <li>Any inaccuracy in the calculators arising from mid-year legislative changes</li>
      </ul>
      <p>
        Nothing in these terms excludes liability for death or personal injury caused by
        our negligence, or for fraud, or for any other liability that cannot be excluded
        under English law.
      </p>

      <h2>5. Acceptable use</h2>
      <p>You may use UK Net Pay for lawful personal or professional reference. You must not:</p>
      <ul>
        <li>Scrape, copy, or republish substantial portions of the site's content without written permission</li>
        <li>Attempt to reverse-engineer, decompile, or extract the calculation logic for commercial redistribution</li>
        <li>Use the site in any way that violates applicable UK or international law</li>
        <li>Use the site to transmit spam, malware, or harmful code</li>
        <li>Attempt to gain unauthorised access to any part of the site or its infrastructure</li>
      </ul>

      <h2>6. Intellectual property</h2>
      <p>
        All content, design, calculation logic, and code on this website are the intellectual
        property of UK Net Pay © {YEAR}. All rights reserved. You may not reproduce or
        commercially exploit any part of this website without our prior written consent.
      </p>

      <h2>7. Third-party services</h2>
      <p>
        This website may use third-party services (such as Google Analytics, where you
        have consented, and a hosting provider). We are not responsible for the privacy
        practices or content of any third-party service. Links to external websites are
        provided for convenience only and do not constitute endorsement.
      </p>

      <h2>8. No professional relationship</h2>
      <p>
        Using this website does not create a solicitor-client, accountant-client,
        adviser-client, or any other professional relationship between you and UK Net Pay
        or any individual connected to it. No duty of care is assumed.
      </p>

      <h2>9. Subscriptions and payments</h2>
      <p>
        UK Net Pay is currently <strong>entirely free to use</strong>. We do not offer
        any subscription services, paid features, or in-app purchases through this website.
        If paid services are introduced in future, full pricing and cancellation terms
        will be clearly presented before any commitment is required.
      </p>

      <h2>10. Changes to these terms</h2>
      <p>
        We may update these terms at any time. Continued use of the website following
        any update constitutes acceptance of the revised terms. The "Last updated"
        date at the top of this page shows when the terms were last changed.
      </p>

      <h2>11. Governing law and jurisdiction</h2>
      <p>
        These terms and any dispute arising from them are governed by the laws of
        England and Wales. You and UK Net Pay agree to submit to the exclusive
        jurisdiction of the courts of England and Wales.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these terms: <a href="mailto:contact@uknetpay.co.uk">contact@uknetpay.co.uk</a>
      </p>
    </article>
  </Shell>
);

export default Terms;
