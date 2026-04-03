import { ImageSourcePropType } from "react-native";

export type TabConfig = {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
};

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
  tabs: TabConfig[];
};

export const LANGUAGES: Language[] = [
  {
    key: "english",
    label: "English",
    subtitle: "Speak to the world",
    bgColor: "#EAF4FF",
    borderColor: "#B5D4F4",
    accentColor: "#185FA5",
    badgeBg: "#B5D4F4",
    badgeText: "#0C447C",
    image: require("../assets/images/england-flag.jpg"),
    tabs: [
      { id: "index", label: "Words", icon: "book-outline" },
      { id: "alphabet", label: "Alphabet", icon: "alphabetical" },
    ],
  },
  {
    key: "japanese",
    label: "Japonés",
    subtitle: "世界と話しましょう",
    bgColor: "#FCEEF1",
    borderColor: "#F4C0D1",
    accentColor: "#993556",
    badgeBg: "#F4C0D1",
    badgeText: "#72243E",
    image: require("../assets/images/japan-flag.webp"),
    tabs: [
      { id: "index", label: "言葉", sublabel: "kotoba", icon: "book-outline" },
      { id: "hiragana", label: "平仮名", sublabel: "hiragana", icon: "syllabary-hiragana" },
      { id: "katakana", label: "片仮名", sublabel: "katakana", icon: "syllabary-katakana" },
    ],
  },
];
