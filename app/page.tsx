'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PremiumHero } from '@/components/premium-hero';
import { PremiumCategoryCard } from '@/components/premium-category-card';
import { PremiumProductCard } from '@/components/premium-product-card';
import { ParallaxSection } from '@/components/parallax-section';
import { TestimonialCard } from '@/components/testimonial-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedProducts, categories } from '@/lib/data/products';
import { testimonials } from '@/lib/data/testimonials';
import { ArrowRight, Award, Truck, Shield, Heart, Users, Star, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const featuredProducts = getFeaturedProducts();

  const categoryImages: Record<string, string> = {
    beds: 'https://images.unsplash.com/photo-1631889993954-3b055f8e47e0?w=600&h=400&fit=crop',
    sofas: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
    tables: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    wardrobes: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
  };

  const stats = [
    { label: 'Happy Customers', value: '50K+', icon: Users },
    { label: 'Products Sold', value: '200K+', icon: CheckCircle2 },
    { label: '5 Star Reviews', value: '98%', icon: Star },
    { label: 'Years Experience', value: '15+', icon: Award },
  ];

  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Shipping',
      description: 'Complimentary shipping on orders over $2000',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: '5-Year Warranty',
      description: 'Extended warranty on all premium furniture',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Quality Guaranteed',
      description: 'Premium materials and expert craftsmanship',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Expert Support',
      description: '24/7 customer service and design consultation',
    },
  ];

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Premium Hero Section */}
      <PremiumHero />

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-background border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section with 3D Cards */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating-delayed" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of premium furniture, each piece
              crafted with exceptional attention to detail
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 perspective-3d">
            {categories.map((category, index) => (
              <PremiumCategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                icon={category.icon}
                image={categoryImages[category.id] || categoryImages.tables}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto">
              Experience the difference with our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="h-full p-6 sm:p-8 text-center rounded-2xl depth-shadow-sm border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
                  <CardContent className="p-0 flex flex-col items-center">
                    <div className="mb-4 text-primary">{feature.icon}</div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-muted/5 to-background relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-delayed" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 sm:mb-16 gap-6"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Featured Products
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl">
                Handpicked selections from our premium collection
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block"
            >
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6">
                <Link href="/shop">
                  View All
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {featuredProducts.map((product, index) => (
              <PremiumProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center md:hidden"
          >
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6">
              <Link href="/shop">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Parallax Promo Section */}
      <ParallaxSection />

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl floating" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl floating-delayed" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Trusted by thousands of satisfied customers worldwide
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="h-full"
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
