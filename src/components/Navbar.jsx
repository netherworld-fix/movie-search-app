import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-black bg-opacity-90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <span className="text-3xl">🎬</span>
              <span className="text-2xl font-bold text-white">MovieFlix</span>
            </Link>

            <div className="flex md:hidden items-center gap-6">
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition duration-200 text-sm"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className="text-gray-300 hover:text-white transition duration-200 flex items-center gap-1 text-sm"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                </svg>
                Favorites
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition duration-200 font-medium"
            >
              Home
            </Link>
            <Link
              to="/favorites"
              className="text-gray-300 hover:text-white transition duration-200 flex items-center gap-2 font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              Favorites
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                className="w-full md:w-100 px-10 py-2.5 pl-11 bg-gray-800 bg-opacity-50 text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-opacity-70 transition duration-200"
              />
              <svg
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
