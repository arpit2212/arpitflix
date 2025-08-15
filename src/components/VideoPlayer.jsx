import React, { useState, useEffect } from 'react';
import { X, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Settings, Download, Share2, Heart, Tv, Film, Sparkles, Zap } from 'lucide-react';
import { tmdbApi } from '../services/tmdbApi';

const VideoPlayer = ({ movie, onClose }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [tvDetails, setTvDetails] = useState(null);
  const [imdbId, setImdbId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [quality, setQuality] = useState('HD');

  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true);
      
      // Get IMDB ID
      const fetchedImdbId = await tmdbApi.getExternalIds(movie.id, movie.mediaType);
      setImdbId(fetchedImdbId || movie.id);

      // Get TV details if it's a TV show
      if (movie.mediaType === 'tv') {
        const details = await tmdbApi.getTvDetails(movie.id);
        setTvDetails(details);
      }
      
      setIsLoading(false);
    };

    fetchDetails();
  }, [movie]);

  useEffect(() => {
    const timer = setTimeout(() => setShowControls(false), 3000);
    return () => clearTimeout(timer);
  }, [showControls]);

  const getStreamingUrl = () => {
    const id = imdbId && imdbId.toString().startsWith('tt') ? imdbId : movie.id;
    
    if (movie.mediaType === 'tv') {
      return `https://vidsrc.to/embed/tv/${id}/${selectedSeason}/${selectedEpisode}`;
    }
    return `https://vidsrc.to/embed/movie/${id}`;
  };

  const handlePrevious = () => {
    if (selectedEpisode > 1) {
      setSelectedEpisode(selectedEpisode - 1);
    } else if (selectedSeason > 1) {
      setSelectedSeason(selectedSeason - 1);
      setSelectedEpisode(20); // Assume max 20 episodes
    }
  };

  const handleNext = () => {
    if (selectedEpisode < 20) { // Assume max 20 episodes per season
      setSelectedEpisode(selectedEpisode + 1);
    } else if (tvDetails && selectedSeason < tvDetails.number_of_seasons) {
      setSelectedSeason(selectedSeason + 1);
      setSelectedEpisode(1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      {/* Enhanced Background with galaxy effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/30 to-black">
        {/* Animated stars */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                opacity: Math.random() * 0.8 + 0.2
              }}
            />
          ))}
        </div>

        {/* Cosmic nebula effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-600/30 to-transparent rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-purple-600/30 to-transparent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        {/* Shooting stars */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-1 h-20 bg-gradient-to-b from-blue-400 to-transparent animate-ping opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 3}s`,
              animationDuration: '6s',
              transform: `rotate(${Math.random() * 45}deg)`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Header Controls */}
        <div 
          className={`flex items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}
          onMouseEnter={() => setShowControls(true)}
        >
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={onClose}
              className="group text-white hover:text-red-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2.5 sm:p-3 rounded-full border border-white/20 hover:bg-red-500/20"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>
            
            <div className="bg-black/50 backdrop-blur-sm rounded-xl lg:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 border border-purple-500/30">
              <h2 className="text-white font-bold text-sm sm:text-lg lg:text-xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                {movie.title || movie.name}
              </h2>
              {movie.mediaType === 'tv' && (
                <p className="text-gray-300 text-xs sm:text-sm mt-1 flex items-center">
                  <Tv className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  S{selectedSeason.toString().padStart(2, '0')} • E{selectedEpisode.toString().padStart(2, '0')}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button className="group text-white hover:text-red-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2 sm:p-3 rounded-full border border-white/20 hover:bg-red-500/20">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-current transition-all duration-300" />
            </button>
            <button className="group text-white hover:text-blue-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2 sm:p-3 rounded-full border border-white/20 hover:bg-blue-500/20">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
            </button>
            <button className="group text-white hover:text-green-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2 sm:p-3 rounded-full border border-white/20 hover:bg-green-500/20">
              <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* TV Show Controls */}
        {movie.mediaType === 'tv' && tvDetails && (
          <div className={`px-4 sm:px-6 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
          }`}>
            <div className="bg-black/70 backdrop-blur-sm rounded-xl lg:rounded-2xl p-4 sm:p-6 border border-purple-500/30 mb-4">
              <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 w-full lg:w-auto">
                  <div className="flex items-center space-x-3">
                    <label className="text-white font-semibold text-xs sm:text-sm">Season:</label>
                    <select
                      value={selectedSeason}
                      onChange={(e) => {
                        setSelectedSeason(parseInt(e.target.value));
                        setSelectedEpisode(1);
                      }}
                      className="bg-gray-800/80 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-xs sm:text-sm"
                    >
                      {Array.from({ length: tvDetails.number_of_seasons }, (_, i) => i + 1).map((season) => (
                        <option key={season} value={season}>Season {season}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <label className="text-white font-semibold text-xs sm:text-sm">Episode:</label>
                    <select
                      value={selectedEpisode}
                      onChange={(e) => setSelectedEpisode(parseInt(e.target.value))}
                      className="bg-gray-800/80 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-xs sm:text-sm"
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((episode) => (
                        <option key={episode} value={episode}>Episode {episode}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-3">
                    <label className="text-white font-semibold text-xs sm:text-sm">Quality:</label>
                    <select
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="bg-gray-800/80 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-xs sm:text-sm"
                    >
                      <option value="HD">HD</option>
                      <option value="FHD">Full HD</option>
                      <option value="4K">4K</option>
                    </select>
                  </div>
                </div>

                <div className="flex space-x-2 w-full sm:w-auto">
                  <button
                    onClick={handlePrevious}
                    disabled={selectedSeason === 1 && selectedEpisode === 1}
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-3 sm:px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-blue-500/25 flex-1 sm:flex-none justify-center"
                  >
                    <SkipBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-xs sm:text-sm">Previous</span>
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={tvDetails && selectedSeason === tvDetails.number_of_seasons && selectedEpisode >= 20}
                    className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-3 sm:px-6 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-purple-500/25 flex-1 sm:flex-none justify-center"
                  >
                    <span className="text-xs sm:text-sm">Next</span>
                    <SkipForward className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Player Container */}
        <div 
          className="flex-1 flex items-center justify-center p-4 sm:p-6 cursor-pointer"
          onClick={() => setShowControls(true)}
          onMouseMove={() => setShowControls(true)}
        >
          <div className="w-full max-w-7xl bg-black rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30 relative">
            {isLoading && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-spin mx-auto"></div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 animate-spin mx-auto absolute top-0 left-1/2 transform -translate-x-1/2" style={{animationDelay: '0.3s', animationDirection: 'reverse'}}></div>
                    
                    {/* Loading particles */}
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
                        style={{
                          left: `${50 + 35 * Math.cos(i * Math.PI / 4)}%`,
                          top: `${50 + 35 * Math.sin(i * Math.PI / 4)}%`,
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                  <h3 className="text-white text-lg sm:text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center justify-center">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-400" />
                    Loading video...
                  </h3>
                  <p className="text-gray-400 text-sm">Connecting to the galaxy streaming network</p>
                </div>
              </div>
            )}
            
            <iframe
              src={getStreamingUrl()}
              className="w-full h-48 sm:h-64 md:h-96 lg:h-[500px] xl:h-[600px] 2xl:h-[700px]"
              allowFullScreen
              frameBorder="0"
              referrerPolicy="origin"
              title={`${movie.title || movie.name}${
                movie.mediaType === 'tv' ? ` - S${selectedSeason}E${selectedEpisode}` : ''
              }`}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>

        {/* Bottom Controls */}
        <div 
          className={`px-4 sm:px-6 pb-4 sm:pb-6 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
          onMouseEnter={() => setShowControls(true)}
        >
          <div className="bg-black/70 backdrop-blur-sm rounded-xl lg:rounded-2xl p-3 sm:p-4 border border-purple-500/30">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  {movie.mediaType === 'tv' ? (
                    <Tv className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  ) : (
                    <Film className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  )}
                  <span className="text-xs sm:text-sm font-medium">Streaming via: VidSrc</span>
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-green-400 text-xs sm:text-sm font-medium">Online</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <button className="group text-white hover:text-blue-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/20">
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
                <button className="group text-white hover:text-purple-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/20">
                  <Settings className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-45 transition-transform duration-300" />
                </button>
                <button className="group text-white hover:text-green-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2 rounded-full border border-white/20">
                  <Maximize className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
};

export default VideoPlayer;