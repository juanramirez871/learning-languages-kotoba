import { StyleSheet } from "react-native";

export default StyleSheet.create({
  petSection: {
    position: "absolute",
    bottom: -50,
    alignItems: "center",
  },
  speechBubble: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: -110,
    elevation: 8,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    zIndex: 10,
  },
  primaryText: {
    fontSize: 24,
    fontWeight: "300",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  secondaryText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 8,
  },
  extraText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#993556",
  },
  petContainer: {
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10
  },
  image: {
    width: "100%",
    height: "100%",
  },
});