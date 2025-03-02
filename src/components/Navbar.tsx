
import { Menu } from "lucide-react";
import { cn } from "../lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Script } from "../types/script";

interface NavbarProps {
  className?: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  onScriptNameClick?: (scriptName: string) => void;
  searchQuery?: string; // Add searchQuery prop
}

// Fetch script names for the navbar
const fetchScriptNames = async (): Promise<string[]> => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/gg-mi7/Neco-Hub/main/script.json');
    if (!response.ok) {
      throw new Error('Failed to fetch scripts');
    }
    const data = await response.json();
    // Get all script names
    const scriptNames = data.map((script: any) => script.name || "Unnamed Script");
    return ["Scripts", ...scriptNames]; // Return all scripts plus "Scripts" category
  } catch (error) {
    console.error("Error fetching script names:", error);
    return ["Scripts"];
  }
};

export const Navbar = ({ 
  className, 
  selectedCategory, 
  setSelectedCategory, 
  onScriptNameClick,
  searchQuery = "" // Default to empty string
}: NavbarProps) => {
  const { data: allCategories = ["Scripts"], isLoading } = useQuery({
    queryKey: ['scriptNames'],
    queryFn: fetchScriptNames,
  });
  
  // Filter categories based on search query if present
  const categories = searchQuery 
    ? allCategories.filter(cat => 
        cat.toLowerCase().includes(searchQuery.toLowerCase()) || cat === "Scripts"
      )
    : allCategories;
  
  // Make sure we don't show too many categories (limit to 6 for UI space)
  const displayCategories = ["Scripts", ...categories.filter(cat => cat !== "Scripts").slice(0, 5)];
  
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    
    // If it's not the "Scripts" category and we have a click handler, call it
    if (category !== "Scripts" && onScriptNameClick) {
      onScriptNameClick(category);
    }
    else
    {
      onScriptNameClick("");
    }
  };
  
  return (
    <div className={cn("flex items-center h-16 px-4", className)}>
      <Menu className="h-5 w-5 mr-4 text-gray-400" />
      
      <div className="flex space-x-5 overflow-x-auto pb-2 navbar-scrollbar">
        {isLoading ? (
          <div className="text-gray-400 text-sm">Loading scripts...</div>
        ) : (
          displayCategories.map((category) => (
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
