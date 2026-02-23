import { EmptyState } from '@/components/EmptyState';
import { PosterCard } from '@/components/PosterCard';
import { ProgressCard } from '@/components/ProgressCard';
import { shows } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const tabs = ['watching', 'saved', 'completed'] as const;

export default function LibraryScreen() {
  const [active, setActive] = useState<(typeof tabs)[number]>('watching');
  const { progress, savedIds } = useAppContext();

  const content = useMemo(() => {
    if (active === 'watching') return shows.filter((s) => progress.some((p) => p.showId === s.id));
    if (active === 'saved') return shows.filter((s) => savedIds.includes(s.id));
    return shows.slice(0, 2);
  }, [active, progress, savedIds]);

  return (
    <ScrollView className="flex-1 bg-bg pt-14">
      <View className="flex-row items-center justify-between px-4">
        <Text className="text-2xl font-extrabold text-white">My Library</Text>
        <Pressable className="rounded-full border border-[#2A3042] px-3 py-2"><Text className="text-xs text-teal">✎ Manage</Text></Pressable>
      </View>
      <View className="mx-4 mt-4 flex-row rounded-full border border-[#2A3042] bg-surface p-1">
        {tabs.map((t) => (
          <Pressable key={t} onPress={() => setActive(t)} className={`flex-1 rounded-full py-2 ${active === t ? 'bg-teal/20' : ''}`}>
            <Text className={`text-center text-xs font-semibold ${active === t ? 'text-teal' : 'text-muted'}`}>{t === 'watching' ? 'Currently Watching' : t === 'saved' ? 'Saved' : 'Completed'}</Text>
          </Pressable>
        ))}
      </View>

      {content.length === 0 ? <EmptyState title="Nothing here yet" subtitle="Save shows to fill your library." /> : null}

      {active === 'watching' && content.map((s) => {
        const pg = progress.find((p) => p.showId === s.id)!;
        return <ProgressCard key={s.id} show={s} progress={pg} />;
      })}

      {active === 'saved' ? (
        <View className="flex-row flex-wrap justify-between px-4 pt-4 pb-24">
          {content.map((s) => <PosterCard key={s.id} show={s} />)}
        </View>
      ) : null}

      {active === 'completed' ? (
        <View className="px-4 pb-24 pt-4">
          {content.map((s) => (
            <View key={s.id} className="mb-3 rounded-2xl border border-[#2A3042] bg-surface p-4">
              <Text className="font-semibold text-white">✅ {s.title}</Text>
              <Text className="text-xs text-muted">Completed • {s.language}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  );
}
