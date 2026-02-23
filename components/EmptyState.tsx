import { Text, View } from 'react-native';

export function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View className="mx-4 mt-6 items-center rounded-3xl border border-dashed border-[#394056] p-8">
      <Text className="text-4xl">🎬</Text>
      <Text className="mt-3 text-base font-semibold text-white">{title}</Text>
      <Text className="mt-1 text-center text-xs text-muted">{subtitle}</Text>
    </View>
  );
}
