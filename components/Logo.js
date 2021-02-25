import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Constants from "expo-constants";
import colors from "../assets/colors";
const { brink_pink, grey } = colors;

export default function MyComponent({ size }) {
  return (
    <View style={styles.header}>
      <Image
        style={(styles.logo, { height: size })}
        source={require("../assets/logo-airbnb.png")}
        resizeMode="contain"
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});
