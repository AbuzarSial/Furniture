'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Star, ShoppingCart, Heart, Share2, Check, ArrowLeft } from 'lucide-react';
import { getProductById } from '@/lib/data/products';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/lib/contexts/cart-context';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = getProductById(params.id as string);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors[0] || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    product?.sizes?.[0] || ''
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 150,
    damping: 15,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x - 0.5);
      mouseY.set(y - 0.5);
    };

    const currentRef = imageRef.current;
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove);
      return () => {
        currentRef.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [mouseX, mouseY]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/shop" className="flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery with 3D Effect */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div
            ref={imageRef}
            className="relative aspect-square overflow-hidden rounded-2xl bg-muted perspective-3d depth-shadow-lg group cursor-pointer"
          >
            <motion.img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {product.originalPrice && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.3 }}
              >
                <Badge
                  variant="destructive"
                  className="absolute top-6 left-6 text-base px-4 py-2 shadow-lg"
                >
                  -{discountPercentage}%
                </Badge>
              </motion.div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all depth-shadow ${
                    selectedImage === index
                      ? 'border-primary ring-2 ring-primary/50'
                      : 'border-transparent hover:border-muted-foreground/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedImage === index && (
                    <div className="absolute inset-0 bg-primary/10" />
                  )}
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              {product.name}
            </motion.h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{product.rating}</span>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>
              {product.inStock ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-600 text-sm px-3 py-1"
                >
                  <Check className="h-3 w-3 mr-1" />
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive" className="text-sm px-3 py-1">
                  Out of Stock
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-baseline space-x-3 sm:space-x-4 mb-3">
              <span className="text-3xl sm:text-4xl md:text-5xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl sm:text-2xl md:text-3xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <p className="text-base text-muted-foreground">
                You save ${product.originalPrice - product.price} (
                {discountPercentage}%)
              </p>
            )}
          </motion.div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            {product.colors.length > 0 && (
              <div>
                <Label className="text-lg font-semibold mb-3 block">
                  Color: <span className="text-primary">{selectedColor}</span>
                </Label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-3 rounded-lg border-2 font-medium transition-all depth-shadow ${
                        selectedColor === color
                          ? 'border-primary bg-primary/10 shadow-lg'
                          : 'border-border hover:border-primary/50 bg-background'
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <Label className="text-lg font-semibold mb-3 block">
                  Size
                </Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full h-12 text-base rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label className="text-lg font-semibold mb-3 block">
                Quantity
              </Label>
              <div className="flex items-center space-x-4">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                </motion.div>
                <span className="text-2xl font-bold w-16 text-center">
                  {quantity}
                </span>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-12 w-12 rounded-lg"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                className="w-full h-14 text-lg rounded-lg depth-shadow-lg"
                size="lg"
                disabled={!product.inStock || isAdding}
                onClick={() => {
                  if (!product) return;
                  setIsAdding(true);
                  addToCart({
                    productId: product.id,
                    name: product.name,
                    image: product.images[0],
                    price: product.price,
                    quantity: quantity,
                    color: selectedColor || undefined,
                    size: selectedSize || undefined,
                  });
                  setTimeout(() => {
                    setIsAdding(false);
                    router.push('/cart');
                  }, 300);
                }}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAdding ? 'Adding...' : 'Add to Cart'}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="h-14 px-6 rounded-lg">
                <Heart className="h-5 w-5 mr-2" />
                Wishlist
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="h-14 px-6 rounded-lg">
                <Share2 className="h-5 w-5 mr-2" />
                Share
              </Button>
            </motion.div>
          </motion.div>

          <Separator />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-6"
          >
            <Card className="border-0 bg-muted/30 depth-shadow">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Material</h3>
                  <p className="text-muted-foreground">{product.material}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-3">Dimensions</h3>
                  <p className="text-muted-foreground">
                    {product.dimensions.width} × {product.dimensions.height} ×{' '}
                    {product.dimensions.depth} {product.dimensions.unit}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
