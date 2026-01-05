import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const NewsCard = ({ article = {}, featured = false }) => {
  const articleTitle = article.title || "";
  const articleSummary = article.description || "";
  const articleTime = article.publishedAt
    ? (() => {
      const now = new Date();
      const published = new Date(article.publishedAt);
      const diffHours = Math.floor((now - published) / (1000 * 60 * 60));
      if (diffHours < 1) {
        const diffMins = Math.floor((now - published) / (1000 * 60));
        return `${diffMins}m ago`;
      }
      return `${diffHours}h ago`;
    })()
    : "";
  const articleImage = article.imageUrl || "";
  const articleSource = article.source || "";

  // Generate author initials from source
  const authorInitials = articleSource
    ? articleSource
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
    : "NN";

  return (
    <Link
      to={{
        pathname: `/article/${article.id}`,
        state: { article: article }
      }}
      className="bg-surface rounded-xl overflow-hidden m-0 no-underline flex flex-col transition-all duration-300 shadow-soft border border-border h-full hover:-translate-y-1 hover:shadow-lg group"
    >
      <div className={`w-full relative overflow-hidden bg-surface-highlight border-b border-border ${featured ? 'aspect-video' : 'aspect-[4/3]'}`}>
        {articleImage && (
          <img
            src={articleImage}
            alt={articleTitle}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <div className="absolute top-2 right-2 z-10 bg-surface border border-border rounded-full shadow-md transition-transform duration-300 hover:scale-110 p-1">
          <FavoriteButton article={article} />
        </div>
      </div>
      <div className="flex flex-col p-4 sm:p-5 grow">
        <h3 className={`text-text-primary mb-3 font-bold leading-snug tracking-tight line-clamp-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
          {articleTitle}
        </h3>
        <p className="text-text-secondary text-[15px] leading-relaxed mb-5 line-clamp-3 overflow-hidden flex-grow">
          {articleSummary}
        </p>
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
          {articleTime && <span className="text-text-muted text-xs font-medium">{articleTime}</span>}
        </div>
        {articleSource && (
          <div className="flex items-center gap-2 mt-2">
            <div className="w-6 h-6 rounded-full bg-accent-muted flex items-center justify-center text-xs text-accent-main font-bold">
              {authorInitials}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-text-primary text-xs font-semibold max-w-[100px] truncate">
                {articleSource}
              </span>
              <span className="text-text-muted text-xs">Newsman</span>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default NewsCard;
