import { Show, UserProgress } from '@/lib/types';
import { Link } from 'expo-router';
import { ImageBackground, Pressable, Text, View } from 'react-native';

export function ProgressCard({ show, progress }: { show: Show; progress: UserProgress }) {
  const pct = progress.durationSec ? progress.positionSec / progress.durationSec : 0;
  return (
    <Link href={`/show/${show.id}`} asChild>
      <Pressable className="mb-4 mx-4 overflow-hidden rounded-3xl border border-[#2A3042] bg-surface">
        <ImageBackground source={{ uri: show.bannerUrl || show.thumbnailUrl }} className="h-36 justify-end p-3">
          <Text className="font-semibold text-white">{show.title}</Text>
          <Text className="text-xs text-gray-200">{Math.floor(progress.positionSec)}s watched</Text>
        </ImageBackground>
        <View className="h-1.5 bg-[#2A3042]"><View className="h-1.5 bg-teal" style={{ width: `${pct * 100}%` }} /></View>
      </Pressable>
    </Link>
  );
}
