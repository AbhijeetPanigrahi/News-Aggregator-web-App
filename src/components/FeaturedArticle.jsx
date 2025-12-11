import React from "react";
import { Link } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";

const FeaturedArticle = ({ article = {} }) => {
  const articleTitle = article.title || "";
  const articleDescription = article.description || "";
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
      className="flex flex-col no-underline mb-0 group h-full"
    >
      <div className="w-full h-[500px] overflow-hidden mb-8 bg-surface-highlight relative rounded-2xl shadow-sm">
        {articleImage && (
          <img
            src={articleImage}
            alt={articleTitle}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
        <div className="absolute top-4 right-4 z-10 bg-black/20 backdrop-blur-md rounded-full text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FavoriteButton article={article} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-text-primary text-[15px]">{articleSource}</span>
            <span className="text-gray-300 text-sm">|</span>
            <span className="text-text-secondary text-[15px]">{articleCategory}</span>
          </div>
          {articleTime && <span className="text-text-muted text-sm ml-auto">{articleTime}</span>}
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-text-primary leading-[1.1] tracking-tighter group-hover:underline decoration-2 underline-offset-4">
          {articleTitle}
        </h1>

        <p className="text-lg leading-relaxed text-text-secondary line-clamp-3">
          {articleDescription}
        </p>

        <div className="pt-2">
          <span className="text-black dark:text-white font-bold text-base inline-block border-b-2 border-transparent group-hover:border-current transition-colors">
            read more
          </span>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
