import { Show } from '@/lib/types';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export function RankedRow({ rank, show }: { rank: number; show: Show }) {
  return (
    <Link href={`/show/${show.id}`} asChild>
      <Pressable className="mx-4 mb-3 flex-row items-center rounded-2xl border border-[#2A3042] bg-surface p-3" style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
        <Text className="w-9 text-2xl font-extrabold text-teal">{rank}</Text>
        <Image source={{ uri: show.posterUrl }} className="h-16 w-12 rounded-xl" />
        <View className="ml-3 flex-1">
          <Text className="font-semibold text-white" numberOfLines={1}>{show.title}</Text>
          <Text className="text-xs text-muted">{show.views} views</Text>
          <Text className="mt-1 self-start rounded-full border border-[#3C445C] px-2 py-1 text-[10px] text-magenta">{show.genres[0]}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
