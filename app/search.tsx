import { PosterCard } from '@/components/PosterCard';
import { useAppContext } from '@/context/AppContext';
import { searchContent } from '@/lib/api';
import { Show } from '@/lib/types';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Show[]>([]);
  const { recentSearches, addRecentSearch } = useAppContext();

  useEffect(() => {
    const t = setTimeout(() => { if (query.trim()) searchContent(query).then(setResults).catch(() => setResults([])); else setResults([]); }, 350);
    return () => clearTimeout(t);
  }, [query]);

  return <View className="flex-1 bg-bg pt-14 px-4"><View className="flex-row items-center gap-2"><Pressable onPress={() => router.back()}><Text className="text-white">←</Text></Pressable><TextInput value={query} onChangeText={setQuery} placeholder="Search shows, genres" placeholderTextColor="#7E869D" onSubmitEditing={() => query && addRecentSearch(query)} className="flex-1 rounded-2xl border border-[#2A3042] bg-surface px-4 py-3 text-white" /></View>
    <Text className="mt-4 text-sm font-semibold text-white">Recent searches</Text><View className="mt-2 flex-row flex-wrap gap-2">{recentSearches.map((s)=><Pressable key={s} onPress={()=>setQuery(s)} className="rounded-full border border-[#2A3042] px-3 py-2"><Text className="text-xs text-muted">{s}</Text></Pressable>)}</View>
    <View className="mt-4 flex-row flex-wrap justify-between pb-14">{results.map((r)=><PosterCard key={r.id} show={r} small />)}</View></View>;
}
