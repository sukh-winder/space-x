import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

interface LocationState {
  location: Location.LocationObject | null;
  loading: boolean;
  error: string | null;
  permissionStatus: Location.PermissionStatus | null;
}

interface LocationActions {
  requestPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<void>;
  clearError: () => void;
}

export const useLocation = (): LocationState & LocationActions => {
  const [location, setLocation] = useState<LocationState>({
    location: null,
    loading: false,
    error: null,
    permissionStatus: null,
  });

  // Check initial permission status
  useEffect(() => {
    const checkPermission = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        setLocation((prev) => ({ ...prev, permissionStatus: status }));
      } catch (error) {
        console.warn("Failed to check location permission:", error);
      }
    };

    checkPermission();
  }, []);

  // Request location permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    try {
      setLocation((prev) => ({ ...prev, loading: true, error: null }));

      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocation((prev) => ({
        ...prev,
        permissionStatus: status,
        loading: false,
      }));

      if (status !== "granted") {
        setLocation((prev) => ({
          ...prev,
          error:
            "Location permission is required to show your distance to the launchpad",
        }));
        return false;
      }

      return true;
    } catch (error: any) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error: error.message || "Failed to request location permission",
      }));
      return false;
    }
  }, []);

  // Get current location
  const getCurrentLocation = useCallback(async () => {
    try {
      setLocation((prev) => ({ ...prev, loading: true, error: null }));

      // Check permission first
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const granted = await requestPermission();
        if (!granted) {
          setLocation((prev) => ({ ...prev, loading: false }));
          return;
        }
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 10000,
        distanceInterval: 100,
      });

      setLocation((prev) => ({
        ...prev,
        location,
        loading: false,
        error: null,
      }));
    } catch (error: any) {
      setLocation((prev) => ({
        ...prev,
        loading: false,
        error:
          error.message ||
          "Failed to get current location. Please check your location settings.",
      }));
    }
  }, [requestPermission]);

  // Clear error
  const clearError = useCallback(() => {
    setLocation((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...location,
    requestPermission,
    getCurrentLocation,
    clearError,
  };
};
