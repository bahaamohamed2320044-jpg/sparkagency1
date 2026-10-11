import React from 'react';
import { FadeIn } from './FadeIn.tsx';
import { ServiceItem } from '../types/content.ts';

interface ServicesSectionProps {
  heading?: string;
  services?: ServiceItem[];
}

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: '01',
    name: 'BRAND IDENTITY',
    description:
      'Building distinctive brand identities through strategic positioning, logo design, visual systems, and consistent brand communication.',
    visible: true,
  },
  {
    id: '02',
    name: 'SOCIAL MEDIA & CONTENT',
    description:
      'Creating compelling social media content, creative campaigns, and platform-ready designs that strengthen brand presence and audience engagement.',
    visible: true,
  },
  {
    id: '03',
    name: 'CREATIVE ADVERTISING',
    description:
      'Developing attention-grabbing advertising concepts, campaign visuals, promotional materials, and creative direction that make brands stand out.',
    visible: true,
  },
  {
    id: '04',
    name: 'DIGITAL MARKETING',
    description:
      'Supporting business growth through marketing strategy, digital campaigns, audience-focused communication, and performance-oriented creative solutions.',
    visible: true,
  },
  {
    id: '05',
    name: 'MOTION & DIGITAL EXPERIENCES',
    description:
      'Bringing ideas to life through motion graphics, commercial video content, website design, and engaging digital experiences.',
    visible: true,
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  heading = 'Services',
  services,
}) => {
  const list = services && services.length > 0 ? services.filter((s) => s.visible !== false) : DEFAULT_SERVICES;

  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none shadow-2xl"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="w-full text-center">
          <h2
            className="text-[#0A0A0A] font-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 9rem)' }}
          >
            {heading}
          </h2>
        </FadeIn>

        {/* Dynamic service items in vertical list */}
        <div className="w-full flex flex-col divide-y divide-[#0A0A0A]/10 border-t border-b border-[#0A0A0A]/10">
          {list.map((service, index) => (
            <FadeIn
              key={service.id || index}
              delay={index * 0.08}
              y={30}
              className="py-8 sm:py-10 md:py-12 transition-colors duration-300 hover:bg-black/[0.02] group"
            >
              <div className="flex flex-row items-baseline sm:items-center justify-between gap-6 sm:gap-10 md:gap-16">
                {/* Number on left */}
                <div
                  className="font-heading font-black text-[#0A0A0A] leading-none shrink-0 tracking-tight group-hover:text-[#D97706] transition-colors"
                  style={{ fontSize: 'clamp(2.5rem, 8vw, 7.5rem)' }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {/* Name + description stacked vertically on right */}
                <div className="flex flex-col flex-1 gap-2 sm:gap-3 text-left">
                  <h3
                    className="font-heading font-bold uppercase text-[#0A0A0A] tracking-tight leading-tight group-hover:text-[#D97706] transition-colors"
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.9rem)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-body font-normal leading-relaxed max-w-2xl text-[#334155]"
                    style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.15rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
