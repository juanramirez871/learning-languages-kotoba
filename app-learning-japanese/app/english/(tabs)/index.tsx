import React, { useCallback, useRef, memo } from "react";
import { View, StyleSheet } from "react-native";
import words from "../../../constants/englishWords.json";
import { useFloatingWords } from "@/hooks/useFloatingWords";
import { FloatingWordItem } from "@/components/FloatingWords/FloatingWordItem";
import { PetMascot, PetMascotRef } from "@/components/PetMascot/PetMascot";
import { BackgroundDecor } from "@/components/BackgroundDecor/BackgroundDecor";

export default function EnglishWordsScreen() {

  const { floatingWords, removeFloatingWord } = useFloatingWords({ wordsList: words });
  const petRef = useRef<PetMascotRef>(null);
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

  return (
    <View style={styles.container}>
      <BackgroundDecor backgroundColor="#F0F4FD" characters={["A", "Z"]} />
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
      <PetMascot ref={petRef} />
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
});
