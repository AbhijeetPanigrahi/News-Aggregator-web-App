import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { FavoritesContext } from "../context/FavoritesContext";
import NewsCard from "../components/NewsCard";

const FavoritesPage = () => {
  const context = useContext(FavoritesContext);
  const { favorites = [] } = context || {};

  return (
    <div className="w-full min-h-screen p-0 animate-fade-in">
      <Navbar />
      <div className="max-w-[1600px] mx-auto py-10 px-6">
        <h1 className="text-5xl my-8 text-text-primary font-black flex items-center gap-5 tracking-tight before:content-['❤️'] before:text-5xl before:drop-shadow-sm md:text-3xl">
          Your Favorite Articles
        </h1>
        <p className="text-xl text-text-secondary mb-12 pl-[60px] font-medium md:text-lg md:pl-0">
          All the articles you've saved for later reading
        </p>

        {favorites && favorites.length > 0 ? (
          <>
            <div className="text-text-primary text-xl mb-10 py-4 px-7 bg-surface backdrop-blur-3xl rounded-2xl inline-block border border-border font-bold shadow-md">
              You have {favorites.length} favorite article
              {favorites.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-7 py-6 animate-fade-in md:grid-cols-1 md:gap-6">
              {favorites.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center min-h-[600px] bg-surface backdrop-blur-3xl rounded-[32px] py-[100px] px-[50px] text-center border-2 border-dashed border-accent-muted animate-fade-in shadow-2xl mt-10">
            <div className="text-9xl mb-8 opacity-70 animate-fade-in drop-shadow-sm">📭</div>
            <h2 className="text-4xl text-text-primary mb-5 font-extrabold tracking-tight">No Favorites Yet</h2>
            <p className="text-xl text-text-secondary mb-10 max-w-[600px] leading-relaxed">
              Start exploring articles and save your favorites by clicking the
              heart icon on any article card or detail page.
            </p>
            <button
              onClick={() => (window.location.href = "/")}
              className="py-4 px-9 bg-gradient-to-br from-indigo-500 to-purple-500 border-none rounded-2xl text-white text-xl font-bold cursor-pointer transition-all duration-300 shadow-xl hover:-translate-y-1 hover:scale-105 hover:shadow-2xl active:-translate-y-0.5 active:scale-102 tracking-wide"
            >
              Browse News →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
