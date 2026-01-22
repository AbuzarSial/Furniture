'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/lib/data/products';
import { useCart } from '@/lib/contexts/cart-context';

interface PremiumProductCardProps {
  product: Product;
  index: number;
}

export function PremiumProductCard({
  product,
  index,
}: PremiumProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock || isAdding) return;

    setIsAdding(true);
    
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.images[0],
      price: product.price,
      quantity: 1,
      color: product.colors[0] || undefined,
      size: product.sizes?.[0] || undefined,
    });

    setIsAdded(true);
    setIsAdding(false);

    // Reset the "Added" state after 2 seconds
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-full"
      >
        <Card className="group overflow-hidden h-full card-3d depth-shadow border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <Link href={`/product/${product.id}`}>
            <div className="relative aspect-square overflow-hidden bg-muted">
              <motion.img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {product.originalPrice && (
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', delay: index * 0.1 + 0.3 }}
                >
                  <Badge
                    variant="destructive"
                    className="absolute top-4 right-4 text-sm px-3 py-1"
                  >
                    -{discountPercentage}%
                  </Badge>
                </motion.div>
              )}
              
              {!product.inStock && (
                <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                  <Badge variant="secondary" className="text-base px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
            </div>
          </Link>
          
          <CardContent className="p-6">
            <Link href={`/product/${product.id}`}>
              <motion.h3
                className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors text-lg"
                whileHover={{ x: 3 }}
              >
                {product.name}
              </motion.h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="p-6 pt-0">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full rounded-lg"
                disabled={!product.inStock || isAdding}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Added!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    {isAdding ? 'Adding...' : 'Add to Cart'}
                  </>
                )}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
}
