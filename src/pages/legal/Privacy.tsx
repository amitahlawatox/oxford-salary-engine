import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const UPDATED = "9 June 2026";

const Privacy = () => (
  <Shell>
    <Seo
      title="Privacy Policy — Zero Personal Data Collection | UK Net Pay"
      description="UK Net Pay collects zero personal data. No name, email, phone, or financial information is ever stored. All calculations run in your browser. Full GDPR policy."
      path="/privacy"
      robots="index,follow,max-image-preview:large"
    />
    <article className="prose prose-sm mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="text-xs text-muted-foreground">Last updated: {UPDATED}</p>

      <div className="not-prose rounded-xl border border-border bg-secondary/50 p-5 my-6">
        <p className="text-sm font-semibold mb-2">The short version</p>
        <ul className="text-sm text-muted-foreground space-y-1 list-none p-0 m-0">
          <li>✅ We collect <strong>no names, email addresses, phone numbers, or financial data</strong></li>
          <li>✅ All calculations happen <strong>entirely in your browser</strong> — nothing is sent to our servers</li>
          <li>✅ We only store your <strong>cookie preference</strong> and <strong>display theme</strong> locally on your device</li>
          <li>✅ Analytics and advertising cookies are <strong>off by default</strong> — only enabled with your explicit consent</li>
          <li>✅ You can <strong>clear everything</strong> by clearing your browser's local storage</li>
        </ul>
      </div>

      <h2>1. Who we are</h2>
      <p>
        UK Net Pay (<a href="https://uknetpay.co.uk">uknetpay.co.uk</a>) provides
        free UK salary and tax calculators. For data-protection purposes, the data controller
        is the site operator. Contact us at <a href="mailto:privacy@uknetpay.co.uk">privacy@uknetpay.co.uk</a>.
      </p>

      <h2>2. What personal data we collect — and what we do not</h2>

      <h3>What we do NOT collect</h3>
      <p>
        We do <strong>not</strong> collect, request, store, or transmit any of the following:
      </p>
      <ul>
        <li><strong>Your name</strong> — at no point</li>
        <li><strong>Your email address</strong> — there are no sign-up forms or newsletter subscriptions</li>
        <li><strong>Your telephone number</strong></li>
        <li><strong>Your home or work address</strong></li>
        <li><strong>Your National Insurance number</strong></li>
        <li><strong>Your bank account details or any payment information</strong></li>
        <li><strong>Your actual salary figures</strong> — these are processed in your browser only and are never transmitted to our servers</li>
        <li><strong>Any other personally identifiable information</strong> as part of the core calculator experience</li>
      </ul>

      <h3>What we DO store (locally on your device only)</h3>
      <table>
        <thead>
          <tr>
            <th>Storage key</th>
            <th>What it stores</th>
            <th>Where</th>
            <th>When it is cleared</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>ukn-consent-v1</code></td>
            <td>Your cookie consent choice (yes/no booleans only)</td>
            <td>Your browser's localStorage</td>
            <td>When you clear browser storage or change your choice</td>
          </tr>
          <tr>
            <td><code>ukn-theme</code></td>
            <td>Your light/dark display preference</td>
            <td>Your browser's localStorage</td>
            <td>When you clear browser storage</td>
          </tr>
        </tbody>
      </table>
      <p>
        Neither of these items contains any personal information. They are functional
        preferences stored solely on your device and are never transmitted to our servers.
      </p>

      <h2>3. How calculations work — client-side only</h2>
      <p>
        Every calculation on UK Net Pay — salary, take-home, IR35, dividend, maternity,
        and all other tools — is performed <strong>entirely within your web browser</strong>.
        When you enter a salary figure and click calculate:
      </p>
      <ul>
        <li>Your input data is processed by JavaScript running in your browser</li>
        <li>No data is transmitted to our web servers or any third-party server as part of the calculation</li>
        <li>No data is written to a database</li>
        <li>No data is logged by our hosting provider as part of the calculation process</li>
      </ul>
      <p>
        The figures you enter are discarded from memory when you close or navigate away
        from the page.
      </p>

      <h2>4. Analytics (only with your consent)</h2>
      <p>
        We use <strong>Google Analytics 4 (GA4)</strong> to understand how visitors use
        the site in aggregate. This is <strong>disabled by default</strong>. It is only
        enabled if you explicitly choose "Accept all" or toggle analytics on in the
        cookie consent banner.
      </p>
      <p>
        When analytics is enabled, GA4 may collect:
      </p>
      <ul>
        <li>Pages viewed and time spent on pages</li>
        <li>Approximate geographic region (country or city level — never precise location)</li>
        <li>Device type and browser type</li>
        <li>How you arrived at the site (e.g. search engine, direct link)</li>
      </ul>
      <p>
        GA4 is configured with <code>anonymize_ip: true</code>. No salary data,
        calculator inputs, or other personally identifiable information is ever sent
        to Google Analytics.
      </p>
      <p>
        You can withdraw analytics consent at any time via the Cookie Settings link in the footer.
      </p>

      <h2>5. Advertising (Google AdSense)</h2>
      <p>
        We display advertisements through <strong>Google AdSense</strong>, a third-party
        advertising service provided by Google LLC. Google AdSense may use cookies and
        similar technologies to serve ads based on your prior visits to this website or
        other websites. Advertising cookies are <strong>disabled by default</strong> and
        are only enabled if you explicitly consent via the cookie consent banner.
      </p>
      <p>
        When advertising is enabled, Google may collect and use data as described in the{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          Google Privacy & Terms
        </a>. You can opt out of personalised advertising at any time by visiting{" "}
        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
          Google Ads Settings
        </a> or{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
          www.aboutads.info
        </a>.
      </p>
      <p>
        We do not pass any personal data, salary data, or financial data to Google
        AdSense or any other advertising provider. The ad code loads asynchronously
        and does not affect the speed or accuracy of our calculators.
      </p>

      <h2>6. Server logs</h2>
      <p>
        Like all websites, our hosting provider (Vercel) automatically records
        standard web server access logs. These may include your IP address, browser
        type, and the URL you requested. These logs are used solely for security
        and infrastructure purposes and are not used for marketing or profiling.
        We do not link server log data to any individual's calculator usage.
      </p>

      <h2>7. No email marketing — ever</h2>
      <p>
        UK Net Pay has <strong>no newsletter, no marketing list, and no email
        subscription feature</strong>. We will never send you unsolicited commercial
        email. If you contact us at our support email address, we will use your email
        solely to respond to your enquiry and will not add it to any list.
      </p>

      <h2>8. Children's privacy</h2>
      <p>
        This website is not directed at children under the age of 13. We do not
        knowingly collect personal data from children. If you believe a child has
        provided us with personal data, please contact us and we will delete it.
      </p>

      <h2>9. Your rights under UK GDPR</h2>
      <p>
        Under the UK GDPR and Data Protection Act 2018, you have the following rights
        in relation to your personal data:
      </p>
      <ul>
        <li><strong>Right of access</strong> — to receive a copy of the personal data we hold about you</li>
        <li><strong>Right to rectification</strong> — to have inaccurate data corrected</li>
        <li><strong>Right to erasure</strong> — to request deletion of your personal data</li>
        <li><strong>Right to restriction</strong> — to request we limit how we use your data</li>
        <li><strong>Right to object</strong> — to processing based on legitimate interests</li>
        <li><strong>Right to data portability</strong> — to receive your data in a structured format</li>
        <li><strong>Right to withdraw consent</strong> — at any time, for analytics or advertising</li>
      </ul>
      <p>
        Because we do not store any personal financial data on our servers, there is
        typically no personal record for us to access, rectify, or delete. For
        locally stored preferences, you can clear these directly from your browser.
      </p>
      <p>
        To exercise any of your rights, contact <a href="mailto:privacy@uknetpay.co.uk">privacy@uknetpay.co.uk</a>.
        We will respond within 30 days.
      </p>

      <h2>10. Right to complain to the ICO</h2>
      <p>
        If you are not satisfied with how we handle your personal data, you have the
        right to lodge a complaint with the Information Commissioner's Office (ICO):
      </p>
      <ul>
        <li>Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer">ico.org.uk</a></li>
        <li>Helpline: 0303 123 1113</li>
      </ul>

      <h2>11. Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The "Last updated"
        date at the top indicates when it was last revised. We encourage you to
        review this page periodically.
      </p>

      <h2>12. Contact</h2>
      <p>
        For any privacy questions: <a href="mailto:privacy@uknetpay.co.uk">privacy@uknetpay.co.uk</a>
      </p>
    </article>
  </Shell>
);

export default Privacy;
