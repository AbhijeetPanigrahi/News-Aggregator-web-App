import React from "react";
import Navbar from "../components/Navbar";
import { useFavorites } from "../context/FavoritesContext";
import { useAuth } from "../context/AuthContext";
import NewsCard from "../components/NewsCard";

const ProfilePage = () => {
  const { favorites } = useFavorites();
  const { currentUser } = useAuth();

  if (!currentUser) {
    return (
      <div className="w-full min-h-screen bg-background text-text-primary">
        <Navbar />
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-xl">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  // Generate initial from email
  const initial = currentUser.email ? currentUser.email[0].toUpperCase() : "U";
  const username = currentUser.email ? currentUser.email.split('@')[0] : "User";

  return (
    <div className="w-full min-h-screen p-0 bg-background text-text-primary">
      <Navbar />
      <div className="max-w-[1100px] mx-auto py-8 px-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-24 h-24 rounded-full bg-surface-highlight flex items-center justify-center text-4xl text-text-primary shadow-soft font-bold">
            {initial}
          </div>
          <div>
            <h1 className="m-0 text-3xl font-extrabold text-text-primary">{username}</h1>
            <p className="mt-1 text-text-muted">
              {currentUser.email} • Joined recently
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="text-2xl mb-3 font-bold text-text-primary">Saved Articles</h2>
          {favorites && favorites.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
              {favorites.map((article) => (
                <div key={article.id} className="h-full">
                  <NewsCard article={article} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted">
              You have no saved articles yet.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
