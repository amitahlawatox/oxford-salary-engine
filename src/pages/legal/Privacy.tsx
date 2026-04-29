import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const Privacy = () => (
  <Shell>
    <Seo
      title="Privacy Policy — Client-Side Calculations"
      description="UK Net Pay processes calculations entirely in your browser. Read our GDPR-compliant privacy policy on cookies, ads and analytics."
      path="/privacy"
    />
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-sm dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p className="lead">
        Your salary is private. UK Net Pay is built so that none of the figures
        you enter ever leave your device.
      </p>
      <h2>What data we process</h2>
      <p>
        Calculation data — your salary, pension, region, student loan plan and
        other inputs — is processed <strong>client-side in your browser</strong>{" "}
        and is <strong>never sent to or stored on our servers</strong>.
      </p>
      <h2>Cookies & advertising</h2>
      <p>
        We use a consent banner to ask whether you agree to advertising and
        analytics cookies. You can change your choice at any time using the
        "Cookie settings" link in the footer.
      </p>
      <ul>
        <li><strong>Necessary</strong> — required for the site to function (theme, consent state). Always on.</li>
        <li><strong>Analytics</strong> — anonymous, aggregated traffic measurement. Off by default.</li>
        <li><strong>Advertising</strong> — Google AdSense personalised ads (TCF v2 framework). Off by default.</li>
      </ul>
      <h2>Your rights (UK GDPR)</h2>
      <p>
        As we do not store personal calculation data on our servers, there is
        nothing to access, rectify, or delete on our side. For cookie data
        retained in your browser, simply clear your browser storage.
      </p>
      <h2>Contact</h2>
      <p>
        For privacy questions, email <code>privacy@uknetpay.co.uk</code>.
      </p>
    </article>
  </Shell>
);

export default Privacy;
