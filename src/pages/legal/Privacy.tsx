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
      <p className="lead">
        Your salary is private. UK Net Pay is built so that the figures you enter do not
        leave your device as part of the calculation flow.
      </p>
      <h2>What data we process</h2>
      <p>
        Calculation data such as salary, pension, region, student loan plan, and similar
        inputs is processed client-side in your browser and is not written to a backend
        salary database.
      </p>
      <h2>Cookies and advertising</h2>
      <p>
        We use a consent banner to ask whether you agree to analytics and advertising
        cookies. You can change that choice at any time using the cookie settings link in
        the footer.
      </p>
      <ul>
        <li><strong>Necessary:</strong> required for the site to function, including theme and consent state.</li>
        <li><strong>Analytics:</strong> anonymous, aggregated traffic measurement. Off by default where applicable.</li>
        <li><strong>Advertising:</strong> ad delivery and consent handling for monetisation. Off by default where applicable.</li>
      </ul>
      <h2>Zero-data retention policy</h2>
      <p>
        We do not store your salary data, we do not use cookies for tracking without
        consent, and we do not collect email addresses as part of the calculator
        experience.
      </p>
      <h2>Your rights</h2>
      <p>
        Because we do not store salary calculation data on our servers, there is normally
        no personal calculation record for us to access, rectify, or delete. For cookie
        data stored in your own browser, you can clear browser storage at any time.
      </p>
      <h2>Contact</h2>
      <p>
        For privacy questions, email <code>privacy@uknetpay.co.uk</code>.
      </p>
    </article>
  </Shell>
);

export default Privacy;
