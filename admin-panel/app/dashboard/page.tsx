'use client';
import { useEffect, useMemo, useState } from 'react';
import { AuthGuard } from '@/components/AuthGuard';
import { api, API_BASE } from '@/lib/api';

type Content = { id: string; title: string; description: string; category: string; tags: string[]; videoUrl: string; thumbnailUrl: string; sections: string[]; status: string; views: number; watchMinutes: number };

export default function DashboardPage() {
  const [token, setToken] = useState('');
  const [content, setContent] = useState<Content[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [analytics, setAnalytics] = useState<{ totalViews: number; totalWatchMinutes: number; engagementRate: number; contentCount: number } | null>(null);
  const [form, setForm] = useState({ title: '', description: '', category: '', tags: '', videoUrl: '', thumbnailUrl: '', sections: 'featured,trending' });

  const fetchAll = async (t: string) => {
    const [c, cats, an] = await Promise.all([
      api<Content[]>('/api/admin/content', {}, t),
      api<{ id: string; name: string }[]>('/api/admin/categories', {}, t),
      api<{ totalViews: number; totalWatchMinutes: number; engagementRate: number; contentCount: number }>('/api/admin/analytics', {}, t)
    ]);
    setContent(c);
    setCategories(cats);
    setAnalytics(an);
  };

  useEffect(() => {
    const t = localStorage.getItem('rf-token') || '';
    setToken(t);
    if (t) fetchAll(t);
  }, []);

  const addContent = async () => {
    await api('/api/admin/content', { method: 'POST', body: JSON.stringify({ ...form, tags: form.tags.split(',').map((s) => s.trim()), sections: form.sections.split(',').map((s) => s.trim()) }) }, token);
    setForm({ title: '', description: '', category: '', tags: '', videoUrl: '', thumbnailUrl: '', sections: 'featured,trending' });
    fetchAll(token);
  };

  const deleteContent = async (id: string) => {
    await api(`/api/admin/content/${id}`, { method: 'DELETE' }, token);
    fetchAll(token);
  };

  const sendNotification = async () => {
    await api('/api/admin/notifications', { method: 'POST', body: JSON.stringify({ title: 'New content drop!', body: 'Open ReelFlix and watch now.' }) }, token);
    alert('Notification queued');
  };

  const top = useMemo(() => content.slice(0, 5), [content]);

  return <AuthGuard><main className="p-6 space-y-6">
    <h1 className="text-3xl font-bold">ReelFlix Admin CMS</h1>
    <section className="grid gap-4 md:grid-cols-4">
      <div className="card"><p className="text-sm text-slate-400">Views</p><p className="text-2xl font-bold">{analytics?.totalViews ?? 0}</p></div>
      <div className="card"><p className="text-sm text-slate-400">Watch Minutes</p><p className="text-2xl font-bold">{analytics?.totalWatchMinutes ?? 0}</p></div>
      <div className="card"><p className="text-sm text-slate-400">Engagement</p><p className="text-2xl font-bold">{analytics?.engagementRate ?? 0}%</p></div>
      <div className="card"><p className="text-sm text-slate-400">Catalog</p><p className="text-2xl font-bold">{analytics?.contentCount ?? 0}</p></div>
    </section>

    <section className="card space-y-3">
      <h2 className="text-xl font-semibold">Upload / Create Content</h2>
      <div className="grid gap-3 md:grid-cols-2">
        <input className="input" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/>
        <select className="input" value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})}><option value="">Category</option>{categories.map((c)=><option key={c.id}>{c.name}</option>)}</select>
        <input className="input" placeholder="Thumbnail URL" value={form.thumbnailUrl} onChange={(e)=>setForm({...form,thumbnailUrl:e.target.value})}/>
        <input className="input" placeholder="Video URL" value={form.videoUrl} onChange={(e)=>setForm({...form,videoUrl:e.target.value})}/>
        <input className="input" placeholder="tags comma-separated" value={form.tags} onChange={(e)=>setForm({...form,tags:e.target.value})}/>
        <input className="input" placeholder="sections e.g featured,trending" value={form.sections} onChange={(e)=>setForm({...form,sections:e.target.value})}/>
      </div>
      <textarea className="input" placeholder="Description" value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} />
      <div className="flex gap-3">
        <button className="btn" onClick={addContent}>Save Content</button>
        <button className="rounded-md border border-slate-700 px-4 py-2" onClick={sendNotification}>Send Notification</button>
      </div>
      <p className="text-xs text-slate-400">Media upload endpoint ready at {API_BASE}/api/admin/upload</p>
    </section>

    <section className="card">
      <h2 className="mb-3 text-xl font-semibold">Moderation / Catalog</h2>
      <div className="space-y-2">{top.map((item)=><div key={item.id} className="flex items-center justify-between rounded-md border border-slate-800 p-3"><div><p className="font-medium">{item.title}</p><p className="text-xs text-slate-400">{item.category} • {item.status} • {item.views} views</p></div><button className="text-rose-400" onClick={()=>deleteContent(item.id)}>Delete</button></div>)}</div>
    </section>
  </main></AuthGuard>;
}
