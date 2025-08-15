import React from 'react';
import { Play, Star, Calendar } from 'lucide-react';
import { IMG_BASE_URL } from '../services/tmdbApi';

const MovieCard = ({ movie, onPlay, size = 'normal' }) => {
  const mediaType = movie.media_type || 'movie';
  const title = movie.title || movie.name;
  const releaseDate = movie.release_date || movie.first_air_date;
  const rating = movie.vote_average;

  return (
    <div 
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${
        size === 'large' ? 'w-80' : 'w-64'
      }`} 
      onClick={() => onPlay(movie)}
    >
      <div className="relative">
        <img
          src={movie.poster_path ? `${IMG_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={title}
          className={`w-full object-cover ${size === 'large' ? 'h-96' : 'h-80'}`}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
          <Play className="text-white w-16 h-16 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 rounded-full px-2 py-1">
          <div className="flex items-center text-yellow-400">
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 truncate">{title}</h3>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{releaseDate ? new Date(releaseDate).getFullYear() : 'N/A'}</span>
          </div>
          <span className="capitalize">{mediaType}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;