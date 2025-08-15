import React, { useState } from 'react';
import { Play, Star, Calendar, Eye, Heart, Sparkles } from 'lucide-react';
import { IMG_BASE_URL } from '../services/tmdbApi';

const MovieCard = ({ movie, onPlay, size = 'normal' }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const mediaType = movie.media_type || 'movie';
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const rating = movie.vote_average || 0;
  
  const getImageUrl = () => {
    if (!movie.poster_path) return null;
    return `${IMG_BASE_URL}${movie.poster_path}`;
  };

  const imageUrl = getImageUrl();

  return (
    <div 
      className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 w-full h-full" 
      onClick={() => onPlay(movie)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container - Fixed height for consistency */}
      <div className="relative bg-gradient-to-br from-gray-900/80 via-black/90 to-purple-950/80 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-purple-500/25 border border-purple-800/30 group-hover:border-purple-500/50 transition-all duration-500 backdrop-blur-sm h-full flex flex-col">
        
        {/* Cosmic Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating particles on hover - Reduced for mobile performance */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden sm:block">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Image Container - Consistent aspect ratio */}
        <div className="relative overflow-hidden flex-shrink-0">
          {imageUrl && !imageError ? (
            <>
              {!imageLoaded && (
                <div className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center animate-pulse">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 border-2 sm:border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={imageUrl}
                alt={title}
                className={`w-full object-cover transition-all duration-700 group-hover:scale-110 h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
              />
            </>
          ) : (
            // Fallback for missing/broken images
            <div className="h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80 bg-gradient-to-br from-gray-800 via-gray-900 to-purple-950 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 animate-pulse"></div>
              
              {/* Cosmic background effect - Reduced for mobile */}
              <div className="absolute inset-0 hidden sm:block">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      opacity: Math.random() * 0.6 + 0.2
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10 text-center p-3 sm:p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-2 sm:mb-3 lg:mb-4 shadow-lg mx-auto">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" fill="currentColor" />
                </div>
                <p className="text-white font-semibold text-xs sm:text-sm lg:text-lg line-clamp-2">{title}</p>
                <p className="text-gray-400 text-xs sm:text-sm mt-1">No Image Available</p>
              </div>
            </div>
          )}
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 lg:p-4 transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-white" fill="currentColor" />
              </div>
            </div>
          </div>
          
          {/* Rating Badge */}
          <div className="absolute top-1.5 sm:top-2 lg:top-3 right-1.5 sm:right-2 lg:-right-2 transform translate-x-16 group-hover:-translate-x-5 transition-transform duration-500">
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-1.5 sm:px-2 lg:px-3 py-0.5 sm:py-1 border border-yellow-500/30">
              <div className="flex items-center text-yellow-400">
                <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 mr-0.5 sm:mr-1 fill-current" />
                <span className="text-xs sm:text-xs lg:text-sm font-semibold">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          
        

          {/* Quality Badge */}
          <div className="absolute bottom-1.5 sm:bottom-2 lg:bottom-3 right-1.5 sm:right-2 lg:right-3 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-100">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-white text-xs font-bold shadow-lg">
              HD
            </div>
          </div>
        </div>

        {/* Content - Fixed height section */}
        <div className="p-2.5 sm:p-3 lg:p-4 relative flex-1 flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="relative z-10 flex-1 flex flex-col">
            <h3 className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1.5 sm:mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-500 flex-shrink-0">
              {title}
            </h3>
            
            <div className="flex items-center justify-between text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3 flex-shrink-0">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
                <button className="hover:text-red-400 transition-colors duration-300 transform hover:scale-110 p-0.5 sm:p-1">
                  <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
                <button className="hover:text-blue-400 transition-colors duration-300 transform hover:scale-110 p-0.5 sm:p-1">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
            </div>
            
            {/* Progress Bar Animation */}
            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-700 ease-out flex-shrink-0"></div>

            {/* Hover Info - Hidden on mobile for space efficiency */}
            <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-200 mt-2 hidden sm:block flex-1">
              <p className="text-gray-300 text-xs leading-relaxed line-clamp-2">
                {movie.overview || `Watch ${title} in stunning quality. Experience the magic of cinema.`}
              </p>
            </div>
          </div>
        </div>
        
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-transform duration-1000 ease-out"></div>
        
        {/* Cosmic Border Glow */}
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl border border-transparent bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default MovieCard;