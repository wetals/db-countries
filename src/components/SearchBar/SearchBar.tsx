import { type ChangeEvent } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onFilterTextBoxChanged: ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({
  placeholder = "Search countries...",
  onFilterTextBoxChanged,
}: SearchBarProps) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="relative flex items-center">
        <div className="absolute left-3 text-gray-400">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          onInput={onFilterTextBoxChanged}
          className="w-full h-10 pl-10 pr-12
            border border-gray-300 rounded-lg
            text-base text-gray-900"
        />
      </div>
    </div>
  );
};
