import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ImageSourcePropType,
} from "react-native";
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
    <Animated.View style={{ transform: [{ scale }] }}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[
          styles.card,
          {
            backgroundColor: lang.bgColor,
            borderColor: lang.borderColor,
            marginBottom: 15,
          },
        ]}
      >
        <View style={styles.flagWrapper}>
          <Image
            source={lang.image as ImageSourcePropType}
            style={styles.flag}
            resizeMode="cover"
          />
        </View>

        <View style={styles.cardBody}>
          <Text style={[styles.label, { color: lang.accentColor }]}>{lang.label}</Text>
          <Text style={styles.subtitle}>{lang.subtitle}</Text>
          <View style={[styles.badge, { backgroundColor: lang.badgeBg }]}>
            <Text style={[styles.badgeText, { color: lang.badgeText }]}>Seleccionar →</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
