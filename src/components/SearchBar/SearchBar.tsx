import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  value: string;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({
  value,
  placeholder = "Search countries...",
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
};
