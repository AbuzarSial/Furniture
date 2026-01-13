'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export function CategoryCard({ id, name, icon, image }: CategoryCardProps) {
  return (
    <Link href={`/shop?category=${id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer h-full">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <div className="flex items-center text-sm font-medium group-hover:translate-x-2 transition-transform">
              Shop Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
