import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GalleryItem } from '../types/content.ts';

interface MarqueeSectionProps {
  customItems?: GalleryItem[];
  onOpenItem?: (item: { url: string; title: string; category: string }) => void;
}

const DEFAULT_GALLERY: GalleryItem[] = [
  { id: '1', url: 'https://motionsites.org/assets/hero-space-voyage-preview-eECLH3Yc.gif', title: 'Cosmic Launch', category: 'Creative Direction' },
  { id: '2', url: 'https://motionsites.org/assets/hero-codenest-preview-Cgppc2qV.gif', title: 'Digital Nest', category: 'Web Experience' },
  { id: '3', url: 'https://motionsites.org/assets/hero-vex-ventures-preview-BczMFIiw.gif', title: 'Vex Ventures', category: 'Brand System' },
  { id: '4', url: 'https://motionsites.org/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif', title: 'Stellar Campaign', category: 'Social Ads' },
  { id: '5', url: 'https://motionsites.org/assets/hero-asme-preview-B_nGDnTP.gif', title: 'Kinetic Poster', category: 'Advertising' },
  { id: '6', url: 'https://motionsites.org/assets/hero-transform-data-preview-Cx5OU29N.gif', title: 'Transform Narrative', category: 'Commercial' },
  { id: '7', url: 'https://motionsites.org/assets/hero-vitara-preview-Cjz2QYyU.gif', title: 'Vitara Identity', category: 'Brand Packaging' },
  { id: '8', url: 'https://motionsites.org/assets/hero-terra-preview-BFjrCr7T.gif', title: 'Terra Motion', category: 'Video Production' },
  { id: '9', url: 'https://motionsites.org/assets/hero-skyelite-preview-DHaZIgUv.gif', title: 'SkyElite Creative', category: 'Digital Campaign' },
  { id: '10', url: 'https://motionsites.org/assets/hero-aethera-preview-DknSlcTa.gif', title: 'Aethera Essence', category: 'Art Direction' },
  { id: '11', url: 'https://motionsites.org/assets/hero-designpro-preview-D8c5_een.gif', title: 'DesignPro Studio', category: 'Brand System' },
  { id: '12', url: 'https://motionsites.org/assets/hero-stellar-ai-preview-D3HL6bw1.gif', title: 'Stellar Horizon', category: 'Motion Graphic' },
  { id: '13', url: 'https://motionsites.org/assets/hero-xportfolio-preview-D4A8maiC.gif', title: 'X-Portfolio', category: 'Digital Showcase' },
  { id: '14', url: 'https://motionsites.org/assets/hero-orbit-web3-preview-BXt4OttD.gif', title: 'Orbit Web3', category: 'Interactive' },
  { id: '15', url: 'https://motionsites.org/assets/hero-nexora-preview-cx5HmUgo.gif', title: 'Nexora Media', category: 'Social Strategy' },
  { id: '16', url: 'https://motionsites.org/assets/hero-evr-ventures-preview-DZxeVFEX.gif', title: 'EVR Dynamics', category: 'Campaign Launch' },
  { id: '17', url: 'https://motionsites.org/assets/hero-planet-orbit-preview-DWAP8Z1P.gif', title: 'Orbital Sphere', category: '3D Commercial' },
  { id: '18', url: 'https://motionsites.org/assets/hero-new-era-preview-CocuDUm9.gif', title: 'New Era Brand', category: 'Identity Design' },
  { id: '19', url: 'https://motionsites.org/assets/hero-wealth-preview-B70idl_u.gif', title: 'Apex Wealth', category: 'Corporate Brand' },
  { id: '20', url: 'https://motionsites.org/assets/hero-luminex-preview-CxOP7ce6.gif', title: 'Luminex Glow', category: 'Visual Lighting' },
  { id: '21', url: 'https://motionsites.org/assets/hero-celestia-preview-0yO3jXO8.gif', title: 'Celestia Brand', category: 'Product Showcase' },
];

