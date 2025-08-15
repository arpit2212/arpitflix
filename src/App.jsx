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
        // Add a minimum display time for the ARPITFLIX loading screen
        setTimeout(() => {
          setLoading(false);
        }, 3000); // Show for 3 seconds minimum
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
        {/* Optimized Galaxy Background - Reduced elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
          
          {/* Reduced Animated Stars - Only 30 instead of 100 */}
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${2 + Math.random()}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Reduced Floating Orbs - Only 3 instead of 8 */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`orb-${i}`}
              className="absolute rounded-full opacity-40"
              style={{
                width: `${15 + i * 10}px`,
                height: `${15 + i * 10}px`,
                left: `${20 + i * 30}%`,
                top: `${20 + i * 20}%`,
                background: `radial-gradient(circle, rgba(${i === 0 ? '59, 130, 246' : i === 1 ? '147, 51, 234' : '236, 72, 153'}, 0.6), transparent)`,
                animation: `float ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center relative z-10">
          {/* Simplified Loading Spinner - Single spinner */}
          <div className="relative mb-8">
            <div className="w-16 h-16 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-spin mx-auto"></div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              🚀 ARPITFLIX
            </h2>
            <p className="text-lg md:text-xl text-white/80 font-medium">
              Launching into the Galaxy...
            </p>
            <div className="flex justify-center space-x-2">
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
      {/* Optimized Galaxy Background - Much lighter */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-950"></div>
        
        {/* Simplified nebula overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        </div>
        
        {/* Reduced stars field - Only 50 instead of 150 */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-60"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Reduced cosmic particles - Only 8 instead of 20 */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full opacity-40"
            style={{
              background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : Math.random() > 0.5 ? '147, 51, 234' : '236, 72, 153'}, 0.6)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Simplified galaxy spiral arms - Static instead of rotating */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-blue-600/20 to-transparent rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-radial from-purple-600/20 to-transparent rounded-full"></div>
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
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 0.05}s`,
                      animation: `slideInUp 0.4s ease-out ${index * 0.05}s both`
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
                      className="transform transition-all duration-300 hover:scale-105"
                      style={{ 
                        animationDelay: `${index * 0.03}s`,
                        animation: `slideInUp 0.4s ease-out ${index * 0.03}s both`
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
                      className="transform transition-all duration-300 hover:scale-105"
                      style={{ 
                        animationDelay: `${index * 0.03}s`,
                        animation: `slideInUp 0.4s ease-out ${index * 0.03}s both`
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
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 0.02}s`,
                      animation: `slideInUp 0.4s ease-out ${index * 0.02}s both`
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
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 0.02}s`,
                      animation: `slideInUp 0.4s ease-out ${index * 0.02}s both`
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
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 0.02}s`,
                      animation: `slideInUp 0.4s ease-out ${index * 0.02}s both`
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
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}

export default App;