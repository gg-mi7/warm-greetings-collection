
import { Script } from "../types/script";
import { ScriptLogo } from "./ScriptLogo";
import { cn } from "../lib/utils";

interface ScriptCardProps {
  script: Script;
  isSelected: boolean;
  onClick: () => void;
}

export const ScriptCard = ({ script, isSelected, onClick }: ScriptCardProps) => {
  return (
    <div 
      className={cn(
        "flex items-start p-4 rounded-lg cursor-pointer mb-3 transition-all",
        "hover:bg-neco-light-gray",
        isSelected ? "bg-neco-light-gray" : "bg-neco-gray"
      )}
      onClick={onClick}
    >
      <ScriptLogo className="w-14 h-14 flex-shrink-0 mr-4" />
      <div className="flex-grow">
        <h3 className="text-white font-semibold">{script.title}</h3>
        <p className="text-gray-400 text-sm">{script.description}</p>
        {script.tags && script.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {script.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs bg-neco-light-gray px-2 py-0.5 rounded text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
