import React from 'react';
import { X } from 'lucide-react';
import StarRating from './StarRating';

const MovieDetailModal = ({ movie, onClose, onRate }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden relative flex flex-col md:flex-row">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 z-10 bg-white rounded-full p-1 shadow-sm"
        >
          <X size={24} />
        </button>
        
        <img 
          src={movie.poster} 
          alt={movie.title} 
          className="w-full md:w-1/2 h-64 md:h-auto object-cover"
        />
        
        <div className="p-6 md:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{movie.title}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span className="px-2 py-1 bg-gray-100 rounded">{movie.year}</span>
              <span className="px-2 py-1 bg-gray-100 rounded">{movie.genre}</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">{movie.description}</p>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Rate this movie:</p>
            <StarRating 
              rating={movie.userRating} 
              interactive={true} 
              onRate={(rating) => onRate(movie.id, rating)} 
            />
            {movie.userRating > 0 ? (
              <p className="text-xs text-green-600 mt-2 font-medium">You rated this {movie.userRating} stars!</p>
            ) : (
              <p className="text-xs text-gray-400 mt-2">No rating yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;