import React, { useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import useFetchNews from "../hooks/useFetchNews";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Navbar from "../components/Navbar";
import ShareButtons from "../components/ShareButtons";
import ReactionSystem from "../components/ReactionSystem";
import { useFavorites } from "../context/FavoritesContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faNewspaper, faHeart, faShieldAlt, faShare, faTimes } from "@fortawesome/free-solid-svg-icons";
import AiConcierge from "../components/AiConcierge";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const { news, loading, error } = useFetchNews();

  // Favorites logic
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [isShareOpen, setIsShareOpen] = useState(false);

  // 1. Try to get article from navigation state (passed from Link), otherwise search in 'news'
  const [article, setArticle] = React.useState(location.state?.article || null);

  React.useEffect(() => {
    // If we already have the article from state, no need to look it up
    if (article) return;

    if (news && news.length > 0) {
      const found = news.find((a) => String(a.id) === String(id));
      if (found) {
        setArticle(found);
      }
    }
  }, [news, id, article]);

  // Loading state
  if (loading && !article) return <LoadingSpinner />;

  if (!article) {
    if (error) return <ErrorMessage message={error} />;

    // Simple "Not Found" state
    return (
      <div className="min-h-screen bg-background text-text-primary">
        <Navbar />
        <div className="max-w-2xl mx-auto py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Article not found</h2>
          <p className="text-text-secondary mb-8">We couldn't find the article you're looking for. It might have been removed or the link is broken.</p>
          <button
            onClick={() => history.push('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-background rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Check if favorite
  const isFavorite = favorites.some(fav => fav.id === article.id);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(article.id);
    } else {
      addFavorite(article);
    }
  };

  // Format Date: "11/30/2019 08:33 PM EST" style
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleString("en-US", {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: true
    }) : "Recent";

  // Calculate reading time
  const readingTime = article.content
    ? Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200))
    : article.description
      ? Math.max(1, Math.ceil(article.description.split(/\s+/).length / 200))
      : 1;

  // Use current URL for sharing
  const pageUrl = window.location.href;

  return (
    <div className="w-full min-h-screen bg-background text-text-primary font-sans pb-20 transition-colors duration-300">
      <Navbar />

      <main className="max-w-[1000px] mx-auto px-6 md:px-10 py-8">

        {/* Hero Image - Top Rounded */}
        <div className="w-full h-[350px] md:h-[500px] rounded-[32px] overflow-hidden mb-8 shadow-sm">
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
        </div>

        <div className="max-w-[800px] mx-auto">
          {/* Meta Row: Category & Stats (Real Data) */}
          <div className="flex flex-wrap justify-between items-center mb-5 gap-4">
            <span className="bg-primary-muted text-primary-dark dark:text-primary-light text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
              {article.category || "News"}
            </span>

            <div className="flex items-center gap-6 text-text-secondary text-sm font-semibold">
              {/* Replaced fake stats with Reading Time & Source to balance layout */}
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faClock} className="text-lg" /> {readingTime} min read
              </div>
              <div className="flex items-center gap-1.5">
                <FontAwesomeIcon icon={faNewspaper} className="text-lg" /> {article.source}
              </div>
            </div>
          </div>

          {/* Title & Action Buttons */}
          <div className="flex flex-col md:flex-row gap-8 justify-between items-start mb-6">
            <h1 className="text-3xl md:text-[2.75rem] font-bold leading-[1.2] text-text-primary flex-1 tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto mt-2 relative">
              {/* SAVE BUTTON (Real Logic) */}
              <button
                onClick={handleToggleFavorite}
                className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border transition-colors font-bold text-sm
                    ${isFavorite
                    ? 'bg-primary-muted border-primary-light text-primary-dark'
                    : 'border-border text-text-secondary hover:bg-surface-highlight hover:text-text-primary'
                  }`}
              >
                <FontAwesomeIcon icon={isFavorite ? faHeart : faHeart} className="text-base" />
                {isFavorite ? 'Saved' : 'Save'}
              </button>

              {/* SHARE BUTTON (Real Logic) */}
              <button
                onClick={() => setIsShareOpen(!isShareOpen)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-blue-50 text-blue-600 border border-transparent font-bold text-sm hover:bg-blue-100 transition-colors dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
              >
                <FontAwesomeIcon icon={faShare} className="text-base" /> Share
              </button>

              {/* SHARE POPOVER */}
              {isShareOpen && (
                <div className="absolute top-full right-0 mt-2 p-4 bg-surface border border-border rounded-xl shadow-xl z-10 w-64 animate-fade-in">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-text-muted uppercase">Share via</span>
                    <button onClick={() => setIsShareOpen(false)} className="text-text-muted hover:text-text-primary">
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                  <ShareButtons url={pageUrl} title={article.title} />
                </div>
              )}
            </div>
          </div>

          {/* Author & DateLine */}
          <div className="mb-10 text-xs tracking-wide">
            <p className="text-text-muted uppercase font-bold mb-1.5">
              By <span className="text-text-primary ml-1">{article.source || "Unknown Author"}</span>
            </p>
            <p className="text-text-muted font-medium">
              {formattedDate}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-text-secondary leading-relaxed text-[1.1rem]">
            {article.description && (
              <p className="mb-6 first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-black first-letter:text-text-primary font-serif italic">
                {article.description}
              </p>
            )}

            <div className="whitespace-pre-wrap font-serif">
              {article.content || "Content not available for full preview. Please visit the source to read the entire article."}
            </div>

            {/* AI Concierge Panel */}
            <AiConcierge articleContent={article.content || article.description || "No content available."} />

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-bold mb-4 font-sans text-text-primary">What do you think?</h3>
              <ReactionSystem />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetailPage;
