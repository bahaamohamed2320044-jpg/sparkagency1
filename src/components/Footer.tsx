import React from 'react';
import { ArrowUp, MessageCircle, Lock } from 'lucide-react';
import { SparkLogo } from './SparkLogo.tsx';
import { SocialLinks } from '../types/content.ts';

interface FooterProps {
  onContactClick?: () => void;
  onOpenAdmin?: () => void;
  socials?: SocialLinks;
  copyright?: string;
  tagline?: string;
  whatsappUrl?: string;
}

export const Footer: React.FC<FooterProps> = ({
  onContactClick,
  onOpenAdmin,
  socials,
  copyright = '© 2026 SPARK Agency. All rights reserved.',
  tagline = 'BOLD IDEAS • POWERFUL BRANDS • UNFORGETTABLE CAMPAIGNS',
  whatsappUrl = 'https://wa.me/201558082474?text=Hello%20SPARK%20Agency!%20I%27d%20like%20to%20discuss%20a%20project.',
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const defaultSocials: SocialLinks = {
    linkedin: 'https://linkedin.com',
    instagram: 'https://instagram.com',
    behance: 'https://behance.net',
    twitter: 'https://x.com',
  };

  const activeSocials = socials || defaultSocials;

  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-white/10 px-6 md:px-12 py-14 select-none text-[#E2E8F0]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand with S-Lightning symbol */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-12 flex items-center justify-center">
            <SparkLogo size="sm" withGlow={false} withFloat={false} />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="hero-heading font-heading text-2xl font-black uppercase tracking-tight">
              SPARK Agency
            </span>
            <p className="text-xs font-body font-light text-[#94A3B8] uppercase tracking-wider">
              Creative Advertising &bull; Branding &bull; Digital Campaigns
            </p>
          </div>
        </div>

        {/* Agency Social Links & WhatsApp */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest font-heading font-semibold">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25D366] hover:text-[#4ade80] transition-colors"
          >
            <MessageCircle size={15} />
            <span>WhatsApp</span>
          </a>
          <a
            href={activeSocials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFC72C] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={activeSocials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFC72C] transition-colors"
          >
            Instagram
          </a>
          <a
            href={activeSocials.behance}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFC72C] transition-colors"
          >
            Behance
          </a>
          <a
            href={activeSocials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#FFC72C] transition-colors"
          >
            X / Twitter
          </a>
        </div>

        {/* Back to top */}
        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-2 text-xs font-heading uppercase tracking-widest font-semibold px-4 py-2 rounded-full border border-white/10 hover:border-[#F59E0B]/50 hover:bg-white/5 transition-all cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp size={14} className="text-[#FFC72C]" />
        </button>
      </div>

      {/* Sub-footer with Tagline, Copyright, and discreet Admin link */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748B] gap-4">
        <p>{copyright}</p>
        <p className="uppercase tracking-wider text-[#F59E0B]/80 font-heading font-medium">
          {tagline}
        </p>

        {/* Discreet Admin Link */}
        <button
          type="button"
          onClick={onOpenAdmin}
          className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono tracking-wider text-[#475569] hover:text-[#F59E0B] transition-colors cursor-pointer py-1 px-2 rounded hover:bg-white/5"
          title="Content Management Dashboard 2026"
        >
          <Lock size={10} />
          <span>Admin &bull; 2026</span>
        </button>
      </div>
    </footer>
  );
};
