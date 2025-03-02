
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export const SearchBar = ({ onSearch, initialValue = "" }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(initialValue);
  
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value);
  };
  
  return (
    <div className="relative w-full max-w-xs">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        className="w-full bg-neco-gray rounded-md py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 border border-neco-light-gray focus:border-neco focus:outline-none focus:ring-1 focus:ring-neco transition-all"
        placeholder="Search scripts"
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};
