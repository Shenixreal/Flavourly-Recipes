import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Soup, User, Bell, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Soup className="w-6 h-6 text-[var(--primary)] group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-[var(--secondary)]">Flavourly</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors font-medium">Home</Link>
            <Link to="/favorites" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors font-medium">Favorites</Link>
            <Link to="/featured" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors font-medium">Featured</Link>
            <Link to="/blog" className="text-[var(--text)] hover:text-[var(--primary)] transition-colors font-medium">Blog</Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            <Link to="/notifications" title="Notifications" className="p-2 rounded-full text-[var(--text)] hover:text-[var(--primary)] hover:bg-gray-100 transition">
              <Bell className="w-6 h-6" />
            </Link>
            <Link to="/account" title="Account" className="p-2 rounded-full text-[var(--text)] hover:text-[var(--primary)] hover:bg-gray-100 transition">
              <User className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-[var(--text)] hover:text-[var(--primary)] hover:bg-gray-100 transition"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col px-4 py-2 gap-2">
            <Link to="/" onClick={() => setMenuOpen(false)} className="text-[var(--text)] hover:text-[var(--primary)] font-medium">Home</Link>
            <Link to="/favorites" onClick={() => setMenuOpen(false)} className="text-[var(--text)] hover:text-[var(--primary)] font-medium">Favorites</Link>
            <Link to="/featured" onClick={() => setMenuOpen(false)} className="text-[var(--text)] hover:text-[var(--primary)] font-medium">Featured</Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)} className="text-[var(--text)] hover:text-[var(--primary)] font-medium">Blog</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
