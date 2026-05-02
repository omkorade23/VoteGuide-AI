import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', targetId: null },
  { label: 'Explore', targetId: 'explore' },
  { label: 'How it Works', targetId: 'how-it-works' },
  { label: 'FAQs', targetId: 'faqs' },
  { label: 'Contact', targetId: 'contact' },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLandingPage = location.pathname === '/';

  const scrollToSection = (targetId) => {
    if (targetId === null) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileOpen(false);
    if (isLandingPage) {
      scrollToSection(targetId);
    } else {
      navigate('/');
      setTimeout(() => scrollToSection(targetId), 150);
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 3-section layout: logo | center nav | button */}
        <div className="flex items-center justify-between h-18 py-4">

          {/* LEFT: Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              id="navbar-logo"
              className="flex items-center gap-2.5"
            >
              <div className="bg-green-50 p-2 rounded-lg">
                <Zap size={22} className="text-green-600" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                VotePath <span className="text-green-600">AI</span>
              </span>
            </Link>
          </div>

          {/* CENTER: Nav items — perfectly centered via absolute positioning trick */}
          <nav
            className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150 rounded-lg hover:bg-gray-50 whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT: Get Started + Mobile toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/journey"
              id="navbar-get-started"
              className="hidden md:inline-flex items-center bg-green-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-700 transition-colors duration-200 shadow-sm"
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
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={(e) => handleNavClick(e, item.targetId)}
                className="px-4 py-3 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {item.label}
              </a>
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
