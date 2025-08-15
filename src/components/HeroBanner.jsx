import React, { useState, useEffect } from 'react';
import { Play, Star, Calendar, ChevronLeft, ChevronRight, Info, Plus } from 'lucide-react';
import { BACKDROP_BASE_URL } from '../services/tmdbApi';

const HeroBanner = ({ trendingMovies, onPlay }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (trendingMovies.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % Math.min(trendingMovies.length, 5));
      }
    }, 6000);
    return () => clearInterval(timer);
  }, [trendingMovies]);

  if (!trendingMovies.length) return null;

  const currentMovie = trendingMovies[currentSlide];
  
  return (
    <div className="relative h-[500px] md:h-[600px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL}${currentMovie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
      
      <div className="relative z-10 h-full flex items-center justify-between p-8 md:p-12">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3 mb-4">
              <span className="bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm font-bold uppercase tracking-wide border border-white/20">
                Trending
              </span>
              <div className="flex items-center text-yellow-400">
                <Star className="w-5 h-5 mr-1 fill-current" />
                <span className="font-semibold">{currentMovie.vote_average.toFixed(1)}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-7xl font-black text-white mb-4 leading-tight">
              {currentMovie.title || currentMovie.name}
            </h1>
          </div>
          
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed line-clamp-3 max-w-2xl">
            {currentMovie.overview}
          </p>
          
          <div className="flex items-center space-x-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span className="font-medium">{new Date(currentMovie.release_date || currentMovie.first_air_date).getFullYear()}</span>
            </div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="font-medium capitalize">{currentMovie.media_type || 'movie'}</span>
          </div>
          
          <div className="flex items-center space-x-4 pt-4">
            <button
              onClick={() => onPlay(currentMovie)}
              className="bg-white text-black px-8 py-4 rounded-2xl flex items-center space-x-3 font-bold text-lg hover:bg-gray-200 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>Watch Now</span>
            </button>
            
            <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl flex items-center space-x-3 font-bold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-xl">
              <Info className="w-6 h-6" />
              <span>More Info</span>
            </button>
            
            <button className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-2xl hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-xl">
              <Plus className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="hidden md:flex flex-col space-y-3">
          <button
            onClick={() => setCurrentSlide((prev) => prev === 0 ? Math.min(trendingMovies.length, 5) - 1 : prev - 1)}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % Math.min(trendingMovies.length, 5))}
            className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 border border-white/20 shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {trendingMovies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;