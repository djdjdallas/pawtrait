// This file is intended to run in a Node.js serverless environment
import Stripe from 'stripe';
import { createPrintfulOrder } from '../services/printfulService'; // Importing the backend service utility

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
});

// You need to configure this in your Stripe Dashboard to get the secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    // Note: In a real Next.js/Express app, you need the raw body buffer here
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret!);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Check metadata to see if fulfillment is needed
    const { productType, imageUrl, size } = session.metadata || {};

    if (productType === 'canvas' && imageUrl && size) {
      try {
        console.log(`Creating Printful order for session ${session.id}`);
        
        await createPrintfulOrder({
          imageUrl: imageUrl,
          size: size as '12x16' | '18x24' | '24x36',
          shipping: session.shipping_details,
          externalId: session.id,
        });

        console.log('Printful order created successfully');
      } catch (error) {
        console.error('Failed to create Printful order:', error);
        // In production, you might want to alert via email or Slack here
      }
    } else {
        // Handle Digital Download logic (e.g., email the high-res link)
        console.log(`Processing digital order for session ${session.id}`);
    }
  }

  res.status(200).json({ received: true });
}
