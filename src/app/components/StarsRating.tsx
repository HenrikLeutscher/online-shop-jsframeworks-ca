import type { StarsRatingsProps } from "../types/ratingstars";

export default function StarsRating({ rating }: StarsRatingsProps) {
  const filledStars = "★".repeat(Math.round(rating));
  const emptyStars = "☆".repeat(5 - Math.round(rating));

  return (
    <div className="flex items-center gap-2">
      <span className="text-amber-500 text-lg">
        {filledStars}
        {emptyStars}
      </span>
      <span className="text-sm text-text-muted">({rating.toFixed(1)})</span>
    </div>
  );
}
