import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const Terms = () => (
  <Shell>
    <Seo
      title="Terms of Use - UK Net Pay"
      description="Terms of use for the UK Net Pay salary and tax calculator suite."
      path="/terms"
      robots="noindex,follow"
    />
    <article className="prose prose-sm mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Terms of Use</h1>
      <p>
        By using UK Net Pay you agree to these terms. The calculators and articles are
        provided for general information only and do not constitute legal, tax, accounting,
        or financial advice.
      </p>

      <h2>Acceptable use</h2>
      <ul>
        <li>You may use the calculators for personal or professional reference.</li>
        <li>You may not scrape or republish substantial portions of the site without permission.</li>
        <li>You may not use the site to break the law, infringe rights, or send spam.</li>
      </ul>

      <h2>Subscriptions and consumer rights</h2>
      <p>
        UK Net Pay does not currently sell subscription products through this website. If
        paid or auto-renewing services are introduced in future, the operator should make
        pricing, renewal timing, cancellation rights, reminder notices, and other consumer
        protections clear in line with the Digital Markets, Competition and Consumers Act
        2024 (DMCCA 2024) and any other applicable UK consumer law.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All site content, design, and calculator logic are copyright UK Net Pay{" "}
        {new Date().getFullYear()}.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of England and Wales.</p>
    </article>
  </Shell>
);

export default Terms;
