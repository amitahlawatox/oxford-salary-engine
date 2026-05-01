import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const Privacy = () => (
  <Shell>
    <Seo
      title="Privacy Policy - Client-Side Calculations"
      description="UK Net Pay processes calculations entirely in your browser. Read our privacy policy on cookies, analytics, and advertising."
      path="/privacy"
    />
    <article className="prose prose-sm mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-xs text-muted-foreground">Last updated: 1 May 2026</p>
      <p className="lead">
        Your salary is private. UK Net Pay is built so that the figures you enter do not
        leave your device as part of the calculation flow.
      </p>

      <h2>Who we are</h2>
      <p>
        UK Net Pay (<a href="https://www.uknetpay.co.uk">www.uknetpay.co.uk</a>) is
        operated as a sole-trader project. For data-protection purposes, the data
        controller is the site operator. You can contact us at{" "}
        <code>privacy@uknetpay.co.uk</code>.
      </p>

      <h2>What data we process and why</h2>
      <table>
        <thead>
          <tr>
            <th>Data type</th>
            <th>Purpose</th>
            <th>Lawful basis (UK GDPR)</th>
            <th>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Salary calculation inputs (salary, pension, region, and similar figures)</td>
            <td>Perform the calculation you request</td>
            <td>Not applicable - processed client-side only and not sent to a salary database</td>
            <td>Cleared when you close the browser tab</td>
          </tr>
          <tr>
            <td>Consent preferences</td>
            <td>Remember your cookie choices</td>
            <td>Legitimate interest (Article 6(1)(f))</td>
            <td>Until you clear browser storage or change your choice</td>
          </tr>
          <tr>
            <td>Theme preference (light / dark)</td>
            <td>Display the site in your chosen colour mode</td>
            <td>Legitimate interest (Article 6(1)(f))</td>
            <td>Until you clear browser storage</td>
          </tr>
          <tr>
            <td>Analytics data (if you consent)</td>
            <td>Understand how visitors use the site so we can improve it</td>
            <td>Consent (Article 6(1)(a))</td>
            <td>Governed by analytics retention settings where applicable</td>
          </tr>
          <tr>
            <td>Advertising data (if you consent)</td>
            <td>Ad delivery and monetisation support</td>
            <td>Consent (Article 6(1)(a))</td>
            <td>Governed by the live advertising platform's retention settings</td>
          </tr>
        </tbody>
      </table>

      <h2>Cookies and advertising</h2>
      <p>
        We use a consent banner to ask whether you agree to analytics and advertising
        cookies. You can change your choice at any time using the cookie settings link in
        the footer.
      </p>
      <p>
        Our current consent flow is designed to support a privacy-first site experience.
        If UK Net Pay later adopts a formal advertising consent management platform, such
        as an IAB TCF-compatible setup, this policy should be updated to reflect the live
        implementation and vendor list in use at that time.
      </p>
      <table>
        <thead>
          <tr>
            <th>Cookie / storage key</th>
            <th>Category</th>
            <th>Purpose</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ukn-consent-v1</code></td>
            <td>Strictly necessary</td>
            <td>Stores your cookie consent choice</td>
            <td>Persistent (local storage)</td>
          </tr>
          <tr>
            <td><code>ukn-theme</code></td>
            <td>Strictly necessary</td>
            <td>Stores light / dark mode preference</td>
            <td>Persistent (local storage)</td>
          </tr>
          <tr>
            <td>Analytics cookies (if enabled)</td>
            <td>Analytics</td>
            <td>Aggregated traffic measurement</td>
            <td>Varies by provider and configuration</td>
          </tr>
          <tr>
            <td>Advertising cookies (if enabled)</td>
            <td>Advertising</td>
            <td>Ad delivery, measurement, and consent-aware personalisation</td>
            <td>Varies by provider and configuration</td>
          </tr>
        </tbody>
      </table>

      <h2>International transfers</h2>
      <p>
        If you consent to analytics or advertising, third-party providers may transfer data
        outside the UK. Such providers may rely on Standard Contractual Clauses and
        supplementary measures for international transfers. See the relevant provider
        privacy materials for live details.
      </p>

      <h2>Zero-data retention policy</h2>
      <p>
        We do not store your salary data, we do not use cookies for tracking without
        consent, and we do not collect email addresses as part of the calculator
        experience.
      </p>

      <h2>Your rights under UK GDPR</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> personal data we hold about you.</li>
        <li><strong>Rectify</strong> inaccurate personal data.</li>
        <li><strong>Erase</strong> personal data where applicable.</li>
        <li><strong>Restrict</strong> or <strong>object to</strong> processing.</li>
        <li><strong>Data portability</strong> where the right applies.</li>
        <li>
          <strong>Withdraw consent</strong> at any time for analytics or advertising cookies
          via the footer's cookie settings link.
        </li>
      </ul>
      <p>
        Because we do not store salary calculation data on our servers, there is normally
        no personal calculation record for us to access, rectify, or delete. For cookie
        data stored in your own browser, you can clear browser storage at any time.
      </p>

      <h2>Right to complain</h2>
      <p>
        If you are unhappy with how your data is handled, you have the right to lodge a
        complaint with the Information Commissioner's Office (ICO).
      </p>
      <ul>
        <li>
          Website:{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">
            ico.org.uk
          </a>
        </li>
        <li>Helpline: 0303 123 1113</li>
      </ul>

      <h2>ICO registration and future mailing lists</h2>
      <p>
        UK Net Pay does not currently operate a marketing email list through the
        calculator experience. If that changes, the operator should review whether
        registration with the ICO is required and update the site's privacy and consent
        flows before collecting subscriber data.
      </p>

      <h2>Children's privacy</h2>
      <p>
        The site is not directed at children under 13, and we do not knowingly collect
        personal data from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The "Last updated" date at
        the top of this page shows when it was last revised.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, email <code>privacy@uknetpay.co.uk</code>.
      </p>
    </article>
  </Shell>
);

export default Privacy;
