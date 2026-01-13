'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface PremiumCategoryCardProps {
  id: string;
  name: string;
  icon: string;
  image: string;
  index: number;
}

export function PremiumCategoryCard({
  id,
  name,
  icon,
  image,
  index,
}: PremiumCategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/shop?category=${id}`}>
        <motion.div
          whileHover={{ y: -12, rotateX: 5, rotateY: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="perspective-3d h-full"
        >
          <Card className="group overflow-hidden h-full card-3d depth-shadow-lg border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-500" />
              
              {/* Floating Icon */}
              <motion.div
                className="absolute top-6 left-6 text-5xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.3 }}
              >
                {icon}
              </motion.div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h3
                  className="text-3xl font-bold mb-3"
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {name}
                </motion.h3>
                <motion.div
                  className="flex items-center text-sm font-medium opacity-90"
                  whileHover={{ x: 8 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4" />
                </motion.div>
              </div>

              {/* 3D Shadow Effect */}
              <div className="absolute -inset-1 bg-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}
