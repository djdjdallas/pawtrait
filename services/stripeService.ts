import { CanvasSize, ProductType } from "../types";

export const createCheckoutSession = async (order: {
  productType: ProductType;
  size?: CanvasSize;
  imageUrl: string;
  style: string;
  price: number;
}) => {
  try {
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.checkoutUrl) {
      window.location.href = data.checkoutUrl;
    } else {
      throw new Error('No checkout URL returned');
    }
  } catch (error) {
    console.error('Checkout Error:', error);
    throw error;
  }
};
