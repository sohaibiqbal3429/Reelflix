import { AppHeader } from '@/components/AppHeader';
import { PosterCard } from '@/components/PosterCard';
import { ProgressCard } from '@/components/ProgressCard';
import { SectionHeader } from '@/components/SectionHeader';
import { shows } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { FlatList, ScrollView, Text, View } from 'react-native';

export default function ForYouScreen() {
  const { progress } = useAppContext();
  const continueShows = shows.filter((s) => progress.some((p) => p.showId === s.id));

  return (
    <ScrollView className="flex-1 bg-bg pt-12">
      <AppHeader subtitleChip="AI Picks" />
      <SectionHeader title="Continue Watching" />
      {continueShows.map((show) => {
        const pg = progress.find((p) => p.showId === show.id);
        return pg ? <ProgressCard key={show.id} show={show} progress={pg} /> : null;
      })}
      <SectionHeader title="Because you watched Neon Verdict" subtitle="Curated for your taste" />
      <FlatList horizontal data={shows} keyExtractor={(i) => i.id} renderItem={({ item }) => <View className="w-44"><PosterCard show={item} small /></View>} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }} />
      <SectionHeader title="Short Movies for you" />
      <FlatList horizontal data={[...shows].reverse()} keyExtractor={(i) => i.id} renderItem={({ item }) => <View className="w-44"><PosterCard show={item} small /></View>} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }} />
      <SectionHeader title="Trending in Urdu/Hindi" />
      <View className="px-4 pb-20">
        {shows.slice(0, 4).map((s) => (
          <View key={s.id} className="mb-2 rounded-2xl border border-[#2A3042] bg-surface p-3">
            <Text className="font-semibold text-white">{s.title}</Text>
            <Text className="text-xs text-muted">{s.language} • {s.views} views</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
