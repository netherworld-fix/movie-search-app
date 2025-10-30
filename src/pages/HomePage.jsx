import { useState, useEffect } from 'react';
import { tmdbService } from '../services/tmdbService';
import MovieGrid from '../components/MovieGrid';
import Loading from '../components/Loading';

function HomePage() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // Pagination state
  const [trendingPage, setTrendingPage] = useState(1);
  const [popularPage, setPopularPage] = useState(1);
  const [loadingTrending, setLoadingTrending] = useState(false);
  const [loadingPopular, setLoadingPopular] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));

    const fetchMovies = async () => {
      try {
        const [trendingData, popularData] = await Promise.all([
          tmdbService.getTrending(),
          tmdbService.getPopular(),
        ]);
        setTrending(trendingData);
        setPopular(popularData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const loadMoreTrending = async () => {
    setLoadingTrending(true);
    try {
      const nextPage = trendingPage + 1;
      const newMovies = await tmdbService.getTrending('week');
      setTrending([...trending, ...newMovies]);
      setTrendingPage(nextPage);
    } catch (error) {
      console.error('Error loading more trending:', error);
    } finally {
      setLoadingTrending(false);
    }
  };

  const loadMorePopular = async () => {
    setLoadingPopular(true);
    try {
      const nextPage = popularPage + 1;
      const newMovies = await tmdbService.getPopular(nextPage);
      setPopular([...popular, ...newMovies]);
      setPopularPage(nextPage);
    } catch (error) {
      console.error('Error loading more popular:', error);
    } finally {
      setLoadingPopular(false);
    }
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    const newFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== movie.id)
      : [...favorites, movie];
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

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent leading-tight">
            Discover Movies
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore trending movies, search your favorites, and create your
            watchlist
          </p>
        </div>

        {/* Trending Section */}
        <section className="mb-24 py-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <span className="text-4xl">🔥</span>
              Trending This Week
            </h2>
            <span className="text-gray-400 text-sm hidden md:block">
              {trending.length} movies
            </span>
          </div>

          <MovieGrid
            movies={trending}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />

          {/* Load More Trending Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMoreTrending}
              disabled={loadingTrending}
              className="px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {loadingTrending ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  Load More Trending
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Popular Section */}
        <section className="py-8 pb-20">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
              <span className="text-4xl">⭐</span>
              Popular Movies
            </h2>
            <span className="text-gray-400 text-sm hidden md:block">
              {popular.length} movies
            </span>
          </div>

          <MovieGrid
            movies={popular}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />

          {/* Load More Popular Button */}
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMorePopular}
              disabled={loadingPopular}
              className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {loadingPopular ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </>
              ) : (
                <>
                  Load More Popular
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
