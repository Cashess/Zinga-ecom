import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getOptimizedImageUrl } from '../utils';
import { Sparkles, ChefHat, Loader2 } from 'lucide-react';
import { fetchProducts } from '../services/productService';
import { Product } from '../types';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        setFeaturedProducts(products.slice(0, 3));
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 via-orange-800/50 to-red-900/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center transform scale-105"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1621316523992-0b0373413cb3?auto=format&fit=crop&w=1920&q=80')` }}
        ></div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg">
            The Soul of Spice
          </h1>
          <p className="text-xl md:text-2xl text-zinga-50 mb-10 font-light drop-shadow-md">
            Experience the warmth, depth, and healing power of premium organic ginger.
            Hand-picked, sun-dried, and grounded to perfection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="px-8 py-4 bg-white text-zinga-900 font-bold rounded-full shadow-lg hover:bg-zinga-50 transition-all transform hover:scale-105">
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-zinga-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinga-600 text-2xl">🌱</div>
            <h3 className="text-xl font-bold mb-2 text-zinga-900">100% Organic</h3>
            <p className="text-zinga-700">Sourced directly from sustainable farms with no additives.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-zinga-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinga-600 text-2xl">🔥</div>
            <h3 className="text-xl font-bold mb-2 text-zinga-900">Potent Flavor</h3>
            <p className="text-zinga-700">Slow-dried to preserve the essential oils and spicy kick.</p>
          </div>
          <div className="p-6">
            <div className="w-16 h-16 bg-zinga-100 rounded-full flex items-center justify-center mx-auto mb-4 text-zinga-600 text-2xl">✨</div>
            <h3 className="text-xl font-bold mb-2 text-zinga-900">Freshly Ground</h3>
            <p className="text-zinga-700">Small batch processing ensures maximum freshness.</p>
          </div>
        </div>
      </section>

      {/* AI Kitchen Promo */}
      <section className="py-20 bg-gradient-to-r from-zinga-900 to-zinga-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <ChefHat size={400} className="text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-left md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinga-700/50 rounded-full text-zinga-100 mb-6 backdrop-blur-sm border border-zinga-600">
                <Sparkles size={16} className="text-yellow-400" />
                <span className="text-sm font-bold uppercase tracking-wider">New Feature</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                Meet Your New <br/>
                <span className="text-zinga-300">AI Personal Chef</span>
              </h2>
              <p className="text-xl text-zinga-100 mb-8 leading-relaxed">
                Unlock the full potential of your spice rack. Tell our AI what ingredients you have, and get instant, custom gourmet recipes featuring Zinga Ginger.
              </p>
              <Link to="/recipes" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinga-900 font-bold rounded-full shadow-lg hover:bg-zinga-50 transition-all transform hover:scale-105">
                <ChefHat size={20} /> Visit AI Kitchen
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
               <div className="relative">
                 <div className="absolute inset-0 bg-zinga-500 blur-[100px] opacity-20"></div>
                 <img 
                   src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80" 
                   alt="Cooking with Ginger" 
                   className="relative rounded-2xl shadow-2xl border-4 border-zinga-700/50 rotate-3 hover:rotate-0 transition-transform duration-500 max-w-sm w-full"
                 />
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-zinga-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-zinga-900 mb-4">Our Curated Selection</h2>
            <div className="w-24 h-1 bg-zinga-400 mx-auto"></div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin text-zinga-600" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <div className="h-64 overflow-hidden relative group">
                    <img 
                      src={getOptimizedImageUrl(product.image, 600)} 
                      alt={product.name} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-zinga-700 uppercase tracking-wide">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-xl font-bold text-zinga-900 mb-2 hover:text-zinga-600 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-zinga-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-2xl font-serif text-zinga-800">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="px-4 py-2 bg-zinga-600 text-white rounded-lg hover:bg-zinga-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link to="/products" className="inline-flex items-center text-zinga-700 font-bold hover:text-zinga-900 transition-colors border-b-2 border-zinga-200 hover:border-zinga-600 pb-1">
              View All Products <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;