import { Shell } from "@/components/layout/Shell";
import { Seo } from "@/components/seo/Seo";

const SITE = "https://www.uknetpay.co.uk";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  url: `${SITE}/contact`,
  name: "Contact UK Net Pay",
  description: "Get in touch with UK Net Pay for questions, feedback, or partnership enquiries.",
};

const Contact = () => (
  <Shell>
    <Seo
      title="Contact Us — UK Net Pay"
      description="Get in touch with UK Net Pay. Reach us for questions, feedback, partnership enquiries, or privacy concerns."
      path="/contact"
      jsonLd={jsonLd}
    />
    <article className="mx-auto max-w-3xl px-6 py-16 prose prose-sm dark:prose-invert">
      <h1>Contact Us</h1>
      <p className="lead">
        We'd love to hear from you. Whether you have a question about our calculators,
        spotted an error, or want to discuss a partnership — we're here to help.
      </p>

      <h2>General enquiries</h2>
      <p>
        For general questions, feedback, or feature requests:
      </p>
      <p>
        <a href="mailto:contact@uknetpay.co.uk" className="text-accent underline underline-offset-4 hover:opacity-80">
          contact@uknetpay.co.uk
        </a>
      </p>

      <h2>Privacy questions</h2>
      <p>
        For questions about how we handle your data, cookies, or consent:
      </p>
      <p>
        <a href="mailto:privacy@uknetpay.co.uk" className="text-accent underline underline-offset-4 hover:opacity-80">
          privacy@uknetpay.co.uk
        </a>
      </p>

      <h2>Bug reports and corrections</h2>
      <p>
        If you believe a calculation is incorrect or have found a bug, please email us
        with the salary, region, and tax code you used, along with the expected result.
        We take accuracy seriously and will investigate promptly.
      </p>

      <h2>Response times</h2>
      <p>
        We aim to respond to all enquiries within 2 business days. For urgent accuracy
        concerns, please include "URGENT" in your subject line.
      </p>
    </article>
  </Shell>
);

export default Contact;
