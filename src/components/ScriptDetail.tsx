
import { Script } from "../types/script";
import { ScriptDetailTabs } from "./ScriptDetailTabs";
import { ScriptHeader } from "./ScriptHeader";

interface ScriptDetailProps {
  script: Script;
}

export const ScriptDetail = ({ script }: ScriptDetailProps) => {
  return (
    <div className="script-panel-transition">
      <div className="w-full relative mb-6">
        <div className="w-full h-36 overflow-hidden rounded-lg bg-neco-light-gray">
          {script.banner ? (
            <img 
              src={script.banner} 
              alt={script.title} 
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-neco-dark bg-neco">
              .SCRIPT
            </div>
          )}
        </div>
      </div>
      
      <ScriptHeader script={script} />
      <ScriptDetailTabs content={script.content} />
    </div>
  );
};
