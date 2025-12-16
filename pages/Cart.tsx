import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getOptimizedImageUrl } from '../utils';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [showClearDialog, setShowClearDialog] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setShowClearDialog(false);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinga-50 px-4">
        <h2 className="text-3xl font-serif font-bold text-zinga-900 mb-4">Your cart is empty</h2>
        <p className="text-zinga-600 mb-8">Looks like you haven't added any spice to your life yet.</p>
        <Link to="/products" className="px-8 py-3 bg-zinga-600 text-white rounded-full font-bold hover:bg-zinga-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinga-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold text-zinga-900">Your Shopping Cart</h1>
          <button 
            onClick={() => setShowClearDialog(true)}
            className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} /> Clear Cart
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          <ul className="divide-y divide-zinga-100">
            {cart.map((item) => (
              <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center">
                <img 
                  src={getOptimizedImageUrl(item.image, 200)} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6" 
                  loading="lazy"
                  decoding="async"
                />
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-zinga-900">{item.name}</h3>
                  <p className="text-zinga-600 text-sm">{item.category}</p>
                  <p className="text-zinga-800 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>

                <div className="flex items-center mt-4 sm:mt-0 gap-4">
                  <div className="flex items-center border border-zinga-200 rounded-lg">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 text-zinga-600 hover:bg-zinga-50"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-bold text-zinga-900">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 text-zinga-600 hover:bg-zinga-50"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
           <div className="text-sm text-zinga-600">
             * Shipping and taxes calculated at checkout
           </div>
           <div className="w-full md:w-96 bg-white p-6 rounded-2xl shadow-sm">
             <div className="flex justify-between mb-2">
               <span className="text-zinga-700">Subtotal</span>
               <span className="font-bold text-zinga-900">${total.toFixed(2)}</span>
             </div>
             <div className="border-t border-zinga-100 my-4"></div>
             <div className="flex justify-between mb-6 text-xl font-bold">
               <span className="text-zinga-900">Total</span>
               <span className="text-zinga-600">${total.toFixed(2)}</span>
             </div>
             <button 
               onClick={() => navigate('/checkout')}
               className="w-full py-3 bg-zinga-600 text-white font-bold rounded-lg hover:bg-zinga-700 transition-colors flex justify-center items-center gap-2"
             >
               Proceed to Checkout <ArrowRight size={18} />
             </button>
           </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showClearDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinga-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full transform transition-all border border-zinga-100">
             <div className="text-center">
               <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-6">
                 <AlertTriangle className="h-8 w-8 text-red-500" />
               </div>
               <h3 className="text-xl font-serif font-bold text-zinga-900 mb-3">Clear Shopping Cart?</h3>
               <p className="text-gray-600 mb-8 leading-relaxed">
                 Are you sure you want to remove all items from your cart? This action cannot be undone.
               </p>
               <div className="flex gap-4">
                 <button
                   onClick={() => setShowClearDialog(false)}
                   className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                 >
                   Cancel
                 </button>
                 <button
                   onClick={handleClearCart}
                   className="flex-1 px-4 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg"
                 >
                   Yes, Clear It
                 </button>
               </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;