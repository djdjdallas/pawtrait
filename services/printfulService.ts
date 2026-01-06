// This service runs on the server side (Node.js)
const PRINTFUL_API_URL = 'https://api.printful.com';

// Variant IDs for Printful Canvas (Generic Example IDs - replacing with real ones requires Printful Catalog API lookup)
const VARIANT_MAP = {
  '12x16': 12345, 
  '18x24': 12346,
  '24x36': 12347
};

export const createPrintfulOrder = async (orderData: {
  imageUrl: string;
  size: '12x16' | '18x24' | '24x36';
  shipping: any;
  externalId: string;
}) => {
  if (!process.env.PRINTFUL_API_KEY) {
    throw new Error('PRINTFUL_API_KEY is missing');
  }

  const headers = {
    'Authorization': `Bearer ${process.env.PRINTFUL_API_KEY}`,
    'Content-Type': 'application/json',
    'X-Printful-App': 'PawtraitAtelier'
  };

  try {
    // 1. Create the order directly using an external image URL (Printful can download it)
    // For production, it is safer to upload the file to Printful's library first, 
    // but for this implementation we pass the public URL.
    
    const variantId = VARIANT_MAP[orderData.size];

    const payload = {
      recipient: {
        name: orderData.shipping.name,
        address1: orderData.shipping.address.line1,
        address2: orderData.shipping.address.line2,
        city: orderData.shipping.address.city,
        state_code: orderData.shipping.address.state,
        country_code: orderData.shipping.address.country,
        zip: orderData.shipping.address.postal_code,
      },
      items: [
        {
          variant_id: variantId,
          quantity: 1,
          files: [
            {
              url: orderData.imageUrl,
              // Setup the placement for canvas
              type: 'default', 
              filename: `pawtrait-${orderData.externalId}.jpg`
            }
          ]
        }
      ],
      external_id: orderData.externalId
    };

    const response = await fetch(`${PRINTFUL_API_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Printful API Error: ${JSON.stringify(errorData)}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Printful Order Creation Failed:', error);
    throw error;
  }
};
