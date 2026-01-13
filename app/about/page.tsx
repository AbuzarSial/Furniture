import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Award,
  Heart,
  Leaf,
  Shield,
  Truck,
  Users,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Quality Craftsmanship',
      description:
        'Every piece is meticulously crafted with attention to detail and premium materials.',
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Sustainable Design',
      description:
        'We&apos;re committed to sustainable practices and eco-friendly materials.',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Customer First',
      description:
        'Your satisfaction is our priority. We stand behind every product we sell.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Trusted Brand',
      description:
        'Over a decade of excellence in furniture design and customer service.',
    },
  ];

  const features = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'On orders over $2,000',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Warranty',
      description: 'Comprehensive warranty on all products',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Expert Support',
      description: 'Dedicated customer service team',
    },
    {
      icon: <CheckCircle2 className="h-6 w-6" />,
      title: 'Quality Guarantee',
      description: '100% satisfaction guarantee',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-muted to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              About FURNITURE
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground">
              Crafting premium furniture for modern living spaces since 2010
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-12 sm:py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Founded in 2010, FURNITURE began with a simple mission: to
                    create beautiful, high-quality furniture that transforms
                    living spaces into homes. What started as a small workshop
                    has grown into a trusted brand known for exceptional
                    craftsmanship and timeless design.
                  </p>
                  <p>
                    Our team of skilled artisans and designers work together to
                    bring you furniture that combines form and function. Each
                    piece is carefully selected or designed to meet our rigorous
                    standards for quality, durability, and aesthetic appeal.
                  </p>
                  <p>
                    Today, we&apos;re proud to serve thousands of customers
                    worldwide, helping them create spaces they love. From modern
                    minimalism to classic elegance, we offer furniture that
                    reflects your personal style.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <Award className="h-24 w-24 mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Company Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4 text-primary">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-muted-foreground text-lg">
                What sets us apart in the furniture industry
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-lg border hover:shadow-lg transition-shadow"
                >
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Mission
            </h2>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
              To create exceptional furniture that enhances your living space
              while maintaining our commitment to quality, sustainability, and
              customer satisfaction. We believe that great furniture should be
              accessible, beautiful, and built to last.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Explore our collection of premium furniture and find the perfect
              pieces for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/shop">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
