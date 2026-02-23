import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121522', borderTopColor: '#262c3c' },
        tabBarActiveTintColor: '#1EE6D3',
        tabBarInactiveTintColor: '#8c93a8',
      }}
    >
      <Tabs.Screen name="discover" options={{ title: 'Discover', tabBarIcon: ({ color }) => <Text style={{ color }}>🏠</Text> }} />
      <Tabs.Screen name="foryou" options={{ title: 'For You', tabBarIcon: ({ color }) => <Text style={{ color }}>✨</Text> }} />
      <Tabs.Screen name="library" options={{ title: 'My Library', tabBarIcon: ({ color }) => <Text style={{ color }}>📚</Text> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color }) => <Text style={{ color }}>👤</Text> }} />
    </Tabs>
  );
}
