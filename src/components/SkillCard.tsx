import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SkillCardProps {
  id: string;
  title: string;
  provider: string;
  avatar?: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  price?: string;
  description: string;
  image?: string;
}

export const SkillCard: React.FC<SkillCardProps> = ({
  title,
  provider,
  avatar,
  category,
  rating,
  reviews,
  location,
  price,
  description,
  image,
}) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:border-primary hover:shadow-glow"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-card">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-primary opacity-20">
            <span className="text-6xl font-bold">{title[0]}</span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="mb-2 text-xl font-bold line-clamp-1">{title}</h3>

        {/* Provider Info */}
        <div className="mb-3 flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold">
            {avatar || provider[0]}
          </div>
          <span className="text-sm text-muted-foreground">{provider}</span>
        </div>

        {/* Description */}
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{description}</p>

        {/* Rating & Location */}
        <div className="mb-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews})</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          {price && (
            <div className="text-lg font-bold text-primary">{price}</div>
          )}
          <Button variant="default" size="sm" className="ml-auto">
            View Details
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
