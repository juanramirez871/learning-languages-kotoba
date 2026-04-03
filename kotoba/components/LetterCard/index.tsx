import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import styles from "./styles";

interface LetterCardProps {
  text: string;
  subtitle: string;
  rom?: string;
  sound: any;
  color: {
    bg: string;
    border: string;
    letter: string;
  };
  style?: any;
}

export default function LetterCard({
  text,
  subtitle,
  rom,
  sound: soundSource,
  color,
  style,
}: LetterCardProps) {

  const [pressed, setPressed] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  if (!text)
    return (
      <TouchableOpacity
        disabled
        style={[
          styles.card,
          {
            backgroundColor: "rgba(0,0,0,0.02)",
            borderColor: "transparent",
            shadowOpacity: 0,
            elevation: 0,
          },
          style,
        ]}
      />
    );

  async function playSound() {
    if (!soundSource) return;
    try {
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
        style,
      ]}
    >
      <Text style={[styles.letterText, { color: color.letter }]}>{text}</Text>
      {rom && (
        <Text
          style={[
            styles.pronText,
            {
              color: color.letter,
              fontSize: 9,
              opacity: 0.8,
              marginBottom: -2,
            },
          ]}
        >
          {rom}
        </Text>
      )}
      <Text style={[styles.pronText, { color: color.letter }]}>{subtitle}</Text>
    </TouchableOpacity>
  );
}
