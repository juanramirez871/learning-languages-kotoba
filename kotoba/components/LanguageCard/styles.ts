import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 20,
    borderWidth: 1.5,
    overflow: "hidden",
    alignItems: "center",
    shadowColor: "#8ab4d4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  flagWrapper: {
    width: 130,
    height: 130,
  },
  flag: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  cardBody: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 18,
    gap: 4,
  },
  label: {
    fontSize: 22,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 13,
    color: "#888780",
    fontWeight: "400",
    marginBottom: 12,
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
