import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, Calendar, Star } from 'lucide-react';
import { initialMoviesData } from './data/mockData';
import MovieCard from './components/MovieCard';
import MovieDetailModal from './components/MovieDetailModal';

const App = () => {
  const [movies, setMovies] = useState(() => {
    const savedMovies = localStorage.getItem('movieApp_data');
    return savedMovies ? JSON.parse(savedMovies) : initialMoviesData;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  const [selectedYear, setSelectedYear] = useState("All");
  const [minRating, setMinRating] = useState("0");

  useEffect(() => {
    localStorage.setItem('movieApp_data', JSON.stringify(movies));
  }, [movies]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const genres = ["All", ...new Set(movies.map(m => m.genre))];

  const years = ["All", ...new Set(movies.map(m => m.year))].sort().reverse();

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
 
    const matchesYear = selectedYear === "All" || movie.year === selectedYear;

    const matchesRating = movie.rating >= Number(minRating);

    return matchesSearch && matchesGenre && matchesYear && matchesRating;
  });

  const handleRateMovie = (id, rating) => {
    const updatedMovies = movies.map(movie => 
      movie.id === id ? { ...movie, userRating: rating } : movie
    );
    setMovies(updatedMovies);
    
    if (selectedMovie && selectedMovie.id === id) {
      setSelectedMovie({ ...selectedMovie, userRating: rating });
    }
  };

  const handleResetData = () => {
    if(window.confirm("Are you sure you want to reset all ratings?")) {
      setMovies(initialMoviesData);
      localStorage.removeItem('movieApp_data');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight">MovieReviewz</h1>
          <button 
            onClick={handleResetData}
            className="text-xs bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Trash2 size={14} /> Reset Ratings
          </button>
        </div>
      </header>

      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center bg-white p-4 rounded-lg shadow-sm">

          <div className="relative w-full xl:w-96">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-3 w-full xl:w-auto">

            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg w-full md:w-auto">
              <Filter size={18} className="text-gray-500" />
              <select
                className="bg-transparent focus:outline-none text-sm w-full"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map(g => (
                  <option key={g} value={g}>{g === "All" ? "All Genres" : g}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg w-full md:w-auto">
              <Calendar size={18} className="text-gray-500" />
              <select
                className="bg-transparent focus:outline-none text-sm w-full"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="All">All Years</option>
                {years.filter(y => y !== "All").map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg w-full md:w-auto">
              <Star size={18} className="text-gray-500" />
              <select
                className="bg-transparent focus:outline-none text-sm w-full"
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
              >
                <option value="0">All Ratings</option>
                <option value="5">5 Stars Only</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
                <option value="2">2+ Stars</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map(movie => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={setSelectedMovie} 
            />
          ))}
        </div>

        {filteredMovies.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-medium">No movies found.</p>
            <p className="text-sm mt-2">Try adjusting your filters or search term.</p>
          </div>
        )}
      </main>

      <MovieDetailModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
        onRate={handleRateMovie} 
      />
    </div>
  );
};

export default App;