import React from "react";
import Navbar from "../components/Navbar";
import { useFavorites } from "../context/FavoritesContext";
import NewsCard from "../components/NewsCard";

// Demo profile data
const demoProfile = {
  name: "Alex Morgan",
  username: "@alexm",
  bio: "Curious about tech, design, and sustainability. Coffee enthusiast.",
  location: "San Francisco, CA",
  joined: "January 2023",
};

const ProfilePage = () => {
  const { favorites } = useFavorites();

  return (
    <div className="w-full min-h-screen p-0 bg-background text-text-primary">
      <Navbar />
      <div className="max-w-[1100px] mx-auto py-8 px-8">
        <div className="flex items-center gap-5 mb-6">
          <div className="w-24 h-24 rounded-full bg-surface-highlight flex items-center justify-center text-4xl text-text-primary shadow-soft">
            A
          </div>
          <div>
            <h1 className="m-0 text-3xl font-extrabold text-text-primary">{demoProfile.name}</h1>
            <p className="mt-1 text-text-muted">
              {demoProfile.username} • {demoProfile.location} • Joined{" "}
              {demoProfile.joined}
            </p>
            <p className="mt-1 text-text-muted">{demoProfile.bio}</p>
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
