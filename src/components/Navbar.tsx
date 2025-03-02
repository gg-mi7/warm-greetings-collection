
import { Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Script } from "../types/script";

interface NavbarProps {
  className?: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onScriptNameClick?: (scriptName: string) => void;
}

// Fetch script names for the navbar
const fetchScriptNames = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/gg-mi7/Neco-Hub/main/script.json');
    if (!response.ok) {
      throw new Error('Failed to fetch scripts');
    }
    const data = await response.json();
    // Get all script names but limit to top 5 for display
    const scriptNames = data.map((script: any) => script.name || "Unnamed Script");
    return ["Scripts", ...scriptNames.slice(0, 5)]; // Only take the first 5 scripts plus "Scripts"
  } catch (error) {
    console.error("Error fetching script names:", error);
    return ["Scripts"];
  }
};

export const Navbar = ({ className, selectedCategory, setSelectedCategory, onScriptNameClick }: NavbarProps) => {
  const { data: categories = ["Scripts"], isLoading } = useQuery({
    queryKey: ['scriptNames'],
    queryFn: fetchScriptNames,
  });
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    
    // If it's not the "Scripts" category and we have a click handler, call it
    if (category !== "Scripts" && onScriptNameClick) {
      onScriptNameClick(category);
    }
  };
  
  return (
    <div className={cn("flex items-center h-16 px-4", className)}>
      <Menu className="h-5 w-5 mr-4 text-gray-400" />
      
      <div className="flex space-x-5 overflow-x-auto pb-2 navbar-scrollbar">
        {isLoading ? (
          <div className="text-gray-400 text-sm">Loading scripts...</div>
        ) : (
          categories.map((category) => (
            <button
              key={category}
              className={cn(
                "text-sm font-medium transition-colors whitespace-nowrap",
                selectedCategory === category 
                  ? "text-white" 
                  : "text-gray-400 hover:text-white"
              )}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))
        )}
      </div>
      
      <div className="text-gray-400 text-sm ml-auto hidden md:block">
        Find the latest and best scripts on our script hub.
      </div>
    </div>
  );
};
