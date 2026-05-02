import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Journey', to: '/journey' },
  { label: 'Timeline', to: '/timeline' },
  { label: 'Eligibility', to: '/eligibility' },
  { label: 'Ask AI', to: '/chat' },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0"
            id="navbar-logo"
          >
            <div className="bg-green-50 p-1.5 rounded-lg">
              <Zap size={20} className="text-green-600" />
            </div>
            <span className="text-lg font-bold text-gray-900 tracking-tight">
              VotePath <span className="text-green-600">AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                id={`nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-150 relative ${
                  isActive(link.to)
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              to="/journey"
              id="navbar-get-started"
              className="hidden md:inline-flex items-center bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-green-700 transition-colors duration-200 shadow-sm"
            >
              Get Started
            </Link>
            <button
              id="navbar-mobile-toggle"
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col p-4 gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                id={`mobile-nav-link-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive(link.to)
                    ? 'bg-green-50 text-green-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/journey"
              onClick={() => setMobileOpen(false)}
              className="mt-2 bg-green-600 text-white text-sm font-semibold px-5 py-3 rounded-full text-center hover:bg-green-700 transition-colors"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
