import React from 'react';
import { FadeIn } from './FadeIn.tsx';
import { AnimatedText } from './AnimatedText.tsx';
import { ContactButton } from './ContactButton.tsx';

interface AboutSectionProps {
  heading?: string;
  text?: string;
  contactLabel?: string;
  whatsappUrl?: string;
  onContactClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  heading = 'ABOUT SPARK',
  text = 'SPARK is a full-service advertising agency built around bold ideas, strategic thinking, and creative execution. We help businesses build stronger brands, create meaningful connections with their audiences, and turn marketing ideas into impactful campaigns.',
  contactLabel = "LET'S TALK",
  whatsappUrl,
  onContactClick,
}) => {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#0A0A0A] px-5 sm:px-8 md:px-10 py-20 overflow-hidden select-none"
    >
      {/* 4 Subtle Agency-Appropriate Decorative Accents */}

      {/* Top-left: Minimalist Geometric Brand Shard */}
      <div className="absolute top-[6%] left-[2%] sm:left-[3%] md:left-[5%] pointer-events-none z-10 opacity-70">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <div className="relative w-[110px] sm:w-[150px] md:w-[180px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-[0_10px_25px_rgba(245,158,11,0.2)]">
              <polygon points="60,10 105,90 15,90" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.4" fill="rgba(245,158,11,0.03)" />
              <polygon points="60,25 95,85 25,85" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.6" fill="rgba(251,191,36,0.05)" />
              <circle cx="60" cy="55" r="4" fill="#FFFFFF" opacity="0.8" />
              <line x1="60" y1="25" x2="60" y2="85" stroke="#F59E0B" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="3 3" />
            </svg>
          </div>
        </FadeIn>
      </div>

      {/* Top-right: Sleek Campaign Spark Prism */}
      <div className="absolute top-[6%] right-[2%] sm:right-[3%] md:right-[5%] pointer-events-none z-10 opacity-70">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <div className="relative w-[110px] sm:w-[150px] md:w-[180px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-[0_10px_25px_rgba(245,158,11,0.2)]">
              <polygon points="60,15 105,60 60,105 15,60" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.45" fill="rgba(245,158,11,0.04)" />
              <line x1="15" y1="60" x2="105" y2="60" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.3" />
              <line x1="60" y1="15" x2="60" y2="105" stroke="#FBBF24" strokeWidth="1" strokeOpacity="0.3" />
              <path d="M 64 35 L 54 58 L 68 58 L 56 85" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
            </svg>
          </div>
        </FadeIn>
      </div>

      {/* Bottom-left: Abstract Strategic Wireframe Cube */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[8%] pointer-events-none z-10 opacity-60">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <div className="relative w-[90px] sm:w-[130px] md:w-[160px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <polygon points="60,20 100,42 60,65 20,42" stroke="#D7E2EA" strokeWidth="1.2" strokeOpacity="0.4" fill="rgba(215,226,234,0.02)" />
              <polygon points="20,42 60,65 60,105 20,82" stroke="#F59E0B" strokeWidth="1.2" strokeOpacity="0.35" fill="rgba(245,158,11,0.03)" />
              <polygon points="60,65 100,42 100,82 60,105" stroke="#D7E2EA" strokeWidth="1.2" strokeOpacity="0.3" fill="rgba(215,226,234,0.02)" />
            </svg>
          </div>
        </FadeIn>
      </div>

      {/* Bottom-right: Restrained Dynamic Vector Accent */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[8%] pointer-events-none z-10 opacity-60">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <div className="relative w-[110px] sm:w-[150px] md:w-[180px] aspect-square flex items-center justify-center">
            <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
              <circle cx="60" cy="60" r="45" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="4 4" />
              <polygon points="60,25 90,75 30,75" stroke="#D7E2EA" strokeWidth="1.2" strokeOpacity="0.4" />
              <line x1="60" y1="25" x2="60" y2="75" stroke="#F59E0B" strokeWidth="1.5" strokeOpacity="0.6" />
            </svg>
          </div>
        </FadeIn>
      </div>

      {/* Main Content: Heading, Animated paragraph, Contact Button */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl w-full text-center">
        {/* Heading: ABOUT SPARK */}
        <FadeIn delay={0} y={40} className="w-full">
          <h2
            className="hero-heading font-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 9rem)' }}
          >
            {heading}
          </h2>
        </FadeIn>

        {/* Gap between heading & text */}
        <div className="mt-10 sm:mt-14 md:mt-16 w-full flex justify-center">
          <AnimatedText
            text={text}
            className="text-[#E2E8F0] font-body font-normal text-center leading-relaxed max-w-[640px] px-4"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.35rem)' }}
          />
        </div>

        {/* Gap between text block and button */}
        <div className="mt-16 sm:mt-20 md:mt-24">
          <FadeIn delay={0.2} y={20}>
            <ContactButton
              onClick={onContactClick}
              label={contactLabel}
              href={whatsappUrl}
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
