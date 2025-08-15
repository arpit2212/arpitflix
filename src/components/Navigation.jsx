import React, { useState, useEffect } from 'react';
import { Search, Home, Film, Tv, TrendingUp, Menu, X, Star } from 'lucide-react';

const Navigation = ({ 
  activeTab, 
  setActiveTab, 
  searchQuery, 
  setSearchQuery 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, gradient: 'from-blue-500 to-purple-600', emoji: '🏠' },
    { id: 'movies', label: 'Movies', icon: Film, gradient: 'from-purple-500 to-pink-600', emoji: '🎬' },
    { id: 'tv', label: 'TV Shows', icon: Tv, gradient: 'from-pink-500 to-red-600', emoji: '📺' },
    { id: 'trending', label: 'Trending', icon: TrendingUp, gradient: 'from-yellow-500 to-orange-600', emoji: '🔥' }
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-purple-800/30 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-blue-900/10 to-purple-900/10"></div>
        
        {/* Floating particles in navigation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-8">
              {/* Logo */}
              <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="text-base sm:text-xl lg:text-2xl relative z-10 group-hover:rotate-12 transition-transform duration-500">😎</span>
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-pink-400 group-hover:via-blue-500 group-hover:to-purple-500 transition-all duration-500">
                    ArpitFlix
                  </h1>
                </div>
              </div>

              {/* Desktop Navigation Items */}
              <div className="hidden lg:flex space-x-1">
                {navItems.map(({ id, label, icon: Icon, gradient }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`relative flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 group ${
                      activeTab === id 
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg transform scale-105 shadow-purple-500/25` 
                        : `hover:bg-white/10 text-gray-300 hover:text-white`
                    }`}
                  >
                    
                    <Icon className={`w-4 h-4 transition-transform duration-300 ${activeTab === id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="font-medium text-sm">{label}</span>
                    {activeTab === id && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              {/* Search - Responsive behavior */}
              <div className={`relative group transition-all duration-300 ${
                isSearchFocused ? 'w-full sm:w-auto' : ''
              }`}>
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none z-10">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                </div>
                <input
                  type="text"
                  placeholder={isSearchFocused || window.innerWidth >= 640 ? "Search galaxy..." : "Search..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 lg:py-3 bg-black/50 backdrop-blur-sm border-2 border-purple-800/30 text-white placeholder-gray-400 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 hover:border-purple-600/50 group-hover:bg-black/70 text-sm sm:text-base ${
                    isSearchFocused 
                      ? 'w-full sm:w-64 lg:w-80' 
                      : 'w-32 xs:w-40 sm:w-48 lg:w-64 xl:w-80'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl sm:rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>

              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden flex-shrink-0 p-2 sm:p-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 transform rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation - Enhanced */}
          <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}>
            <div className="pb-4 border-t border-purple-800/30 pt-4">
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
                {navItems.map(({ id, label, icon: IconComponent, gradient, emoji }, index) => (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveTab(id);
                      setIsMobileMenuOpen(false);
                    }}
                    style={{ 
                      animationDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms' 
                    }}
                    className={`flex items-center space-x-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 transform ${
                      isMobileMenuOpen ? 'animate-in slide-in-from-bottom-4' : ''
                    } ${
                      activeTab === id 
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-105` 
                        : `text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 active:bg-white/20`
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${activeTab === id ? 'bg-white/20' : 'bg-white/10'} flex items-center justify-center flex-shrink-0`}>
                      <span className="text-base sm:text-lg">{emoji}</span>
                    </div>
                    <div className="text-left min-w-0 flex-1">
                      <span className="text-sm sm:text-base font-medium block truncate">{label}</span>
                    </div>
                    {activeTab === id && (
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse flex-shrink-0"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;