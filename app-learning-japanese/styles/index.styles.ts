import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop: 64,
    paddingHorizontal: 22,
    paddingBottom: 32,
    overflow: "hidden",
  },
  header: {
    marginBottom: 32,
    marginTop: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 38,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888780",
    fontWeight: "400",
  },
  cardsContainer: {
    gap: 16,
  },
  imageContainer: {
    position: "absolute",
    bottom: -30,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  decorText: {
    position: "absolute",
    color: "#000",
    opacity: 0.03,
    fontWeight: "900",
    zIndex: -1,
  },
  decorLine: {
    position: "absolute",
    backgroundColor: "#000",
    opacity: 0.03,
    zIndex: -1,
  },
  accent: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(0, 0, 0, 0.02)",
    zIndex: -1,
  },
});
