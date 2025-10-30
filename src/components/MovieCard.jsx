import { useState } from 'react';
import { Link } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';

function MovieCard({ movie, onToggleFavorite, isFavorite }) {
  const [imgError, setImgError] = useState(false);
  const posterUrl = tmdbService.getPosterUrl(movie.poster_path);
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="group relative bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-105 will-change-transform z-0">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative aspect-2/3 overflow-hidden bg-gray-800 min-h-[300px]">
          {!imgError && posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover transition-opacity duration-500"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center p-4">
              <svg
                className="w-16 h-16 text-gray-600 mb-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-gray-500 text-sm text-center">{movie.title}</p>
            </div>
          )}

          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-all duration-300 flex items-center justify-center">
            <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-semibold">
              View Details
            </span>
          </div>
        </div>
      </Link>

      {/* Movie Info */}
      <div className="p-4">
        <Link to={`/movie/${movie.id}`}>
          <h3 className="text-white font-semibold text-lg mb-1 line-clamp-1 hover:text-blue-400 transition duration-200">
            {movie.title}
          </h3>
        </Link>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{year}</span>
          <div className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{rating}</span>
          </div>
        </div>
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          onToggleFavorite(movie);
        }}
        className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition duration-200 z-10"
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        <svg
          className={`w-6 h-6 ${
            isFavorite ? 'text-red-500 fill-current' : 'text-white'
          }`}
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
}

export default MovieCard;
