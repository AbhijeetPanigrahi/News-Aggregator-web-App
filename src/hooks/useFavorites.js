import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (articleId) => {
    if (!favorites.includes(articleId)) {
      setFavorites((prevFavorites) => [...prevFavorites, articleId]);
    }
  };

  const removeFavorite = (articleId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((id) => id !== articleId)
    );
  };

  const isFavorite = (articleId) => {
    return favorites.includes(articleId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
};

export default useFavorites;
