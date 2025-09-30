import SpaceXLaunchPad from "@/components/SpaceX/SpaceXLaunchPad";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SpaceXLaunchPadById() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SpaceXLaunchPad />
    </SafeAreaView>
  );
}
