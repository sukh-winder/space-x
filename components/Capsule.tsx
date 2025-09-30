import { statusMap } from "@/constants/constants";
import { Status } from "@/helper/types/commonTypes";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Capsule({ status }: { status: Status }) {
  return (
    <View>
      <Text
        style={[
          styles.statusText,
          { backgroundColor: statusMap[status]?.color || "gray" },
        ]}
      >
        {statusMap[status]?.status ?? "N/A"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statusText: {
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
    textTransform: "capitalize",
    color: "white",
    padding: 4,
    borderRadius: 8,
    width: 76,
  },
  success: { backgroundColor: "green" },
  upcoming: { backgroundColor: "orange" },
  na: { backgroundColor: "gray" },
});
