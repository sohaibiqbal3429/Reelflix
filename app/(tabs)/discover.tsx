import { AppHeader } from '@/components/AppHeader';
import { CategoryChips } from '@/components/CategoryChips';
import { HeroCarousel } from '@/components/HeroCarousel';
import { PosterCard } from '@/components/PosterCard';
import { RankedRow } from '@/components/RankedRow';
import { SectionHeader } from '@/components/SectionHeader';
import { SkeletonBlock } from '@/components/SkeletonBlock';
import { categories } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { fetchHome, fetchNew, fetchTop } from '@/lib/api';
import { Show } from '@/lib/types';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, Text, View } from 'react-native';

export default function DiscoverScreen() {
  const [active, setActive] = useState('popular');
  const [items, setItems] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetId, setSheetId] = useState<string | null>(null);
  const { toggleSaved } = useAppContext();

  useEffect(() => {
    setLoading(true);
    const load = async () => {
      const data = active === 'top' ? await fetchTop() : active === 'new' ? await fetchNew() : await fetchHome(active);
      setItems(data);
      setLoading(false);
    };
    load();
  }, [active]);

  const comingSoon = items.filter((s) => !!s.releaseCountdown);

  return (
    <View className="flex-1 bg-bg pt-12">
      <AppHeader />
      <CategoryChips data={categories} active={active} onChange={setActive} />
      {loading ? (
        <View className="px-4">
          <SkeletonBlock style={{ height: 220, marginTop: 14 }} />
        </View>
      ) : active === 'top' ? (
        <ScrollView>
          <SectionHeader title="Top Ranked" />
          {items.slice(0, 10).map((show, idx) => <RankedRow key={show.id} rank={idx + 1} show={show} />)}
          <SectionHeader title="Best of Drama" />
          <FlatList horizontal data={items.slice(0, 6)} renderItem={({ item }) => <View className="w-44"><PosterCard show={item} small /></View>} keyExtractor={(item) => item.id} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }} />
        </ScrollView>
      ) : active === 'new' ? (
        <ScrollView>
          <SectionHeader title="Coming Soon" />
          <FlatList
            horizontal
            data={comingSoon}
            keyExtractor={(i) => i.id}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            renderItem={({ item }) => (
              <View className="w-64 overflow-hidden rounded-3xl border border-[#2A3042] bg-surface p-3">
                <PosterCard show={item} small />
                <Text className="-mt-2 rounded-full bg-black/80 px-2 py-1 text-xs text-warning self-start">{item.releaseCountdown}</Text>
              </View>
            )}
          />
          <SectionHeader title="New Releases" />
          <View className="flex-row flex-wrap justify-between px-4">
            {items.map((show) => <PosterCard key={show.id} show={show} onLongPress={setSheetId} />)}
          </View>
        </ScrollView>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <HeroCarousel items={items.slice(0, 4)} />
              <SectionHeader title="Popular Shows" />
            </>
          }
          data={items}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => <PosterCard show={item} onLongPress={setSheetId} />}
        />
      )}

      <Modal visible={!!sheetId} transparent animationType="slide" onRequestClose={() => setSheetId(null)}>
        <Pressable className="flex-1 justify-end bg-black/55" onPress={() => setSheetId(null)}>
          <View className="rounded-t-3xl border border-[#2A3042] bg-surface p-4">
            {['Save', 'Share', 'Hide'].map((action) => (
              <Pressable
                key={action}
                className="mb-2 rounded-2xl border border-[#2A3042] bg-surfaceAlt p-4"
                onPress={() => {
                  if (action === 'Save' && sheetId) toggleSaved(sheetId);
                  setSheetId(null);
                }}
              >
                <Text className="text-white">{action}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
