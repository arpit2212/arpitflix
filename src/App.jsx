import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import MovieCard from './components/MovieCard';
import HeroBanner from './components/HeroBanner';
import VideoPlayer from './components/VideoPlayer';
import MovieModal from './components/MovieModal';
import { tmdbApi } from './services/tmdbApi';

function App() {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieForDetails, setMovieForDetails] = useState(null);
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

  const handleMovieClick = (movie) => {
    const mediaType = movie.media_type || 'movie';
    setMovieForDetails({
      ...movie,
      mediaType
    });
  };

  const handlePlayMovie = (movie) => {
    const mediaType = movie.media_type || 'movie';
    setSelectedMovie({
      ...movie,
      mediaType
    });
    setMovieForDetails(null);
  };

  const handleClosePlayer = () => {
    setSelectedMovie(null);
  };

  const handleCloseModal = () => {
    setMovieForDetails(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Galaxy Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
          
          {/* Animated Stars */}
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Floating Orbs */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${10 + Math.random() * 30}px`,
                height: `${10 + Math.random() * 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(${Math.random() > 0.5 ? '59, 130, 246' : '147, 51, 234'}, 0.8), transparent)`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center relative z-10">
          {/* Enhanced Loading Spinner */}
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-spin mx-auto"></div>
            <div className="w-20 h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 animate-spin mx-auto absolute top-0 left-1/2 transform -translate-x-1/2 -rotate-45" style={{animationDelay: '0.3s'}}></div>
            <div className="w-20 h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-purple-500 via-blue-600 to-pink-500 animate-spin mx-auto absolute top-0 left-1/2 transform -translate-x-1/2 rotate-45" style={{animationDelay: '0.6s'}}></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
              🚀 ARPITFLIX
            </h2>
            <p className="text-lg md:text-xl text-white font-medium animate-pulse">
              Launching into the Galaxy...
            </p>
            <div className="flex justify-center space-x-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                  style={{animationDelay: `${i * 0.2}s`}}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced Galaxy Background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-950"></div>
        
        {/* Animated nebula overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
        </div>
        
        {/* Stars field */}
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              opacity: Math.random() * 0.8 + 0.2
            }}
          />
        ))}
        
        {/* Floating cosmic particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : Math.random() > 0.5 ? '147, 51, 234' : '236, 72, 153'}, 0.6)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Galaxy spiral arms */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-600/20 to-transparent rounded-full animate-spin-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-purple-600/20 to-transparent rounded-full animate-spin-slow" style={{animationDirection: 'reverse'}}></div>
        </div>
      </div>

      <div className="relative z-10">
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Search Results */}
          {searchQuery && searchResults.length > 0 && (
            <div className="mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative">
                🔍 Search Results
                <div className="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {searchResults.map((item, index) => (
                  <div 
                    key={`${item.id}-${item.media_type}`}
                    className="transform transition-all duration-500"
                    style={{ 
                      animationDelay: `${index * 0.1}s`,
                      animation: `slideInUp 0.6s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <MovieCard 
                      movie={item} 
                      onPlay={handleMovieClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Home Tab */}
          {activeTab === 'home' && !searchQuery && (
            <>
              <div className="mb-8 lg:mb-12">
                <HeroBanner trendingMovies={trendingMovies} onPlay={handleMovieClick} />
              </div>
              
              <div className="mb-8 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative">
                  🎬 Popular Movies
                  <div className="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                  {movies.slice(0, 12).map((movie, index) => (
                    <div 
                      key={movie.id}
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        animation: `slideInUp 0.6s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <MovieCard movie={movie} onPlay={handleMovieClick} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8 lg:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent relative">
                  📺 Popular TV Shows
                  <div className="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                  {tvShows.slice(0, 12).map((show, index) => (
                    <div 
                      key={show.id}
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        animation: `slideInUp 0.6s ease-out ${index * 0.05}s both`
                      }}
                    >
                      <MovieCard 
                        movie={{ ...show, media_type: 'tv' }} 
                        onPlay={handleMovieClick} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Movies Tab */}
          {activeTab === 'movies' && !searchQuery && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent relative">
                🎬 Popular Movies
                <div className="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {movies.map((movie, index) => (
                  <div 
                    key={movie.id}
                    style={{ 
                      animationDelay: `${index * 0.03}s`,
                      animation: `slideInUp 0.6s ease-out ${index * 0.03}s both`
                    }}
                  >
                    <MovieCard movie={movie} onPlay={handleMovieClick} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TV Shows Tab */}
          {activeTab === 'tv' && !searchQuery && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent relative">
                📺 Popular TV Shows
                <div className="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {tvShows.map((show, index) => (
                  <div 
                    key={show.id}
                    style={{ 
                      animationDelay: `${index * 0.03}s`,
                      animation: `slideInUp 0.6s ease-out ${index * 0.03}s both`
                    }}
                  >
                    <MovieCard 
                      movie={{ ...show, media_type: 'tv' }} 
                      onPlay={handleMovieClick} 
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trending Tab */}
          {activeTab === 'trending' && !searchQuery && (
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent relative">
                🔥 Trending Movies
                <div className="absolute -bottom-2 left-0 w-16 sm:w-20 h-1 bg-gradient-to-r from-yellow-500 to-red-600 rounded-full"></div>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
                {trendingMovies.map((movie, index) => (
                  <div 
                    key={movie.id}
                    style={{ 
                      animationDelay: `${index * 0.03}s`,
                      animation: `slideInUp 0.6s ease-out ${index * 0.03}s both`
                    }}
                  >
                    <MovieCard movie={movie} onPlay={handleMovieClick} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Movie Details Modal */}
      {movieForDetails && (
        <MovieModal 
          movie={movieForDetails} 
          onClose={handleCloseModal}
          onPlay={handlePlayMovie}
        />
      )}

      {/* Video Player Modal */}
      {selectedMovie && (
        <VideoPlayer movie={selectedMovie} onClose={handleClosePlayer} />
      )}
      
      <style jsx>{`
        @keyframes slideInUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}

export default App;