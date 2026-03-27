import { ALPHABET, CARD_COLORS } from "../../constants/alphabetEnglish";
import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import styles from "./styles";

export default function LetterCard({ item, index }: { item: typeof ALPHABET[0]; index: number }) {

  const [pressed, setPressed] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const color = CARD_COLORS[index % CARD_COLORS.length];

  async function playSound() {
    try {
      if (sound) {
        await sound.replayAsync();
      } else {
        const { sound: newSound } = await Audio.Sound.createAsync(item.sound, { volume: 1.0 });
        setSound(newSound);
        await newSound.playAsync();
      }
    } catch (error) {
      console.log("Error playing sound:", error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={playSound}
      style={[
        styles.card,
        {
          backgroundColor: color.bg,
          borderColor: pressed ? color.letter : color.border,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}
    >
      <Text style={[styles.letterText, { color: color.letter }]}>{item.letter}</Text>
      <Text style={[styles.pronText, { color: color.letter }]}>{item.pronunciation}</Text>
    </TouchableOpacity>
  );
}