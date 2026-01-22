'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/lib/contexts/cart-context';
import { useAuth } from '@/lib/contexts/auth-context';

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();
  const { isAuthenticated } = useAuth();

  const subtotal = getCartTotal();
  const shipping = subtotal > 2000 ? 0 : 99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    // If authenticated, go directly to checkout
    // If not authenticated, redirect to auth page
    if (isAuthenticated) {
      router.push('/checkout');
    } else {
      router.push('/auth?returnUrl=/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
          <h1 className="text-2xl sm:text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Start adding items to your cart to continue shopping.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-8"
      >
        Shopping Cart
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item, index) => (
            <motion.div
              key={`${item.productId}-${item.color}-${item.size}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="rounded-2xl depth-shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Link href={`/product/${item.productId}`}>
                      <div className="relative w-full sm:w-32 h-32 overflow-hidden rounded-lg bg-muted flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link href={`/product/${item.productId}`}>
                            <h3 className="text-lg sm:text-xl font-semibold hover:text-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          {item.color && (
                            <p className="text-sm text-muted-foreground mt-1">
                              Color: {item.color}
                            </p>
                          )}
                          {item.size && (
                            <p className="text-sm text-muted-foreground">
                              Size: {item.size}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.productId)}
                          className="text-destructive hover:text-destructive rounded-full"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity - 1)
                              }
                              className="rounded-full"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <span className="text-lg font-semibold w-12 text-center">
                            {item.quantity}
                          </span>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() =>
                                updateQuantity(item.productId, item.quantity + 1)
                              }
                              className="rounded-full"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg sm:text-xl font-bold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                          {item.quantity > 1 && (
                            <p className="text-sm text-muted-foreground">
                              ${item.price.toLocaleString()} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: cartItems.length * 0.1 + 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="sticky top-24 rounded-2xl depth-shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>
                    {shipping === 0 ? (
                      <Badge variant="outline" className="text-green-600 rounded-full">
                        Free
                      </Badge>
                    ) : (
                      `$${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-lg sm:text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 2000 && (
                <div className="bg-muted/50 p-3 rounded-lg text-sm text-center">
                  <p className="text-muted-foreground">
                    Add <span className="font-semibold">${(2000 - subtotal).toFixed(2)}</span> more for free shipping!
                  </p>
                </div>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full rounded-full text-lg px-8 py-6 depth-shadow-lg"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Proceed to Checkout
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="w-full rounded-full text-lg px-8 py-6 depth-shadow" asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
