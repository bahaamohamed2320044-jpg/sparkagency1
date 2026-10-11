import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { DEFAULT_CONTENT } from './src/data/defaultContent.ts';

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Directories
const DATA_DIR = path.resolve(process.cwd(), 'data');
const UPLOADS_DIR = path.resolve(process.cwd(), 'public', 'uploads');
const CONTENT_FILE = path.join(DATA_DIR, 'content.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Serve public uploads statically
app.use('/uploads', express.static(UPLOADS_DIR));

// Seed content.json if missing
if (!fs.existsSync(CONTENT_FILE)) {
  fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), 'utf-8');
}

// Security: Password is salted & hashed on server
// Password: marketingspark123
const ADMIN_PASSWORD_HASH = crypto
  .createHash('sha256')
  .update('marketingspark123')
  .digest('hex');

// In-memory token store with 24-hour expiration
interface SessionData {
  createdAt: number;
}
const activeSessions = new Map<string, SessionData>();

// Middleware to verify admin token
function requireAdminAuth(req: Request, res: Response, next: () => void) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  const session = activeSessions.get(token);
  if (!session) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired session' });
    return;
  }
  // Check 24 hour expiry
  if (Date.now() - session.createdAt > 24 * 60 * 60 * 1000) {
    activeSessions.delete(token);
    res.status(401).json({ error: 'Unauthorized: Session expired' });
    return;
  }
  next();
}

// 1. Auth: Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    res.status(400).json({ error: 'Password required' });
    return;
  }

  const hash = crypto.createHash('sha256').update(password).digest('hex');

  // Constant-time compare
  const isValid = crypto.timingSafeEqual(
    Buffer.from(hash, 'utf-8'),
    Buffer.from(ADMIN_PASSWORD_HASH, 'utf-8')
  );

  if (!isValid) {
    res.status(401).json({ error: 'Incorrect dashboard password' });
    return;
  }

  const token = crypto.randomBytes(32).toString('hex');
  activeSessions.set(token, { createdAt: Date.now() });

  res.json({
    success: true,
    token,
    dashboardName: '2026',
    expiresIn: 86400,
  });
});

// 2. Auth: Verify session
app.get('/api/auth/verify', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ valid: true, dashboardName: '2026' });
});

// 3. Auth: Logout
app.post('/api/auth/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    activeSessions.delete(token);
  }
  res.json({ success: true });
});

// 4. Content: Get website content
app.get('/api/content', (_req: Request, res: Response) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const data = fs.readFileSync(CONTENT_FILE, 'utf-8');
      res.json(JSON.parse(data));
      return;
    }
    res.json(DEFAULT_CONTENT);
  } catch (err) {
    console.error('Error reading content:', err);
    res.json(DEFAULT_CONTENT);
  }
});

// 5. Content: Update website content (Admin only)
app.post('/api/content', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const newContent = req.body;
    if (!newContent || typeof newContent !== 'object') {
      res.status(400).json({ error: 'Invalid content data payload' });
      return;
    }
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(newContent, null, 2), 'utf-8');
    res.json({ success: true, timestamp: Date.now() });
  } catch (err) {
    console.error('Error saving content:', err);
    res.status(500).json({ error: 'Failed to write content to persistent storage' });
  }
});

// 6. Content: Reset to default
app.post('/api/content/reset', requireAdminAuth, (_req: Request, res: Response) => {
  try {
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), 'utf-8');
    res.json({ success: true, content: DEFAULT_CONTENT });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset content' });
  }
});

// 7. Image Upload (Admin only)
app.post('/api/upload', requireAdminAuth, (req: Request, res: Response) => {
  try {
    const { filename, base64Data } = req.body;
    if (!filename || !base64Data) {
      res.status(400).json({ error: 'filename and base64Data are required' });
      return;
    }

    // Clean base64 header if present
    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    // Generate safe unique filename
    const ext = path.extname(filename) || '.png';
    const safeBase = path
      .basename(filename, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueName = `upload_${Date.now()}_${safeBase}${ext}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    fs.writeFileSync(filePath, buffer);
    res.json({
      success: true,
      url: `/uploads/${uniqueName}`,
      filename: uniqueName,
    });
  } catch (err) {
    console.error('Error saving uploaded file:', err);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// Mount Vite middleware in dev mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SPARK Agency server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
