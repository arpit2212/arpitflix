import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import MovieCard from './components/MovieCard';
import HeroBanner from './components/HeroBanner';
import VideoPlayer from './components/VideoPlayer';
import { tmdbApi } from './services/tmdbApi';

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [moviesData, tvShowsData, trendingData] = await Promise.all([
          tmdbApi.getPopularMovies(),
          tmdbApi.getPopularTvShows(),
          tmdbApi.getTrendingMovies()
        ]);

        setMovies(moviesData);
        setTvShows(tvShowsData);
        setTrendingMovies(trendingData);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Handle search
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        const results = await tmdbApi.searchMulti(searchQuery);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handlePlayMovie = (movie) => {
    const mediaType = movie.media_type || 'movie';
    setSelectedMovie({
      ...movie,
      mediaType
    });
  };

  const handleClosePlayer = () => {
    setSelectedMovie(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Search Results */}
        {searchQuery && searchResults.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Search Results</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {searchResults.map((item) => (
                <MovieCard 
                  key={`${item.id}-${item.media_type}`} 
                  movie={item} 
                  onPlay={handlePlayMovie}
                />
              ))}
            </div>
          </div>
        )}

        {/* Home Tab */}
        {activeTab === 'home' && !searchQuery && (
          <>
            <HeroBanner trendingMovies={trendingMovies} onPlay={handlePlayMovie} />
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {movies.slice(0, 12).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onPlay={handlePlayMovie} />
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Popular TV Shows</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {tvShows.slice(0, 12).map((show) => (
                  <MovieCard 
                    key={show.id} 
                    movie={{ ...show, media_type: 'tv' }} 
                    onPlay={handlePlayMovie} 
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Movies Tab */}
        {activeTab === 'movies' && !searchQuery && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onPlay={handlePlayMovie} />
              ))}
            </div>
          </div>
        )}

        {/* TV Shows Tab */}
        {activeTab === 'tv' && !searchQuery && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Popular TV Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {tvShows.map((show) => (
                <MovieCard 
                  key={show.id} 
                  movie={{ ...show, media_type: 'tv' }} 
                  onPlay={handlePlayMovie} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && !searchQuery && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Trending Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {trendingMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onPlay={handlePlayMovie} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedMovie && (
        <VideoPlayer movie={selectedMovie} onClose={handleClosePlayer} />
      )}
    </div>
  );
}

export default App;