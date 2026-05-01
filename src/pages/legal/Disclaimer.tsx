import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const Disclaimer = () => (
  <Shell>
    <Seo
      title="Disclaimer - Not Financial Advice"
      description="UK Net Pay provides illustrative calculations only and is not regulated by the FCA. Read our full legal disclaimer."
      path="/disclaimer"
      robots="noindex,follow"
    />
    <article className="prose prose-sm mx-auto max-w-3xl px-6 py-16 dark:prose-invert">
      <h1>Legal Disclaimer</h1>
      <p className="lead">
        This tool is for illustrative purposes only. All calculations are estimates and do
        not constitute financial advice.
      </p>
      <p>
        UK Net Pay provides simulations, illustrations, and scenario modelling only. It
        does not provide personal recommendations, investment recommendations, or
        regulated advice.
      </p>

      <h2>Not regulated</h2>
      <p>
        UK Net Pay is not regulated by the Financial Conduct Authority (FCA) and does not
        provide regulated financial advice. The information presented on this website is
        intended to help users understand the impact of UK tax rules on their pay, but it
        cannot account for every personal circumstance.
      </p>

      <h2>No reliance</h2>
      <p>
        You should not act, or refrain from acting, on the basis of any content from UK
        Net Pay without first taking advice from a qualified accountant, tax adviser, or
        independent financial adviser regulated by the FCA.
      </p>

      <h2>Accuracy</h2>
      <p>
        We use HMRC-published rates for the 2026/27 tax year and verify the engine against
        published thresholds and worked benchmark cases. Despite those efforts, we make no
        warranty that the figures are accurate, complete, or current. Tax rules can change
        at any time during the tax year.
      </p>

      <h2>Liability</h2>
      <p>
        To the fullest extent permitted by law, UK Net Pay accepts no liability for any
        loss arising from reliance on the calculators, articles, or any other material
        presented on this site.
      </p>
    </article>
  </Shell>
);

export default Disclaimer;
