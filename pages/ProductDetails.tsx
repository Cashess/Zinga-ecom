import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Share2, Facebook, Twitter, Star, Send, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getOptimizedImageUrl } from '../utils';
import { fetchProductById, fetchProducts } from '../services/productService';
import { Product } from '../types';

const PinterestIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-4.917 0-2.57-1.845-4.36-4.479-4.36-3.264 0-5.18 2.447-5.18 4.978 0 .989.38 2.049.855 2.625.094.113.107.213.079.328-.087.36-.282 1.144-.32 1.309-.05.215-.17.26-.393.157-1.464-.68-2.376-2.822-2.376-4.542 0-3.696 2.686-7.087 7.749-7.087 4.067 0 7.229 2.895 7.229 6.772 0 4.043-2.548 7.297-6.085 7.297-1.188 0-2.304-.617-2.686-1.346l-.731 2.783c-.266 1.018-.987 2.29-1.473 3.068.89.262 1.83.403 2.805.403 6.627 0 12-5.365 12-11.987C24.032 5.367 18.654 0 12.017 0z"/>
  </svg>
);

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Reviews State
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', userName: 'Sarah M.', rating: 5, comment: 'Absolutely love the aroma! Made my curry taste authentic.', date: '2 months ago' },
    { id: '2', userName: 'James P.', rating: 4, comment: 'Great quality, but the packaging was a bit hard to open.', date: '1 month ago' }
  ]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadData = async () => {
      setLoading(true);
      if (id) {
        const foundProduct = await fetchProductById(id);
        setProduct(foundProduct);
        
        if (foundProduct) {
          // Fetch all products to find related ones
          const allProducts = await fetchProducts();
          const related = allProducts
            .filter((p) => p.id !== foundProduct.id)
            .sort((a, b) => {
                if (a.category === foundProduct.category && b.category !== foundProduct.category) return -1;
                if (a.category !== foundProduct.category && b.category === foundProduct.category) return 1;
                return 0;
            })
            .slice(0, 3);
          setRelatedProducts(related);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [id]);


  const handleShare = (platform: 'facebook' | 'twitter' | 'pinterest') => {
    if (!product) return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out ${product.name} at Zinga Spice Co.!`);
    const image = encodeURIComponent(product.image);

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'pinterest':
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&media=${image}&description=${text}`;
        break;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: 'Just now'
    };

    setReviews([review, ...reviews]);
    setNewReview({ name: '', rating: 5, comment: '' });
  };

  const renderStars = (rating: number, interactive: boolean = false, setRating?: (r: number) => void) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={interactive ? 24 : 16}
            className={`${
              star <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''} mr-1`}
            onClick={() => interactive && setRating && setRating(star)}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinga-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-zinga-600" size={48} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinga-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-zinga-900 mb-4">Product Not Found</h2>
        <button 
          onClick={() => navigate('/products')} 
          className="flex items-center text-zinga-700 hover:text-zinga-900 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} /> Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinga-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-zinga-700 hover:text-zinga-900 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} /> Back to Shop
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Side */}
            <div className="h-96 md:h-full bg-gray-100 relative">
              <img 
                src={getOptimizedImageUrl(product.image, 1200, 90)} 
                alt={product.name} 
                className="w-full h-full object-cover"
                fetchPriority="high"
              />
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-12 flex flex-col">
              <span className="text-zinga-500 font-bold uppercase tracking-wider text-sm mb-2">{product.category}</span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-zinga-900 mb-6">{product.name}</h1>
              
              <div className="text-3xl font-light text-zinga-700 mb-8">${product.price.toFixed(2)}</div>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="mb-8">
                <h4 className="font-bold text-zinga-900 mb-3">Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="px-3 py-1 bg-zinga-50 text-zinga-700 rounded-full text-sm border border-zinga-100">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto space-y-6">
                <button 
                  onClick={() => addToCart(product)}
                  className="w-full py-4 bg-zinga-600 text-white text-lg font-bold rounded-xl hover:bg-zinga-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                >
                  <ShoppingBag /> Add to Cart
                </button>

                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500 font-medium flex items-center gap-2">
                    <Share2 size={16} /> Share:
                  </span>
                  <button 
                    onClick={() => handleShare('facebook')} 
                    className="p-2 text-gray-500 hover:text-[#1877F2] hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <Facebook size={20} />
                  </button>
                  <button 
                    onClick={() => handleShare('twitter')} 
                    className="p-2 text-gray-500 hover:text-[#1DA1F2] hover:bg-blue-50 rounded-full transition-colors"
                    aria-label="Share on Twitter"
                  >
                    <Twitter size={20} />
                  </button>
                  <button 
                    onClick={() => handleShare('pinterest')} 
                    className="p-2 text-gray-500 hover:text-[#BD081C] hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Share on Pinterest"
                  >
                    <PinterestIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-1 bg-white p-8 rounded-2xl shadow-sm border border-zinga-100 h-fit">
             <h3 className="text-xl font-serif font-bold text-zinga-900 mb-6">Write a Review</h3>
             <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input 
                    type="text" 
                    value={newReview.name}
                    onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinga-400"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {renderStars(newReview.rating, true, (r) => setNewReview({...newReview, rating: r}))}
                    <span className="text-sm text-gray-500 font-medium ml-2">{newReview.rating} / 5</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                  <textarea 
                    value={newReview.comment}
                    onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinga-400 h-24 resize-none"
                    placeholder="Tell us what you think..."
                    required
                  />
                </div>
                <button type="submit" className="w-full py-2 bg-zinga-800 text-white rounded-lg hover:bg-zinga-900 transition-colors flex items-center justify-center gap-2">
                  <Send size={16} /> Submit Review
                </button>
             </form>
          </div>

          <div className="md:col-span-2 space-y-6">
             <h3 className="text-2xl font-serif font-bold text-zinga-900">Customer Reviews</h3>
             {reviews.length === 0 ? (
                <p className="text-gray-500 italic">No reviews yet. Be the first to review!</p>
             ) : (
               <div className="space-y-4">
                 {reviews.map((review) => (
                   <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-zinga-50">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-bold text-zinga-900">{review.userName}</p>
                          <div className="flex mt-1">
                             {renderStars(review.rating)}
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{review.date}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">"{review.comment}"</p>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-zinga-200 pt-12">
            <h2 className="text-2xl font-serif font-bold text-zinga-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <Link to={`/product/${related.id}`} key={related.id} className="group block">
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-zinga-100">
                    <div className="h-56 overflow-hidden relative">
                      <img 
                        src={getOptimizedImageUrl(related.image, 400)} 
                        alt={related.name} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-zinga-500 uppercase font-bold mb-2 tracking-wide">{related.category}</p>
                      <h3 className="font-bold text-lg text-zinga-900 mb-2 group-hover:text-zinga-600 transition-colors line-clamp-1">{related.name}</h3>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-zinga-800 font-serif font-bold text-xl">${related.price.toFixed(2)}</span>
                        <span className="text-sm font-bold text-zinga-600 group-hover:translate-x-1 transition-transform flex items-center">
                          View <ArrowLeft className="rotate-180 ml-1 w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;