// This is a server-side API route (e.g., Next.js API route or Express handler)
// It runs on the server to keep the STRIPE_SECRET_KEY secure.

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Fetch active products with their associated prices
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    const formattedProducts = products.data.map((product) => {
      const price = product.default_price as Stripe.Price;
      
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: price.unit_amount ? price.unit_amount / 100 : 0, // Convert cents to dollars
        image: product.images[0] || '',
        category: product.metadata.category || 'Essentials', // Use metadata or fallback
        ingredients: product.metadata.ingredients 
          ? product.metadata.ingredients.split(',') 
          : ['100% Organic Ginger Root'],
        stripePriceId: price.id,
      };
    });

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Stripe API Error:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
}