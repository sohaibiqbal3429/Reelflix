import { Text, View } from 'react-native';

export function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View className="mb-3 mt-5 flex-row items-end justify-between px-4">
      <View>
        <Text className="text-xl font-bold text-white">{title}</Text>
        {subtitle ? <Text className="text-xs text-muted mt-0.5">{subtitle}</Text> : null}
      </View>
    </View>
  );
}
