import React, { useCallback, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import words from "../../../constants/englishWords.json";
import { useFloatingWords } from "@/hooks/useFloatingWords";
import { FloatingWordItem } from "@/components/FloatingWords/FloatingWordItem";
import { PetMascot, PetMascotRef } from "@/components/PetMascot/PetMascot";
import { BackgroundDecor } from "@/components/BackgroundDecor/BackgroundDecor";
import { Ionicons } from '@expo/vector-icons';
import { SettingsModal } from "@/components/Settings";

export default function EnglishWordsScreen() {

  const { floatingWords, removeFloatingWord } = useFloatingWords({ wordsList: words });
  const petRef = useRef<PetMascotRef>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const handleWordPress = useCallback((word: any) => {
    const started = petRef.current?.triggerJump({
      primary: word.data.word,
      extra: word.data.spanish,
      soundText: word.data.word
    });
    
    if (started) {
      removeFloatingWord(word.id);
    }
  }, [removeFloatingWord]);

  const handlePetPress = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    
    petRef.current?.triggerJump({
      primary: randomWord.word,
      extra: randomWord.spanish,
      soundText: randomWord.word
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
      
      <BackgroundDecor backgroundColor="#F0F4FD" characters={["A", "Z"]} />
      <PetMascot ref={petRef} type="english" onPressWithoutWord={handlePetPress} />
      {floatingWords.map((word) => (
        <FloatingWordItem
          key={word.id}
          id={word.id}
          top={word.top}
          duration={word.duration}
          primaryText={word.data.word}
          onComplete={removeFloatingWord}
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
    backgroundColor: "#F0F4FD",
  },
  settingsIcon: {
    position: "absolute",
    top: 60,
    right: 20,
    zIndex: 10,
  },
});
