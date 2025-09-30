import React from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { IconSymbol } from "./icon-symbol";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
}

export default function SearchBar({
  placeholder,
  value,
  onChange,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
      {value.length > 0 && (
        <Pressable
          hitSlop={10}
          onPress={() => onChange("")}
          style={styles.iconContainer}
        >
          <IconSymbol name="clear.fill" color="grey" size={20} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    width: "100%",
    height: 46,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    height: "100%",
    borderWidth: 0,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
