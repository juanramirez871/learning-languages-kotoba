import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
  width: "23%",
  aspectRatio: 0.85,
  borderRadius: 16,
  borderWidth: 1.5,
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 10,
  shadowColor: "#c4855a",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.12,
  shadowRadius: 8,
  elevation: 3,
},
letterText: {
  fontSize: 34,
  fontWeight: "800",
  lineHeight: 38,
},
pronText: {
  fontSize: 12,
  fontWeight: "500",
  opacity: 0.6,
  marginTop: 2,
},
});