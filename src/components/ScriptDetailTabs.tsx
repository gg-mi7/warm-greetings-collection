
import { useState } from "react";
import { cn } from "../lib/utils";

interface ScriptDetailTabsProps {
  content: string;
}

export const ScriptDetailTabs = ({ content }: ScriptDetailTabsProps) => {
  const [activeTab, setActiveTab] = useState<'details' | 'features' | 'changelog'>('details');
  
  return (
    <div className="mt-8">
      <div className="border-b border-neco-light-gray flex">
        {(['details', 'features', 'changelog'] as const).map((tab) => (
          <button
            key={tab}
            className={cn(
              "px-6 py-2 text-sm font-medium capitalize transition-colors",
              activeTab === tab 
                ? "text-neco border-b-2 border-neco" 
                : "text-gray-400 hover:text-white"
            )}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="p-4 text-sm text-gray-300 whitespace-pre-line">
        {activeTab === 'details' && content}
        {activeTab === 'features' && (
          <p>This script includes multiple features to enhance your experience.</p>
        )}
        {activeTab === 'changelog' && (
          <p>v1.0.0 - Initial release</p>
        )}
      </div>
    </div>
  );
};
