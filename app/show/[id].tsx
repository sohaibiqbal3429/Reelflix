import { NotifyButton } from '@/components/NotifyButton';
import { PosterCard } from '@/components/PosterCard';
import { SectionHeader } from '@/components/SectionHeader';
import { reels, shows } from '@/constants/mockData';
import { useAppContext } from '@/context/AppContext';
import { fetchShow } from '@/lib/api';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';

export default function ShowDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);
  const [show, setShow] = useState(shows[0]);
  const { notifiedIds, toggleNotified, toggleSaved, savedIds, progress } = useAppContext();

  useEffect(() => {
    fetchShow(id).then((res) => res && setShow(res));
  }, [id]);

  const inProgress = progress.find((p) => p.showId === show.id);

  return (
    <ScrollView className="flex-1 bg-bg">
      <ImageBackground source={{ uri: show.backdropUrl }} className="h-80 justify-between p-4 pt-14">
        <LinearGradient colors={['rgba(9,10,16,0.1)', '#090A10']} className="absolute inset-0" />
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full bg-black/45"><Text className="text-white">←</Text></Pressable>
      </ImageBackground>

      <View className="px-4 -mt-20">
        <Text className="text-3xl font-extrabold text-white">{show.title}</Text>
        <Text className="mt-1 text-xs text-muted">{show.language} • {show.genres.join(' • ')} • {show.rating}</Text>
        <Text className="mt-1 text-xs text-muted">▶ {show.views} views</Text>

        <View className="mt-4 flex-row flex-wrap gap-2">
          <Link href={`/player/${show.id}`} asChild><Pressable className="rounded-full bg-white px-5 py-3"><Text className="font-bold text-black">▶ Play</Text></Pressable></Link>
          {inProgress ? <Link href={`/player/${show.id}`} asChild><Pressable className="rounded-full border border-teal px-5 py-3"><Text className="font-bold text-teal">Resume</Text></Pressable></Link> : null}
          <Pressable onPress={() => toggleSaved(show.id)} className="rounded-full border border-[#2A3042] px-4 py-3"><Text className="text-white">{savedIds.includes(show.id) ? '✓ Saved' : '＋ Save'}</Text></Pressable>
          <Pressable className="rounded-full border border-[#2A3042] px-4 py-3"><Text className="text-white">↗ Share</Text></Pressable>
        </View>
        <View className="mt-3 self-start"><NotifyButton active={notifiedIds.includes(show.id)} onPress={() => toggleNotified(show.id)} /></View>

        <SectionHeader title="About" />
        <Pressable onPress={() => setExpanded((v) => !v)}>
          <Text className="text-sm leading-6 text-muted">{expanded ? show.about : `${show.about.slice(0, 110)}...`}</Text>
          <Text className="mt-1 text-xs text-teal">{expanded ? 'Show less' : 'Read more'}</Text>
        </Pressable>

        {show.isSeries ? (
          <>
            <SectionHeader title="Episodes / Reels" />
            {reels.filter((r) => r.showId === show.id).map((r) => (
              <View key={r.id} className="mb-2 rounded-2xl border border-[#2A3042] bg-surface p-3">
                <Text className="font-semibold text-white">{r.title}</Text>
                <Text className="text-xs text-muted">{r.duration}</Text>
              </View>
            ))}
          </>
        ) : (
          <>
            <SectionHeader title="More like this" />
            <View className="flex-row flex-wrap justify-between pb-10">
              {shows.filter((s) => s.id !== show.id).slice(0, 4).map((s) => <PosterCard key={s.id} show={s} small />)}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
