import { CountriesGrid } from "@/components/CountriesGrid/CountriesGrid";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { ViewToggle } from "@/components/ViewToggle/ViewToggle";
import { useState } from "react";

export const MainLayout = () => {
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery] = useState("");

  const handleViewToggle = (showFavorites: boolean) => {
    setShowFavorites(showFavorites);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Countries of the World</h1>

        <div className="flex justify-between items-center gap-4">
          <div className="flex-grow">
            <SearchBar value={searchQuery} placeholder="Search countries..." />
          </div>

          <ViewToggle
            showFavorites={showFavorites}
            onChange={handleViewToggle}
          />
        </div>
      </header>

      <main className="p-4">
        <CountriesGrid />
      </main>
    </div>
  );
};
