import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EnglishWordsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to English Words section!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
