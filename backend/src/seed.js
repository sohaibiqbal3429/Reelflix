import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import { saveDb } from './db.js';

const hashed = bcrypt.hashSync('admin123', 10);
const now = new Date().toISOString();

const categories = ['Action', 'Drama', 'Thriller', 'Romance', 'Comedy'].map((name) => ({ id: uuid(), name }));
const content = [
  {
    id: uuid(),
    title: 'Neon Verdict',
    description: 'Courtroom thriller with audience voting.',
    category: 'Thriller',
    tags: ['court', 'future', 'drama'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    thumbnailUrl: 'https://picsum.photos/400/600?random=111',
    bannerUrl: 'https://picsum.photos/1400/700?random=111',
    sections: ['featured', 'trending'],
    status: 'published',
    views: 32000,
    watchMinutes: 110000,
    createdAt: now,
    updatedAt: now
  },
  {
    id: uuid(),
    title: 'Paper Moon Hotel',
    description: 'Romantic inheritance mystery.',
    category: 'Romance',
    tags: ['hotel', 'romance'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://picsum.photos/400/600?random=112',
    bannerUrl: 'https://picsum.photos/1400/700?random=112',
    sections: ['top-ranked', 'coming-soon'],
    status: 'published',
    views: 21000,
    watchMinutes: 70000,
    createdAt: now,
    updatedAt: now
  }
];

saveDb({
  users: [
    { id: uuid(), name: 'Platform Admin', email: 'admin@reelflix.dev', role: 'admin', passwordHash: hashed, createdAt: now },
    { id: uuid(), name: 'Content Manager', email: 'editor@reelflix.dev', role: 'editor', passwordHash: hashed, createdAt: now }
  ],
  categories,
  content,
  banners: content.map((c) => ({ id: uuid(), contentId: c.id, imageUrl: c.bannerUrl, title: c.title })),
  notifications: [],
  progress: [],
  analytics: { totalViews: 53000, totalWatchMinutes: 180000, engagementRate: 73 }
});

console.log('Seed completed. Admin login: admin@reelflix.dev / admin123');
