import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Animated,
  ImageSourcePropType,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Language } from "../../constants/languages";
import { styles } from "./styles";

interface LanguageCardProps {
  lang: Language;
  onPress: () => void;
}

export const LanguageCard = ({ lang, onPress }: LanguageCardProps) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 40 }).start();

  const handlePressOut = () =>
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 8 }).start();

  return (
    <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={{ flex: 1 }}
      >
        <ImageBackground
          source={lang.image as ImageSourcePropType}
          style={styles.bg}
          resizeMode="cover"
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.08)", "rgba(0,0,0,0.62)"]}
            locations={[0, 1]}
            style={styles.overlay}
          >
            <View style={styles.topRow}></View>
            <View style={styles.bottomRow}>
              <View style={styles.textGroup}>
                <Text style={styles.label}>{lang.label}</Text>
                <Text style={styles.subtitle}>{lang.subtitle}</Text>
              </View>
              <View style={styles.cta}>
                <Text style={[styles.ctaText, { color: lang.accentColor }]}>→</Text>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};
