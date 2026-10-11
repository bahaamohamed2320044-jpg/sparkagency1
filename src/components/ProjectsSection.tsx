import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from './FadeIn.tsx';
import { LiveProjectButton } from './LiveProjectButton.tsx';
import { ProjectItem } from '../types/content.ts';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onOpenProject?: (project: ProjectItem) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="min-h-[75vh] md:min-h-[85vh] flex items-start justify-center"
    >
      <motion.div
        style={{
          scale,
          top: `calc(4.5rem + ${index * 22}px)`,
        }}
        className="sticky top-20 md:top-28 w-full max-w-6xl rounded-[36px] sm:rounded-[48px] md:rounded-[56px] border-2 border-[#F59E0B]/30 bg-[#0E0E0E] p-4 sm:p-6 md:p-8 origin-top shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden"
      >
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="font-heading font-black text-white/90 leading-none"
              style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-heading font-semibold uppercase tracking-widest text-[#FFC72C]">
                {project.category}
              </span>
              <h3 className="text-lg sm:text-2xl md:text-3xl font-heading font-bold uppercase text-white tracking-wide">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton
            label="View Project"
            onClick={() => onOpenProject && onOpenProject(project)}
            className="self-end sm:self-auto shrink-0"
          />
        </div>

        {/* Bottom row: Two-column image grid */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 w-full">
          {/* Left column (40% width) has 2 stacked images */}
          <div className="w-full md:w-[40%] flex flex-col gap-4 sm:gap-6 shrink-0">
            {/* Col1 image 1 */}
            <div
              className="w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-[#161616] border border-white/10 group cursor-pointer"
              style={{ height: 'clamp(130px, 16vw, 220px)' }}
              onClick={() => onOpenProject && onOpenProject(project)}
            >
              <img
                src={project.images.col1Top}
                alt={`${project.name} creative asset 1`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Col1 image 2 */}
            <div
              className="w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-[#161616] border border-white/10 group cursor-pointer"
              style={{ height: 'clamp(150px, 20vw, 300px)' }}
              onClick={() => onOpenProject && onOpenProject(project)}
            >
              <img
                src={project.images.col1Bottom}
                alt={`${project.name} creative asset 2`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right column (60% width) has 1 tall image */}
          <div
            className="w-full md:w-[60%] rounded-[28px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden bg-[#161616] border border-white/10 group cursor-pointer"
            style={{ minHeight: 'clamp(280px, 38vw, 540px)' }}
            onClick={() => onOpenProject && onOpenProject(project)}
          >
            <img
              src={project.images.col2}
              alt={`${project.name} primary campaign showcase`}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  heading?: string;
  projects?: ProjectItem[];
  onOpenProject?: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  heading = 'SELECTED WORK',
  projects,
  onOpenProject,
}) => {
  const list = projects && projects.length > 0 ? projects.filter((p) => p.visible !== false) : [];

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0A0A0A] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-32 select-none"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading: SELECTED WORK */}
        <FadeIn delay={0} y={40} className="w-full text-center mb-12 sm:mb-16 md:mb-20">
          <h2
            className="hero-heading font-heading font-black uppercase text-center leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.75rem, 10vw, 9rem)' }}
          >
            {heading}
          </h2>
        </FadeIn>

        {/* 5 sticky-stacking project cards */}
        <div className="relative w-full flex flex-col gap-6 md:gap-10 pb-24">
          {list.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              index={index}
              totalCards={list.length}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export type { ProjectItem };
