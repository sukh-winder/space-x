import LaunchPadMap from "@/components/LaunchPad/LaunchPadMap";
import SpaceXLaunchPad from "@/components/SpaceX/SpaceXLaunchPad";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const Tabs = createMaterialTopTabNavigator();

export default function SpaceXLaunchPadById() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs.Navigator
        initialRouteName="LaunchPad"
        screenOptions={{
          // styling
          tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
          tabBarIndicatorStyle: { backgroundColor: "#007AFF", height: 3 },
          tabBarStyle: { elevation: 2 },
          tabBarPressColor: "rgba(0,122,255,0.1)",
          tabBarShowIcon: false,
          tabBarShowLabel: true,
          swipeEnabled: true,
          lazy: true, // render screens on demand
        }}
      >
        <Tabs.Screen
          name="LaunchPad"
          component={SpaceXLaunchPad}
          options={{ title: "LaunchPad" }}
        />
        <Tabs.Screen
          name="Map"
          component={LaunchPadMap}
          options={{ title: "Map" }}
        />
      </Tabs.Navigator>
    </SafeAreaView>
  );
}
