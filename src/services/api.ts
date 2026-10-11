import { WebsiteContent } from '../types/content.ts';
import { DEFAULT_CONTENT } from '../data/defaultContent.ts';

const TOKEN_KEY = 'spark_2026_admin_token';
const LOCAL_STORAGE_KEY = 'spark_agency_content_draft';

export const api = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string, remember: boolean = true) {
    if (remember) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(TOKEN_KEY, token);
    }
  },

  clearToken() {
    localStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  async login(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Authentication failed' };
      }
      if (data.token) {
        this.setToken(data.token);
        return { success: true, token: data.token };
      }
      return { success: false, error: 'Unexpected response' };
    } catch {
      // In case server is offline during initial startup, inform user clearly
      return {
        success: false,
        error: 'Unable to reach authentication server. Please check connection.',
      };
    }
  },

  async verifySession(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;
    try {
      const res = await fetch('/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignore
      }
    }
    this.clearToken();
  },

  async getContent(): Promise<{ content: WebsiteContent; isServerBacked: boolean }> {
    try {
      const res = await fetch('/api/content');
      if (res.ok) {
        const data = await res.json();
        // Mirror to local storage for instant offline boot
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
        return { content: data, isServerBacked: true };
      }
    } catch {
      // ignore
    }

    // Fallback to local draft if exists
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { content: JSON.parse(saved), isServerBacked: false };
      }
    } catch {
      // ignore
    }

    return { content: DEFAULT_CONTENT, isServerBacked: false };
  },

  async saveContent(
    content: WebsiteContent
  ): Promise<{ success: boolean; isServerSaved: boolean; error?: string }> {
    // Save locally immediately
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));

    const token = this.getToken();
    if (!token) {
      return {
        success: true,
        isServerSaved: false,
        error: 'Saved locally. Please log in to synchronize permanently to server.',
      };
    }

    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        return { success: true, isServerSaved: true };
      }
      const data = await res.json();
      return {
        success: true,
        isServerSaved: false,
        error: data.error || 'Server rejected changes. Saved locally.',
      };
    } catch {
      return {
        success: true,
        isServerSaved: false,
        error: 'Saved locally. Server connection failed.',
      };
    }
  },

  async uploadImage(
    file: File
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    const token = this.getToken();
    if (!token) {
      return { success: false, error: 'Authentication required to upload assets' };
    }

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              filename: file.name,
              base64Data,
            }),
          });
          const data = await res.json();
          if (res.ok && data.url) {
            resolve({ success: true, url: data.url });
          } else {
            resolve({ success: false, error: data.error || 'Upload failed' });
          }
        } catch {
          resolve({ success: false, error: 'Network error during upload' });
        }
      };
      reader.onerror = () => {
        resolve({ success: false, error: 'Failed to read file' });
      };
      reader.readAsDataURL(file);
    });
  },

  async resetToDefaults(): Promise<WebsiteContent> {
    const token = this.getToken();
    if (token) {
      try {
        await fetch('/api/content/reset', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {
        // ignore
      }
    }
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return DEFAULT_CONTENT;
  },
};
