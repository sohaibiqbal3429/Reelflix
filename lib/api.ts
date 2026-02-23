import { shows } from '@/constants/mockData';
import { Show } from './types';

const wait = (ms = 700) => new Promise((res) => setTimeout(res, ms));

export async function fetchHome(category = 'popular'): Promise<Show[]> {
  await wait();
  if (category === 'new') return shows.filter((s) => s.isNew);
  return shows;
}

export async function fetchTop(): Promise<Show[]> {
  await wait();
  return [...shows].sort((a, b) => Number(b.views.replace(/[^\d.]/g, '')) - Number(a.views.replace(/[^\d.]/g, '')));
}

export async function fetchNew(): Promise<Show[]> {
  await wait();
  return shows.filter((s) => s.isNew || s.releaseCountdown);
}

export async function fetchShow(id: string): Promise<Show | undefined> {
  await wait(400);
  return shows.find((s) => s.id === id);
}

export async function toggleSave(id: string): Promise<{ id: string; saved: boolean }> {
  await wait(200);
  return { id, saved: true };
}

export async function toggleNotify(id: string): Promise<{ id: string; notified: boolean }> {
  await wait(200);
  return { id, notified: true };
}
