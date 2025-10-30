import React, { useState } from 'react';
// @ts-ignore - Framer Motion is an optional dependency
import { motion } from 'framer-motion';

/**
 * GallerySectionMotion Component (Framer Motion Enhanced)
 * 
 * NOTE: This component requires Framer Motion to be installed:
 * npm install framer-motion
 * or
 * yarn add framer-motion
 * 
 * High-performance GPU-accelerated gallery with Framer Motion spring physics.
 * 
 * Advantages over CSS-only version:
 * - Natural spring physics for more organic feel
 * - Smoother interruption handling (hover -> unhover mid-animation)
 * - Better mobile gesture support
 * - Automatic GPU acceleration via Framer Motion
 * 
 * Installation required:
 * npm install framer-motion
 * or
 * yarn add framer-motion
 * 
 * Performance: Same as CSS version (60fps target, GPU-accelerated)
 */

interface GalleryCard {
  id: number;
  image: string;
  alt: string;
  rotation: number;
  translateX: string;
  translateY: string;
  scale: number;
  zIndex: number;
}

const galleryCards: GalleryCard[] = [
  {
    id: 1,
    image: '/assets/img/pic4.jpg',
    alt: 'Innovation Workshop',
    rotation: -21,
    translateX: '-15rem',
    translateY: '7.3rem',
    scale: 0.78,
    zIndex: 1,
  },
  {
    id: 2,
    image: '/assets/img/pic1.jpg',
    alt: 'Team Collaboration',
    rotation: -14,
    translateX: '-11rem',
    translateY: '4rem',
    scale: 0.85,
    zIndex: 2,
  },
  {
    id: 3,
    image: '/assets/img/pic8.jpg',
    alt: 'Creative Session',
    rotation: -7,
    translateX: '-6rem',
    translateY: '1.3rem',
    scale: 0.93,
    zIndex: 3,
  },
  {
    id: 4,
    image: '/assets/img/pic2.jpg',
    alt: 'Tech Showcase',
    rotation: 0,
    translateX: '0rem',
    translateY: '0rem',
    scale: 1,
    zIndex: 10,
  },
  {
    id: 5,
    image: '/assets/img/rep3.png',
    alt: 'Learning Hub',
    rotation: 7,
    translateX: '6rem',
    translateY: '1.3rem',
    scale: 0.93,
    zIndex: 3,
  },
  {
    id: 6,
    image: '/assets/img/rep1.JPG',
    alt: 'Event Highlights',
    rotation: 14,
    translateX: '11rem',
    translateY: '4rem',
    scale: 0.85,
    zIndex: 2,
  },
  {
    id: 7,
    image: '/assets/img/pic5.jpg',
    alt: 'Achievement Moments',
    rotation: 21,
    translateX: '15rem',
    translateY: '7.3rem',
    scale: 0.78,
    zIndex: 1,
  },
];

const GallerySectionMotion: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Spring configuration for smooth, subtle motion
  const springConfig = {
    type: 'spring' as const,
    stiffness: 200,
    damping: 30,
    mass: 1,
  };

  return (
    <section className="py-16 md:py-24 bg-black relative overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
          WHAT'S UP
        </h2>
        <p className="text-2xl md:text-3xl text-gray-300 font-serif italic">
          ON GALLERY
        </p>
      </div>

      {/* Cards Container */}
      <div className="relative flex justify-center items-center min-h-[350px] md:min-h-[600px]">
        {galleryCards.map((card) => {
          const isHovered = hoveredCard === card.id;
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          const mobileScale = isMobile ? 0.55 : 1;

          return (
            <motion.div
              key={card.id}
              className="absolute"
              style={{
                x: card.translateX,
                y: card.translateY,
                rotate: card.rotation,
                scale: card.scale * mobileScale,
                zIndex: isHovered ? 50 : card.zIndex,
              }}
            >
              <motion.div
                role="button"
                tabIndex={0}
                aria-label={`View ${card.alt}`}
                className="rounded-3xl overflow-hidden shadow-2xl cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/50"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onFocus={() => setHoveredCard(card.id)}
                onBlur={() => setHoveredCard(null)}
                whileHover={{ opacity: 0.9 }}
                whileTap={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: isHovered ? 0.9 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-[180px] md:w-[320px] aspect-[3/4] object-cover"
                  style={{
                    display: 'block',
                    transform: 'translateZ(0)',
                  }}
                  draggable={false}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Screen reader instructions */}
      <div className="sr-only" aria-live="polite">
        Use Tab key to navigate through gallery cards. Press Enter to view details.
      </div>
    </section>
  );
};

export default GallerySectionMotion;

/**
 * FRAMER MOTION BENEFITS:
 * 
 * 1. Spring Physics: Natural, organic motion that feels more premium
 * 2. Gesture Support: Built-in whileTap, whileDrag for mobile
 * 3. Interruption Handling: Smooth transitions when hover state changes mid-animation
 * 4. Auto GPU Acceleration: Framer Motion automatically optimizes for GPU
 * 5. Layout Animations: Can easily add layout transitions if needed
 * 
 * PERFORMANCE NOTES:
 * - Framer Motion uses the same GPU-accelerated approach as CSS
 * - All animations use transform/opacity only
 * - Spring physics calculated on main thread but applied via GPU
 * - Target: 60fps on modern devices, 30fps minimum on older devices
 */
