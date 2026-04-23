import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import words from "../../../constants/japaneseWords.json";
import { useFloatingWords } from "@/hooks/useFloatingWords";
import { useWordProgress } from "@/hooks/useWordProgress";
import { FloatingWordItem } from "@/components/FloatingWords/FloatingWordItem";
import { PetMascot, PetMascotRef } from "@/components/PetMascot/PetMascot";
import { BackgroundDecor } from "@/components/BackgroundDecor/BackgroundDecor";
import { Ionicons } from '@expo/vector-icons';
import { SettingsModal } from "@/components/Settings";

const getKey = (word: any) => word.japanese;

export default function JapaneseWordsScreen() {

  const { pickWord, onWordTapped, onWordPassed } = useWordProgress("japanese", getKey);
  const { floatingWords, removeFloatingWord, completeFloatingWord } = useFloatingWords({
    wordsList: words,
    pickWord,
    onWordPassed,
  });
  const petRef = useRef<PetMascotRef>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const handleWordPress = useCallback((word: any) => {
    const started = petRef.current?.triggerJump({
      primary: word.data.japanese,
      secondary: word.data.pronounciation,
      extra: word.data.spanish,
      soundText: word.data.pronounciation
    });

    if (started) {
      onWordTapped(word.data);
      removeFloatingWord(word.id);
    }
  }, [removeFloatingWord, onWordTapped]);

  const handlePetPress = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];

    petRef.current?.triggerJump({
      primary: randomWord.japanese,
      secondary: randomWord.pronounciation,
      extra: randomWord.spanish,
      soundText: randomWord.pronounciation
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => setIsSettingsVisible(true)}
      >
        <Ionicons name="settings" size={24} color="black" />
      </TouchableOpacity>

      <BackgroundDecor characters={["夢", "犬"]} />
      <PetMascot ref={petRef} type="japanese" onPressWithoutWord={handlePetPress} />
      {floatingWords.map((word) => (
        <FloatingWordItem
          key={word.id}
          id={word.id}
          top={word.top}
          duration={word.duration}
          primaryText={word.data.japanese}
          secondaryText={word.data.pronounciation}
          onComplete={completeFloatingWord}
          onPress={() => handleWordPress(word)}
        />
      ))}

      <SettingsModal
        isVisible={isSettingsVisible}
        onClose={() => setIsSettingsVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FDF0F3",
  },
  settingsIcon: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
});
