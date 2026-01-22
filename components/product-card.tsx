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

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
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

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01, y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 depth-shadow border-0 bg-muted/30">
          <div className="flex flex-col md:flex-row gap-6">
            <Link href={`/product/${product.id}`} className="md:w-80 flex-shrink-0">
              <div className="relative aspect-square overflow-hidden bg-muted rounded-lg">
                <motion.img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                {product.originalPrice && (
                  <Badge
                    variant="destructive"
                    className="absolute top-3 right-3 text-sm px-3 py-1"
                  >
                    -{discountPercentage}%
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
                    <Badge variant="secondary">Out of Stock</Badge>
                  </div>
                )}
              </div>
            </Link>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl font-bold">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
              <Button
                className="w-full md:w-auto hover:scale-105 transition-transform duration-200 rounded-lg"
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
            </div>
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 depth-shadow-lg border-0 bg-muted/30 h-full flex flex-col">
        <Link href={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden bg-muted">
            <motion.img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {product.originalPrice && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <Badge
                  variant="destructive"
                  className="absolute top-3 right-3 text-sm px-3 py-1.5 shadow-lg"
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
          </div>
        </Link>
        <CardContent className="p-5 flex-1 flex flex-col">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 flex-shrink-0">
            {product.description}
          </p>
          <div className="flex items-center space-x-1 mb-3 flex-shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          <div className="flex items-center space-x-2 mb-4 mt-auto">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-5 pt-0">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
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
  );
}
