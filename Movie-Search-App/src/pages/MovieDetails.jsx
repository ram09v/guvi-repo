import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const [posterSrc, setPosterSrc] = useState('');
  const PLACEHOLDER_IMG = "https://placehold.co/600x900/1F2136/FFFFFF?text=No+Poster+Available";

  useEffect(() => {
    fetchMovieDetails(id).then((data) => {
        setMovie(data);
        setPosterSrc(data.Poster && data.Poster !== 'N/A' ? data.Poster : PLACEHOLDER_IMG);
        setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0B0C15] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0B0C15] text-gray-200 font-sans py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Search
        </Link>
        
        {movie && (
          <div className="bg-[#151725] rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 relative bg-[#1F2136]">
                 <img 
                  src={posterSrc}
                  alt={movie.Title} 
                  onError={() => setPosterSrc(PLACEHOLDER_IMG)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-2/3 p-8 md:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs font-bold uppercase tracking-wider border border-purple-600/30">{movie.Genre}</span>
                    <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-bold">{movie.Rated}</span>
                    <span className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-bold">{movie.Runtime}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{movie.Title}</h1>
                <div className="flex items-center gap-4 text-gray-400 mb-8">
                    <span className="text-xl">{movie.Year}</span>
                    {movie.imdbRating !== 'N/A' && (
                        <div className="flex items-center text-yellow-500">
                             <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                             <span className="font-bold text-white">{movie.imdbRating}</span>/10
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-2">Plot Summary</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{movie.Plot}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Director</h3>
                        <p className="text-white text-lg">{movie.Director}</p>
                     </div>
                     <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Starring</h3>
                        <p className="text-white text-lg">{movie.Actors}</p>
                     </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-800">
                   <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Other Ratings</h3>

                   {movie.Ratings && movie.Ratings.length > 0 ? (
                       <div className="flex flex-wrap gap-4">
                          {movie.Ratings.map((r, i) => (
                              <div key={i} className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700">
                                  <span className="text-gray-400 text-sm block">{r.Source}</span>
                                  <span className="text-white font-medium">{r.Value}</span>
                              </div>
                          ))}
                       </div>
                   ) : (
                       <p className="text-gray-500 italic text-sm bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 inline-block">
                          No additional ratings available for this title.
                       </p>
                   )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;