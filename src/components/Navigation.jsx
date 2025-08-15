import React from 'react';
import { Search, Sun, Moon, Home, Film, Tv, TrendingUp, Menu } from 'lucide-react';

const Navigation = ({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  searchQuery, 
  setSearchQuery 
}) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'tv', label: 'TV Shows', icon: Tv },
    { id: 'trending', label: 'Trending', icon: TrendingUp }
  ];

  return (
    <nav className={`sticky top-0 z-50 ${
      darkMode ? 'bg-gray-900/95 border-gray-700' : 'bg-white/95 border-gray-200'
    } border-b backdrop-blur-xl bg-opacity-90 shadow-lg`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                Arpit Movies Hub
              </h1>
            </div>
            <div className="hidden md:flex space-x-2">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    activeTab === id 
                      ? 'bg-gradient-to-r from-red-500 to-purple-600 text-white shadow-lg transform scale-105' 
                      : `hover:bg-gray-100 ${darkMode ? 'hover:bg-gray-800 text-gray-300' : 'text-gray-600'}`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={`h-5 w-5 transition-colors ${
                  darkMode ? 'text-gray-400 group-focus-within:text-purple-400' : 'text-gray-500 group-focus-within:text-red-500'
                }`} />
              </div>
              <input
                type="text"
                placeholder="Search movies and TV shows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-12 pr-4 py-3 border-2 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 backdrop-blur-sm'
                    : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500 backdrop-blur-sm'
                } w-64 md:w-80 shadow-lg hover:shadow-xl`}
              />
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                darkMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white' 
                  : 'bg-gradient-to-r from-purple-500 to-blue-600 text-white'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;