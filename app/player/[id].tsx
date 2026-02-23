import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function PlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <View className="flex-1 bg-black justify-center px-4">
      <Pressable onPress={() => router.back()} className="absolute left-4 top-14 z-20 rounded-full bg-black/60 px-3 py-2"><Text className="text-white">← Exit</Text></Pressable>
      <View className="h-[55%] rounded-3xl border border-[#2A3042] bg-[#121522] items-center justify-center">
        <Text className="text-white">Player Placeholder • {id}</Text>
        <Text className="mt-2 text-xs text-muted">No streaming backend connected</Text>
      </View>
      <View className="mt-8 rounded-2xl border border-[#2A3042] bg-[#121522] p-4">
        <Text className="text-white">⏪ 10s     ▶/⏸     10s ⏩</Text>
        <View className="mt-3 h-1.5 rounded-full bg-[#2A3042]"><View className="h-1.5 w-1/3 rounded-full bg-teal" /></View>
        <Text className="mt-3 text-xs text-muted">Lock • Quality • Captions</Text>
      </View>
    </View>
  );
}
