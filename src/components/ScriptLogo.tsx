
import { cn } from "@/lib/utils";

interface ScriptLogoProps {
  className?: string;
}

export const ScriptLogo = ({ className }: ScriptLogoProps) => {
  return (
    <div className={cn("bg-gray-400 rounded-md flex items-center justify-center font-bold text-[10px]", className)}>
      .SCRIPT
    </div>
  );
};
