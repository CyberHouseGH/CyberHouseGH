import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { logoutUser } from '../lib/firebase';
import AuthDialog from './AuthDialog';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Training', path: '/training' },
    { name: 'News', path: '/news' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
    { name: 'Security Tools', path: '/security-tools', requiresAuth: true },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const mobileMenu = document.getElementById('mobile-menu');
      const menuButton = document.getElementById('menu-button');

      if (isOpen && mobileMenu && menuButton) {
        if (!mobileMenu.contains(event.target as Node) && !menuButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleAuthSuccess = () => {
    setShowAuthDialog(false);
    setIsOpen(false);
  };

  const renderUserProfile = () => {
    if (!user) return null;

    const displayName = user.displayName || 'Anonymous';
    const photoURL = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;

    return (
      <div className="flex items-center">
        <img
          src={photoURL}
          alt={displayName}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span className="ml-2 text-sm font-medium text-white">{displayName}</span>
      </div>
    );
  };

  return (
    <>
      <nav className="bg-black text-white">
        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="/logo.png"
                    alt="Cyberhouse Logo"
                    className="h-30 w-32"
                  />
                </Link>
              </div>

              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 hover:text-cyan-500 transition-colors"
                    onClick={(e) => {
                      if (item.requiresAuth && !user) {
                        e.preventDefault();
                        setAuthMode('login');
                        setShowAuthDialog(true);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <div className="flex items-center space-x-4">
                    {renderUserProfile()}
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-white hover:text-cyan-500 transition-colors"
                      title="Logout"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => {
                        setAuthMode('login');
                        setShowAuthDialog(true);
                      }}
                      className="text-white hover:text-cyan-500 transition-colors"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Mobile Menu Button */}
          <button
            id="menu-button"
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 left-4 z-50 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile Logo */}
          <div className="flex justify-center py-4">
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Cyberhouse Logo"
                className="h-28 w-32"
              />
            </Link>
          </div>

          {/* Side Navigation Menu */}
          <div
            id="mobile-menu"
            className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
              } w-64 bg-black transition-transform duration-300 ease-in-out z-40 h-full overflow-y-auto`}
          >
            <div className="px-2 pt-20 pb-3 space-y-1">
              {user && (
                <div className="px-3 py-4 border-b border-gray-700">
                  {renderUserProfile()}
                </div>
              )}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-cyan-500 transition-colors"
                  onClick={(e) => {
                    if (item.requiresAuth && !user) {
                      e.preventDefault();
                      setAuthMode('login');
                      setShowAuthDialog(true);
                    }
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-cyan-500 transition-colors"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              ) : (
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setShowAuthDialog(true);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-cyan-500 transition-colors"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={() => setIsOpen(false)}
            />
          )}
        </div>
      </nav>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={handleAuthSuccess}
        mode={authMode}
      />
    </>
  );
}