import React from "react";
import { View, Text, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LANGUAGES } from "../constants/languages";
import { LanguageCard } from "../components/LanguageCard";
import { styles } from "./index.styles";

export default function Index() {
  const router = useRouter();

  const handleSelection = (choice: string) =>
    router.push({
      pathname: "/[selection]",
      params: { selection: choice },
    });

  return (
    <LinearGradient
      colors={["#DFF0FF", "#F9ECF4", "#FFF7EC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>¿Qué idioma{"\n"}quieres aprender hoy?</Text>
        <Text style={styles.headerSubtitle}>Elige uno para comenzar</Text>
      </View>

      {/* Cards */}
      <View style={styles.cardsContainer}>
        {LANGUAGES.map((lang) => (
          <LanguageCard
            key={lang.key}
            lang={lang}
            onPress={() => handleSelection(lang.key)}
          />
        ))}
      </View>
    </LinearGradient>
  );
}
