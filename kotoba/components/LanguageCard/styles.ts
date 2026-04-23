import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    height: 270,
    borderRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 20,
    elevation: 8,
  },
  bg: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: 22,
    paddingTop: 18,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  levelText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.8,
  },
  bottomRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  textGroup: {
    flex: 1,
  },
  label: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "400",
    marginTop: 4,
  },
  cta: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  ctaText: {
    fontSize: 20,
    fontWeight: "600",
  },
});
