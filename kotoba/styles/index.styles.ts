import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 26,
    paddingTop: 64,
    paddingBottom: 8,
  },
  logoWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 3,
  },
  logoText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1C1C1E",
    letterSpacing: -0.6,
  },
  logoDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FF4D6D",
    marginTop: 3,
  },
  hero: {
    paddingHorizontal: 26,
    paddingTop: 28,
    paddingBottom: 32,
  },
  tagline: {
    fontSize: 11,
    fontWeight: "700",
    color: "#AAAAAA",
    letterSpacing: 2.5,
    marginBottom: 12,
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: "#1C1C1E",
    lineHeight: 44,
    letterSpacing: -1,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 14,
  },
  mascotContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 140,
    height: 140,
    zIndex: 0,
    opacity: 0.92,
  },
  mascotImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
