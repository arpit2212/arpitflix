import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { tmdbApi } from '../services/tmdbApi';

const VideoPlayer = ({ movie, onClose }) => {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState(1);
  const [tvDetails, setTvDetails] = useState(null);
  const [imdbId, setImdbId] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      // Get IMDB ID
      const fetchedImdbId = await tmdbApi.getExternalIds(movie.id, movie.mediaType);
      setImdbId(fetchedImdbId || movie.id);

      // Get TV details if it's a TV show
      if (movie.mediaType === 'tv') {
        const details = await tmdbApi.getTvDetails(movie.id);
        setTvDetails(details);
      }
    };

    fetchDetails();
  }, [movie]);

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
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {movie.title || movie.name}
              {movie.mediaType === 'tv' && (
                <span className="text-lg text-gray-300 ml-2">
                  S{selectedSeason.toString().padStart(2, '0')}E{selectedEpisode.toString().padStart(2, '0')}
                </span>
              )}
            </h2>
            {movie.mediaType === 'tv' && tvDetails && (
              <p className="text-gray-400 mt-1">
                {tvDetails.number_of_seasons} Season{tvDetails.number_of_seasons !== 1 ? 's' : ''} • 
                {tvDetails.number_of_episodes} Episodes
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Season and Episode Selector for TV Shows */}
        {movie.mediaType === 'tv' && tvDetails && (
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <label className="text-white font-medium">Season:</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => {
                    setSelectedSeason(parseInt(e.target.value));
                    setSelectedEpisode(1);
                  }}
                  className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {Array.from({ length: tvDetails.number_of_seasons }, (_, i) => i + 1).map((season) => (
                    <option key={season} value={season}>
                      Season {season}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-white font-medium">Episode:</label>
                <select
                  value={selectedEpisode}
                  onChange={(e) => setSelectedEpisode(parseInt(e.target.value))}
                  className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-1 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((episode) => (
                    <option key={episode} value={episode}>
                      Episode {episode}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handlePrevious}
                  disabled={selectedSeason === 1 && selectedEpisode === 1}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={tvDetails && selectedSeason === tvDetails.number_of_seasons && selectedEpisode >= 20}
                  className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <iframe
            src={getStreamingUrl()}
            className="w-full h-64 sm:h-96 md:h-[500px] lg:h-[600px]"
            allowFullScreen
            frameBorder="0"
            referrerPolicy="origin"
            title={`${movie.title || movie.name}${
              movie.mediaType === 'tv' ? ` - S${selectedSeason}E${selectedEpisode}` : ''
            }`}
          />
          <div className="p-4 text-center">
            <p className="text-gray-400 text-sm">
              Streaming via: {getStreamingUrl()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;