import { ALPHABET, CARD_COLORS } from "../../constants/alphabetEnglish";
import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

export default function LetterCard({ item, index }: { item: typeof ALPHABET[0]; index: number }) {

  const [pressed, setPressed] = useState(false);
  const color = CARD_COLORS[index % CARD_COLORS.length];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
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