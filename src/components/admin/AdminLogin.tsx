import React, { useState } from 'react';
import { Eye, EyeOff, Lock, ArrowRight, X, AlertCircle } from 'lucide-react';
import { SparkLogo } from '../SparkLogo.tsx';
import { api } from '../../services/api.ts';

interface AdminLoginProps {
  onSuccess: () => void;
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await api.login(password);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Incorrect password for Dashboard 2026');
      }
    } catch {
      setError('An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Modal card */}
      <div className="relative w-full max-w-md bg-[#121212] border-2 border-[#F59E0B]/30 rounded-[32px] p-6 sm:p-8 text-[#E2E8F0] shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-10">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-14 mb-3 flex items-center justify-center">
            <SparkLogo size="sm" withGlow={true} withFloat={false} />
          </div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#FFC72C] font-bold">
            SPARK Agency &bull; CMS
          </span>
          <h2 className="font-heading text-3xl font-black uppercase text-white mt-1">
            2026 Dashboard
          </h2>
          <p className="text-xs text-[#94A3B8] font-body mt-1.5 max-w-xs">
            Authenticate to manage agency copy, showcase projects, advertising gallery, and global settings.
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs mb-4">
            <AlertCircle size={16} className="shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs uppercase font-heading font-semibold tracking-wider text-white/70 mb-1.5">
              Dashboard Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-[#181818] border border-white/15 rounded-xl pl-4 pr-11 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              background: 'linear-gradient(123deg, #1C1200 0%, #D97706 32%, #F59E0B 62%, #FBBF24 85%, #FEF08A 100%)',
              boxShadow: '0px 4px 14px rgba(245, 158, 11, 0.35), inset 2px 2px 10px #D97706',
              outline: '2px solid #FFFFFF',
              outlineOffset: '-3px',
            }}
            className="w-full py-3.5 rounded-full text-white font-heading font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-102 active:scale-98 disabled:opacity-50 mt-2"
          >
            {isLoading ? (
              <span>Verifying...</span>
            ) : (
              <>
                <Lock size={14} />
                <span>Enter 2026 Dashboard</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/5 text-center text-[11px] text-[#64748B]">
          <span>Protected with server-side authentication</span>
        </div>
      </div>
    </div>
  );
};
