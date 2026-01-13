export type CartItem = {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
};

export type Cart = {
  items: CartItem[];
  total: number;
  itemCount: number;
};
