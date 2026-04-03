import { StyleSheet } from "react-native";

export default StyleSheet.create({
  floatingWordContainer: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  floatingBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(240, 240, 240, 0.8)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  floatingPrimaryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  floatingSecondaryText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
});
