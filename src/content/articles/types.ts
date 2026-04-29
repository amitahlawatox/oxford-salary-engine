import type { ReactNode } from "react";

export type ArticleCategory =
  | "Tax"
  | "Scotland"
  | "Student Loans"
  | "Pension"
  | "Self-Employed"
  | "Career"
  | "Cost of Living";

export interface Article {
  slug: string;
  title: string;        // <60 chars
  description: string;  // <160 chars
  excerpt: string;
  category: ArticleCategory;
  readMinutes: number;
  publishedISO: string;
  updatedISO: string;
  /** Primary keyword(s) used for related-article matching */
  keywords: string[];
  /** Optional FAQ used for FAQPage JSON-LD */
  faq?: { q: string; a: string }[];
  /** Article body — pure React */
  body: () => ReactNode;
}
