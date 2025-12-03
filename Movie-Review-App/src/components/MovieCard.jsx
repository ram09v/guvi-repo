import React from 'react';
import StarRating from './StarRating';

const MovieCard = ({ movie, onClick }) => {
  return (
    <div 
      onClick={() => onClick(movie)}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-transparent hover:border-indigo-100"
    >
      <div className="relative overflow-hidden h-80">
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
          {movie.year}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold truncate mb-1 text-gray-800">{movie.title}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-100">
            {movie.genre}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
           <div className="flex items-center gap-1">
              <StarRating rating={movie.rating} />
              <span className="text-sm font-medium text-gray-600 ml-1">{movie.rating}/5</span>
           </div>
           {movie.userRating > 0 && (
             <span className="text-xs text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded">
               You: {movie.userRating} ★
             </span>
           )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;