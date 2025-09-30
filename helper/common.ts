import { MapLocation } from "./types/commonTypes";
import { Launch } from "./types/launches";

import { Alert, Linking, Platform } from "react-native";

/**
 * Converts a Unix timestamp to DD/MM/YYYY format.
 * @param unixTimestamp number (in seconds)
 * @returns string - formatted date as DD/MM/YYYY
 */
export const formatUnixToDate = (
  unixTimestamp: number | null | undefined
): string => {
  // Multiply by 1000 because JS Date expects milliseconds
  if (!unixTimestamp) return "Invalid date";

  const date = new Date(unixTimestamp * 1000);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Converts a Unix timestamp to DD/MM/YYYY format.
 * @param array of Launch objects
 * @returns array of Launch objects with unique IDs
 */
export const dedupeById = (arr: Launch[]) => {
  const map = new Map<string, Launch>();
  for (const it of arr) {
    if (it.id) map.set(String(it.id), it);
  }
  return Array.from(map.values());
};

/**
 * Calculate distance between two coordinates using Haversine formula
 * @param lat1 latitude of point 1
 * @param lon1 longitude of point 1
 * @param lat2 latitude of point 2
 * @param lon2 longitude of point 2
 * @returns distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Convert degrees to radians
 * @param degrees angle in degrees
 * @returns angle in radians
 */
const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

/**
 * Format distance to human-readable string
 * @param distanceKm distance in kilometers
 * @returns formatted distance string (e.g., "500m", "2.5km")
 */
export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  if (distanceKm < 100) {
    return `${distanceKm.toFixed(1)}km`;
  }
  return `${Math.round(distanceKm)}km`;
};

/**
 * Open native Maps app with directions to a specific location
 * @param destination - object containing latitude, longitude, and optional name
 * @returns void
 **/
export const openMapsWithDirections = async (
  destination: MapLocation
): Promise<void> => {
  const { latitude, longitude } = destination;

  try {
    if (Platform.OS === "ios") {
      // Try Apple Maps first
      const appleMapsUrl = `maps://app?daddr=${latitude},${longitude}&dirflg=d`;
      const canOpenAppleMaps = await Linking.canOpenURL(appleMapsUrl);

      if (canOpenAppleMaps) {
        await Linking.openURL(appleMapsUrl);
        return;
      }

      // Fallback to Google Maps
      const googleMapsUrl = `https://maps.google.com/maps?daddr=${latitude},${longitude}&dirflg=d`;
      await Linking.openURL(googleMapsUrl);
    } else {
      // Android - try Google Maps app first
      const googleMapsAppUrl = `google.navigation:q=${latitude},${longitude}&mode=d`;
      const canOpenGoogleMaps = await Linking.canOpenURL(googleMapsAppUrl);

      if (canOpenGoogleMaps) {
        await Linking.openURL(googleMapsAppUrl);
        return;
      }

      // Fallback to web Google Maps
      const googleMapsWebUrl = `https://maps.google.com/maps?daddr=${latitude},${longitude}&dirflg=d`;
      await Linking.openURL(googleMapsWebUrl);
    }
  } catch (error) {
    console.error("Failed to open maps:", error);
    Alert.alert(
      "Unable to Open Maps",
      "Could not open the maps application. Please check if you have a maps app installed.",
      [{ text: "OK" }]
    );
  }
};

/**
 * Open location in maps app (without directions)
 * @param location - object containing latitude, longitude, and optional name
 * @returns void
 **/
export const openLocationInMaps = async (
  location: MapLocation
): Promise<void> => {
  const { latitude, longitude, name } = location;
  const label = name ? encodeURIComponent(name) : "Location";

  try {
    if (Platform.OS === "ios") {
      const appleMapsUrl = `maps://app?ll=${latitude},${longitude}&q=${label}`;
      const canOpenAppleMaps = await Linking.canOpenURL(appleMapsUrl);

      if (canOpenAppleMaps) {
        await Linking.openURL(appleMapsUrl);
        return;
      }

      const googleMapsUrl = `https://maps.google.com/maps?q=${latitude},${longitude}(${label})`;
      await Linking.openURL(googleMapsUrl);
    } else {
      const googleMapsUrl = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;
      const canOpenGeoUrl = await Linking.canOpenURL(googleMapsUrl);

      if (canOpenGeoUrl) {
        await Linking.openURL(googleMapsUrl);
        return;
      }

      const googleMapsWebUrl = `https://maps.google.com/maps?q=${latitude},${longitude}(${label})`;
      await Linking.openURL(googleMapsWebUrl);
    }
  } catch (error) {
    console.error("Failed to open location in maps:", error);
    Alert.alert("Unable to Open Maps", "Could not open the maps application.", [
      { text: "OK" },
    ]);
  }
};

/**
 * Show options for opening maps
 * @param location - object containing latitude, longitude, and optional name
 * @returns void
 **/
export const showMapsOptions = (location: MapLocation): void => {
  const { name } = location;
  const locationName = name || "this location";

  Alert.alert(
    "Open in Maps",
    `Choose how you'd like to view ${locationName}:`,
    [
      {
        text: "Get Directions",
        onPress: () => openMapsWithDirections(location),
      },
      {
        text: "View Location",
        onPress: () => openLocationInMaps(location),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]
  );
};
