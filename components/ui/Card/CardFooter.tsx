import React from "react";
import { StyleProp, StyleSheet, View } from "react-native";

interface CardFooterProps {
  children: React.ReactNode;
  style?: StyleProp<any>;
}

export default function CardFooter({ children, style }: CardFooterProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
});
