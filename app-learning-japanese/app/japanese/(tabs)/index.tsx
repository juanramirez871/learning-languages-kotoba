import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Image } from "expo-image";
import { PET_ANIMATIONS } from "@/constants/petAnimations";
import words from "../../../constants/japaneseWords.json";

export default function JapaneseWordsScreen() {

  const [isJumping, setIsJumping] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0);
  const [currentWord, setCurrentWord] = useState<any>(null);
  const animationRef = useRef<any>(null);
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  const showBubble = useCallback(() => {

    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    Animated.spring(bubbleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    setTimeout(() => {
      Animated.timing(bubbleAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentWord(null);
      });
    }, 3000);
  }, [bubbleAnim]);

  const handlePress = useCallback(() => {
    if (isJumping) return;

    setIsJumping(true);
    setJumpFrame(0);
    showBubble();

    let frame = 0;
    const totalFrames = PET_ANIMATIONS.jump.length;

    animationRef.current = setInterval(() => {
      frame++;
      if (frame < totalFrames) setJumpFrame(frame);
      else {
        if (animationRef.current) clearInterval(animationRef.current);
        setIsJumping(false);
        setJumpFrame(0);
      }
    }, 30);
  }, [isJumping, showBubble]);

  return (
    <View style={styles.container}>
      <View style={styles.petSection}>
        {currentWord && (
          <Animated.View
            style={[
              styles.speechBubble,
              {
                opacity: bubbleAnim,
                transform: [
                  {
                    translateY: bubbleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                  {
                    scale: bubbleAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.japaneseText}>{currentWord.japanese}</Text>
            <Text style={styles.romajiText}>{currentWord.pronounciation}</Text>
            <Text style={styles.spanishText}>{currentWord.spanish}</Text>
          </Animated.View>
        )}

        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.9}
          style={styles.petContainer}
        >
          <Image
            source={isJumping ? PET_ANIMATIONS.jump[jumpFrame] : PET_ANIMATIONS.stay}
            style={styles.image}
            contentFit="contain"
            transition={0}
            cachePolicy="memory-disk"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  petSection: {
    position: "absolute",
    bottom: -50,
    alignItems: "center",
  },
  speechBubble: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: -110,
    elevation: 8,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  japaneseText: {
    fontSize: 24,
    fontWeight: "300",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  romajiText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 8,
  },
  spanishText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#993556",
  },
  petContainer: {
    width: 350,
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
