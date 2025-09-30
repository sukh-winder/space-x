import Capsule from "@/components/Capsule";
import { formatUnixToDate } from "@/helper/common";
import { Launch } from "@/helper/types/launches";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "../icon-symbol";
import Img from "../Img";
import CardFooter from "./CardFooter";

function Card({ item }: { item: Launch }) {
  const router = useRouter();

  return (
    <View style={styles.listWrapper}>
      <View style={styles.listContainer}>
        <View style={styles.infoContainer}>
          <Img
            uri={item.links?.patch?.small ?? ""}
            style={{ width: 100, height: 100 }}
          />
          <View style={styles.itemContainer}>
            <Text
              style={styles.launchName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name ?? "something wrong"}
            </Text>
            <Text>{formatUnixToDate(item?.date_unix)}</Text>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.launchDetails}
            >
              {item.details ?? "Description not available"}
            </Text>
          </View>
        </View>
        <Capsule
          status={{ success: item?.success!, upcoming: item?.upcoming! }}
        />
      </View>

      <CardFooter>
        <TouchableOpacity
          onPress={() => router.push(`/(space-x)/${item.id}`)}
          style={styles.navigationLink}
        >
          <View style={styles.iconContainer}>
            <Text style={{ color: "blue" }}>View Details</Text>
            <IconSymbol name="chevron.right" color="blue" size={20} />
          </View>
        </TouchableOpacity>
      </CardFooter>
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 8,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  launchName: {
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  launchDetails: {
    width: 200,
    color: "#666",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  itemContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 6,
    flexWrap: "wrap",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  navigationLink: {
    alignItems: "flex-end",
  },
});

export default memo(Card);
