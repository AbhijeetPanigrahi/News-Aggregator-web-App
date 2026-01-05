import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const SideArticle = ({ article = {} }) => {
  const articleTitle = article.title || "";
  const articleImage = article.imageUrl || "";
  const articleSource = article.source || "Unknown Author";
  const articleCategory = article.category || "General";

  const articleTime = article.publishedAt
    ? (() => {
      const now = new Date();
      const published = new Date(article.publishedAt);
      const hours = published.getHours();
      const minutes = published.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const displayHours = hours % 12 || 12;
      const displayMinutes = minutes.toString().padStart(2, "0");
      return `${displayHours}:${displayMinutes} ${ampm}, Today`;
    })()
    : "";

  return (
    <Link
      to={{
        pathname: `/article/${article.id}`,
        state: { article: article }
      }}
      className="flex flex-col sm:flex-row gap-4 sm:gap-6 no-underline mb-8 pb-8 border-b border-border last:border-0 last:mb-0 last:pb-0 group"
    >
      <div className="w-full h-[200px] sm:w-[180px] sm:h-[120px] shrink-0 overflow-hidden bg-surface-highlight relative rounded-2xl">
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
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-text-primary leading-tight mb-2 tracking-tight group-hover:underline decoration-2">
          {articleTitle}
        </h3>

        <div className="flex justify-between items-end w-full mt-auto">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden shrink-0">
              <img src={`https://i.pravatar.cc/150?u=${article.id}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-text-primary text-sm whitespace-nowrap">{articleSource}</span>
            <span className="text-gray-300">|</span>
            <span className="text-text-secondary text-sm whitespace-nowrap">{articleCategory}</span>
          </div>
          {articleTime && <span className="text-xs text-text-muted whitespace-nowrap ml-2 font-medium">{articleTime.split(',')[0]}</span>}
        </div>
      </div>
    </Link>
  );
};

export default SideArticle;
