// This file is intended to run in a Node.js serverless environment (e.g., Next.js API route)
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia', // Use latest API version
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const { productType, size, imageUrl, style, price } = req.body;

  try {
    const lineItems = [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: productType === 'canvas' 
              ? `Pawtrait Atelier - ${size}" Canvas (${style})` 
              : `Pawtrait Atelier - Digital Masterpiece (${style})`,
            images: [imageUrl], // Stripe will display this image at checkout
            metadata: {
              productType,
              size: size || 'N/A',
              style,
            },
          },
          unit_amount: price * 100, // Amount in cents
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // Collect shipping address if it's a physical product
      shipping_address_collection: productType === 'canvas' ? {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'EU'], 
      } : undefined,
      metadata: {
        imageUrl, // Important: Store image URL to send to Printful later
        productType,
        size: size || '',
        style,
      },
      success_url: `${req.headers.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}`,
    });

    res.status(200).json({ checkoutUrl: session.url });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ statusCode: 500, message: err.message });
  }
}
