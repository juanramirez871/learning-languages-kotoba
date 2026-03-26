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
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
