import { CountriesGrid } from "@/components/CountriesGrid/CountriesGrid";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import { ViewToggle } from "@/components/ViewToggle/ViewToggle";
import { useState } from "react";
import { Country } from "@/types/country";

const countries: Country[] = [
  {
    name: {
      common: "Serbia",
      official: "Republic of Serbia",
      nativeName: {
        srp: {
          official: "Република Србија",
          common: "Србија",
        },
      },
    },
    flags: {
      png: "https://flagcdn.com/w320/rs.png",
      svg: "https://flagcdn.com/rs.svg",
      alt: "The flag of Serbia is composed of three equal horizontal bands.",
    },
    capital: ["Belgrade"],
    region: "Europe",
    subregion: "Europe",
    languages: {
      srp: "Serbian",
    },
    currencies: {
      RSD: {
        name: "Serbian dinar",
        symbol: "дин.",
      },
    },
    population: 6908224,
    borders: ["AUT"],
    area: 357114,
    timezones: ["UTC+01:00"],
  },
];

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
        <CountriesGrid
          countries={countries}
          showFavorites={showFavorites}
          favorites={["Sweden"]}
          onToggleFavorite={() => {}}
        />
      </main>
    </div>
  );
};
