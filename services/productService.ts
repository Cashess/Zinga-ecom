import { Product } from '../types';

// MOCK DATA derived from your CSV to ensure the app works in this demo environment
// In a real deployment, the fetchProducts function would hit your backend API.
const MOCK_STRIPE_DATA: Product[] = [
  {
    id: 'prod_Tc88iHqWbl52O7',
    name: "Zinga Ginger Ground - 200g",
    price: 3.00,
    description: "Premium finely ground ginger root in a convenient 200g (7oz) jar. Perfect for trying out our signature spice or for small households.",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80", // Spoon with powder
    category: "Essentials",
    ingredients: ["100% Organic Ginger Root"],
    stripePriceId: "price_1SetsfDWAhEwNqo7XgMaa2RU"
  },
  {
    id: 'prod_Tc8B9WROVdT2cv',
    name: "Zinga Ginger Ground - 500g",
    price: 7.00,
    description: "Our signature ginger powder in a 500g (17.6oz) eco-friendly paper bag. A pantry staple for baking and cooking enthusiasts.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80", // Glass jar
    category: "Essentials",
    ingredients: ["100% Organic Ginger Root"],
    stripePriceId: "price_1SetukDWAhEwNqo7qbiPqXTE"
  },
  {
    id: 'prod_Tc8DlYLdhVR9P8',
    name: "Zinga Ginger Ground - 1000g",
    price: 14.00,
    description: "A substantial 1000g (35.3oz) jar of our aromatic, sun-dried ginger powder. Excellent value for daily wellness routines.",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80", // Fresh roots and powder
    category: "Bulk",
    ingredients: ["100% Organic Ginger Root"],
    stripePriceId: "price_1SetweDWAhEwNqo7hGsI36jN"
  },
  {
    id: 'prod_Tc8EluZFz7iZV4',
    name: "Zinga Ginger Ground - 2000g",
    price: 25.00,
    description: "The ultimate 2000g (70.6oz) supply. The professional choice for maximum flavor, longevity, and savings.",
    image: "https://images.unsplash.com/photo-1635563138905-596784476e48?auto=format&fit=crop&w=800&q=80", // Large scoop/pile
    category: "Bulk",
    ingredients: ["100% Organic Ginger Root"],
    stripePriceId: "price_1Sety4DWAhEwNqo7YQbsAIFX"
  }
];

export const fetchProducts = async (): Promise<Product[]> => {
  // Simulate network delay to demonstrate loading states
  await new Promise(resolve => setTimeout(resolve, 800));

  try {
    // In a real production app with a running backend, you would use this:
    // const response = await fetch('/api/products');
    // if (!response.ok) throw new Error('Failed to fetch products');
    // return await response.json();

    // For this demo environment, return the mock data based on your CSV
    return MOCK_STRIPE_DATA;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  const products = await fetchProducts();
  return products.find(p => p.id === id);
};