interface ViewToggleProps {
  showFavorites: boolean;
  onChange: (showFavorites: boolean) => void;
  className?: string;
}

export const ViewToggle = ({ onChange }: ViewToggleProps) => {
  const handleToggle = (value: boolean) => {
    onChange(value);
  };

  return (
    <div className="inline-flex rounded-md border border-gray-300">
      <button
        type="button"
        onClick={() => handleToggle(false)}
        className="px-4 py-2 text-sm rounded-l-md"
      >
        All
      </button>

      <button
        type="button"
        onClick={() => handleToggle(true)}
        className="px-4 py-2 text-sm rounded-r-md border-l"
      >
        Favourites
      </button>
    </div>
  );
};
