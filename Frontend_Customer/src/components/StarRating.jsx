import { Star } from "lucide-react";

const StarRating = ({ rating = 0, totalRatings = 0 }) => {
  // ensure rating is between 0 and 5
  const safeRating = Math.min(5, Math.max(0, rating));
  const fullStars = Math.floor(safeRating);
  const halfStar = safeRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-2">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} className="fill-yellow-500 text-yellow-500 w-5 h-5" />
      ))}
      {/* Half Star */}
      {halfStar && (
        <Star
          className="fill-yellow-500 text-yellow-500 w-5 h-5"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={index} className="text-gray-300 w-5 h-5" />
      ))}
      {/* Rating Text */}
      <span className="text-sm font-medium">{safeRating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">| +{totalRatings} ratings</span>
    </div>
  );
};

export default StarRating;
