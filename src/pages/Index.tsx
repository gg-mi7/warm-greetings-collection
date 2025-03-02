
import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ScriptCard } from "@/components/ScriptCard";
import { ScriptDetail } from "@/components/ScriptDetail";
import { Navbar } from "@/components/Navbar";
import { Script } from "@/types/script";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

const fetchScripts = async (): Promise<Script[]> => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/gg-mi7/Neco-Hub/main/script.json');
    if (!response.ok) {
      throw new Error('Failed to fetch scripts');
    }
    const data = await response.json();
    return data.map((script: any, index: number) => ({
      id: script.id || `script-${index}`,
      title: script.name || "Unnamed Script",
      description: script.description || "No description available",
      author: script.author || "Unknown",
      tags: script.tags || [],
      content: script.script || "",
      banner: script.banner,
      ratings: script.ratings || 0,
      scriptUrl: script.scriptUrl
    }));
  } catch (error) {
    console.error("Error fetching scripts:", error);
    return [];
  }
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("Scripts");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [filteredScripts, setFilteredScripts] = useState<Script[]>([]);
  const [isDetailView, setIsDetailView] = useState(false);

  const { data: scripts = [], isLoading, error } = useQuery({
    queryKey: ['scripts'],
    queryFn: fetchScripts,
  });

  useEffect(() => {
    // Filter scripts based on search query and category
    let filtered = scripts;
    
    if (searchQuery) {
      filtered = filtered.filter(script => 
        script.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        script.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    if (selectedCategory !== "Scripts") {
      filtered = filtered.filter(script => 
        script.title.includes(selectedCategory) || 
        script.tags.some(tag => tag.toLowerCase().includes(selectedCategory.toLowerCase()))
      );
    }
    
    setFilteredScripts(filtered);
  }, [searchQuery, selectedCategory, scripts]);

  const handleScriptClick = (script: Script) => {
    setSelectedScript(script);
    setIsDetailView(true);
  };

  const handleBackToList = () => {
    setIsDetailView(false);
    setSelectedScript(null);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-neco-dark text-white">
      <div className="py-4 px-6 border-b border-neco-light-gray flex items-center">
        <h1 className="text-xl font-bold flex items-center">
          <img src="/lovable-uploads/28a39337-129d-472d-92ab-456715eed1a7.png" alt="Neco-Hub" className="w-6 h-6 mr-2" />
          Neco-Hub
        </h1>
        <div className="ml-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </div>

      <Navbar 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <div className="flex-1 flex overflow-hidden">
        <div 
          className={cn(
            "w-full h-full overflow-y-auto p-6 transition-all duration-300 ease-in-out",
            isDetailView ? "w-1/3" : "w-full"
          )}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-neco"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-400">
              Error loading scripts. Please try again later.
            </div>
          ) : (
            <div 
              className={cn(
                "grid gap-4",
                isDetailView ? "animate-slide-left" : "animate-slide-right"
              )}
            >
              {filteredScripts.map((script) => (
                <ScriptCard
                  key={script.id}
                  script={script}
                  isSelected={selectedScript?.id === script.id}
                  onClick={() => handleScriptClick(script)}
                />
              ))}

              {filteredScripts.length === 0 && !isLoading && (
                <div className="text-center py-12 text-gray-400">
                  No scripts found. Try a different search.
                </div>
              )}
            </div>
          )}
        </div>

        {isDetailView && selectedScript && (
          <div 
            className={cn(
              "w-2/3 h-full overflow-y-auto p-6 border-l border-neco-light-gray bg-neco-dark",
              "animate-fade-in"
            )}
          >
            <button 
              className="text-gray-400 hover:text-white mb-4 text-sm flex items-center"
              onClick={handleBackToList}
            >
              ← Back to list
            </button>
            <ScriptDetail script={selectedScript} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
