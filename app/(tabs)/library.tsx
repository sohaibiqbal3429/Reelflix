import { EmptyState } from '@/components/EmptyState';
import { PosterCard } from '@/components/PosterCard';
import { ProgressCard } from '@/components/ProgressCard';
import { useAppContext } from '@/context/AppContext';
import { fetchHome } from '@/lib/api';
import { Show } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const tabs = ['watching', 'saved'] as const;

export default function LibraryScreen() {
  const [active, setActive] = useState<(typeof tabs)[number]>('watching');
  const { progress, savedIds } = useAppContext();
  const [all, setAll] = useState<Show[]>([]);
  useEffect(() => { fetchHome().then((d) => setAll([...d.featured, ...d.trending])); }, []);

  const content = useMemo(() => active === 'watching' ? all.filter((s) => progress.some((p) => p.contentId === s.id)) : all.filter((s) => savedIds.includes(s.id)), [active, progress, savedIds, all]);

  return <ScrollView className="flex-1 bg-bg pt-14"><View className="flex-row items-center justify-between px-4"><Text className="text-2xl font-extrabold text-white">My Library</Text><Pressable className="rounded-full border border-[#2A3042] px-3 py-2"><Text className="text-xs text-teal">Manage</Text></Pressable></View>
    <View className="mx-4 mt-4 flex-row rounded-full border border-[#2A3042] bg-surface p-1">{tabs.map((t)=><Pressable key={t} className={`flex-1 rounded-full px-3 py-2 ${active===t?'bg-teal':''}`} onPress={()=>setActive(t)}><Text className={`text-center ${active===t?'text-black':'text-white'}`}>{t}</Text></Pressable>)}</View>
    <View className="mt-4 px-4">{content.length===0 ? <EmptyState title="Nothing here yet" subtitle="Watch and save titles to build your library." /> : active==='watching' ? content.map((s)=>{const pg=progress.find((p)=>p.contentId===s.id); return pg?<ProgressCard key={s.id} show={s} progress={pg}/>:null;}) : <View className="flex-row flex-wrap justify-between">{content.map((s)=><PosterCard key={s.id} show={s} small />)}</View>}</View>
  </ScrollView>;
}
