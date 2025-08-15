import React, { useState, useEffect } from 'react';
import { X, Play, Star, Calendar, Clock, Users, Heart, Share2, Download, Globe, Award, Film, Sparkles, Zap } from 'lucide-react';
import { tmdbApi, IMG_BASE_URL, BACKDROP_BASE_URL } from '../services/tmdbApi';

const MovieModal = ({ movie, onClose, onPlay }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const details = movie.mediaType === 'tv' || movie.media_type === 'tv'
          ? await tmdbApi.getTvDetails(movie.id)
          : await tmdbApi.getMovieDetails(movie.id);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center">
          {/* Enhanced Loading Animation */}
          <div className="relative mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-spin mx-auto"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-transparent bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 animate-spin mx-auto absolute top-0 left-1/2 transform -translate-x-1/2" style={{animationDelay: '0.3s', animationDirection: 'reverse'}}></div>
            
            {/* Floating particles around loader */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
                style={{
                  left: `${50 + 30 * Math.cos(i * Math.PI / 4)}%`,
                  top: `${50 + 30 * Math.sin(i * Math.PI / 4)}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
          <p className="text-white text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Loading cosmic details...
          </p>
        </div>
      </div>
    );
  }

  const details = movieDetails || movie;
  const title = details.title || details.name;
  const releaseDate = details.release_date || details.first_air_date;
  const rating = details.vote_average || 0;
  const runtime = details.runtime || details.episode_run_time?.[0];

  // Get cast and crew data
  const cast = details.credits?.cast || [];
  const crew = details.credits?.crew || [];
  const director = crew.find(person => person.job === 'Director');
  const producer = crew.find(person => person.job === 'Producer');
  const writer = crew.find(person => person.job === 'Writer' || person.job === 'Screenplay');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Scrollable container */}
      <div className="relative w-full h-full overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 py-8 sm:py-12">
          <div className="w-full max-w-6xl bg-gradient-to-br from-gray-900/90 via-black/95 to-purple-950/90 rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl border border-purple-800/30 backdrop-blur-xl my-4 sm:my-8">
            
            {/* Header with Background */}
            <div className="relative h-60 sm:h-80 md:h-96 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url(${BACKDROP_BASE_URL}${details.backdrop_path || details.poster_path})`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40"></div>
                
                {/* Enhanced cosmic overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/40 to-pink-900/30 animate-pulse"></div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full animate-pulse"
                    style={{
                      width: `${Math.random() * 3 + 1}px`,
                      height: `${Math.random() * 3 + 1}px`,
                      background: `rgba(${Math.random() > 0.5 ? '59, 130, 246' : Math.random() > 0.5 ? '147, 51, 234' : '236, 72, 153'}, 0.6)`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`,
                      animationDuration: `${1 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white hover:text-gray-300 transition-colors duration-300 bg-black/50 backdrop-blur-sm p-2 sm:p-3 rounded-full border border-white/20 hover:bg-black/70 z-10 group"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {/* Movie Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-end">
                  {/* Poster */}
                  <div className="flex-shrink-0 self-center lg:self-end">
                    <div className="w-32 h-48 sm:w-40 sm:h-60 lg:w-48 lg:h-72 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 group">
                      {details.poster_path ? (
                        <img
                          src={`${IMG_BASE_URL}${details.poster_path}`}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                          <Film className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Movie Details */}
                  <div className="flex-1 space-y-3 sm:space-y-4 text-center lg:text-left">
                    <div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-white leading-tight mb-2">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                          {title}
                        </span>
                      </h1>
                      {details.tagline && (
                        <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-light italic">"{details.tagline}"</p>
                      )}
                    </div>

                    {/* Ratings and Info */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4">
                      <div className="flex items-center bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-yellow-500/30">
                        <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400 fill-current animate-pulse" />
                        <span className="font-bold text-yellow-400 text-sm sm:text-lg">{rating.toFixed(1)}</span>
                        <span className="text-gray-300 text-xs sm:text-sm ml-2">/10</span>
                      </div>
                      
                      {releaseDate && (
                        <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full border border-blue-500/30">
                          <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-blue-400" />
                          <span className="text-white text-xs sm:text-sm">{new Date(releaseDate).getFullYear()}</span>
                        </div>
                      )}
                      
                      {runtime && (
                        <div className="flex items-center bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full border border-green-500/30">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-400" />
                          <span className="text-white text-xs sm:text-sm">{runtime}min</span>
                        </div>
                      )}

                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-full text-white text-xs sm:text-sm font-bold uppercase tracking-wide flex items-center space-x-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{movie.mediaType || movie.media_type || 'movie'}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4">
                      <button
                        onClick={() => onPlay(movie)}
                        className="group bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-xl lg:rounded-2xl flex items-center space-x-2 font-bold text-sm sm:text-base lg:text-lg hover:from-red-500 hover:to-pink-500 transition-all duration-500 shadow-2xl hover:shadow-red-500/50 transform hover:scale-105 relative overflow-hidden"
                      >
                        <Play className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 fill-current group-hover:scale-110 transition-transform duration-300" />
                        <span className="hidden sm:inline">Watch Now</span>
                        <span className="sm:hidden">Watch</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      </button>
                      
                      <button className="group bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-xl lg:rounded-2xl flex items-center space-x-2 hover:bg-white/20 transition-all duration-500 border border-white/30">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:fill-current group-hover:text-red-400 transition-colors duration-300" />
                        <span className="text-xs sm:text-sm hidden sm:inline">Wishlist</span>
                      </button>
                      
                      <button className="group bg-white/10 backdrop-blur-sm text-white px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 rounded-xl lg:rounded-2xl flex items-center space-x-2 hover:bg-white/20 transition-all duration-500 border border-white/30">
                        <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-xs sm:text-sm hidden sm:inline">Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Tabs */}
            <div className="p-4 sm:p-6 lg:p-8 pb-8 sm:pb-12">
              <div className="flex space-x-1 mb-6 sm:mb-8 bg-black/30 backdrop-blur-sm rounded-xl lg:rounded-2xl p-2 border border-purple-800/30 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: Zap },
                  { id: 'cast', label: 'Cast & Crew', icon: Users },
                  { id: 'details', label: 'Details', icon: Award }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 whitespace-nowrap text-sm sm:text-base ${
                      activeTab === id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-48 pb-4">
                {activeTab === 'overview' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-400" />
                        Plot Summary
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                        {details.overview || 'No overview available.'}
                      </p>
                    </div>

                    {details.genres && details.genres.length > 0 && (
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-purple-400" />
                          Genres
                        </h3>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                          {details.genres.map((genre) => (
                            <span
                              key={genre.id}
                              className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full text-white border border-purple-500/30 text-xs sm:text-sm font-medium"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'cast' && (
                  <div className="space-y-6 sm:space-y-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-400" />
                      Cast & Crew
                    </h3>

                    {/* Key Crew Members */}
                    {(director || producer || writer) && (
                      <div className="mb-6 sm:mb-8">
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Key Crew</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {director && (
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-purple-800/30 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                              <div className="w-full h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg mb-3 flex items-center justify-center">
                                {director.profile_path ? (
                                  <img
                                    src={`${IMG_BASE_URL}${director.profile_path}`}
                                    alt={director.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <Users className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <h5 className="text-white font-semibold text-sm">{director.name}</h5>
                              <p className="text-purple-400 text-xs">Director</p>
                            </div>
                          )}
                          {producer && (
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-purple-800/30 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                              <div className="w-full h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg mb-3 flex items-center justify-center">
                                {producer.profile_path ? (
                                  <img
                                    src={`${IMG_BASE_URL}${producer.profile_path}`}
                                    alt={producer.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <Users className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <h5 className="text-white font-semibold text-sm">{producer.name}</h5>
                              <p className="text-blue-400 text-xs">Producer</p>
                            </div>
                          )}
                          {writer && (
                            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 border border-purple-800/30 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm">
                              <div className="w-full h-20 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg mb-3 flex items-center justify-center">
                                {writer.profile_path ? (
                                  <img
                                    src={`${IMG_BASE_URL}${writer.profile_path}`}
                                    alt={writer.name}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <Users className="w-8 h-8 text-gray-400" />
                                )}
                              </div>
                              <h5 className="text-white font-semibold text-sm">{writer.name}</h5>
                              <p className="text-green-400 text-xs">Writer</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Main Cast */}
                    {cast.length > 0 ? (
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Main Cast</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                          {cast.slice(0, 10).map((actor) => (
                            <div key={actor.id} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-3 sm:p-4 border border-purple-800/30 hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm group hover:scale-105">
                              <div className="w-full h-24 sm:h-28 lg:h-32 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                                {actor.profile_path ? (
                                  <img
                                    src={`${IMG_BASE_URL}${actor.profile_path}`}
                                    alt={actor.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  />
                                ) : (
                                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                                )}
                              </div>
                              <h5 className="text-white font-semibold text-xs sm:text-sm line-clamp-2">{actor.name}</h5>
                              <p className="text-gray-400 text-xs line-clamp-1">{actor.character}</p>
                            </div>
                          ))}
                        </div>
                        {cast.length > 10 && (
                          <div className="mt-4 text-center">
                            <p className="text-gray-400 text-sm">
                              Showing 10 of {cast.length} cast members
                            </p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No cast information available</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-400" />
                      Technical Details
                    </h3>
                    
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-purple-800/30">
                          <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-400" />
                            Release Information
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm">
                            {releaseDate ? new Date(releaseDate).toLocaleDateString() : 'Unknown'}
                          </p>
                        </div>

                        {runtime && (
                          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-purple-800/30">
                            <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
                              Duration
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm">{runtime} minutes</p>
                          </div>
                        )}

                        <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-purple-800/30">
                          <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                            <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                            Rating
                          </h4>
                          <p className="text-gray-300 text-xs sm:text-sm">{rating.toFixed(1)}/10 ({details.vote_count || 0} votes)</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {details.production_companies && details.production_companies.length > 0 && (
                          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-purple-800/30">
                            <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                              <Award className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-purple-400" />
                              Production
                            </h4>
                            <div className="space-y-1">
                              {details.production_companies.slice(0, 3).map((company) => (
                                <p key={company.id} className="text-gray-300 text-xs sm:text-sm">{company.name}</p>
                              ))}
                            </div>
                          </div>
                        )}

                        {details.spoken_languages && details.spoken_languages.length > 0 && (
                          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-purple-800/30">
                            <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                              <Globe className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400" />
                              Languages
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {details.spoken_languages.map((lang) => (
                                <span key={lang.iso_639_1} className="bg-cyan-600/20 px-2 py-1 rounded-lg text-cyan-300 text-xs">
                                  {lang.english_name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {(movie.mediaType === 'tv' || movie.media_type === 'tv') && details.number_of_seasons && (
                          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-purple-800/30">
                            <h4 className="text-white font-semibold mb-2 flex items-center text-sm sm:text-base">
                              <Film className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-pink-400" />
                              TV Show Info
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm">
                              {details.number_of_seasons} Season{details.number_of_seasons !== 1 ? 's' : ''} • {details.number_of_episodes} Episodes
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                              Status: {details.status || 'Unknown'}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideInUp {
          animation: slideInUp 0.5s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>
    </div>
  );
};

export default MovieModal;