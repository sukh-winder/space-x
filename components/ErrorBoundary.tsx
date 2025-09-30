import React, { memo, ReactNode, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

function ErrorBoundary({ children, fallback }: Props) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handleRetry = () => {
    setHasError(false);
    setError(undefined);
  };

  try {
    if (hasError) {
      if (fallback) {
        return <>{fallback}</>;
      }
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Oops! Something went wrong</Text>
          <Text style={styles.message}>
            {error?.message || "An unexpected error occurred"}
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return <>{children}</>;
  } catch (err) {
    console.error("ErrorBoundary caught an error:", err);
    setHasError(true);
    setError(err instanceof Error ? err : new Error(String(err)));
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 12,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default memo(ErrorBoundary);
