
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { db } from "../firebase";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";

const FavoritesContext = createContext(undefined);

export { FavoritesContext };

export const FavoritesProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Load from local storage if no user
  useEffect(() => {
    if (!currentUser) {
      const savedFavorites = localStorage.getItem("favorites");
      setFavorites(savedFavorites ? JSON.parse(savedFavorites) : []);
    }
  }, [currentUser]);

  // Sync with local storage when favorites change (only if not logged in)
  useEffect(() => {
    if (!currentUser) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, currentUser]);

  // Sync with Firestore if logged in
  useEffect(() => {
    if (currentUser) {
      const userRef = doc(db, "users", currentUser.uid);

      const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.savedArticles) {
            setFavorites(data.savedArticles);
          }
        } else {
          // Initialize document if it doesn't exist
          setDoc(userRef, { savedArticles: [] }, { merge: true });
        }
      });
      return () => unsubscribe();
    }
  }, [currentUser]);

  const addFavorite = async (article) => {
    if (currentUser) {
      // We read from current state 'favorites' to ensure we have the latest list
      // (technically we rely on onSnapshot to have kept it up to date)
      if (favorites.some(f => f.id === article.id)) return;

      const newHelper = [...favorites, article];
      const userRef = doc(db, "users", currentUser.uid);
      try {
        await setDoc(userRef, { savedArticles: newHelper }, { merge: true });
      } catch (error) {
        console.error("Error saving article to Firestore:", error);
      }
    } else {
      setFavorites((prev) => {
        if (prev.some(f => f.id === article.id)) return prev;
        return [...prev, article];
      });
    }
  };

  const removeFavorite = async (id) => {
    if (currentUser) {
      const newHelper = favorites.filter((a) => a.id !== id);
      const userRef = doc(db, "users", currentUser.uid);
      try {
        await setDoc(userRef, { savedArticles: newHelper }, { merge: true });
      } catch (error) {
        console.error("Error removing article from Firestore:", error);
      }
    } else {
      setFavorites((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export default FavoritesContext;
