import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const Privacy = () => (
  <Shell>
    <Seo
      title="Privacy Policy - Client-Side Calculations"
      description="UK Net Pay processes calculations entirely in your browser. Read our privacy policy on cookies, analytics, and advertising."
      path="/privacy"
    />
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-sm dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-xs text-muted-foreground">Last updated: 30 April 2026</p>
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
          <tr><th>Data type</th><th>Purpose</th><th>Lawful basis (UK GDPR)</th><th>Retention</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Salary calculation inputs (salary, pension, region, etc.)</td>
            <td>Perform the calculation you request</td>
            <td>Not applicable — processed client-side only, never sent to a server</td>
            <td>Cleared when you close the browser tab</td>
          </tr>
          <tr>
            <td>Consent preferences</td>
            <td>Remember your cookie choices</td>
            <td>Legitimate interest (Art. 6(1)(f))</td>
            <td>Until you clear browser storage or change your choice</td>
          </tr>
          <tr>
            <td>Theme preference (light / dark)</td>
            <td>Display the site in your chosen colour mode</td>
            <td>Legitimate interest (Art. 6(1)(f))</td>
            <td>Until you clear browser storage</td>
          </tr>
          <tr>
            <td>Analytics data (if you consent)</td>
            <td>Understand how visitors use the site so we can improve it</td>
            <td>Consent (Art. 6(1)(a))</td>
            <td>Governed by Google Analytics retention settings (up to 14 months)</td>
          </tr>
          <tr>
            <td>Advertising data (if you consent)</td>
            <td>Show relevant ads via Google AdSense</td>
            <td>Consent (Art. 6(1)(a))</td>
            <td>Governed by Google's data retention policies</td>
          </tr>
        </tbody>
      </table>

      <h2>Cookies</h2>
      <p>
        We use a consent banner to ask whether you agree to analytics and advertising
        cookies. You can change your choice at any time using the "Cookie settings"
        link in the footer.
      </p>
      <table>
        <thead>
          <tr><th>Cookie / storage key</th><th>Category</th><th>Purpose</th><th>Duration</th></tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ukn-consent-v1</code></td>
            <td>Strictly necessary</td>
            <td>Stores your cookie consent choice</td>
            <td>Persistent (localStorage)</td>
          </tr>
          <tr>
            <td><code>ukn-theme</code></td>
            <td>Strictly necessary</td>
            <td>Stores light / dark mode preference</td>
            <td>Persistent (localStorage)</td>
          </tr>
          <tr>
            <td>Google Analytics (<code>_ga</code>, <code>_ga_*</code>)</td>
            <td>Analytics (requires consent)</td>
            <td>Distinguish users for aggregated traffic measurement</td>
            <td>Up to 2 years</td>
          </tr>
          <tr>
            <td>Google AdSense cookies</td>
            <td>Advertising (requires consent)</td>
            <td>Ad targeting, frequency capping, reporting</td>
            <td>Varies — see Google's cookie policy</td>
          </tr>
        </tbody>
      </table>

      <h2>Third-party data sharing</h2>
      <p>If you consent to analytics or advertising cookies:</p>
      <ul>
        <li><strong>Google Analytics (Google LLC):</strong> anonymous, aggregated traffic data may be processed by Google. Google acts as a data processor.</li>
        <li><strong>Google AdSense (Google LLC):</strong> ad-related data may be shared with Google for ad delivery and measurement.</li>
      </ul>
      <p>
        Google may transfer data outside the UK. Google relies on Standard Contractual
        Clauses and supplementary measures for international transfers. See{" "}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Google's Privacy Policy
        </a>.
      </p>

      <h2>Your rights under UK GDPR</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access</strong> any personal data we hold about you.</li>
        <li><strong>Rectify</strong> inaccurate personal data.</li>
        <li><strong>Erase</strong> your personal data ("right to be forgotten").</li>
        <li><strong>Restrict</strong> or <strong>object to</strong> processing.</li>
        <li><strong>Data portability</strong> — receive your data in a structured format.</li>
        <li><strong>Withdraw consent</strong> at any time for analytics or advertising cookies via the footer's "Cookie settings" link.</li>
      </ul>
      <p>
        Because we do not store salary calculation data on our servers, there is normally
        no personal calculation record for us to access, rectify, or delete. For cookie
        data stored in your own browser, you can clear browser storage at any time.
      </p>

      <h2>Right to complain</h2>
      <p>
        If you are unhappy with how we handle your data, you have the right to lodge a
        complaint with the Information Commissioner's Office (ICO):
      </p>
      <ul>
        <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
        <li>Helpline: 0303 123 1113</li>
      </ul>

      <h2>Children's privacy</h2>
      <p>
        Our site is not directed at children under 13. We do not knowingly collect
        personal data from children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The "Last updated" date at
        the top of this page indicates when it was last revised.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions, email <code>privacy@uknetpay.co.uk</code>.
      </p>
    </article>
  </Shell>
);

export default Privacy;
