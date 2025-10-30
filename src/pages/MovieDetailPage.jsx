import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tmdbService } from '../services/tmdbService';
import Loading from '../components/Loading';

function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await tmdbService.getMovieDetails(id);
        setMovie(data);

        // Check if movie is in favorites
        const savedFavorites = localStorage.getItem('movieFavorites');
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          setIsFavorite(favorites.some((fav) => fav.id === data.id));
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== movie.id);
    } else {
      favorites.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
      });
    }

    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black">
        <Loading />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-2xl mb-4">
            Error: {error || 'Movie not found'}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const backdropUrl = tmdbService.getBackdropUrl(movie.backdrop_path);
  const posterUrl = tmdbService.getPosterUrl(movie.poster_path, 'w500');
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  // Get trailer
  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  // Get top 10 cast
  const cast = movie.credits?.cast?.slice(0, 10) || [];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Backdrop */}
      {backdropUrl && (
        <div
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 to-transparent"></div>
        </div>
      )}

      <div className="container mx-auto px-4 -mt-64 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                className="w-64 rounded-lg shadow-2xl"
              />
            ) : (
              <div className="w-64 h-96 bg-gray-800 rounded-lg flex items-center justify-center">
                <span className="text-gray-600 text-4xl">🎬</span>
              </div>
            )}
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
                <div className="flex items-center gap-4 text-gray-400">
                  <span>{year}</span>
                  <span>•</span>
                  <span>{runtime}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>{rating}/10</span>
                  </div>
                </div>
              </div>

              <button
                onClick={toggleFavorite}
                className="p-3 bg-white bg-opacity-10 rounded-full hover:bg-opacity-20 transition duration-200"
              >
                <svg
                  className={`w-8 h-8 ${
                    isFavorite ? 'text-red-500 fill-current' : 'text-white'
                  }`}
                  fill={isFavorite ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="px-4 py-2 bg-blue-600 bg-opacity-30 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-3">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Trailer */}
            {trailer && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-3">Trailer</h2>
                <div className="aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title="Movie Trailer"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            {/* Cast */}
            {cast.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {cast.map((person) => (
                    <div key={person.id} className="text-center">
                      {person.profile_path ? (
                        <img
                          src={tmdbService.getPosterUrl(
                            person.profile_path,
                            'w185'
                          )}
                          alt={person.name}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <div className="w-full h-32 bg-gray-800 rounded-lg mb-2 flex items-center justify-center">
                          <span className="text-3xl">👤</span>
                        </div>
                      )}
                      <p className="font-semibold text-sm">{person.name}</p>
                      <p className="text-gray-400 text-xs">
                        {person.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;
