import { HomePayload, Show, UserProgress } from './types';

const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, init);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const fetchHome = () => request<HomePayload>('/api/mobile/home');
export const searchContent = (query: string) => request<Show[]>(`/api/mobile/search?q=${encodeURIComponent(query)}`);
export const fetchShow = (id: string) => request<{ item: Show; recommendations: Show[] }>(`/api/mobile/content/${id}`);
export const fetchProgress = (deviceId: string) => request<UserProgress[]>(`/api/mobile/progress/${deviceId}`);
export const updateProgress = (payload: UserProgress) => request<{ ok: boolean }>('/api/mobile/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
