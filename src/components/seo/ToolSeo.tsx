import { Seo } from "@/components/seo/Seo";
import { TOOL_META, buildToolJsonLd } from "@/lib/seoMeta";

/** Drop-in SEO + JSON-LD for any tool route. */
export function ToolSeo({ path }: { path: keyof typeof TOOL_META | string }) {
  const meta = TOOL_META[path as string];
  if (!meta) return null;
  return (
    <Seo
      title={meta.title}
      description={meta.description}
      path={meta.path}
      jsonLd={buildToolJsonLd(meta)}
    />
  );
}
