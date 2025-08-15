const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
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

  // Get movie details
  getMovieDetails: async (id) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos,similar,reviews`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  },

  // Get TV show details
  getTvDetails: async (id) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US&append_to_response=credits,videos,similar,reviews`
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
  },

  // Get movie/TV cast and crew
  getCredits: async (id, mediaType) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching credits:', error);
      return null;
    }
  },

  // Get movie/TV videos (trailers, teasers, etc.)
  getVideos: async (id, mediaType) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching videos:', error);
      return null;
    }
  },

  // Get similar movies/TV shows
  getSimilar: async (id, mediaType) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching similar content:', error);
      return [];
    }
  },

  // Get recommendations based on a movie/TV show
  getRecommendations: async (id, mediaType) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${id}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  },

  // Get movie/TV reviews
  getReviews: async (id, mediaType) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/${mediaType}/${id}/reviews?api_key=${TMDB_API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  // Get TV season details
  getSeasonDetails: async (tvId, seasonNumber) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      return await response.json();
    } catch (error) {
      console.error('Error fetching season details:', error);
      return null;
    }
  },

  // Get genres list
  getGenres: async (mediaType = 'movie') => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/genre/${mediaType}/list?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await response.json();
      return data.genres || [];
    } catch (error) {
      console.error('Error fetching genres:', error);
      return [];
    }
  },

  // Get movies/TV shows by genre
  getByGenre: async (genreId, mediaType = 'movie', page = 1) => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/discover/${mediaType}?api_key=${TMDB_API_KEY}&with_genres=${genreId}&language=en-US&page=${page}&sort_by=popularity.desc`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error fetching content by genre:', error);
      return [];
    }
  }
};