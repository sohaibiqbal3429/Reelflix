import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export function AppHeader({ subtitleChip = 'Premium' }: { subtitleChip?: string }) {
  return (
    <View className="px-4 pb-3 pt-2">
      <LinearGradient colors={['rgba(30,230,211,0.16)', 'rgba(9,10,16,0)']} className="absolute inset-0" />
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="h-9 w-9 items-center justify-center rounded-2xl bg-surface border border-[#263048]">
            <Text className="text-teal font-bold">RF</Text>
          </View>
          <Text className="text-xl font-extrabold text-white">ReelFlix</Text>
          <View className="rounded-full border border-magenta/60 px-2 py-1">
            <Text className="text-[10px] font-semibold text-magenta">{subtitleChip}</Text>
          </View>
        </View>
        <View className="flex-row gap-2">
          <Link href="/notifications" asChild>
            <Pressable hitSlop={12} accessibilityLabel="Notifications" className="h-10 w-10 items-center justify-center rounded-full border border-[#2A3042] bg-surface">
              <Text className="text-white">🔔</Text>
            </Pressable>
          </Link>
          <Link href="/search" asChild>
            <Pressable hitSlop={12} accessibilityLabel="Search" className="h-10 w-10 items-center justify-center rounded-full border border-[#2A3042] bg-surface">
              <Text className="text-white">⌕</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
