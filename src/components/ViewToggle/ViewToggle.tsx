import React from "react";
import { Star } from "lucide-react";

interface ViewToggleProps {
  showFavoritesOnly: boolean;
  onToggle: (showFavorites: boolean) => void;
  favoritesCount: number;
  totalCount: number;
}

export const ViewToggle = React.memo<ViewToggleProps>(
  ({ onToggle, showFavoritesOnly, favoritesCount, totalCount }) => {
    return (
      <div className="inline-flex rounded-md border border-gray-300">
        <button
          type="button"
          onClick={() => onToggle(false)}
          className={`px-4 py-2 text-sm rounded-l-md ${
            !showFavoritesOnly
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <span>All</span>
          <span className="text-xs text-gray-500">({totalCount})</span>
        </button>

        <button
          type="button"
          onClick={() => onToggle(true)}
          className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm
          rounded-r-lg ${
            showFavoritesOnly
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Star
            className={`h-4 w-4 ${showFavoritesOnly ? "fill-current" : ""}`}
          />
          <span>Favourites</span>
          <span className="text-xs text-gray-500">({favoritesCount})</span>
        </button>
      </div>
    );
  }
);
