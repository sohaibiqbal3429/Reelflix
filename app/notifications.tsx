import { EmptyState } from '@/components/EmptyState';
import { NotifyButton } from '@/components/NotifyButton';
import { useAppContext } from '@/context/AppContext';
import { fetchHome } from '@/lib/api';
import { Show } from '@/lib/types';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function NotificationsScreen() {
  const router = useRouter();
  const { notifiedIds, toggleNotified } = useAppContext();
  const [all, setAll] = useState<Show[]>([]);
  useEffect(() => { fetchHome().then((d)=>setAll([...d.featured,...d.trending,...d.comingSoon])); }, []);
  const list = all.filter((s) => notifiedIds.includes(s.id));

  return <ScrollView className="flex-1 bg-bg pt-14 px-4"><View className="mb-4 flex-row items-center gap-3"><Pressable onPress={() => router.back()}><Text className="text-white">←</Text></Pressable><Text className="text-xl font-bold text-white">Release Notifications</Text></View>
    {!list.length ? <EmptyState title="No notifications yet" subtitle="Tap notify on titles." /> : null}
    {list.map((item) => <View key={item.id} className="mb-3 rounded-2xl border border-[#2A3042] bg-surface p-4"><Text className="font-semibold text-white">{item.title}</Text><Text className="mb-2 text-xs text-muted">{item.category}</Text><NotifyButton active onPress={() => toggleNotified(item.id)} /></View>)}
  </ScrollView>;
}
