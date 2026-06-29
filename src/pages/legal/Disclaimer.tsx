import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const UPDATED = "7 May 2026";

const Disclaimer = () => (
  <Shell showAd={false}>
    <Seo
      title="Legal Disclaimer — Not Financial or Tax Advice | UK Net Pay"
      description="UK Net Pay provides illustrative calculations only. We are not regulated by the FCA, do not provide financial advice, and collect no personal data. Read our full disclaimer."
      path="/disclaimer"
      robots="index,follow,max-image-preview:large"
    />
    <article className="prose prose-sm mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Legal Disclaimer</h1>
      <p className="text-xs text-muted-foreground">Last updated: {UPDATED}</p>

      <div className="not-prose rounded-xl border-2 border-destructive/30 bg-destructive/5 p-5 my-6">
        <p className="text-sm font-semibold text-destructive mb-1">Important — please read before using this site</p>
        <p className="text-sm text-muted-foreground">
          UK Net Pay provides calculators and articles for <strong>illustrative and informational purposes only</strong>.
          Nothing on this website constitutes financial advice, tax advice, legal advice, or any other form of
          regulated advice. We do not collect, store, or transmit your personal or financial data.
          Always consult a qualified professional before making financial decisions.
        </p>
      </div>

      <h2>1. Information only — not professional advice</h2>
      <p>
        All calculators, tools, articles, guides, and other content published on UK Net Pay
        (<a href="https://uknetpay.co.uk">uknetpay.co.uk</a>) are provided for
        <strong> general information and illustrative purposes only</strong>. They do not, and are not
        intended to, constitute:
      </p>
      <ul>
        <li>Financial advice of any kind</li>
        <li>Tax advice or a tax opinion</li>
        <li>Legal advice</li>
        <li>Accounting or auditing advice</li>
        <li>Investment advice or recommendations</li>
        <li>A personal recommendation in relation to any financial product or service</li>
      </ul>
      <p>
        No professional relationship is created between you and UK Net Pay by your use of this website.
      </p>

      <h2>2. Not regulated by the FCA</h2>
      <p>
        UK Net Pay is <strong>not authorised or regulated by the Financial Conduct Authority (FCA)</strong>.
        We do not hold any FCA permissions and do not provide regulated financial advice,
        regulated mortgage advice, or regulated investment advice. The content of this site
        falls outside the scope of FCA regulation as it is purely illustrative in nature.
      </p>
      <p>
        If you require regulated financial advice, you must consult an adviser who is
        authorised and regulated by the FCA. You can verify a firm's FCA authorisation
        at <a href="https://register.fca.org.uk" target="_blank" rel="noopener noreferrer">register.fca.org.uk</a>.
      </p>

      <h2>3. No reliance — seek professional advice</h2>
      <p>
        <strong>You must not rely on the outputs of any UK Net Pay calculator or the content
        of any article as the basis for any financial, tax, legal, or other decision.</strong>
      </p>
      <p>
        Before making any decision about your salary, pension, tax affairs, employment status,
        contractor arrangements, or any other financial matter, you should seek independent
        advice from a suitably qualified professional, such as:
      </p>
      <ul>
        <li>A <strong>chartered accountant</strong> (ICAEW, ACCA, CIMA, or ICAS member)</li>
        <li>A <strong>tax adviser</strong> (Chartered Tax Adviser — CTA)</li>
        <li>An <strong>independent financial adviser</strong> (IFA) regulated by the FCA</li>
        <li>A <strong>solicitor</strong> (authorised by the Solicitors Regulation Authority)</li>
      </ul>

      <h2>4. Accuracy and completeness</h2>
      <p>
        We use HMRC-published rates and thresholds for the current tax year and verify our
        calculation engine against official HMRC worked examples. However:
      </p>
      <ul>
        <li>Tax rules can change mid-year following a Budget or emergency legislation</li>
        <li>Individual circumstances — such as tax code adjustments, marriage allowance,
            blind person's allowance, high income child benefit charge, or HMRC-specific
            arrangements — cannot all be modelled</li>
        <li>The calculators apply standard HMRC rates and do not reflect every possible
            variation in personal tax codes</li>
      </ul>
      <p>
        <strong>We make no warranty, express or implied, as to the accuracy, completeness,
        timeliness, or fitness for purpose of any content on this website.</strong>
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by applicable law, UK Net Pay and its operators,
        contributors, and service providers:
      </p>
      <ul>
        <li>Exclude all conditions, warranties, representations, or other terms that may
            apply to this website or any content on it, whether express or implied</li>
        <li>Accept <strong>no liability</strong> for any direct, indirect, special,
            incidental, punitive, or consequential loss or damage arising out of, or in
            connection with, your use of or inability to use this website, including but
            not limited to loss of income, loss of profit, loss of business, or loss of
            anticipated savings</li>
        <li>Accept no liability for any financial or tax decision made in reliance on
            any content published on this website</li>
      </ul>
      <p>
        Nothing in these terms excludes or limits our liability for death or personal injury
        caused by our negligence, or for fraud or fraudulent misrepresentation, or for any
        other liability that cannot be excluded or limited under English law.
      </p>

      <h2>6. No data collection — your data stays in your browser</h2>
      <p>
        <strong>UK Net Pay does not collect, record, transmit, or store any personal or
        financial information you enter into any calculator.</strong> Specifically:
      </p>
      <ul>
        <li>We collect <strong>no names</strong></li>
        <li>We collect <strong>no email addresses</strong> through the calculator tools</li>
        <li>We collect <strong>no telephone numbers</strong></li>
        <li>We collect <strong>no financial account details</strong> of any kind</li>
        <li>We collect <strong>no salary figures or tax data</strong> on our servers</li>
        <li>All calculations are performed entirely within your browser (client-side)</li>
        <li>No calculation data is transmitted to our servers at any point</li>
      </ul>
      <p>
        The only data stored locally on your device is your consent preference
        (<code>ukn-consent-v1</code>) and your display theme preference
        (<code>ukn-theme</code>), both held in your browser's local storage.
        You can clear these at any time by clearing your browser storage.
      </p>

      <h2>7. Third-party links</h2>
      <p>
        This website may contain links to third-party websites (for example, HMRC,
        the ICO, or professional body registers). These links are provided for your
        convenience only. We have no control over the content of those websites and
        accept no responsibility for them or for any loss or damage that may arise
        from your use of them.
      </p>

      <h2>8. Governing law</h2>
      <p>
        This disclaimer and any dispute or claim arising out of or in connection with it
        is governed by and shall be construed in accordance with the law of
        England and Wales. You and we both agree to the exclusive jurisdiction of
        the courts of England and Wales.
      </p>

      <h2>9. Changes to this disclaimer</h2>
      <p>
        We may update this disclaimer at any time. Continued use of the website after
        any changes constitutes your acceptance of the updated terms. The "Last updated"
        date at the top of this page indicates when it was most recently revised.
      </p>

      <h2>Contact</h2>
      <p>
        If you have any questions about this disclaimer, please contact us at{" "}
        <a href="mailto:contact@uknetpay.co.uk">contact@uknetpay.co.uk</a>.
      </p>
    </article>
  </Shell>
);

export default Disclaimer;
