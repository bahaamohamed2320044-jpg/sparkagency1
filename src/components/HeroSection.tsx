import React from 'react';
import { FadeIn } from './FadeIn.tsx';
import { Magnet } from './Magnet.tsx';
import { SparkLogo } from './SparkLogo.tsx';
import { ContactButton } from './ContactButton.tsx';
import { NavLink } from '../types/content.ts';

interface HeroSectionProps {
  headline?: string;
  subtext?: string;
  contactLabel?: string;
  navLinks?: NavLink[];
  customLogoUrl?: string;
  whatsappUrl?: string;
  onContactClick?: () => void;
  onNavigate?: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline = 'SPARK AGENCY',
  subtext = 'WE TURN BOLD IDEAS INTO POWERFUL BRANDS AND UNFORGETTABLE CAMPAIGNS.',
  contactLabel = "LET'S TALK",
  navLinks,
  customLogoUrl,
  whatsappUrl,
  onContactClick,
  onNavigate,
}) => {
  const defaultNavLinks: NavLink[] = [
    { id: 'about', label: 'About Us', href: '#about' },
    { id: 'services', label: 'Services', href: '#services' },
    { id: 'projects', label: 'Our Work', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const links = navLinks && navLinks.length > 0 ? navLinks : defaultNavLinks;

  const handleNav = (id: string, href: string) => (e: React.MouseEvent) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '') || id;
      if (onNavigate) {
        onNavigate(targetId);
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-clip bg-[#0A0A0A] select-none"
    >
      {/* Navbar */}
      <FadeIn
        delay={0}
        y={-20}
        as="nav"
        className="w-full flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8 z-30"
      >
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={(e) => {
              if (link.id === 'contact' && onContactClick) {
                e.preventDefault();
                onContactClick();
              } else {
                handleNav(link.id, link.href)(e);
              }
            }}
            className="text-[#E2E8F0] font-heading font-medium uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-200 hover:text-[#FFC72C] hover:opacity-100"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>

      {/* Hero Headline: SPARK AGENCY */}
      <div className="w-full overflow-hidden flex justify-center items-center z-0 pt-4 sm:pt-6 md:pt-2 px-4">
        <FadeIn delay={0.15} y={40} className="w-full text-center">
          <h1
            className="hero-heading font-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full select-none"
            style={{ fontSize: 'clamp(2.75rem, 11.2vw, 12.5rem)' }}
          >
            {headline}
          </h1>
        </FadeIn>
      </div>

      {/* Hero SPARK Brand Symbol - Centered 3D Lightning S-Logo */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-[52%] -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-4 md:bottom-6 lg:bottom-8 pointer-events-none sm:pointer-events-auto">
        <FadeIn delay={0.6} y={30} className="w-full flex justify-center">
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="flex items-center justify-center cursor-grab active:cursor-grabbing pointer-events-auto"
          >
            {customLogoUrl ? (
              <img
                src={customLogoUrl}
                alt="SPARK Agency Logo"
                className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[380px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(245,158,11,0.3)]"
              />
            ) : (
              <SparkLogo size="hero" withGlow={true} withFloat={true} />
            )}
          </Magnet>
        </FadeIn>
      </div>

      {/* Bottom bar */}
      <div className="w-full flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-12 z-20">
        {/* Left agency introduction text */}
        <FadeIn delay={0.35} y={20}>
          <p
            className="text-[#94A3B8] font-body font-normal uppercase tracking-wider leading-snug max-w-[200px] sm:max-w-[280px] md:max-w-[340px]"
            style={{ fontSize: 'clamp(0.72rem, 1.1vw, 1.15rem)' }}
          >
            {subtext}
          </p>
        </FadeIn>

        {/* Right Contact button: LET'S TALK with WhatsApp integration */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton
            label={contactLabel}
            href={whatsappUrl}
            onClick={onContactClick}
          />
        </FadeIn>
      </div>
    </section>
  );
};
