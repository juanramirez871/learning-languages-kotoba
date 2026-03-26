import { ImageSourcePropType } from "react-native";

export type Language = {
  key: string;
  label: string;
  subtitle: string;
  bgColor: string;
  borderColor: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  image: ImageSourcePropType;
};

export const LANGUAGES: Language[] = [
  {
    key: "Ingles",
    label: "English",
    subtitle: "Speak to the world",
    bgColor: "#EAF4FF",
    borderColor: "#B5D4F4",
    accentColor: "#185FA5",
    badgeBg: "#B5D4F4",
    badgeText: "#0C447C",
    image: require("../assets/images/usa-flag.jpg"),
  },
  {
    key: "Japones",
    label: "Japonés",
    subtitle: "世界と話しましょう",
    bgColor: "#FCEEF1",
    borderColor: "#F4C0D1",
    accentColor: "#993556",
    badgeBg: "#F4C0D1",
    badgeText: "#72243E",
    image: require("../assets/images/japan-flag.webp"),
  },
];
