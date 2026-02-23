import { Show } from '@/lib/types';
import { Link } from 'expo-router';
import { ImageBackground, Pressable, ScrollView, Text, View } from 'react-native';

export function HeroCarousel({ items }: { items: Show[] }) {
  return (
    <View className="mt-4">
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}>
        {items.map((item) => (
          <Link href={`/show/${item.id}`} asChild key={item.id}>
            <Pressable className="h-56 w-[320px] overflow-hidden rounded-[24px] border border-[#2B3145]">
              <ImageBackground source={{ uri: item.bannerUrl || item.thumbnailUrl }} className="h-full w-full justify-end" imageStyle={{ borderRadius: 24 }}>
                <View className="bg-black/45 p-4">
                  <Text className="text-xl font-bold text-white">{item.title}</Text>
                  <Text className="text-xs text-gray-200">{item.category}</Text>
                </View>
              </ImageBackground>
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
}
