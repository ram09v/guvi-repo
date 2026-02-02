import React, { useState } from 'react';
import { fetchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import { SkeletonCard, ErrorState, WelcomeState } from '../components/UIState';

const Home = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  
  const [viewMode, setViewMode] = useState('grid');

  const searchMoviesData = async (searchQuery, pageNum, filterType) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    
    try {
      const data = await fetchMovies(searchQuery, pageNum, filterType);
      
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults, 10));
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Connection failed. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    setPage(1);
    searchMoviesData(cleanQuery, 1, type);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    searchMoviesData(query.trim(), newPage, type);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (e) => {
    const newType = e.target.value;
    setType(newType);
    setPage(1);
    if (query.trim()) {
        searchMoviesData(query.trim(), 1, newType);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C15] text-white font-sans selection:bg-purple-500 selection:text-white">

      <div className="bg-gradient-to-b from-[#151725] to-[#0B0C15] pb-10 pt-10 px-4 shadow-xl border-b border-gray-800">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Unlimited Movies, TV & More
          </h1>
          <p className="text-gray-400 mb-8 text-lg">Discover your next favorite story.</p>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative flex flex-col md:flex-row gap-3">
            <select 
              value={type} 
              onChange={handleFilterChange}
              className="p-4 bg-[#1F2136] text-gray-300 rounded-xl border border-gray-700 focus:border-purple-500 outline-none cursor-pointer"
            >
              <option value="">All Formats</option>
              <option value="movie">Movies</option>
              <option value="series">TV Series</option>
            </select>

            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search Title (e.g. Matrix, Avengers)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full p-4 pl-12 bg-[#1F2136] text-white rounded-xl border border-gray-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder-gray-500"
              />
            </div>

            <button 
              type="submit" 
              className="p-4 px-8 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-900/30 active:scale-95"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-[1600px]">
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <ErrorState message={error} />
        ) : !hasSearched ? (
          <WelcomeState />
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center text-gray-400 text-sm gap-4">
                <div className="flex gap-4">
                  <span>Found {totalResults} results</span>
                  <span>Page {page}</span>
                </div>

                <div className="flex bg-[#1F2136] rounded-lg p-1 border border-gray-700">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    title="Grid View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                    title="List View"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                  </button>
                </div>
            </div>

            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                : "flex flex-col gap-4 max-w-4xl mx-auto" // List View Container styles
            }>
              {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} mode={viewMode} />
              ))}
            </div>

            {movies.length > 0 && totalResults > 10 && (
              <div className="flex justify-center items-center mt-12 gap-6">
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="px-6 py-3 bg-[#1F2136] border border-gray-700 hover:border-purple-500 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  &larr; Previous
                </button>
                <div className="flex gap-2">
                   <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                   <span className="w-2 h-2 rounded-full bg-gray-700"></span>
                   <span className="w-2 h-2 rounded-full bg-gray-700"></span>
                </div>
                <button
                  disabled={page >= Math.ceil(totalResults / 10)}
                  onClick={() => handlePageChange(page + 1)}
                  className="px-6 py-3 bg-[#1F2136] border border-gray-700 hover:border-purple-500 text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;