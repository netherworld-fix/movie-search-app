import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (movie) => {
    const newFavorites = favorites.filter((fav) => fav.id !== movie.id);
    setFavorites(newFavorites);
    localStorage.setItem('movieFavorites', JSON.stringify(newFavorites));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <svg
              className="w-10 h-10 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            My Favorites
          </h1>
          <p className="text-gray-400">
            {favorites.length === 0
              ? 'No favorites yet. Start adding movies!'
              : `You have ${favorites.length} favorite ${
                  favorites.length === 1 ? 'movie' : 'movies'
                }`}
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20">
            <svg
              className="w-32 h-32 mx-auto text-gray-600 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <p className="text-2xl text-gray-400 mb-4">
              Your favorites list is empty
            </p>
            <p className="text-gray-500">
              Click the heart icon on any movie to add it here
            </p>
          </div>
        ) : (
          <MovieGrid
            movies={favorites}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
          />
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
