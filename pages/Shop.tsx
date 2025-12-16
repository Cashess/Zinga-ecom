import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getOptimizedImageUrl } from '../utils';
import { fetchProducts } from '../services/productService';
import { Product } from '../types';
import { Loader2 } from 'lucide-react';

const Shop: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-zinga-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinga-900 mb-4">Our Collection</h1>
          <p className="text-xl text-zinga-700 max-w-2xl mx-auto">
            Discover our premium range of organic ginger products, sustainably sourced and crafted for your wellness.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-zinga-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-64 overflow-hidden relative group">
                  <img 
                    src={getOptimizedImageUrl(product.image, 600)} 
                    alt={product.name} 
                    loading="lazy"
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
      </div>
    </div>
  );
};

export default Shop;