import { fetchShow } from '@/lib/api';
import { useAppContext } from '@/context/AppContext';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function PlayerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const video = useRef<Video | null>(null);
  const [url, setUrl] = useState('');
  const [playing, setPlaying] = useState(true);
  const { progress, saveProgress } = useAppContext();

  useEffect(() => { fetchShow(id).then((s) => setUrl(s.item.videoUrl)); }, [id]);
  const resumeFrom = progress.find((p) => p.contentId === id)?.positionSec || 0;

  return <View className="flex-1 bg-black justify-center px-4">
    <Pressable onPress={() => router.back()} className="absolute left-4 top-14 z-20 rounded-full bg-black/60 px-3 py-2"><Text className="text-white">← Exit</Text></Pressable>
    {url ? <Video ref={video} source={{ uri: url }} style={{ width: '100%', height: '55%', borderRadius: 16 }} resizeMode={ResizeMode.CONTAIN} shouldPlay={playing} positionMillis={resumeFrom * 1000} onPlaybackStatusUpdate={(s:any)=>{ if (s?.positionMillis && s?.durationMillis) saveProgress(id, Math.floor(s.positionMillis/1000), Math.floor(s.durationMillis/1000)); }} /> : <Text className="text-white">Loading stream...</Text>}
    <View className="mt-8 rounded-2xl border border-[#2A3042] bg-[#121522] p-4"><Pressable onPress={()=>setPlaying((p)=>!p)}><Text className="text-white">{playing ? 'Pause' : 'Play'}</Text></Pressable></View>
  </View>;
}
