import { useState, useEffect, useCallback } from "react";
import { getFavorites, saveFavorites } from "../services/localStorage";

interface UseFavoritesProp {
  favorites: string[];
  toggleFavorite: (countryName: string) => void;
  isFavorite: (countryName: string) => boolean;
  clearFavorites: () => void;
}

export const useFavorites = (): UseFavoritesProp => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    return getFavorites();
  });

  const toggleFavorite = useCallback((countryName: string) => {
    setFavorites((prevFavorites) => {
      // console.log("===> 1. prevFavorites: ", prevFavorites);

      if (prevFavorites.includes(countryName)) {
        return prevFavorites.filter((favorite) => favorite !== countryName);
      } else {
        return [...prevFavorites, countryName];
      }
    });
  }, []);

  const isFavorite = useCallback(
    (countryName: string) => {
      return favorites.includes(countryName);
    },
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
};
