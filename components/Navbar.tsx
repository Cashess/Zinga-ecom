import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-zinga-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-serif font-bold text-zinga-700">Zinga</span>
              <span className="ml-1 w-2 h-2 bg-zinga-500 rounded-full"></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-zinga-900 hover:text-zinga-600 font-medium transition-colors">Home</Link>
            <Link to="/products" className="text-zinga-900 hover:text-zinga-600 font-medium transition-colors">Shop</Link>
            <Link to="/recipes" className="text-zinga-900 hover:text-zinga-600 font-medium transition-colors flex items-center gap-1">
               <Sparkles size={16} className="text-zinga-500" /> AI Kitchen
            </Link>
            <Link to="/cart" className="relative p-2 text-zinga-800 hover:text-zinga-600 transition-colors">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-zinga-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <Link to="/cart" className="mr-4 relative p-2 text-zinga-800">
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-zinga-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-zinga-800 hover:text-zinga-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-zinga-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-zinga-900 hover:bg-zinga-50">Home</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-zinga-900 hover:bg-zinga-50">Shop</Link>
            <Link to="/recipes" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-zinga-900 hover:bg-zinga-50 flex items-center gap-2">
              <Sparkles size={16} /> AI Kitchen
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;