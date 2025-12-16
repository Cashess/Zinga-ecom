export interface Product {
  id: string; // Stripe Product ID
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  ingredients: string[];
  stripePriceId: string; // Stripe Price ID
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}