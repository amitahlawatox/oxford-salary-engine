import { ARTICLES as DATA } from "./data";
export type { Article, ArticleCategory } from "./types";
export const ARTICLES = [...DATA].sort((a, b) => b.publishedISO.localeCompare(a.publishedISO));
export const getArticleBySlug = (slug: string) => ARTICLES.find((a) => a.slug === slug);
