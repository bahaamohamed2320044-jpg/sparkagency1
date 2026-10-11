import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types/content.ts';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onContactClick?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  const [activeImageTab, setActiveImageTab] = useState<'col2' | 'col1Top' | 'col1Bottom'>('col2');

  if (!project) return null;

  const currentImage =
    activeImageTab === 'col2'
      ? project.images.col2
      : activeImageTab === 'col1Top'
      ? project.images.col1Top
      : project.images.col1Bottom;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative w-full max-w-4xl bg-[#101010] border-2 border-[#D7E2EA]/30 rounded-[36px] sm:rounded-[48px] p-6 sm:p-8 md:p-10 text-[#D7E2EA] shadow-[0_30px_70px_rgba(0,0,0,0.95)] z-10 my-8 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-colors cursor-pointer z-20"
            aria-label="Close project modal"
          >
            <X size={20} />
          </button>

          {/* Modal Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pr-10">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="text-sm font-black text-[#D7E2EA]/60 uppercase tracking-widest">
                  Case Study {project.id}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#FBBF24] border border-[#F59E0B]/30 uppercase tracking-wider font-medium">
                  {project.category}
                </span>
              </div>
              <h2 className="hero-heading text-3xl sm:text-4xl md:text-5xl font-black uppercase">
                {project.name}
              </h2>
            </div>
          </div>

          {/* Large Preview Image */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] overflow-hidden bg-black/50 border border-white/10 aspect-[16/9] mb-4">
            <img
              src={currentImage}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs uppercase tracking-wider border border-white/10 text-white">
                SPARK Creative Portfolio
              </span>
            </div>
          </div>

          {/* Image Thumbnail Selector */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => setActiveImageTab('col2')}
              className={`flex-1 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageTab === 'col2' ? 'border-[#F59E0B] scale-102' : 'border-white/10 opacity-60'
              }`}
            >
              <img
                src={project.images.col2}
                alt="Main thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={() => setActiveImageTab('col1Top')}
              className={`flex-1 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageTab === 'col1Top' ? 'border-[#F59E0B] scale-102' : 'border-white/10 opacity-60'
              }`}
            >
              <img
                src={project.images.col1Top}
                alt="View 1 thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={() => setActiveImageTab('col1Bottom')}
              className={`flex-1 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                activeImageTab === 'col1Bottom' ? 'border-[#F59E0B] scale-102' : 'border-white/10 opacity-60'
              }`}
            >
              <img
                src={project.images.col1Bottom}
                alt="View 2 thumbnail"
                className="w-full h-full object-cover"
              />
            </button>
          </div>

          {/* Details & Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-white/10">
            <div className="md:col-span-2">
              <h4 className="text-xs uppercase tracking-widest text-[#F59E0B] mb-2 font-medium">
                Agency Scope &amp; Creative Execution
              </h4>
              <p className="text-sm sm:text-base font-light text-[#D7E2EA]/90 leading-relaxed">
                {project.description} Delivered with full commercial asset kits, responsive digital layouts, high-impact campaign messaging, and cohesive brand touchpoints.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                  <Sparkles size={12} className="text-amber-400" /> Strategic Direction
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                  <Layers size={12} className="text-yellow-400" /> Multi-Platform Rollout
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/80">
                  <CheckCircle2 size={12} className="text-emerald-400" /> Full Brand Guidelines
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-end gap-3">
              <button
                onClick={() => {
                  onClose();
                  if (onContactClick) onContactClick();
                }}
                style={{
                  background: 'linear-gradient(123deg, #1C1200 0%, #D97706 32%, #F59E0B 62%, #FBBF24 85%, #FEF08A 100%)',
                  boxShadow: '0px 4px 14px rgba(245, 158, 11, 0.35), inset 2px 2px 10px #D97706',
                  outline: '2px solid #FFFFFF',
                  outlineOffset: '-3px',
                }}
                className="w-full py-3.5 rounded-full text-white font-medium uppercase tracking-widest text-xs flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
              >
                <span>Start A Project With SPARK</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
