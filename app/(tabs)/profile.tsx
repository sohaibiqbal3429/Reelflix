import { Pressable, ScrollView, Text, View } from 'react-native';

const settings = ['Preferred Language', 'Parental Controls', 'App Settings', 'Help & Support', 'Follow Us'];

export default function ProfileScreen() {
  return (
    <ScrollView className="flex-1 bg-bg pt-14 px-4">
      <View className="rounded-3xl border border-[#2A3042] bg-surface p-4">
        <View className="flex-row items-center gap-3">
          <View className="h-14 w-14 items-center justify-center rounded-full bg-teal/20"><Text className="text-xl font-bold text-teal">R</Text></View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-white">Rafi Noor</Text>
            <Text className="text-xs text-muted">rafi@mail.com • +92-300-0000000</Text>
            <Text className="text-[10px] text-muted">User ID: RF-8392</Text>
          </View>
          <Text className="text-white">✎</Text>
        </View>
      </View>
      <View className="mt-4 rounded-3xl border border-magenta/40 bg-magenta/10 p-4">
        <Text className="text-sm font-semibold text-white">Premium Plan Active</Text>
        <Text className="text-xs text-muted mt-1">Expires on 14 Sep 2026</Text>
        <Pressable className="mt-3 self-start rounded-full bg-white px-3 py-2"><Text className="text-xs font-semibold text-black">Manage Plan</Text></Pressable>
      </View>

      <View className="mt-5 gap-3">
        {settings.map((item) => (
          <Pressable key={item} className="rounded-2xl border border-[#2A3042] bg-surface p-4">
            <Text className="font-semibold text-white">{item}</Text>
          </Pressable>
        ))}
      </View>
      <Text className="pb-20 pt-6 text-center text-xs text-muted">ReelFlix v1.0.0</Text>
    </ScrollView>
  );
}
