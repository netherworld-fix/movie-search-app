const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

export const tmdbService = {
  // Get trending movies
  async getTrending(timeWindow = 'week') {
    try {
      const response = await fetch(
        `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch trending movies');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Search movies
  async searchMovies(query, page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}`
      );

      if (!response.ok) {
        throw new Error('Failed to search movies');
      }

      const data = await response.json();
      return {
        results: data.results,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get movie details
  async getMovieDetails(movieId) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=credits,videos`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Get popular movies
  async getPopular(page = 1) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch popular movies');
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Helper: Get poster image URL
  getPosterUrl(posterPath, size = 'w500') {
    if (!posterPath) return null;
    const baseUrl = IMAGE_BASE_URL.endsWith('/')
      ? IMAGE_BASE_URL.slice(0, -1)
      : IMAGE_BASE_URL;
    const cleanPath = posterPath.startsWith('/')
      ? posterPath
      : `/${posterPath}`;
    return `${baseUrl}/${size}${cleanPath}`;
  },

  // Helper: Get backdrop image URL
  getBackdropUrl(backdropPath, size = 'original') {
    if (!backdropPath) return null;
    const baseUrl = IMAGE_BASE_URL.endsWith('/')
      ? IMAGE_BASE_URL.slice(0, -1)
      : IMAGE_BASE_URL;
    const cleanPath = backdropPath.startsWith('/')
      ? backdropPath
      : `/${backdropPath}`;
    return `${baseUrl}/${size}${cleanPath}`;
  },
};
