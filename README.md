# ReelFlix OTT Platform

Production-ready baseline with:
- **Expo Router mobile app** (real backend data, streaming player, progress persistence, recommendations/search)
- **Express backend API** (auth, role permissions, content/category/user/banners/analytics/notifications, uploads)
- **Next.js + Tailwind admin CMS** (login, analytics, content management, moderation, notifications)

## 1) Install
```bash
npm install
npm --prefix backend install
npm --prefix admin-panel install
```

## 2) Seed backend data
```bash
npm run backend:seed
```
Admin credentials:
- `admin@reelflix.dev / admin123`
- `editor@reelflix.dev / admin123`

## 3) Run backend
```bash
npm run backend:dev
```
Backend runs on `http://localhost:4000`.

## 4) Run admin panel
```bash
npm run admin:dev
```
Admin runs on `http://localhost:3000`.

## 5) Run mobile app
```bash
EXPO_PUBLIC_API_URL=http://localhost:4000 npx expo start
```

## API structure
- Mobile: `/api/mobile/*`
- Admin: `/api/admin/*`
- Auth: `/api/auth/login`
- Uploads static storage: `/uploads/*`

## Deployment notes
- Backend: deploy as Node server (set `JWT_SECRET`).
- Media storage: current local upload structure can be replaced by S3/Cloudinary while keeping same response payload shape.
- Admin panel: deploy separately with `NEXT_PUBLIC_API_BASE` env var.
- Mobile app: set `EXPO_PUBLIC_API_URL` to deployed backend URL.
