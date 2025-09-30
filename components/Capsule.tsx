import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Capsule({
  status,
}: {
  status: {
    success: boolean;
    upcoming: boolean;
  };
}) {
  return (
    <View>
      {status.success ? (
        <Text style={[styles.statusText, styles.success]}>Success</Text>
      ) : status.upcoming ? (
        <Text style={[styles.statusText, styles.upcoming]}>Upcoming</Text>
      ) : (
        <Text style={[styles.statusText, styles.na]}>N/A</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  statusText: {
    fontSize: 14,
    textAlign: "center",
    color: "white",
    padding: 4,
    borderRadius: 8,
    width: 76,
  },
  success: { backgroundColor: "green" },
  upcoming: { backgroundColor: "orange" },
  na: { backgroundColor: "gray" },
});
