'use client';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('admin@reelflix.dev');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await api<{ token: string; user: { role: string } }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      localStorage.setItem('rf-token', data.token);
      localStorage.setItem('rf-role', data.user.role);
      router.push('/dashboard');
    } catch {
      setError('Invalid credentials');
    }
  };

  return <main className="mx-auto mt-24 max-w-md card"><h1 className="mb-4 text-2xl font-bold">ReelFlix CMS Login</h1>
    <form onSubmit={onSubmit} className="space-y-3">
      <input className="input" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      {error && <p className="text-sm text-rose-400">{error}</p>}
      <button className="btn w-full" type="submit">Sign in</button>
    </form>
  </main>;
}
