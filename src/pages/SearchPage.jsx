import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load favorites
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const searchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await tmdbService.searchMovies(query);
        setMovies(data.results);
      } catch (error) {
        console.error('Search error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      newFavorites = [...favorites, movie];
    }

    setFavorites(newFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-2xl mb-4">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-32 h-32 mx-auto text-gray-600 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-2xl text-gray-400">
            Enter a search term to find movies
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-400 text-lg">
            Found {movies.length} {movies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        <MovieGrid
          movies={movies}
          onToggleFavorite={toggleFavorite}
          favorites={favorites}
        />
      </div>
    </div>
  );
}

export default SearchPage;
