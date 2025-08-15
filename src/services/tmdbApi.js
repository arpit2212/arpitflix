const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY ;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

export const tmdbApi = {
  // Fetch popular movies
  getPopularMovies: async (page = 1) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  // Fetch popular TV shows
  getPopularTvShows: async (page = 1) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching popular TV shows:', error);
      return [];
    }
  },

  // Fetch trending movies
  getTrendingMovies: async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  },

  // Search movies and TV shows
  searchMulti: async (query) => {
    if (!query.trim()) return [];
    
    try {
      const [movieResponse, tvResponse] = await Promise.all([
        fetch(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`),
        fetch(`${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`)
      ]);
      
      const movieData = await movieResponse.json();
      const tvData = await tvResponse.json();
      
      return [
        ...(movieData.results || []).map(item => ({ ...item, media_type: 'movie' })),
        ...(tvData.results || []).map(item => ({ ...item, media_type: 'tv' }))
      ].slice(0, 20);
    } catch (error) {
      console.error('Error searching content:', error);
      return [];
    }
  },

  // Get TV show details
  getTvDetails: async (id) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching TV details:', error);
      return null;
    }
  },

  // Get external IDs (including IMDB)
  getExternalIds: async (id, mediaType) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${id}/external_ids?api_key=${TMDB_API_KEY}`
      );
      const data = await response.json();
      return data.imdb_id;
    } catch (error) {
      console.error('Error fetching external IDs:', error);
      return null;
    }
  }
};