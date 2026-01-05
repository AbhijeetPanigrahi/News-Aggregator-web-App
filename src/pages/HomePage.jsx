import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FeaturedArticle from "../components/FeaturedArticle";
import SideArticle from "../components/SideArticle";
import TrendingAuthors from "../components/TrendingAuthors";
import useFetchNews from "../hooks/useFetchNews";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const HomePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";
  const {
    news = [],
    loading,
    error,
  } = useFetchNews(selectedCategory, searchQuery);

  const featuredArticle = news[0];
  const sideArticles = news.slice(1, 4);

  return (
    <div className="w-full min-h-screen bg-background text-text-primary font-sans selection:bg-accent-light selection:text-white">
      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 py-6 md:px-10 md:py-12">
        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <>
            {news.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Main Content (Featured) - Spans 8 cols */}
                <div className="lg:col-span-8 flex flex-col">
                  {featuredArticle && (
                    <FeaturedArticle article={featuredArticle} />
                  )}
                </div>

                {/* Sidebar - Spans 4 cols */}
                <div className="lg:col-span-4 flex flex-col gap-10">
                  <div className="flex flex-col gap-8">
                    {sideArticles.map((article) => (
                      <SideArticle key={article.id} article={article} />
                    ))}
                  </div>
                  <TrendingAuthors />
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center min-h-[400px] text-center text-gray-500">
                <p className="text-xl font-medium">No articles found. Try adjusting your filters.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default HomePage;
