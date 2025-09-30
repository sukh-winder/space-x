import { Launchpad } from "@/helper/types/launchPad";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Capsule from "../Capsule";
import Img from "../ui/Img";
import { getLaunchPadById } from "./utils/apiServices";

export default function SpaceXLaunchPad() {
  const { id } = useLocalSearchParams();
  const [launchPadDetails, setLaunchPadDetails] =
    React.useState<Launchpad | null>(null);

  const getDetails = useCallback(async () => {
    try {
      const response = await getLaunchPadById(id as string);
      if (response && response.status === 200) {
        setLaunchPadDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching launch pad details:", error);
    }
  }, [id]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ gap: 10 }}>
      <View style={styles.card}>
        <Text>Basic Info:</Text>
        <Img
          uri={launchPadDetails?.images?.large[0] ?? ""}
          style={styles.img}
          resizeMode="cover"
        />
        <View style={styles.flexRowContainer}>
          <Text style={styles.launchPadName}>{launchPadDetails?.name}</Text>
          <Capsule status={launchPadDetails?.status} />
        </View>

        <View style={styles.cardBody}>
          {labelAndValue("Full name:", launchPadDetails?.full_name)}

          {labelAndValue(
            "Location:",
            `${launchPadDetails?.locality}, ${launchPadDetails?.region}`
          )}

          {labelAndValue(
            "Coordinates:",
            `Lat:${launchPadDetails?.latitude}, Lon:${launchPadDetails?.longitude}`
          )}

          {launchPadDetails?.timezone &&
            labelAndValue("Time Zone:", launchPadDetails.timezone)}

          {!launchPadDetails?.wikipedia ? null : (
            <>
              <Text style={styles.label}>Media:</Text>
              <View style={{ flexDirection: "row", gap: 10 }}>
                (
                <TouchableOpacity
                  onPress={() => Linking.openURL(launchPadDetails.wikipedia!)}
                >
                  <Text style={{ color: "blue" }}>Wikipedia</Text>
                </TouchableOpacity>
                )
              </View>
            </>
          )}
        </View>
      </View>

      <View style={[styles.card, { marginBottom: 30 }]}>
        <Text style={styles.label}>Details:</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <View style={[styles.card, { width: "30%" }]}>
            <Text style={styles.label}>Total Launches</Text>
            <Text style={[styles.launchPadName, { fontSize: 20 }]}>
              {launchPadDetails?.launches?.length ?? 0}
            </Text>
          </View>

          <View style={[styles.card, { flex: 1 }]}>
            <Text style={styles.label}>Launch Attempts</Text>
            <Text style={[styles.launchPadName, { fontSize: 20 }]}>
              {launchPadDetails?.launch_attempts ?? 0}
            </Text>
          </View>

          <View style={[styles.card, { flex: 1 }]}>
            <Text style={styles.label}>Launch Success</Text>
            <Text style={[styles.launchPadName, { fontSize: 20 }]}>
              {launchPadDetails?.launch_successes ?? 0}
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={[styles.launchPadName, { fontWeight: "600" }]}>
            {launchPadDetails?.details || "No details available"}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const labelAndValue = (label: string, value: string | null | undefined) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.launchPadName, { fontWeight: "600" }]}>{value}</Text>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 8,
    gap: 10,
  },
  cardBody: {
    gap: 4,
    // marginBottom: 20,
  },
  img: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  flexRowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "400",
    color: "#00000088",
  },
  launchPadName: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000000",
    flexShrink: 1,
    flexWrap: "wrap",
  },
  launchPadStatus: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666666",
  },
});
