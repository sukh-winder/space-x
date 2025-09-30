import {
  calculateDistance,
  formatDistance,
  openMapsWithDirections,
  showMapsOptions,
} from "@/helper/common";
import { Launchpad } from "@/helper/types/launchPad";
import { useLocation } from "@/hooks/useLocation";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getLaunchPadById } from "../SpaceX/utils/apiServices";
import { IconSymbol } from "../ui/icon-symbol";

interface LaunchpadMapProps {
  launchpad: Launchpad;
}

function LaunchpadMap() {
  const {
    location: userLocation,
    loading: locationLoading,
    error: locationError,
    permissionStatus,
    requestPermission,
    getCurrentLocation,
  } = useLocation();

  const [distance, setDistance] = useState<number | null>(null);
  const [launchpad, setLaunchpad] = useState<Launchpad | null>(null);
  const { id } = useLocalSearchParams();

  const getDetails = useCallback(async () => {
    try {
      const response = await getLaunchPadById(id as string);
      if (response && response.status === 200) {
        setLaunchpad(response.data);
        console.log("Launch Pad Details:", response.data.id);
      }
    } catch (error) {
      console.error("Error fetching launch pad details:", error);
    }
  }, [id]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  // Calculate distance when user location is available
  useEffect(() => {
    if (userLocation && launchpad) {
      const dist = calculateDistance(
        userLocation.coords.latitude,
        userLocation.coords.longitude,
        launchpad?.latitude ?? 0,
        launchpad?.longitude ?? 0
      );
      setDistance(dist);
    }
  }, [userLocation, launchpad]);

  const handleGetLocation = useCallback(async () => {
    if (permissionStatus === "granted") {
      await getCurrentLocation();
    } else {
      const granted = await requestPermission();
      if (granted) {
        await getCurrentLocation();
      }
    }
  }, [getCurrentLocation, permissionStatus, requestPermission]);

  const handleDirections = () => {
    openMapsWithDirections({
      latitude: launchpad?.latitude ?? 0,
      longitude: launchpad?.longitude ?? 0,
      name: launchpad?.full_name ?? "Unknown Location",
    });
  };

  const handleMapPress = () => {
    showMapsOptions({
      latitude: launchpad?.latitude ?? 0,
      longitude: launchpad?.longitude ?? 0,
      name: launchpad?.full_name ?? "Unknown Location",
    });
  };

  const handleLocationError = useCallback(() => {
    if (locationError) {
      Alert.alert("Location Error", locationError, [
        { text: "Cancel", style: "cancel" },
        { text: "Try Again", onPress: handleGetLocation },
      ]);
    }
  }, [handleGetLocation, locationError]);

  // Show error alert when location error occurs
  useEffect(() => {
    if (locationError) {
      handleLocationError();
    }
  }, [handleLocationError, locationError]);

  return (
    <View style={styles.container}>
      {/* Map Placeholder */}
      <TouchableOpacity style={styles.mapContainer} onPress={handleMapPress}>
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapIcon}>🗺️</Text>
          <Text style={styles.mapTitle}>Interactive Map</Text>
          <Text style={styles.mapSubtitle}>Tap to open in Maps app</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>Launchpad Location</Text>
            {userLocation && (
              <Text style={styles.locationText}>Your Location</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {/* Location Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.locationName}>{launchpad?.full_name}</Text>
        <Text style={styles.locationDetails}>
          {launchpad?.locality}, {launchpad?.region}
        </Text>
        <Text style={styles.coordinates}>
          {launchpad?.latitude?.toFixed(6)}, {launchpad?.longitude?.toFixed(6)}
        </Text>

        {/* Distance Info */}
        {distance !== null && (
          <View style={styles.distanceContainer}>
            <IconSymbol name="location.fill" color="#007AFF" size={24} />
            <Text style={styles.distanceText}>
              {formatDistance(distance)} from your location
            </Text>
          </View>
        )}

        {/* Location Actions */}
        <View style={styles.actionsContainer}>
          {!userLocation && (
            <TouchableOpacity
              style={[styles.actionButton, styles.locationButton]}
              onPress={handleGetLocation}
              disabled={locationLoading}
            >
              {locationLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <IconSymbol
                    name="globe.americas.fill"
                    color="#ffffff"
                    size={24}
                  />
                  <Text style={[styles.actionButtonText]}>
                    Show My Location
                  </Text>
                </>
              )}
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionButton, styles.directionsButton]}
            onPress={handleDirections}
          >
            <IconSymbol name="location.fill" color="#ffffff" size={24} />
            <Text style={styles.actionButtonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>

        {/* Permission Status */}
        {permissionStatus === "denied" && (
          <View style={styles.permissionWarning}>
            <Text style={styles.permissionText}>
              Location permission denied. Enable location access in settings to
              see your distance to the launchpad.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  mapContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
  },
  mapIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  mapTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 8,
    textAlign: "center",
  },
  mapSubtitle: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
    textAlign: "center",
  },
  locationInfo: {
    alignItems: "center",
  },
  locationText: {
    fontSize: 14,
    color: "#007AFF",
    marginBottom: 4,
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  locationName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  locationDetails: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 4,
  },
  coordinates: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 12,
  },
  distanceContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f0f8ff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  distanceText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
    textAlign: "center",
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  locationButton: {
    backgroundColor: "#34C759",
  },
  directionsButton: {
    backgroundColor: "#007AFF",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  permissionWarning: {
    backgroundColor: "#fff3cd",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ffc107",
  },
  permissionText: {
    fontSize: 14,
    color: "#856404",
    lineHeight: 20,
  },
});

export default LaunchpadMap;
