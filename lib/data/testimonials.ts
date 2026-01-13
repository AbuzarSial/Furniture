export type Testimonial = {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  comment: string;
};

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Interior Designer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'The quality of furniture here is exceptional. My clients are always impressed with the pieces I source from this store.',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Homeowner',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'We furnished our entire home with pieces from here. The modern designs and premium materials exceeded our expectations.',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Architect',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'As an architect, I appreciate the attention to detail and craftsmanship. These pieces are true works of art.',
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'The customer service is outstanding, and the furniture quality is unmatched. Highly recommend!',
  },
];
