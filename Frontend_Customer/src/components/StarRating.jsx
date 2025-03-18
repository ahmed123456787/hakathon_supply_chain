import { Star } from "lucide-react";

const StarRating = ({ rating, totalRatings }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-2">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <Star key={index} className="fill-yellow-500 text-yellow-500 size-5" />
      ))}
      {/* Half Star */}
      {halfStar && (
        <Star
          className="fill-yellow-500 text-yellow-500 size-5"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      )}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <Star key={index} className="text-gray-300 size-5" />
      ))}
      {/* Rating Text */}
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      <span className="text-sm text-gray-500">| +{totalRatings} ratings</span>
    </div>
  );
};

export default StarRating;
