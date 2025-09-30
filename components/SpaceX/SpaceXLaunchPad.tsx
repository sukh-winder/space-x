import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function SpaceXLaunchPad() {
  return (
    <View style={styles.container}>
      <Text>SpaceXLaunchPad</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
