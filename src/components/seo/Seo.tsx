import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  path: string; // e.g. "/take-home"
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  robots?: string;
  ogImage?: string;
};

const SITE = "https://www.uknetpay.co.uk";
const DEFAULT_OG_IMAGE = `${SITE}/og-default.png`;

export function Seo({ title, description, path, jsonLd, robots = "index,follow,max-image-preview:large", ogImage }: Props) {
  const url = `${SITE}${path}`;
  const fullTitle = title.includes("UK Net Pay") ? title : `${title} | UK Net Pay`;
  const ld = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
  const image = ogImage || DEFAULT_OG_IMAGE;
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="UK Net Pay" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {ld.map((obj, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(obj)}</script>
      ))}
    </Helmet>
  );
}
