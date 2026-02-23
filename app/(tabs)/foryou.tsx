import { AppHeader } from '@/components/AppHeader';
import { PosterCard } from '@/components/PosterCard';
import { ProgressCard } from '@/components/ProgressCard';
import { SectionHeader } from '@/components/SectionHeader';
import { useAppContext } from '@/context/AppContext';
import { fetchHome } from '@/lib/api';
import { Show } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

export default function ForYouScreen() {
  const { progress } = useAppContext();
  const [all, setAll] = useState<Show[]>([]);
  useEffect(() => { fetchHome().then((d) => setAll([...d.featured, ...d.trending])); }, []);
  const continueShows = useMemo(() => all.filter((s) => progress.some((p) => p.contentId === s.id)), [all, progress]);

  return <ScrollView className="flex-1 bg-bg pt-12">
    <AppHeader subtitleChip="AI Picks" />
    <SectionHeader title="Continue Watching" />
    {continueShows.map((show) => {
      const pg = progress.find((p) => p.contentId === show.id);
      return pg ? <ProgressCard key={show.id} show={show} progress={pg} /> : null;
    })}
    <SectionHeader title="Recommended" />
    <FlatList horizontal data={all.slice(0,8)} keyExtractor={(i) => i.id} renderItem={({ item }) => <View className="w-44"><PosterCard show={item} small /></View>} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }} />
  </ScrollView>;
}
