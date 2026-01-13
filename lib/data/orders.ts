export type Order = {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: {
    productId: string;
    name: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  shippingAddress: string;
};

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'delivered',
    items: [
      {
        productId: '1',
        name: 'Nordic Modern Bed Frame',
        image: 'https://images.unsplash.com/photo-1631889993954-3b055f8e47e0?w=100&h=100&fit=crop',
        quantity: 1,
        price: 1299,
      },
      {
        productId: '7',
        name: 'Coffee Table with Storage',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop',
        quantity: 1,
        price: 599,
      },
    ],
    total: 1898,
    shippingAddress: '123 Main St, New York, NY 10001',
  },
  {
    id: 'ORD-002',
    date: '2024-02-20',
    status: 'shipped',
    items: [
      {
        productId: '2',
        name: 'Luxury Velvet Sofa',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
        quantity: 1,
        price: 2499,
      },
    ],
    total: 2499,
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
  },
  {
    id: 'ORD-003',
    date: '2024-03-10',
    status: 'processing',
    items: [
      {
        productId: '4',
        name: 'Modern Wardrobe System',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop',
        quantity: 1,
        price: 1899,
      },
    ],
    total: 1899,
    shippingAddress: '789 Pine Rd, Chicago, IL 60601',
  },
];
