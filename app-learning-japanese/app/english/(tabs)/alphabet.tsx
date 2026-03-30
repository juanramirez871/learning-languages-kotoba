import React, { useState } from "react";
import LetterCard from "@/components/LetterCard";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
} from "react-native";
import { ALPHABET, CARD_COLORS } from "@/constants/alphabetEnglish";


export default function AlphabetScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Abecedario</Text>
        <Text style={styles.subtitle}>Letra y pronunciación</Text>
      </View>

      <FlatList
        data={ALPHABET}
        keyExtractor={(item) => item.letter}
        numColumns={4}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <LetterCard
            text={item.letter}
            subtitle={item.pronunciation}
            sound={item.sound}
            color={CARD_COLORS[index % CARD_COLORS.length]}
            style={{ width: "23%", paddingVertical: 10 }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF5FB",
    overflow: "hidden",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 22,
    marginBottom: 20,
  },
  eyebrow: {
    fontSize: 11,
    letterSpacing: 3.5,
    color: "#9BA8B5",
    fontWeight: "600",
    marginBottom: 6,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 36,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#888780",
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});