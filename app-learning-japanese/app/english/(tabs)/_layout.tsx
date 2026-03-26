import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LANGUAGES } from "../../../constants/languages";
import { View, Text, StyleSheet } from "react-native";

export default function EnglishLayout() {
  const currentLanguage = LANGUAGES.find((lang) => lang.key === "english");

  if (!currentLanguage) return null;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: currentLanguage.accentColor,
        tabBarInactiveTintColor: "#888780",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#f0f0f0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Words",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-outline" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color }]}>Words</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="alphabet"
        options={{
          title: "Alphabet",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="alphabet-latin" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color }]}>Alphabet</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 10,
    fontWeight: "600",
  },
});
