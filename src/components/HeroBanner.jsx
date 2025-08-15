import React, { useState, useEffect } from 'react';
import { Play, Star, Calendar, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { BACKDROP_BASE_URL } from '../services/tmdbApi';

const HeroBanner = ({ trendingMovies, onPlay }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !trendingMovies.length) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(trendingMovies.length, 10));
    }, 7000);
    
    return () => clearInterval(timer);
  }, [trendingMovies, isAutoPlaying]);

  if (!trendingMovies.length) return null;

  const currentMovie = trendingMovies[currentSlide];
  
  return (
    <div className="relative h-[350px] xs:h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] mb-6 sm:mb-8 lg:mb-12 mx-2 sm:mx-4 lg:mx-0 rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl group">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform group-hover:scale-105"
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL}${currentMovie.backdrop_path})`,
        }}
      >
        {/* Multiple Gradient Overlays for Galaxy Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 sm:via-black/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 sm:to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/60 sm:from-purple-900/50 via-transparent to-blue-900/50 sm:to-blue-900/40"></div>
        
        {/* Enhanced Animated Particles - Reduced on mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(window.innerWidth < 640 ? 8 : 20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                background: `rgba(${Math.random() > 0.6 ? '59, 130, 246' : Math.random() > 0.3 ? '147, 51, 234' : '236, 72, 153'}, ${0.4 + Math.random() * 0.4})`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Cosmic nebula effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/20 to-pink-600/10 animate-pulse opacity-60"></div>
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-between p-3 xs:p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-4xl h-full flex flex-col justify-between space-y-3 xs:space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Top Section - Movie Badges */}
          <div className="flex flex-wrap items-center gap-1.5 xs:gap-2 sm:gap-3 lg:gap-4">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-wide border border-white/20 shadow-lg animate-pulse flex items-center space-x-1">
              <Sparkles className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4" />
              <span className="text-xs xs:text-sm">🔥 Trending</span>
            </div>
            <div className="flex items-center bg-black/50 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full border border-yellow-500/30">
              <Star className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 mr-1.5 xs:mr-2 text-yellow-400 fill-current animate-pulse" />
              <span className="font-bold text-yellow-400 text-xs xs:text-sm sm:text-lg">{currentMovie.vote_average.toFixed(1)}</span>
              <span className="text-gray-300 text-xs ml-1 xs:ml-2">/10</span>
            </div>
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-full border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-medium">
              {currentMovie.media_type || 'movie'}
            </div>
          </div>
          
          {/* Middle Section - Title with Animation - Better mobile scaling */}
          <div className="flex-grow flex items-center">
            <div className="space-y-1 xs:space-y-2 sm:space-y-4">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight">
                <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 transition-all duration-700 cursor-pointer">
                  {currentMovie.title || currentMovie.name}
                </span>
              </h1>
            </div>
          </div>

          {/* Bottom Section - Watch Now Button and Movie Date */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            {/* Action Buttons - Only Watch Now button */}
            <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4">
              <button
                onClick={() => onPlay(currentMovie)}
                className="group bg-gradient-to-r from-white to-gray-100 text-black px-3 xs:px-4 sm:px-6 lg:px-8 py-2.5 xs:py-3 sm:py-4 rounded-lg xs:rounded-xl lg:rounded-2xl flex items-center space-x-1.5 xs:space-x-2 lg:space-x-3 font-bold text-xs xs:text-sm sm:text-base lg:text-lg hover:from-blue-400 hover:to-purple-500 hover:text-white transition-all duration-500 shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden flex-shrink-0"
              >
                <Play className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <span className="whitespace-nowrap">Watch Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </button>
            </div>
            
            {/* Movie Details - Date at bottom */}
            <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 lg:gap-6 text-gray-300">
              <div className="flex items-center space-x-1.5 xs:space-x-2 bg-black/40 sm:bg-black/30 backdrop-blur-sm px-2 xs:px-3 py-1.5 xs:py-2 rounded-full border border-white/10">
                <Calendar className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
                <span className="font-medium text-xs sm:text-sm whitespace-nowrap">{new Date(currentMovie.release_date || currentMovie.first_air_date).getFullYear()}</span>
              </div>
              <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse hidden xs:block"></div>
              <span className="font-medium text-green-400 text-xs sm:text-sm whitespace-nowrap">HD Quality</span>
            </div>
          </div>
        </div>

        {/* Navigation Controls - Hidden on mobile and tablet */}
        <div className="hidden lg:flex flex-col space-y-4">
          <button
            onClick={() => {
              setCurrentSlide((prev) => prev === 0 ? Math.min(trendingMovies.length, 10) - 1 : prev - 1);
              setIsAutoPlaying(false);
            }}
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-500 border border-white/20 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
          </button>
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % Math.min(trendingMovies.length, 10));
              setIsAutoPlaying(false);
            }}
            className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-4 rounded-full transition-all duration-500 border border-white/20 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Arrows - Better positioning */}
      <div className="lg:hidden absolute top-1/2 transform -translate-y-1/2 left-2 right-2 xs:left-3 xs:right-3 sm:left-4 sm:right-4 flex justify-between pointer-events-none z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide((prev) => prev === 0 ? Math.min(trendingMovies.length, 10) - 1 : prev - 1);
            setIsAutoPlaying(false);
          }}
          className="pointer-events-auto group bg-black/60 sm:bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 xs:p-2.5 sm:p-3 rounded-full transition-all duration-500 border border-white/20 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110"
        >
          <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide((prev) => (prev + 1) % Math.min(trendingMovies.length, 10));
            setIsAutoPlaying(false);
          }}
          className="pointer-events-auto group bg-black/60 sm:bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white p-2 xs:p-2.5 sm:p-3 rounded-full transition-all duration-500 border border-white/20 shadow-2xl hover:shadow-blue-500/50 transform hover:scale-110"
        >
          <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
      
      {/* Slide Indicators - 10 dots with mobile-friendly design */}
      <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-1 xs:space-x-1.5 sm:space-x-2 lg:space-x-3 overflow-x-auto scrollbar-hide max-w-[280px] xs:max-w-[320px] sm:max-w-none px-4 sm:px-0">
          {trendingMovies.slice(0, 10).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`relative transition-all duration-500 flex-shrink-0 ${
                currentSlide === index ? 'scale-125' : 'hover:scale-110'
              }`}
            >
              <div className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 lg:w-4 lg:h-4 rounded-full transition-all duration-500 ${
                currentSlide === index 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg shadow-purple-500/50' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}></div>
              {currentSlide === index && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-ping opacity-50"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Auto-play Indicator - Improved mobile positioning */}
      {isAutoPlaying && (
        <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 lg:bottom-8 right-3 xs:right-4 sm:right-6 lg:right-8 flex items-center space-x-1.5 xs:space-x-2 bg-black/60 sm:bg-black/50 backdrop-blur-sm px-2 xs:px-3 py-1.5 xs:py-2 rounded-full border border-white/20 z-20">
          <div className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white text-xs font-medium hidden xs:inline">Auto</span>
          <span className="text-white text-xs sm:text-sm font-medium hidden sm:inline">Auto-playing</span>
        </div>
      )}
      
      {/* Cosmic Effects - Reduced on mobile */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Shooting stars - Fewer on mobile */}
        {[...Array(window.innerWidth < 640 ? 1 : 3)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute w-0.5 xs:w-1 h-10 xs:h-20 bg-gradient-to-b from-blue-400 to-transparent animate-ping opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '4s',
              transform: `rotate(${Math.random() * 45}deg)`
            }}
          />
        ))}
      </div>
      
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) {
          .xs\:h-\[400px\] {
            height: 400px;
          }
          .xs\:text-3xl {
            font-size: 1.875rem;
            line-height: 2.25rem;
          }
          .xs\:space-y-4 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 1rem;
          }
          .xs\:px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          .xs\:py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          .xs\:text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          .xs\:w-4 {
            width: 1rem;
          }
          .xs\:h-4 {
            height: 1rem;
          }
          .xs\:space-x-2 > :not([hidden]) ~ :not([hidden]) {
            margin-left: 0.5rem;
          }
          .xs\:p-3 {
            padding: 0.75rem;
          }
          .xs\:rounded-xl {
            border-radius: 0.75rem;
          }
          .xs\:gap-2 {
            gap: 0.5rem;
          }
          .xs\:gap-3 {
            gap: 0.75rem;
          }
          .xs\:mb-4 {
            margin-bottom: 1rem;
          }
          .xs\:bottom-4 {
            bottom: 1rem;
          }
          .xs\:right-4 {
            right: 1rem;
          }
          .xs\:left-3 {
            left: 0.75rem;
          }
          .xs\:right-3 {
            right: 0.75rem;
          }
          .xs\:p-2\.5 {
            padding: 0.625rem;
          }
          .xs\:w-5 {
            width: 1.25rem;
          }
          .xs\:h-5 {
            height: 1.25rem;
          }
          .xs\:w-3 {
            width: 0.75rem;
          }
          .xs\:h-3 {
            height: 0.75rem;
          }
          .xs\:w-2 {
            width: 0.5rem;
          }
          .xs\:h-2 {
            height: 0.5rem;
          }
          .xs\:space-x-1\.5 > :not([hidden]) ~ :not([hidden]) {
            margin-left: 0.375rem;
          }
          .xs\:py-2 {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          .xs\:px-3 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          .xs\:space-y-2 > :not([hidden]) ~ :not([hidden]) {
            margin-top: 0.5rem;
          }
          .xs\:line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .xs\:block {
            display: block;
          }
          .xs\:inline {
            display: inline;
          }
          .xs\:pt-4 {
            padding-top: 1rem;
          }
          .xs\:gap-4 {
            gap: 1rem;
          }
          .xs\:w-2\.5 {
            width: 0.625rem;
          }
          .xs\:h-2\.5 {
            height: 0.625rem;
          }
          .xs\:max-w-\[320px\] {
            max-width: 320px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;