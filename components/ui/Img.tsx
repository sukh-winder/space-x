import React, { memo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  View,
} from "react-native";

function Img({ uri, style }: { uri: string; style?: StyleProp<ImageStyle> }) {
  const [imageLoading, setImageLoading] = useState<boolean>(true);
  const [error, setError] = useState(false);
  return (
    <View>
      {!error && uri ? (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri }}
            style={[styles.image, style]}
            resizeMode="contain"
            onLoadStart={() => {
              setImageLoading(true);
              setError(false);
            }}
            onLoad={() => setImageLoading(false)}
            onError={(e) => {
              console.warn("Image load error", uri, e.nativeEvent);
              setImageLoading(false);
              setError(true);
            }}
          />

          {imageLoading && (
            <View style={[styles.imageLoader, style]}>
              <ActivityIndicator />
            </View>
          )}
        </View>
      ) : (
        <View style={[styles.image, styles.fallback, style]}>
          <Text style={styles.fallbackText}>No Image Available</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageLoader: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  fallback: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 8,
  },
  fallbackText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "center",
  },
});

export default memo(Img);
