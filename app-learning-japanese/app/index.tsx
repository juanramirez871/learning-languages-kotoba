import React from "react";
import { View, Text, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { LANGUAGES } from "../constants/languages";
import { LanguageCard } from "../components/LanguageCard";
import { styles } from "../styles/index.styles";

export default function Index() {

  const router = useRouter();
  const handleSelection = (choice: string) => {
    const route = choice === "english" ? "/english/(tabs)" : "/japanese/(tabs)";
    router.push(route);
  };

  return (
    <LinearGradient
      colors={["#DFF0FF", "#F9ECF4", "#FFF7EC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>¿Qué idioma{"\n"}quieres aprender hoy?</Text>
        <Text style={styles.headerSubtitle}>Elige uno para comenzar</Text>
      </View>

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
