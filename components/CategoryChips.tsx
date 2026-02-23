import { Category } from '@/lib/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, Text, View } from 'react-native';

export function CategoryChips({
  data,
  active,
  onChange,
}: {
  data: Category[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}>
      {data.map((item) => {
        const selected = item.id === active;
        return (
          <Pressable
            key={item.id}
            onPress={() => onChange(item.id)}
            className="overflow-hidden rounded-full"
            accessibilityLabel={`Category ${item.label || item.name}`}
          >
            {selected ? (
              <LinearGradient colors={['#1EE6D3', '#D946EF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                <View className="px-4 py-2">
                  <Text className="text-xs font-semibold text-black">{item.label || item.name}</Text>
                </View>
              </LinearGradient>
            ) : (
              <View className="rounded-full border border-[#2A3042] px-4 py-2">
                <Text className="text-xs text-muted">{item.label || item.name}</Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
