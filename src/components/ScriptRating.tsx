
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScriptRatingProps {
  rating: number;
  max?: number;
  className?: string;
}

export const ScriptRating = ({ rating, max = 5, className }: ScriptRatingProps) => {
  return (
    <div className={cn("flex space-x-1", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating ? "fill-neco text-neco" : "text-gray-500"
          )}
        />
      ))}
    </div>
  );
};
