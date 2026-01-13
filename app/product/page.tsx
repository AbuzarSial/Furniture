'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProductPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to shop page after a brief moment
    const timer = setTimeout(() => {
      router.push('/shop');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <Card className="border-0 bg-muted/30 depth-shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-primary" />
              </div>
            </motion.div>
            
            <div>
              <h1 className="text-3xl font-bold mb-2">Browse Our Products</h1>
              <p className="text-muted-foreground">
                Redirecting you to our shop page where you can explore all our
                premium furniture collection...
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button asChild size="lg" className="rounded-lg">
                <Link href="/shop" className="flex items-center">
                  Go to Shop
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
