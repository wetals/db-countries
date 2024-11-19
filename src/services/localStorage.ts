const KEY = "favorites";

export const getFavorites = (): string[] => {
  const favoritesJson = localStorage.getItem(KEY);
  if (!favoritesJson) return [];

  const favorites = JSON.parse(favoritesJson);
  if (!Array.isArray(favorites)) {
    return [];
  }

  return favorites.filter(
    (item) => typeof item === "string" && item.length > 0
  );
};

export const saveFavorites = (favorites: string[]): void => {
  localStorage.setItem(KEY, JSON.stringify(favorites));
};

export const clearFavorites = () => {
  localStorage.removeItem(KEY);
};
