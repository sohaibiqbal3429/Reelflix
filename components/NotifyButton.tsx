import { Pressable, Text } from 'react-native';

export function NotifyButton({ active, onPress }: { active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      className={`rounded-full px-4 py-2 ${active ? 'bg-teal/20 border border-teal' : 'bg-surface border border-[#2A3042]'}`}
      accessibilityLabel={active ? 'Notified enabled' : 'Notify me'}
    >
      <Text className={`text-xs font-semibold ${active ? 'text-teal' : 'text-white'}`}>{active ? '🔔 Notified' : '🔔 Notify Me'}</Text>
    </Pressable>
  );
}
