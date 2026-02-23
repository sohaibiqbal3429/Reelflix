import { Show } from '@/lib/types';
import { Link } from 'expo-router';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';

export function HeroCarousel({ items }: { items: Show[] }) {
  return (
    <View className="mt-4">
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
        {items.map((item) => (
          <Link href={`/show/${item.id}`} asChild key={item.id}>
            <Pressable className="h-56 w-[320px] overflow-hidden rounded-[24px] border border-[#2B3145]" style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.98 : 1 }] })}>
              <ImageBackground source={{ uri: item.backdropUrl }} className="h-full w-full justify-end" imageStyle={{ borderRadius: 24 }}>
                <View className="bg-black/45 p-4">
                  <View className="mb-2 flex-row items-center gap-2">
                    <Text className="rounded-full bg-black/60 px-2 py-1 text-xs text-white">▶ {item.views}</Text>
                    {item.isNew ? <Text className="rounded-full bg-magenta px-2 py-1 text-xs font-semibold text-white">New</Text> : null}
                  </View>
                  <Text className="text-xl font-bold text-white">{item.title}</Text>
                  <Text className="text-xs text-gray-200">{item.genres.join(' • ')}</Text>
                </View>
              </ImageBackground>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
      <View className="mt-3 flex-row justify-center gap-1.5">
        {items.slice(0, 4).map((_, idx) => (
          <View key={idx} className={`h-1.5 rounded-full ${idx === 0 ? 'w-5 bg-teal' : 'w-1.5 bg-[#475067]'}`} />
        ))}
      </View>
    </View>
  );
}
