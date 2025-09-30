import SpaceXList from '@/components/SpaceX/SpaceXList';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SpaceX() {
  return (
    <SafeAreaView style={{flex: 1}}>
        <SpaceXList />
    </SafeAreaView>
  )
}
