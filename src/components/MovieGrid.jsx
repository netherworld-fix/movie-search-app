import MovieCard from './MovieCard';

function MovieGrid({ movies, onToggleFavorite, favorites = [] }) {
  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <svg
          className="w-24 h-24 mx-auto text-gray-600 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
          />
        </svg>
        <p className="text-gray-400 text-xl">No movies found</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onToggleFavorite={onToggleFavorite}
            isFavorite={isFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;
