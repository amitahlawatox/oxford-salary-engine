import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  path: string; // e.g. "/take-home"
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE = "https://uknetpay.co.uk";

export function Seo({ title, description, path, jsonLd }: Props) {
  const url = `${SITE}${path}`;
  const fullTitle = title.includes("UK Net Pay") ? title : `${title} | UK Net Pay`;
  const ld = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
}