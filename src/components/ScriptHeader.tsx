
import { Script } from "../types/script";
import { ScriptRating } from "./ScriptRating.tsx";
import { Copy, Play } from "lucide-react";
import { toast } from "sonner";

interface ScriptHeaderProps {
  script: Script;
}

export const ScriptHeader = ({ script }: ScriptHeaderProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
    toast.success("Script copied to clipboard");
  };
  
  const handleExecute = () => {
    toast.success("Script executed successfully");
  };
  
  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-white text-2xl font-bold mr-auto">{script.title}</h1>
      </div>
      
      <div className="flex items-center mt-3 mb-4">
        <div className="text-gray-300 mr-3">
          {script.author}
        </div>
        <div className="bg-neco rounded-full px-3 py-1 text-xs text-black font-medium">
          {script.tags[0]}
        </div>
        <ScriptRating rating={script.ratings} className="ml-auto" />
      </div>
      
      <p className="text-gray-300 mb-4">
        Official {script.title} made by {script.author}.
      </p>
      
      <div className="flex space-x-3">
        <button
          onClick={handleExecute}
          className="flex items-center bg-neco hover:bg-neco-hover px-4 py-2 rounded text-sm font-medium text-black transition-colors"
        >
          <Play className="h-4 w-4 mr-2" />
          Execute
        </button>
        
        <button
          onClick={handleCopy}
          className="flex items-center bg-neco-light-gray hover:bg-neco-gray px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </button>
      </div>
    </div>
  );
};
