import { CountriesGrid } from "@/components/CountriesGrid/CountriesGrid";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { ViewToggle } from "@/components/ViewToggle/ViewToggle";
import { useState, useCallback, useMemo } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCountries } from "@/hooks/useCountries";

export const MainLayout = () => {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { countries } = useCountries();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleViewToggle = useCallback((showFavorites: boolean) => {
    setShowFavoritesOnly(showFavorites);
    setSearchQuery("");
  }, []);

  const counts = useMemo(
    () => ({
      total: countries?.length ?? 0,
      favorites: favorites.length,
    }),
    [countries, favorites]
  );

  console.log("1. ===> counts: ", counts);

  const handleFavoriteToggle = useCallback(
    (countryName: string) => {
      toggleFavorite(countryName);
    },
    [toggleFavorite]
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Countries of the World</h1>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-grow">
            <SearchBar value={searchQuery} placeholder="Search countries..." />
          </div>

          <ViewToggle
            showFavoritesOnly={showFavoritesOnly}
            onToggle={handleViewToggle}
            favoritesCount={counts.favorites}
            totalCount={counts.total}
          />
        </div>
      </header>

      <main className="p-4">
        <CountriesGrid
          showFavoritesOnly={showFavoritesOnly}
          onFavoriteToggle={handleFavoriteToggle}
          isFavorite={isFavorite}
        />
      </main>
    </div>
  );
};
