import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Settings,
  Save,
  RotateCcw,
  LogOut,
  X,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { WebsiteContent, ProjectItem, ServiceItem } from '../../types/content.ts';
import { api } from '../../services/api.ts';
import { SparkLogo } from '../SparkLogo.tsx';

interface AdminDashboardProps {
  content: WebsiteContent;
  onUpdateContent: (updated: WebsiteContent) => void;
  onClose: () => void;
  onLogout: () => void;
}

type TabType = 'overview' | 'content' | 'projects' | 'services' | 'gallery' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  content,
  onUpdateContent,
  onClose,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [draft, setDraft] = useState<WebsiteContent>(JSON.parse(JSON.stringify(content)));
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ message: string; isError?: boolean } | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Handle saving content permanently
  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);
    try {
      const res = await api.saveContent(draft);
      if (res.success) {
        onUpdateContent(draft);
        setSaveStatus({
          message: res.isServerSaved
            ? 'Published successfully to server & persistent storage!'
            : 'Saved to local storage draft.',
        });
      } else {
        setSaveStatus({ message: res.error || 'Failed to save changes.', isError: true });
      }
    } catch {
      setSaveStatus({ message: 'Error saving content to backend.', isError: true });
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveStatus(null), 4000);
    }
  };

  // Reset to default content
  const handleReset = async () => {
    if (window.confirm('Are you sure you want to revert all changes to default SPARK Agency content?')) {
      const defaultData = await api.resetToDefaults();
      setDraft(JSON.parse(JSON.stringify(defaultData)));
      onUpdateContent(defaultData);
      setSaveStatus({ message: 'Reset to default agency content successfully.' });
      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  // Image upload helper
  const handleFileUpload = async (file: File, callback: (url: string) => void) => {
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.url) {
        callback(res.url);
      } else {
        // Fallback: convert file to local object URL
        const localUrl = URL.createObjectURL(file);
        callback(localUrl);
      }
    } catch {
      const localUrl = URL.createObjectURL(file);
      callback(localUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-[#0A0A0A] text-[#F1F5F9] font-body overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 sm:w-72 bg-[#101010] border-r border-white/10 flex flex-col justify-between shrink-0 select-none">
        <div>
          {/* Dashboard Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-10 flex items-center justify-center">
                <SparkLogo size="sm" withGlow={false} withFloat={false} />
              </div>
              <div>
                <h1 className="font-heading font-black text-lg text-white leading-tight">
                  2026 CMS
                </h1>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#FFC72C]">
                  SPARK Agency
                </span>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 flex flex-col gap-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'overview'
                  ? 'bg-[#F59E0B] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'content'
                  ? 'bg-[#F59E0B] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText size={16} />
              <span>Website Copy</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'projects'
                  ? 'bg-[#F59E0B] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Briefcase size={16} />
              <span>Selected Work ({draft.projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'services'
                  ? 'bg-[#F59E0B] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers size={16} />
              <span>Services ({draft.services.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'gallery'
                  ? 'bg-[#F59E0B] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon size={16} />
              <span>Advertising Gallery</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider transition-colors ${
                activeTab === 'settings'
                  ? 'bg-[#F59E0B] text-black shadow-md'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings size={16} />
              <span>Global Settings</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 flex flex-col gap-2">
          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-white/10 hover:border-white/30 text-xs font-heading uppercase tracking-wider text-white/80 hover:text-white transition-colors"
          >
            <ExternalLink size={14} />
            <span>View Public Website</span>
          </button>
          <button
            onClick={() => {
              api.logout();
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0A0A0A]">
        {/* Top Action Bar */}
        <header className="h-16 border-b border-white/10 px-6 sm:px-8 flex items-center justify-between bg-[#121212]/70 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase font-mono tracking-widest text-[#FFC72C] font-bold">
              Tab / {activeTab.toUpperCase()}
            </span>
            {saveStatus && (
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full ${
                  saveStatus.isError
                    ? 'bg-rose-500/20 text-rose-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {saveStatus.message}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/30 text-xs font-heading text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              style={{
                background: 'linear-gradient(123deg, #1C1200 0%, #D97706 32%, #F59E0B 62%, #FBBF24 85%, #FEF08A 100%)',
                boxShadow: '0px 4px 14px rgba(245, 158, 11, 0.35)',
              }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer transition-transform hover:scale-102 active:scale-98 disabled:opacity-50"
            >
              <Save size={14} />
              <span>{isSaving ? 'Publishing...' : 'Publish to Live Site'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Close Dashboard"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Tab View Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 max-w-5xl w-full mx-auto">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <span className="text-xs uppercase font-mono tracking-widest text-[#FFC72C] font-bold">
                  Dashboard 2026 &bull; Status
                </span>
                <h2 className="font-heading text-2xl font-bold uppercase text-white mt-1">
                  SPARK Agency Content Control
                </h2>
                <p className="text-sm text-[#94A3B8] mt-1">
                  Manage headline copy, WhatsApp communication endpoints, five Selected Work case studies, agency services, and advertising visuals.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[11px] uppercase tracking-wider text-white/50">
                      Showcase Projects
                    </span>
                    <p className="font-heading text-2xl font-bold text-white mt-1">
                      {draft.projects.length} Case Studies
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[11px] uppercase tracking-wider text-white/50">
                      Services Listed
                    </span>
                    <p className="font-heading text-2xl font-bold text-white mt-1">
                      {draft.services.length} Core Services
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[11px] uppercase tracking-wider text-white/50">
                      WhatsApp Routing
                    </span>
                    <p className="font-heading text-base font-bold text-[#FFC72C] mt-1 flex items-center gap-1.5">
                      <MessageCircle size={16} />
                      +{draft.settings.whatsappNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('content')}
                  className="p-5 rounded-2xl bg-[#141414] border border-white/10 hover:border-[#F59E0B]/50 text-left transition-all group"
                >
                  <h3 className="font-heading text-base font-bold uppercase text-white group-hover:text-[#FFC72C] transition-colors">
                    Edit Website Copy &rarr;
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Update Hero &quot;SPARK AGENCY&quot; headline, intro statement, and About copy.
                  </p>
                </button>

                <button
                  onClick={() => setActiveTab('projects')}
                  className="p-5 rounded-2xl bg-[#141414] border border-white/10 hover:border-[#F59E0B]/50 text-left transition-all group"
                >
                  <h3 className="font-heading text-base font-bold uppercase text-white group-hover:text-[#FFC72C] transition-colors">
                    Manage 5 Projects &rarr;
                  </h3>
                  <p className="text-xs text-[#94A3B8] mt-1">
                    Edit Brand Identity, Social Campaigns, Creative Advertising, Motion &amp; Digital.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: WEBSITE COPY */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold uppercase text-white mb-4">
                  Hero Section Copy
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Hero Headline
                    </label>
                    <input
                      type="text"
                      value={draft.hero.headline}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, headline: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                    <p className="text-[11px] text-white/40 mt-1">
                      Rendered in oversized font-black styling behind/framing the logo.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Agency Intro Subtext
                    </label>
                    <textarea
                      rows={2}
                      value={draft.hero.subtext}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hero: { ...draft.hero, subtext: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Primary Contact Button Text
                    </label>
                    <input
                      type="text"
                      value={draft.settings.contactButtonLabel}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: { ...draft.settings, contactButtonLabel: e.target.value },
                          hero: { ...draft.hero, contactLabel: e.target.value },
                          about: { ...draft.about, contactLabel: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              </div>

              {/* About Section Copy */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold uppercase text-white mb-4">
                  About Us Section
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      value={draft.about.heading}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          about: { ...draft.about, heading: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      About SPARK Biography
                    </label>
                    <textarea
                      rows={4}
                      value={draft.about.text}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          about: { ...draft.about, text: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                    <p className="text-[11px] text-white/40 mt-1">
                      Displayed with character-by-character scroll opacity reveal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer text */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold uppercase text-white mb-4">
                  Footer &amp; Copyright Notice
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={draft.footer.tagline}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          footer: { ...draft.footer, tagline: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Copyright Notice
                    </label>
                    <input
                      type="text"
                      value={draft.footer.copyright}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          footer: { ...draft.footer, copyright: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS (SELECTED WORK - 5 PROJECTS) */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase text-white">
                    Selected Work Case Studies
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Manage the 5 sticky-stacking portfolio projects.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newProj: ProjectItem = {
                      id: String(draft.projects.length + 1).padStart(2, '0'),
                      name: 'NEW AGENCY CAMPAIGN',
                      category: 'Brand Campaign',
                      description: 'Comprehensive commercial strategy and multi-platform advertising assets.',
                      images: {
                        col1Top: 'https://motionsites.org/assets/hero-space-voyage-preview-eECLH3Yc.gif',
                        col1Bottom: 'https://motionsites.org/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
                        col2: 'https://motionsites.org/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
                      },
                      link: '',
                      visible: true,
                    };
                    setDraft({ ...draft, projects: [...draft.projects, newProj] });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F59E0B] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#FFC72C] transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Project</span>
                </button>
              </div>

              {draft.projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="bg-[#141414] border border-white/10 rounded-2xl p-6 space-y-4"
                >
                  {/* Project Header Row */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-[#FFC72C] text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) => {
                          const updated = [...draft.projects];
                          updated[index].name = e.target.value;
                          setDraft({ ...draft, projects: updated });
                        }}
                        className="bg-transparent font-heading font-bold text-white text-base focus:outline-none focus:border-b border-[#F59E0B]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Move Up */}
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => {
                          if (index > 0) {
                            const updated = [...draft.projects];
                            const temp = updated[index - 1];
                            updated[index - 1] = updated[index];
                            updated[index] = temp;
                            setDraft({ ...draft, projects: updated });
                          }
                        }}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/60 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Up"
                      >
                        <ArrowUp size={14} />
                      </button>

                      {/* Move Down */}
                      <button
                        type="button"
                        disabled={index === draft.projects.length - 1}
                        onClick={() => {
                          if (index < draft.projects.length - 1) {
                            const updated = [...draft.projects];
                            const temp = updated[index + 1];
                            updated[index + 1] = updated[index];
                            updated[index] = temp;
                            setDraft({ ...draft, projects: updated });
                          }
                        }}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-white/30 text-white/60 hover:text-white disabled:opacity-30 cursor-pointer"
                        title="Move Down"
                      >
                        <ArrowDown size={14} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete project "${project.name}"?`)) {
                            const updated = draft.projects.filter((_, i) => i !== index);
                            setDraft({ ...draft, projects: updated });
                          }
                        }}
                        className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 cursor-pointer ml-1"
                        title="Delete Project"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                        Category Label
                      </label>
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => {
                          const updated = [...draft.projects];
                          updated[index].category = e.target.value;
                          setDraft({ ...draft, projects: updated });
                        }}
                        className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                        Optional Project URL
                      </label>
                      <input
                        type="text"
                        value={project.link || ''}
                        placeholder="https://..."
                        onChange={(e) => {
                          const updated = [...draft.projects];
                          updated[index].link = e.target.value;
                          setDraft({ ...draft, projects: updated });
                        }}
                        className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                      Case Study Description
                    </label>
                    <textarea
                      rows={2}
                      value={project.description}
                      onChange={(e) => {
                        const updated = [...draft.projects];
                        updated[index].description = e.target.value;
                        setDraft({ ...draft, projects: updated });
                      }}
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  {/* 3 Images: Col1 Top, Col1 Bottom, Col2 Tall */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {/* Image 1 */}
                    <div>
                      <label className="block text-[11px] uppercase font-heading text-white/50 mb-1">
                        Left Top Image
                      </label>
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/50 border border-white/10 mb-2 relative group">
                        <img
                          src={project.images.col1Top}
                          alt="Thumbnail 1"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={project.images.col1Top}
                        onChange={(e) => {
                          const updated = [...draft.projects];
                          updated[index].images.col1Top = e.target.value;
                          setDraft({ ...draft, projects: updated });
                        }}
                        className="w-full bg-[#1C1C1C] border border-white/15 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#F59E0B] font-mono"
                      />
                    </div>

                    {/* Image 2 */}
                    <div>
                      <label className="block text-[11px] uppercase font-heading text-white/50 mb-1">
                        Left Bottom Image
                      </label>
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/50 border border-white/10 mb-2 relative group">
                        <img
                          src={project.images.col1Bottom}
                          alt="Thumbnail 2"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={project.images.col1Bottom}
                        onChange={(e) => {
                          const updated = [...draft.projects];
                          updated[index].images.col1Bottom = e.target.value;
                          setDraft({ ...draft, projects: updated });
                        }}
                        className="w-full bg-[#1C1C1C] border border-white/15 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#F59E0B] font-mono"
                      />
                    </div>

                    {/* Image 3 */}
                    <div>
                      <label className="block text-[11px] uppercase font-heading text-white/50 mb-1">
                        Right Tall Image
                      </label>
                      <div className="aspect-[16/10] rounded-xl overflow-hidden bg-black/50 border border-white/10 mb-2 relative group">
                        <img
                          src={project.images.col2}
                          alt="Thumbnail 3"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={project.images.col2}
                        onChange={(e) => {
                          const updated = [...draft.projects];
                          updated[index].images.col2 = e.target.value;
                          setDraft({ ...draft, projects: updated });
                        }}
                        className="w-full bg-[#1C1C1C] border border-white/15 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#F59E0B] font-mono"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold uppercase text-white">
                    Agency Core Services
                  </h3>
                  <p className="text-xs text-[#94A3B8]">
                    Rendered in the white services section on the public site.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newServ: ServiceItem = {
                      id: String(draft.services.length + 1).padStart(2, '0'),
                      name: 'NEW STRATEGIC SERVICE',
                      description: 'Comprehensive deliverables and bespoke marketing execution for growth.',
                      visible: true,
                    };
                    setDraft({ ...draft, services: [...draft.services, newServ] });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F59E0B] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#FFC72C] transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add Service</span>
                </button>
              </div>

              {draft.services.map((service, index) => (
                <div
                  key={service.id || index}
                  className="bg-[#141414] border border-white/10 rounded-2xl p-5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-[#FFC72C] text-lg">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <input
                        type="text"
                        value={service.name}
                        onChange={(e) => {
                          const updated = [...draft.services];
                          updated[index].name = e.target.value;
                          setDraft({ ...draft, services: updated });
                        }}
                        className="bg-transparent font-heading font-bold text-white text-base focus:outline-none focus:border-b border-[#F59E0B]"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete service "${service.name}"?`)) {
                            const updated = draft.services.filter((_, i) => i !== index);
                            setDraft({ ...draft, services: updated });
                          }
                        }}
                        className="p-1.5 rounded-lg border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 cursor-pointer"
                        title="Delete Service"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                      Service Description
                    </label>
                    <textarea
                      rows={2}
                      value={service.description}
                      onChange={(e) => {
                        const updated = [...draft.services];
                        updated[index].description = e.target.value;
                        setDraft({ ...draft, services: updated });
                      }}
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: GALLERY & CENTRAL LOGO */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Replace Central SPARK Logo Asset */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <span className="text-xs uppercase font-mono tracking-widest text-[#FFC72C] font-bold">
                  Central Brand Focal Point
                </span>
                <h3 className="font-heading text-lg font-bold uppercase text-white mt-1 mb-2">
                  Hero S-Lightning Logo
                </h3>
                <p className="text-xs text-[#94A3B8] mb-4">
                  The website features the official 3D S-shaped lightning logo. If you have an official file asset, you can upload or link it here without altering proportions.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-xl bg-black/40 border border-white/10">
                  <div className="w-24 h-28 flex items-center justify-center bg-[#111111] rounded-xl border border-white/10 shrink-0">
                    {draft.hero.customLogoUrl ? (
                      <img
                        src={draft.hero.customLogoUrl}
                        alt="Custom Logo Preview"
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <SparkLogo size="sm" withGlow={true} withFloat={false} />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-3">
                    <div>
                      <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                        Custom Logo Image URL (leave blank for official 3D S-lightning SVG)
                      </label>
                      <input
                        type="text"
                        value={draft.hero.customLogoUrl || ''}
                        placeholder="https://... or uploaded image"
                        onChange={(e) =>
                          setDraft({
                            ...draft,
                            hero: { ...draft.hero, customLogoUrl: e.target.value },
                          })
                        }
                        className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                      />
                    </div>

                    <div className="flex gap-2">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-heading font-semibold text-white uppercase tracking-wider cursor-pointer">
                        <Upload size={13} />
                        <span>Upload Custom Logo Asset</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleFileUpload(file, (url) => {
                                setDraft({
                                  ...draft,
                                  hero: { ...draft.hero, customLogoUrl: url },
                                });
                              });
                            }
                          }}
                        />
                      </label>

                      {draft.hero.customLogoUrl && (
                        <button
                          type="button"
                          onClick={() =>
                            setDraft({
                              ...draft,
                              hero: { ...draft.hero, customLogoUrl: '' },
                            })
                          }
                          className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-xs text-white/70 hover:text-white"
                        >
                          Restore Official 3D Symbol
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Items */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold uppercase text-white mb-2">
                  Advertising &amp; Campaign Visuals ({draft.gallery.items.length})
                </h3>
                <p className="text-xs text-[#94A3B8] mb-4">
                  Visual designs displayed in the dual-row carousel with manual arrow navigation.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2">
                  {draft.gallery.items.map((item, idx) => (
                    <div
                      key={item.id || idx}
                      className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col gap-2"
                    >
                      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-[#181818] relative">
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <input
                        type="text"
                        value={item.title}
                        placeholder="Title..."
                        onChange={(e) => {
                          const updated = [...draft.gallery.items];
                          updated[idx].title = e.target.value;
                          setDraft({
                            ...draft,
                            gallery: { ...draft.gallery, items: updated },
                          });
                        }}
                        className="bg-[#1C1C1C] border border-white/10 rounded px-2 py-1 text-xs text-white"
                      />
                      <input
                        type="text"
                        value={item.category}
                        placeholder="Category..."
                        onChange={(e) => {
                          const updated = [...draft.gallery.items];
                          updated[idx].category = e.target.value;
                          setDraft({
                            ...draft,
                            gallery: { ...draft.gallery, items: updated },
                          });
                        }}
                        className="bg-[#1C1C1C] border border-white/10 rounded px-2 py-1 text-[11px] text-[#FFC72C]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: GLOBAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* WhatsApp Integration Settings */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <h3 className="font-heading text-lg font-bold uppercase text-white">
                    WhatsApp Integration
                  </h3>
                </div>
                <p className="text-xs text-[#94A3B8] mb-4">
                  Controls where every primary &quot;LET&apos;S TALK&quot; button directs visitors.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      International Phone Number (digits only, no + or spaces)
                    </label>
                    <input
                      type="text"
                      value={draft.settings.whatsappNumber}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: {
                            ...draft.settings,
                            whatsappNumber: e.target.value.replace(/[^0-9]/g, ''),
                          },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B] font-mono"
                    />
                    <p className="text-[11px] text-white/40 mt-1">
                      Currently configured: +201558082474 (Egypt)
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Prefilled Conversation Message
                    </label>
                    <input
                      type="text"
                      value={draft.settings.whatsappMessage}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: { ...draft.settings, whatsappMessage: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                    <p className="text-[11px] text-white/40 mt-1">
                      Automatically encoded in the wa.me destination link.
                    </p>
                  </div>
                </div>
              </div>

              {/* Agency Branding & SEO */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold uppercase text-white mb-4">
                  Agency Branding &amp; Browser Metadata
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Agency Name
                    </label>
                    <input
                      type="text"
                      value={draft.settings.agencyName}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: { ...draft.settings, agencyName: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Browser Page Title
                    </label>
                    <input
                      type="text"
                      value={draft.meta.title}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          meta: { ...draft.meta, title: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading font-semibold text-white/70 mb-1">
                      Meta Description
                    </label>
                    <textarea
                      rows={2}
                      value={draft.meta.description}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          meta: { ...draft.meta, description: e.target.value },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="font-heading text-lg font-bold uppercase text-white mb-4">
                  Social Media Links
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="text"
                      value={draft.settings.socials.linkedin}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: {
                            ...draft.settings,
                            socials: { ...draft.settings.socials, linkedin: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="text"
                      value={draft.settings.socials.instagram}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: {
                            ...draft.settings,
                            socials: { ...draft.settings.socials, instagram: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                      Behance URL
                    </label>
                    <input
                      type="text"
                      value={draft.settings.socials.behance}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: {
                            ...draft.settings,
                            socials: { ...draft.settings.socials, behance: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-heading text-white/60 mb-1">
                      X / Twitter URL
                    </label>
                    <input
                      type="text"
                      value={draft.settings.socials.twitter}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          settings: {
                            ...draft.settings,
                            socials: { ...draft.settings.socials, twitter: e.target.value },
                          },
                        })
                      }
                      className="w-full bg-[#1C1C1C] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F59E0B]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
