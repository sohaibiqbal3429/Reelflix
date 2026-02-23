import { Show } from '@/lib/types';
import { Link } from 'expo-router';
import { ImageBackground, Pressable, Text, View } from 'react-native';

export function PosterCard({ show, small, onLongPress }: { show: Show; small?: boolean; onLongPress?: (id: string) => void }) {
  const height = small ? 170 : 240;
  return (
    <Link href={`/show/${show.id}`} asChild>
      <Pressable onLongPress={() => onLongPress?.(show.id)} delayLongPress={300} className="mb-4 w-[48%]" style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.97 : 1 }] })}>
        <ImageBackground source={{ uri: show.thumbnailUrl }} className="overflow-hidden rounded-[20px] border border-[#2A3042]" style={{ height }} imageStyle={{ borderRadius: 20 }}>
          <View className="m-2 self-start rounded-full bg-black/70 px-2 py-1"><Text className="text-[10px] text-white">▶ {show.views}</Text></View>
        </ImageBackground>
        <Text className="mt-2 text-sm font-semibold text-white" numberOfLines={1}>{show.title}</Text>
        <Text className="text-[11px] text-muted" numberOfLines={1}>{show.category}</Text>
      </Pressable>
    </Link>
  );
}
