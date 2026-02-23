import fs from 'fs';
import path from 'path';

const DB_FILE = path.resolve(process.cwd(), 'backend/data/db.json');

const defaultDb = {
  users: [],
  categories: [],
  content: [],
  banners: [],
  notifications: [],
  progress: [],
  analytics: { totalViews: 0, totalWatchMinutes: 0, engagementRate: 0 }
};

export function loadDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2));
    return structuredClone(defaultDb);
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

export function saveDb(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export function updateDb(mutator) {
  const db = loadDb();
  mutator(db);
  saveDb(db);
  return db;
}
