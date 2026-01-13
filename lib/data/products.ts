export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: 'beds' | 'sofas' | 'tables' | 'wardrobes';
  material: string;
  dimensions: {
    width: number;
    height: number;
    depth: number;
    unit: 'cm' | 'inches';
  };
  colors: string[];
  sizes?: string[];
  images: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Nordic Modern Bed Frame',
    description: 'A sleek, minimalist bed frame crafted from premium oak wood. Features a low-profile design that complements any modern bedroom aesthetic.',
    price: 1299,
    originalPrice: 1599,
    category: 'beds',
    material: 'Solid Oak Wood',
    dimensions: {
      width: 200,
      height: 110,
      depth: 220,
      unit: 'cm'
    },
    colors: ['Natural Oak', 'Dark Walnut', 'White Oak'],
    sizes: ['Queen', 'King', 'Super King'],
    images: [
      'https://images.unsplash.com/photo-1631889993954-3b055f8e47e0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    ],
    rating: 4.8,
    reviews: 234,
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Luxury Velvet Sofa',
    description: 'Experience ultimate comfort with this premium velvet sofa. Handcrafted with high-density foam and elegant brass legs.',
    price: 2499,
    originalPrice: 2999,
    category: 'sofas',
    material: 'Premium Velvet, Solid Wood',
    dimensions: {
      width: 240,
      height: 90,
      depth: 100,
      unit: 'cm'
    },
    colors: ['Emerald Green', 'Navy Blue', 'Charcoal Gray', 'Blush Pink'],
    sizes: ['3-Seater', '2-Seater', 'Corner'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.9,
    reviews: 412,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Scandinavian Dining Table',
    description: 'A beautiful dining table that seats 6-8 people. Made from sustainably sourced pine with a natural oil finish.',
    price: 899,
    originalPrice: 1199,
    category: 'tables',
    material: 'Solid Pine Wood',
    dimensions: {
      width: 220,
      height: 75,
      depth: 100,
      unit: 'cm'
    },
    colors: ['Natural Pine', 'White Wash', 'Dark Oak'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.7,
    reviews: 189,
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Modern Wardrobe System',
    description: 'A spacious wardrobe with sliding doors and interior organization. Perfect for maximizing bedroom storage.',
    price: 1899,
    originalPrice: 2299,
    category: 'wardrobes',
    material: 'Engineered Wood, Metal',
    dimensions: {
      width: 200,
      height: 240,
      depth: 60,
      unit: 'cm'
    },
    colors: ['White', 'Oak Veneer', 'Black'],
    sizes: ['Single', 'Double', 'Triple'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Minimalist Platform Bed',
    description: 'Clean lines and hidden storage make this platform bed both stylish and functional.',
    price: 1099,
    category: 'beds',
    material: 'Engineered Wood',
    dimensions: {
      width: 200,
      height: 45,
      depth: 220,
      unit: 'cm'
    },
    colors: ['White', 'Black', 'Walnut'],
    sizes: ['Queen', 'King'],
    images: [
      'https://images.unsplash.com/photo-1631889993954-3b055f8e47e0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    ],
    rating: 4.5,
    reviews: 98,
    inStock: true,
  },
  {
    id: '6',
    name: 'Sectional Sofa Set',
    description: 'Modular sectional that adapts to your space. Premium fabric and deep cushions for maximum comfort.',
    price: 3299,
    originalPrice: 3999,
    category: 'sofas',
    material: 'Premium Fabric, Hardwood',
    dimensions: {
      width: 320,
      height: 85,
      depth: 120,
      unit: 'cm'
    },
    colors: ['Beige', 'Gray', 'Navy'],
    sizes: ['3+2', '4+2', '5+2'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.8,
    reviews: 267,
    inStock: true,
  },
  {
    id: '7',
    name: 'Coffee Table with Storage',
    description: 'Elegant coffee table with hidden storage compartment. Perfect for keeping your living room organized.',
    price: 599,
    originalPrice: 799,
    category: 'tables',
    material: 'Solid Wood, Glass',
    dimensions: {
      width: 120,
      height: 45,
      depth: 60,
      unit: 'cm'
    },
    colors: ['Oak', 'Walnut', 'Black'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.4,
    reviews: 143,
    inStock: true,
  },
  {
    id: '8',
    name: 'Walk-in Wardrobe',
    description: 'Customizable walk-in wardrobe system with adjustable shelves, drawers, and hanging space.',
    price: 3499,
    originalPrice: 4299,
    category: 'wardrobes',
    material: 'Engineered Wood, Metal',
    dimensions: {
      width: 300,
      height: 250,
      depth: 80,
      unit: 'cm'
    },
    colors: ['White', 'Oak', 'Gray'],
    sizes: ['Standard', 'Large', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
  {
    id: '9',
    name: 'Canopy Bed Frame',
    description: 'Romantic canopy bed with elegant fabric drapes. Creates a luxurious focal point in any bedroom.',
    price: 1899,
    category: 'beds',
    material: 'Solid Wood, Fabric',
    dimensions: {
      width: 200,
      height: 220,
      depth: 220,
      unit: 'cm'
    },
    colors: ['White', 'Ivory', 'Gray'],
    sizes: ['Queen', 'King'],
    images: [
      'https://images.unsplash.com/photo-1631889993954-3b055f8e47e0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    ],
    rating: 4.7,
    reviews: 76,
    inStock: true,
  },
  {
    id: '10',
    name: 'Leather Recliner Sofa',
    description: 'Premium Italian leather recliner with power mechanism. Ultimate comfort meets sophisticated design.',
    price: 2799,
    originalPrice: 3499,
    category: 'sofas',
    material: 'Italian Leather, Hardwood',
    dimensions: {
      width: 100,
      height: 95,
      depth: 110,
      unit: 'cm'
    },
    colors: ['Brown', 'Black', 'Cognac'],
    sizes: ['Single', 'Double'],
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.9,
    reviews: 201,
    inStock: true,
  },
  {
    id: '11',
    name: 'Extendable Dining Table',
    description: 'Versatile dining table that extends to accommodate 8-12 guests. Perfect for entertaining.',
    price: 1299,
    originalPrice: 1699,
    category: 'tables',
    material: 'Solid Oak',
    dimensions: {
      width: 180,
      height: 75,
      depth: 90,
      unit: 'cm'
    },
    colors: ['Natural Oak', 'Dark Oak'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.6,
    reviews: 124,
    inStock: true,
  },
  {
    id: '12',
    name: 'Sliding Door Wardrobe',
    description: 'Space-saving wardrobe with smooth sliding doors. Modern design with ample storage space.',
    price: 1499,
    originalPrice: 1899,
    category: 'wardrobes',
    material: 'Engineered Wood, Glass',
    dimensions: {
      width: 180,
      height: 220,
      depth: 55,
      unit: 'cm'
    },
    colors: ['White', 'Oak', 'Black'],
    sizes: ['Single', 'Double'],
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop&q=80',
    ],
    rating: 4.5,
    reviews: 167,
    inStock: true,
  },
];

export const categories = [
  { id: 'beds', name: 'Beds', icon: '🛏️' },
  { id: 'sofas', name: 'Sofas', icon: '🛋️' },
  { id: 'tables', name: 'Tables', icon: '🪑' },
  { id: 'wardrobes', name: 'Wardrobes', icon: '🚪' },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

// Simple typo-tolerant search using Levenshtein-like similarity
const calculateSimilarity = (str1: string, str2: string): number => {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  // Check for exact substring match (highest priority)
  if (longer.includes(shorter)) return 1.0;
  
  // Check for word-by-word matching
  const longerWords = longer.split(/\s+/);
  const shorterWords = shorter.split(/\s+/);
  let wordMatches = 0;
  shorterWords.forEach(word => {
    if (longerWords.some(lw => lw.includes(word) || word.includes(lw))) {
      wordMatches++;
    }
  });
  const wordSimilarity = wordMatches / Math.max(longerWords.length, shorterWords.length);
  
  // Check character similarity (simple approach)
  let matches = 0;
  const shorterLower = shorter.toLowerCase();
  const longerLower = longer.toLowerCase();
  
  for (let i = 0; i < shorterLower.length; i++) {
    if (longerLower.includes(shorterLower[i])) {
      matches++;
    }
  }
  const charSimilarity = matches / shorter.length;
  
  // Combine word and character similarity
  return Math.max(wordSimilarity, charSimilarity * 0.7);
};

export const searchProducts = (query: string): Product[] => {
  if (!query || query.trim().length === 0) return [];
  
  const lowerQuery = query.toLowerCase().trim();
  const queryWords = lowerQuery.split(/\s+/);
  
  // First, try exact matches (highest priority)
  const exactMatches = products.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.material.toLowerCase().includes(lowerQuery)
  );
  
  if (exactMatches.length > 0) {
    return exactMatches;
  }
  
  // If no exact matches, use fuzzy matching
  const scoredProducts = products.map(product => {
    const searchableText = [
      product.name,
      product.description,
      product.category,
      product.material,
    ].join(' ').toLowerCase();
    
    // Check if any query word matches
    let maxSimilarity = 0;
    queryWords.forEach(word => {
      const similarity = calculateSimilarity(searchableText, word);
      maxSimilarity = Math.max(maxSimilarity, similarity);
    });
    
    // Also check full query against full text
    const fullSimilarity = calculateSimilarity(searchableText, lowerQuery);
    maxSimilarity = Math.max(maxSimilarity, fullSimilarity);
    
    return { product, score: maxSimilarity };
  });
  
  // Filter products with similarity above threshold and sort by score
  return scoredProducts
    .filter(item => item.score > 0.3) // 30% similarity threshold
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
};
