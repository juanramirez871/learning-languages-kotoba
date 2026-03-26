import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LANGUAGES } from "../../../constants/languages";
import { View, Text, StyleSheet } from "react-native";

export default function JapaneseLayout() {
  const currentLanguage = LANGUAGES.find((lang) => lang.key === "japanese");

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
          title: "言葉",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-outline" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color }]}>言葉</Text>
              <Text style={[styles.sublabel, { color }]}>kotoba</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="hiragana"
        options={{
          title: "平仮名",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="translate" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color }]}>平仮名</Text>
              <Text style={[styles.sublabel, { color }]}>hiragana</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="katakana"
        options={{
          title: "片仮名",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="translate-variant" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <View style={styles.labelContainer}>
              <Text style={[styles.label, { color }]}>片仮名</Text>
              <Text style={[styles.sublabel, { color }]}>katakana</Text>
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
  sublabel: {
    fontSize: 8,
    marginTop: -2,
  },
});
