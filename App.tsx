import React from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Recipes from './pages/Recipes';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <footer className="bg-zinga-900 text-zinga-100 pt-16 pb-8 mt-auto border-t border-zinga-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                
                {/* Brand Column */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold text-white">Zinga Spice Co.</h2>
                  <p className="text-zinga-200 text-sm leading-relaxed">
                    Bringing the warmth of the earth to your kitchen. Premium organic ginger products sourced with care and passion.
                  </p>
                  <div className="flex space-x-4 pt-2">
                    <a href="#" className="text-zinga-300 hover:text-white transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="text-zinga-300 hover:text-white transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="text-zinga-300 hover:text-white transition-colors"><Twitter size={20} /></a>
                    <a href="#" className="text-zinga-300 hover:text-white transition-colors"><Mail size={20} /></a>
                  </div>
                </div>

                {/* Shop Links */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">Shop</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link to="/products" className="text-zinga-200 hover:text-white transition-colors">All Products</Link></li>
                    <li><Link to="/products" className="text-zinga-200 hover:text-white transition-colors">Ginger Powder</Link></li>
                    <li><Link to="/products" className="text-zinga-200 hover:text-white transition-colors">Wellness Blends</Link></li>
                    <li><Link to="/products" className="text-zinga-200 hover:text-white transition-colors">Gift Sets</Link></li>
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">Company</h3>
                  <ul className="space-y-3 text-sm">
                    <li><Link to="/" className="text-zinga-200 hover:text-white transition-colors">Our Story</Link></li>
                    <li><Link to="/" className="text-zinga-200 hover:text-white transition-colors">Sustainability</Link></li>
                    <li><Link to="/recipes" className="text-zinga-200 hover:text-white transition-colors">AI Kitchen</Link></li>
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">Support</h3>
                  <ul className="space-y-3 text-sm">
                    <li><a href="#" className="text-zinga-200 hover:text-white transition-colors">Contact Us</a></li>
                    <li><a href="#" className="text-zinga-200 hover:text-white transition-colors">Shipping Policy</a></li>
                    <li><a href="#" className="text-zinga-200 hover:text-white transition-colors">Returns</a></li>
                    <li><a href="#" className="text-zinga-200 hover:text-white transition-colors">FAQ</a></li>
                  </ul>
                </div>

              </div>

              <div className="border-t border-zinga-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-zinga-400">
                <p>&copy; {new Date().getFullYear()} Zinga Spice Co. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;