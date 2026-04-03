import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    width: "18%",
    aspectRatio: 0.85,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    shadowColor: "#993556",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  letterText: {
    fontSize: 22,
    fontWeight: "800",
  },
  pronText: {
    fontSize: 10,
    fontWeight: "500",
    opacity: 0.65,
    marginTop: 2,
  },
});