import { Show } from '@/lib/types';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export function RankedRow({ rank, show }: { rank: number; show: Show }) {
  return (
    <Link href={`/show/${show.id}`} asChild>
      <Pressable className="mx-4 mb-3 flex-row items-center rounded-2xl border border-[#2A3042] bg-surface p-3">
        <Text className="w-9 text-2xl font-extrabold text-teal">{rank}</Text>
        <Image source={{ uri: show.thumbnailUrl }} className="h-16 w-12 rounded-xl" />
        <View className="ml-3 flex-1"><Text className="font-semibold text-white">{show.title}</Text><Text className="text-xs text-muted">{show.views} views</Text></View>
      </Pressable>
    </Link>
  );
}
