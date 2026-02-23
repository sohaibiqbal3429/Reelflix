import { PosterCard } from '@/components/PosterCard';
import { shows } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const { recentSearches, addRecentSearch } = useAppContext();

  const results = useMemo(() => shows.filter((s) => s.title.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <View className="flex-1 bg-bg pt-14 px-4">
      <View className="flex-row items-center gap-2">
        <Pressable onPress={() => router.back()}><Text className="text-white">←</Text></Pressable>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search shows, genres"
          placeholderTextColor="#7E869D"
          onSubmitEditing={() => query && addRecentSearch(query)}
          className="flex-1 rounded-2xl border border-[#2A3042] bg-surface px-4 py-3 text-white"
        />
      </View>
      <Text className="mt-4 text-sm font-semibold text-white">Recent searches</Text>
      <View className="mt-2 flex-row flex-wrap gap-2">
        {recentSearches.map((s) => (
          <Pressable key={s} onPress={() => setQuery(s)} className="rounded-full border border-[#2A3042] px-3 py-2"><Text className="text-xs text-muted">{s}</Text></Pressable>
        ))}
      </View>
      <Text className="mt-6 text-sm font-semibold text-white">Results</Text>
      <View className="mt-2 flex-row flex-wrap justify-between pb-14">
        {results.map((r) => <PosterCard key={r.id} show={r} small />)}
      </View>
    </View>
  );
}
