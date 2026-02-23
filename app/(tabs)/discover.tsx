import { AppHeader } from '@/components/AppHeader';
import { CategoryChips } from '@/components/CategoryChips';
import { HeroCarousel } from '@/components/HeroCarousel';
import { PosterCard } from '@/components/PosterCard';
import { RankedRow } from '@/components/RankedRow';
import { SectionHeader } from '@/components/SectionHeader';
import { SkeletonBlock } from '@/components/SkeletonBlock';
import { fetchHome } from '@/lib/api';
import { HomePayload } from '@/lib/types';
import { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';

export default function DiscoverScreen() {
  const [data, setData] = useState<HomePayload | null>(null);
  const [active, setActive] = useState('featured');

  useEffect(() => { fetchHome().then(setData).catch(() => setData(null)); }, []);
  const list = active === 'trending' ? data?.trending : active === 'top-ranked' ? data?.topRanked : active === 'coming-soon' ? data?.comingSoon : data?.featured;

  return <View className="flex-1 bg-bg pt-12">
    <AppHeader />
    <CategoryChips data={[{id:'featured',label:'Featured'},{id:'trending',label:'Trending'},{id:'top-ranked',label:'Top Ranked'},{id:'coming-soon',label:'Coming Soon'},...(data?.categories||[]).map(c=>({id:c.name||c.id,label:c.name||c.label||''}))]} active={active} onChange={setActive} />
    {!data ? <View className="px-4"><SkeletonBlock style={{ height: 220, marginTop: 14 }} /></View> : (
      <ScrollView>
        <HeroCarousel items={data.featured.slice(0,4)} />
        <SectionHeader title="Catalog" />
        {active === 'top-ranked' ? list?.map((show, idx) => <RankedRow key={show.id} rank={idx+1} show={show} />) :
          <FlatList data={list} numColumns={2} scrollEnabled={false} keyExtractor={(i)=>i.id} contentContainerStyle={{paddingHorizontal:16,paddingBottom:120}} columnWrapperStyle={{justifyContent:'space-between'}} renderItem={({item}) => <PosterCard show={item} />} />}
      </ScrollView>
    )}
  </View>;
}
