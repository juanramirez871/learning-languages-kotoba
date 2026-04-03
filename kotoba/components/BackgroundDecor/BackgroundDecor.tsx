import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import styles from "./index";

interface BackgroundDecorProps {
  backgroundColor?: string;
  characters?: string[];
}

export const BackgroundDecor = memo(({ 
  backgroundColor = "#FDF0F3", 
  characters = ["夢", "犬"] 
}: BackgroundDecorProps) => {
  return (
    <View style={[StyleSheet.absoluteFill, { backgroundColor }]} pointerEvents="none">
      <View style={[styles.decorLineVertical, { left: '5%', height: '100%', width: 1 }]} />
      <View style={[styles.decorLineVertical, { right: '5%', height: '100%', width: 1 }]} />
      <View style={[styles.decorLineHorizontal, { top: '10%', width: '100%', height: 1 }]} />
      <View style={[styles.decorLineHorizontal, { bottom: '20%', width: '100%', height: 1 }]} />

      {characters.length > 0 && (
        <>
          <Text style={[styles.decorText, { top: '25%', left: '15%', fontSize: 140 }]}>{characters[0]}</Text>
          <Text style={[styles.decorText, { bottom: '35%', right: '10%', fontSize: 160 }]}>{characters[1] || ""}</Text>
        </>
      )}
      
      <View style={[styles.cornerAccent, { top: 0, left: 0, borderRightWidth: 1, borderBottomWidth: 1 }]} />
      <View style={[styles.cornerAccent, { bottom: 0, right: 0, borderLeftWidth: 1, borderTopWidth: 1 }]} />
    </View>
  );
});