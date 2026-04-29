import { useParams, Navigate } from "react-router-dom";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { getArticleBySlug } from "@/content/articles";

const InsightDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  if (!article) return <Navigate to="/insights" replace />;
  return <ArticleLayout article={article} />;
};

export default InsightDetail;
