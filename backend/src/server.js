import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { loadDb, saveDb, updateDb } from './db.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);
const JWT_SECRET = process.env.JWT_SECRET || 'reelflix-secret';
const uploadDir = path.resolve(process.cwd(), 'backend/uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use('/uploads', express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, uploadDir),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`)
});
const upload = multer({ storage });

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

const roleGuard = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Forbidden' });
  next();
};

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = loadDb();
  const user = db.users.find((u) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '12h' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name } });
});

app.get('/api/mobile/home', (_, res) => {
  const db = loadDb();
  const published = db.content.filter((c) => c.status === 'published');
  const section = (name) => published.filter((c) => c.sections.includes(name));
  res.json({
    featured: section('featured'),
    trending: section('trending'),
    topRanked: section('top-ranked'),
    comingSoon: section('coming-soon'),
    categories: db.categories
  });
});

app.get('/api/mobile/search', (req, res) => {
  const q = String(req.query.q || '').toLowerCase();
  const db = loadDb();
  const results = db.content.filter((c) =>
    [c.title, c.description, c.category, ...(c.tags || [])].join(' ').toLowerCase().includes(q)
  );
  res.json(results);
});

app.get('/api/mobile/content/:id', (req, res) => {
  const db = loadDb();
  const item = db.content.find((c) => c.id === req.params.id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  const recommendations = db.content.filter((c) => c.id !== item.id && c.category === item.category).slice(0, 6);
  res.json({ item, recommendations });
});

app.post('/api/mobile/progress', (req, res) => {
  const { deviceId, contentId, positionSec, durationSec } = req.body;
  updateDb((db) => {
    const idx = db.progress.findIndex((p) => p.deviceId === deviceId && p.contentId === contentId);
    const payload = { id: idx >= 0 ? db.progress[idx].id : uuid(), deviceId, contentId, positionSec, durationSec, updatedAt: new Date().toISOString() };
    if (idx >= 0) db.progress[idx] = payload;
    else db.progress.push(payload);
  });
  res.json({ ok: true });
});

app.get('/api/mobile/progress/:deviceId', (req, res) => {
  const db = loadDb();
  res.json(db.progress.filter((p) => p.deviceId === req.params.deviceId));
});

app.post('/api/admin/upload', auth, roleGuard('admin', 'editor'), upload.fields([{ name: 'video', maxCount: 1 }, { name: 'thumbnail', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), (req, res) => {
  const protocolHost = `${req.protocol}://${req.get('host')}`;
  const fileUrl = (f) => (f ? `${protocolHost}/uploads/${f[0].filename}` : null);
  res.json({ videoUrl: fileUrl(req.files.video), thumbnailUrl: fileUrl(req.files.thumbnail), bannerUrl: fileUrl(req.files.banner) });
});

app.get('/api/admin/content', auth, (req, res) => res.json(loadDb().content));
app.post('/api/admin/content', auth, roleGuard('admin', 'editor'), (req, res) => {
  const now = new Date().toISOString();
  const item = { id: uuid(), ...req.body, views: 0, watchMinutes: 0, status: 'published', createdAt: now, updatedAt: now };
  updateDb((db) => db.content.unshift(item));
  res.status(201).json(item);
});
app.put('/api/admin/content/:id', auth, roleGuard('admin', 'editor'), (req, res) => {
  let updated;
  updateDb((db) => {
    db.content = db.content.map((c) => (c.id === req.params.id ? (updated = { ...c, ...req.body, updatedAt: new Date().toISOString() }) : c));
  });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});
app.delete('/api/admin/content/:id', auth, roleGuard('admin'), (req, res) => {
  updateDb((db) => { db.content = db.content.filter((c) => c.id !== req.params.id); });
  res.status(204).send();
});

app.get('/api/admin/categories', auth, (_, res) => res.json(loadDb().categories));
app.post('/api/admin/categories', auth, roleGuard('admin', 'editor'), (req, res) => {
  const category = { id: uuid(), name: req.body.name };
  updateDb((db) => db.categories.push(category));
  res.status(201).json(category);
});

app.get('/api/admin/users', auth, roleGuard('admin'), (_, res) => res.json(loadDb().users.map(({ passwordHash, ...u }) => u)));
app.get('/api/admin/analytics', auth, (_, res) => {
  const db = loadDb();
  const views = db.content.reduce((sum, c) => sum + (c.views || 0), 0);
  const watch = db.content.reduce((sum, c) => sum + (c.watchMinutes || 0), 0);
  const engagement = views ? Math.round((watch / (views * 2)) * 100) : 0;
  res.json({ totalViews: views, totalWatchMinutes: watch, engagementRate: engagement, contentCount: db.content.length });
});

app.get('/api/admin/banners', auth, (_, res) => res.json(loadDb().banners));
app.post('/api/admin/banners', auth, roleGuard('admin', 'editor'), (req, res) => {
  const banner = { id: uuid(), ...req.body };
  updateDb((db) => db.banners.push(banner));
  res.status(201).json(banner);
});

app.post('/api/admin/notifications', auth, roleGuard('admin', 'editor'), (req, res) => {
  const notification = { id: uuid(), ...req.body, sentBy: req.user.email, createdAt: new Date().toISOString() };
  updateDb((db) => db.notifications.push(notification));
  res.status(201).json(notification);
});

app.listen(PORT, () => console.log(`ReelFlix backend running on ${PORT}`));

