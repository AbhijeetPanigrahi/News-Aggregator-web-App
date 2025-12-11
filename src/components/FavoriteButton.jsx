import React, { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const HeartIcon = ({ isFavorite }) => {
  return (
    <div className="w-5 h-5 flex items-center justify-center transition-all duration-200">
      <FontAwesomeIcon icon={isFavorite ? faHeartSolid : faHeartRegular} className="text-lg" />
    </div>
  );
};

const FavoriteButton = ({ article }) => {
  const context = useContext(FavoritesContext);
  const [justAdded, setJustAdded] = React.useState(false);

  if (!context || !article) {
    return null;
  }

  const { favorites, addFavorite, removeFavorite } = context;
  const isFavorite = favorites.some((fav) => fav.id === article.id);

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(article.id);
    } else {
      addFavorite(article);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 500);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className={`
        bg-transparent border-none cursor-pointer p-2 flex items-center justify-center rounded-full w-9 h-9 relative transition-all duration-300 transform active:scale-95
        ${isFavorite
          ? 'text-[#D66853] hover:bg-red-500/10 hover:text-[#D66853]'
          : 'text-text-muted hover:bg-surface-highlight hover:text-text-primary'
        }
        hover:scale-110
        ${isFavorite && justAdded ? 'animate-heartbeat' : ''}
      `}
    >
      <HeartIcon isFavorite={isFavorite} />
    </button>
  );
};

export default FavoriteButton;
