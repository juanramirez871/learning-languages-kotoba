import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";

export default function Selection() {
  const { selection } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome {selection}</Text>
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
    fontSize: 24,
    fontWeight: "bold",
  },
});
