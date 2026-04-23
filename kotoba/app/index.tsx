import React, { useState, useEffect } from "react";
import { View, Text, StatusBar, Image } from "react-native";
import { useRouter } from "expo-router";
import { Audio } from "expo-av";
import { LANGUAGES } from "../constants/languages";
import { LanguageCard } from "../components/LanguageCard";
import { styles } from "../styles/index.styles";
import { ENGLISH_GREETINGS, JAPANESE_GREETINGS } from "@/constants/greetings";
import { useSettings } from "@/context/SettingsContext";

export default function Index() {
  const router = useRouter();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { isSoundEnabled } = useSettings();

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  const playRandomGreeting = async (language: string) => {
    try {
      const greetings = language === "english" ? ENGLISH_GREETINGS : JAPANESE_GREETINGS;
      const randomIndex = Math.floor(Math.random() * greetings.length);
      const soundSource = greetings[randomIndex];
      if (!isSoundEnabled) return;

      const { sound: newSound } = await Audio.Sound.createAsync(
        soundSource,
        { shouldPlay: true, volume: 1.0 }
      );

      if (sound) await sound.unloadAsync();
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          newSound.unloadAsync();
          setSound(null);
        }
      });
    }
    catch (error) {
      console.log("Error playing greeting sound:", error);
    }
  };

  const handleSelection = async (choice: string) => {
    await playRandomGreeting(choice);
    const route = choice === "english" ? "/english/(tabs)" : "/japanese/(tabs)";
    router.push(route);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.topBar}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>kotoba</Text>
          <View style={styles.logoDot} />
        </View>
      </View>

      <View style={styles.hero}>
        <Text style={styles.tagline}>ELIGE TU IDIOMA</Text>
        <Text style={styles.title}>¿Qué quieres{"\n"}aprender hoy?</Text>
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

      <View style={styles.mascotContainer}>
        <Image
          source={require("../assets/images/icon-studing.png")}
          style={styles.mascotImage}
        />
      </View>
    </View>
  );
}