export const MarqueeSection: React.FC<MarqueeSectionProps> = ({
  customItems,
  onOpenItem,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [manualOffset, setManualOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = customItems && customItems.length > 0 ? customItems : DEFAULT_GALLERY;

  // Passive page scroll effect
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const calcOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.25;
      setScrollOffset(calcOffset);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Manual navigation handlers
  const stepSize = 432; // card width (420) + gap (12)
  const maxIndex = items.length - 1;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % items.length;
      setManualOffset(-next * stepSize);
      return next;
    });
  }, [items.length, stepSize]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + items.length) % items.length;
      setManualOffset(-next * stepSize);
      return next;
    });
  }, [items.length, stepSize]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Split items into 2 rows and triple for seamless infinite appearance
  const half = Math.ceil(items.length / 2);
  const row1Items = items.slice(0, half);
  const row2Items = items.slice(half);

  const tripledRow1 = [...row1Items, ...row1Items, ...row1Items];
  const tripledRow2 = [...row2Items, ...row2Items, ...row2Items];

  const totalOffsetRow1 = scrollOffset + manualOffset - 200;
  const totalOffsetRow2 = -(scrollOffset - manualOffset - 200);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0A] pt-20 sm:pt-28 md:pt-36 pb-16 overflow-hidden select-none border-t border-b border-white/[0.04]"
      aria-label="Advertising and Campaign Visuals Gallery"
    >
      {/* Gallery Header & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#F59E0B] font-bold mb-1">
            <Sparkles size={14} className="text-[#FFC72C]" />
            <span>Advertising &amp; Campaign Visuals</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white">
            Curated Creative Direction
          </h3>
        </div>

        {/* Manual Arrow Controls */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <div className="text-xs font-mono uppercase tracking-widest text-white/50 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <span className="text-[#FFC72C] font-bold">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>{' '}
            / {String(items.length).padStart(2, '0')}
          </div>

          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous advertising design"
            className="w-11 h-11 rounded-full bg-[#141414] border border-[#F59E0B]/30 hover:border-[#F59E0B] text-white hover:text-[#FFC72C] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next advertising design"
            className="w-11 h-11 rounded-full bg-[#141414] border border-[#F59E0B]/30 hover:border-[#F59E0B] text-white hover:text-[#FFC72C] flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Dual Row Sliding Gallery */}
      <div className="flex flex-col gap-4 w-full">
        {/* Row 1: Rightward glide */}
        <div
          className="flex gap-3 w-max transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${totalOffsetRow1}px)`,
            willChange: 'transform',
          }}
        >
          {tripledRow1.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              onClick={() => onOpenItem && onOpenItem(item)}
              className="relative w-[340px] sm:w-[420px] h-[220px] sm:h-[270px] rounded-2xl overflow-hidden shrink-0 bg-[#141414] border border-white/10 shadow-2xl group cursor-pointer transition-all duration-300 hover:border-[#F59E0B]/50 hover:scale-[1.02]"
            >
              <img
                src={item.url}
                alt={item.title || 'Creative Campaign'}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFC72C]">
                    {item.category}
                  </span>
                  <p className="text-sm font-heading font-bold uppercase text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Leftward glide */}
        <div
          className="flex gap-3 w-max transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(${totalOffsetRow2}px)`,
            willChange: 'transform',
          }}
        >
          {tripledRow2.map((item, idx) => (
            <div
              key={`row2-${idx}`}
              onClick={() => onOpenItem && onOpenItem(item)}
              className="relative w-[340px] sm:w-[420px] h-[220px] sm:h-[270px] rounded-2xl overflow-hidden shrink-0 bg-[#141414] border border-white/10 shadow-2xl group cursor-pointer transition-all duration-300 hover:border-[#F59E0B]/50 hover:scale-[1.02]"
            >
              <img
                src={item.url}
                alt={item.title || 'Digital Experience'}
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFC72C]">
                    {item.category}
                  </span>
                  <p className="text-sm font-heading font-bold uppercase text-white">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
