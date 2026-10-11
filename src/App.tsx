/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection.tsx';
import { MarqueeSection } from './components/MarqueeSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { Footer } from './components/Footer.tsx';
import { AdminLogin } from './components/admin/AdminLogin.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { DEFAULT_CONTENT } from './data/defaultContent.ts';
import { WebsiteContent, ProjectItem } from './types/content.ts';
import { api } from './services/api.ts';

export default function App() {
  const [content, setContent] = useState<WebsiteContent>(DEFAULT_CONTENT);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);

  // Load content from server or local draft on initial mount
  useEffect(() => {
    let isMounted = true;
    api.getContent().then(({ content: loadedContent }) => {
      if (isMounted && loadedContent) {
        setContent(loadedContent);
        // Sync document title and description if set
        if (loadedContent.meta?.title) {
          document.title = loadedContent.meta.title;
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  const handleOpenProject = (project: ProjectItem) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open Admin Dashboard or login
  const handleOpenAdmin = () => {
    if (api.isAuthenticated()) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoginOpen(false);
    setIsAdminDashboardOpen(true);
  };

  const handleUpdateContent = (updated: WebsiteContent) => {
    setContent(updated);
    if (updated.meta?.title) {
      document.title = updated.meta.title;
    }
  };

  // Generate dynamic WhatsApp URL
  const cleanNumber = (content.settings.whatsappNumber || '201558082474').replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(
    content.settings.whatsappMessage || "Hello SPARK Agency! I'd like to discuss a project."
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div
      className="min-h-screen bg-[#0A0A0A] text-[#F1F5F9] font-body selection:bg-[#F59E0B] selection:text-black"
      style={{ overflowX: 'clip' }}
    >
      {/* 1. Hero Section: "SPARK AGENCY" with 3D S-Lightning Logo */}
      <HeroSection
        headline={content.hero.headline}
        subtext={content.hero.subtext}
        contactLabel={content.settings.contactButtonLabel}
        navLinks={content.hero.navLinks}
        customLogoUrl={content.hero.customLogoUrl}
        whatsappUrl={whatsappUrl}
        onContactClick={handleOpenContact}
        onNavigate={handleNavigate}
      />

      {/* 2. Marquee Gallery Section: Advertising & Campaign Visuals with manual arrows */}
      <MarqueeSection
        customItems={content.gallery.items}
        onOpenItem={(item) => {
          setSelectedProject({
            id: 'PROMO',
            name: item.title,
            category: item.category,
            description: 'Custom creative advertising design developed for international campaign rollout.',
            images: {
              col1Top: item.url,
              col1Bottom: item.url,
              col2: item.url,
            },
          });
        }}
      />

      {/* 3. About Us Section: "ABOUT SPARK" */}
      <AboutSection
        heading={content.about.heading}
        text={content.about.text}
        contactLabel={content.settings.contactButtonLabel}
        whatsappUrl={whatsappUrl}
        onContactClick={handleOpenContact}
      />

      {/* 4. Services Section: 5 Core Agency Services */}
      <ServicesSection
        heading={content.servicesHeading}
        services={content.services}
      />

      {/* 5. Projects Section: 5 Selected Work Case Studies */}
      <ProjectsSection
        heading={content.projectsHeading}
        projects={content.projects}
        onOpenProject={handleOpenProject}
      />

      {/* 6. Footer with discreet 2026 Admin link */}
      <Footer
        onContactClick={handleOpenContact}
        onOpenAdmin={handleOpenAdmin}
        socials={content.settings.socials}
        copyright={content.footer.copyright}
        tagline={content.footer.tagline}
        whatsappUrl={whatsappUrl}
      />

      {/* Interactive Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={handleCloseContact}
      />

      <ProjectModal
        project={selectedProject}
        onClose={handleCloseProject}
        onContactClick={handleOpenContact}
      />

      {/* Admin Login Modal (Protected Dashboard: 2026 / marketingspark123) */}
      {isAdminLoginOpen && (
        <AdminLogin
          onSuccess={handleLoginSuccess}
          onClose={() => setIsAdminLoginOpen(false)}
        />
      )}

      {/* Full Content Management Dashboard (2026) */}
      {isAdminDashboardOpen && (
        <AdminDashboard
          content={content}
          onUpdateContent={handleUpdateContent}
          onClose={() => setIsAdminDashboardOpen(false)}
          onLogout={() => setIsAdminDashboardOpen(false)}
        />
      )}
    </div>
  );
}
