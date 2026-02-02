const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

const getMovieDetails = async (id) => {
  const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=short`);
  return response.json();
};

export const fetchMovies = async (query, page = 1, type = '') => {
  try {
    const typeParam = type ? `&type=${type}` : '';
    const searchResponse = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}${typeParam}`);
    const searchData = await searchResponse.json();

    if (searchData.Response === 'True') {
      const detailedPromises = searchData.Search.map((movie) => getMovieDetails(movie.imdbID));
      const detailedMovies = await Promise.all(detailedPromises);

      return {
        Response: 'True',
        Search: detailedMovies,
        totalResults: searchData.totalResults
      };
    }

    return searchData;
  } catch (error) {
    throw new Error('Failed to fetch movies');
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
    return response.json();
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};