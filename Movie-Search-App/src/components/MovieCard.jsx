import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, mode = 'grid' }) => {
  const PLACEHOLDER_IMG = "https://placehold.co/400x600/1F2136/FFFFFF?text=No+Poster";
  const [imgSrc, setImgSrc] = useState(
    movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMG
  );

  const isGrid = mode === 'grid';

  return (
    <div className={`
      group relative bg-gray-800/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 
      hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]
      ${isGrid ? 'flex flex-col h-full' : 'flex flex-row h-48 sm:h-56'} 
    `}>
      
      <div className={`
        relative overflow-hidden bg-[#1F2136] shrink-0
        ${isGrid ? 'h-72 w-full' : 'w-32 sm:w-40 h-full'}
      `}>
        <img
          src={imgSrc}
          alt={movie.Title}
          onError={() => setImgSrc(PLACEHOLDER_IMG)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />

        <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-[10px] font-medium text-white px-2 py-0.5 rounded-full border border-gray-600 uppercase tracking-wide">
          {movie.Type}
        </span>
      </div>

      <div className={`
        flex flex-col flex-grow
        ${isGrid ? 'p-4' : 'p-4 sm:p-6 justify-between'}
      `}>
        <div>
            <div className="flex justify-between items-start mb-2">
                <h3 className={`font-bold text-white leading-tight group-hover:text-purple-400 transition-colors line-clamp-2 ${isGrid ? 'text-lg' : 'text-xl'}`}>
                    {movie.Title}
                </h3>
            </div>
            
            <div className="mb-2">
                <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-2 py-1 rounded inline-block">
                    {movie.Year}
                </span>
            </div>

            <p className={`text-gray-400 text-xs leading-relaxed ${isGrid ? 'line-clamp-3 mb-4' : 'line-clamp-2 sm:line-clamp-3 hidden sm:block'}`}>
                {movie.Plot && movie.Plot !== 'N/A' ? movie.Plot : 'No description available.'}
            </p>
        </div>

        <div className={`mt-auto ${isGrid ? 'pt-4' : ''}`}>
             <Link 
              to={`/movie/${movie.imdbID}`} 
              className={`
                block text-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 
                text-white text-sm font-medium rounded-lg transition-all shadow-lg shadow-purple-900/20
                ${isGrid ? 'w-full py-2' : 'w-full sm:w-auto px-6 py-2 inline-block'}
              `}
            >
              View Details
            </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;