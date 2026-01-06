// This file is intended to run in a Node.js serverless environment
import { createPrintfulOrder } from '../services/printfulService';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // Security check: Only allow this from verified sources or admin tokens
  // if (req.headers['x-admin-token'] !== process.env.ADMIN_TOKEN) return res.status(401).end();

  const { imageUrl, size, shippingAddress, orderId } = req.body;

  try {
    const result = await createPrintfulOrder({
      imageUrl,
      size,
      shipping: shippingAddress,
      externalId: orderId
    });

    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
