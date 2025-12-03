import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, onRate, interactive = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={interactive ? 24 : 16}
          className={`transition-colors duration-200 ${
            interactive ? "cursor-pointer" : ""
          } ${
            star <= (hover || rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={(e) => {
            if (interactive && onRate) {
              e.stopPropagation();
              onRate(star);
            }
          }}
        />
      ))}
    </div>
  );
};

export default StarRating;