export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  visible?: boolean;
}

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  description: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  link?: string;
  visible?: boolean;
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: string;
}

export interface SocialLinks {
  linkedin: string;
  instagram: string;
  behance: string;
  twitter: string;
}

export interface WebsiteContent {
  meta: {
    title: string;
    description: string;
  };
  settings: {
    agencyName: string;
    whatsappNumber: string;
    whatsappMessage: string;
    contactButtonLabel: string;
    socials: SocialLinks;
  };
  hero: {
    headline: string;
    subtext: string;
    contactLabel: string;
    navLinks: NavLink[];
    customLogoUrl?: string;
  };
  about: {
    heading: string;
    text: string;
    contactLabel: string;
  };
  servicesHeading: string;
  services: ServiceItem[];
  projectsHeading: string;
  projects: ProjectItem[];
  gallery: {
    heading: string;
    items: GalleryItem[];
  };
  footer: {
    tagline: string;
    copyright: string;
  };
  sectionsVisibility: {
    hero: boolean;
    marquee: boolean;
    about: boolean;
    services: boolean;
    projects: boolean;
  };
}
