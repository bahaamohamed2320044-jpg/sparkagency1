import { WebsiteContent } from '../types/content.ts';

export const DEFAULT_CONTENT: WebsiteContent = {
  meta: {
    title: 'SPARK Agency — Creative Advertising & Branding',
    description:
      'SPARK is a full-service creative advertising and marketing agency specializing in brand identity, social media campaigns, advertising design, and digital experiences.',
  },
  settings: {
    agencyName: 'SPARK Agency',
    whatsappNumber: '201558082474',
    whatsappMessage: "Hello SPARK Agency! I'd like to discuss a project.",
    contactButtonLabel: "LET'S TALK",
    socials: {
      linkedin: 'https://linkedin.com',
      instagram: 'https://instagram.com',
      behance: 'https://behance.net',
      twitter: 'https://x.com',
    },
  },
  hero: {
    headline: 'SPARK AGENCY',
    subtext: 'WE TURN BOLD IDEAS INTO POWERFUL BRANDS AND UNFORGETTABLE CAMPAIGNS.',
    contactLabel: "LET'S TALK",
    navLinks: [
      { id: 'about', label: 'About Us', href: '#about' },
      { id: 'services', label: 'Services', href: '#services' },
      { id: 'projects', label: 'Our Work', href: '#projects' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ],
    customLogoUrl: '',
  },
  about: {
    heading: 'ABOUT SPARK',
    text:
      'SPARK is a full-service advertising agency built around bold ideas, strategic thinking, and creative execution. We help businesses build stronger brands, create meaningful connections with their audiences, and turn marketing ideas into impactful campaigns.',
    contactLabel: "LET'S TALK",
  },
  servicesHeading: 'Services',
  services: [
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
  ],
  projectsHeading: 'SELECTED WORK',
  projects: [
    {
      id: '01',
      name: 'BRAND IDENTITY',
      category: 'Visual Identity & Systems',
      description:
        'Logo design, brand systems, visual identity, stationery, and branding applications engineered for an international luxury brand.',
      images: {
        col1Top:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
        col1Bottom:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
        col2:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
      },
      link: '',
      visible: true,
    },
    {
      id: '02',
      name: 'SOCIAL MEDIA CAMPAIGNS',
      category: 'Social Campaigns & Content',
      description:
        'Social media creatives, campaign layouts, promotional artwork, and platform-native content design built for maximum viral reach.',
      images: {
        col1Top:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
        col1Bottom:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
        col2:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
      },
      link: '',
      visible: true,
    },
    {
      id: '03',
      name: 'CREATIVE ADVERTISING',
      category: 'Commercial Visuals & Posters',
      description:
        'Advertising posters, promotional campaigns, commercial visuals, and high-impact creative concepts that redefine market expectations.',
      images: {
        col1Top:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
        col1Bottom:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
        col2:
          'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
      },
      link: '',
      visible: true,
    },
    {
      id: '04',
      name: 'MOTION & VIDEO',
      category: 'Motion Graphics & Commercial Video',
      description:
        'Dynamic motion graphics, animated advertising, video campaigns, and cinematic commercial content that grab audience attention.',
      images: {
        col1Top:
          'https://motionsites.org/assets/hero-space-voyage-preview-eECLH3Yc.gif',
        col1Bottom:
          'https://motionsites.org/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
        col2:
          'https://motionsites.org/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
      },
      link: '',
      visible: true,
    },
    {
      id: '05',
      name: 'DIGITAL EXPERIENCES',
      category: 'Web Design & Interactive Campaigns',
      description:
        'Bespoke website design, high-converting landing pages, digital campaigns, and interactive brand experiences that convert visitors.',
      images: {
        col1Top:
          'https://motionsites.org/assets/hero-codenest-preview-Cgppc2qV.gif',
        col1Bottom:
          'https://motionsites.org/assets/hero-orbit-web3-preview-BXt4OttD.gif',
        col2:
          'https://motionsites.org/assets/hero-celestia-preview-0yO3jXO8.gif',
      },
      link: '',
      visible: true,
    },
  ],
  gallery: {
    heading: 'ADVERTISING & CAMPAIGN VISUALS',
    items: [
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
    ],
  },
  footer: {
    tagline: 'BOLD IDEAS • POWERFUL BRANDS • UNFORGETTABLE CAMPAIGNS',
    copyright: '© 2026 SPARK Agency. All rights reserved.',
  },
  sectionsVisibility: {
    hero: true,
    marquee: true,
    about: true,
    services: true,
    projects: true,
  },
};
