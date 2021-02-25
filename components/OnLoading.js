import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";

export default function OnLoading({ color }) {
  return (
    <View style={styles.on_loading}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  on_loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
});
