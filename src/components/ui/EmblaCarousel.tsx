import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import type { EmblaOptionsType } from 'embla-carousel';

type EmblaCarouselProps = {
  slides: React.ReactNode[];
  options?: EmblaOptionsType;
  autoplayDelayMs?: number;
  className?: string;
};

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
  slides,
  options,
  autoplayDelayMs = 3500,
  className
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center', ...options });
  const timerRef = useRef<number | null>(null);
  const isPointerDownRef = useRef(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const slidesCount = slides.length;

  const play = useCallback(() => {
    if (!emblaApi) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    if (slidesCount <= 1) return;
    timerRef.current = window.setTimeout(() => {
      if (!isPointerDownRef.current) emblaApi.scrollNext();
    }, autoplayDelayMs);
  }, [emblaApi, autoplayDelayMs, slidesCount]);

  const stop = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    play();
    emblaApi.on('pointerDown', () => {
      isPointerDownRef.current = true;
      stop();
    });
    emblaApi.on('pointerUp', () => {
      isPointerDownRef.current = false;
      play();
    });
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      play();
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    const onResize = () => emblaApi.reInit();
    window.addEventListener('resize', onResize);
    return () => {
      stop();
      window.removeEventListener('resize', onResize);
    };
  }, [emblaApi, play, stop]);

  return (
    <div className={`relative ${className || ''}`}>
      <div className="overflow-hidden" ref={emblaRef} style={{ touchAction: 'pan-y' }} aria-roledescription="carousel">
        <div className="flex -mx-3 items-stretch">
          {slides.map((slide, index) => (
            <div className="min-w-0 shrink-0 flex-[0_0_100%] md:flex-[0_0_66%] lg:flex-[0_0_33.333%] px-3" key={index} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${slidesCount}`}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous"
        onClick={() => emblaApi?.scrollPrev()}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors hidden md:flex md:items-center md:justify-center"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button
        aria-label="Next"
        onClick={() => emblaApi?.scrollNext()}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-colors hidden md:flex md:items-center md:justify-center"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
      </button>

      {/* Bullets */}
      <div className="flex items-center justify-center gap-3 mt-6">
        {Array.from({ length: slidesCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-4 h-4 rounded-full transition-colors ${selectedIndex === i ? 'ring-2 ring-white/60 bg-white/0' : 'bg-white/10'} border border-white/30`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;


