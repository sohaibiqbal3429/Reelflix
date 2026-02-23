import { Show, UserProgress } from '@/lib/types';
import { Link } from 'expo-router';
import { ImageBackground, Pressable, Text, View } from 'react-native';

export function ProgressCard({ show, progress }: { show: Show; progress: UserProgress }) {
  return (
    <Link href={`/show/${show.id}`} asChild>
      <Pressable className="mb-4 mx-4 overflow-hidden rounded-3xl border border-[#2A3042] bg-surface">
        <ImageBackground source={{ uri: show.backdropUrl }} className="h-36 justify-between p-3">
          <View className="self-end rounded-full bg-black/70 px-3 py-1"><Text className="text-xs text-white">▶ Continue</Text></View>
          <View>
            <Text className="font-semibold text-white">{show.title}</Text>
            <Text className="text-xs text-gray-200">{progress.leftLabel}</Text>
          </View>
        </ImageBackground>
        <View className="h-1.5 bg-[#2A3042]">
          <View className="h-1.5 bg-teal" style={{ width: `${progress.progress * 100}%` }} />
        </View>
      </Pressable>
    </Link>
  );
}
