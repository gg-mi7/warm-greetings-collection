
import { Star } from "lucide-react";
import { cn } from "../lib/utils";

interface ScriptRatingProps {
  rating: number;
  className?: string;
}

export const ScriptRating = ({ rating, className }: ScriptRatingProps) => {
  // Convert rating to a scale of 1-5 stars
  // Assuming rating is on a scale of 0-10 or 0-100
  const normalizedRating = Math.min(5, Math.max(0, Math.round(rating / 20)));
  
  return (
    <div className={cn("flex items-center", className)}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < normalizedRating ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
          )}
        />
      ))}
    </div>
  );
};
