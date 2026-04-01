import React, { useState, useCallback, useRef, useEffect, memo, forwardRef, useImperativeHandle } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Easing } from "react-native";
import { Image } from "expo-image";
import { PET_ANIMATIONS } from "@/constants/petAnimations";
import words from "../../../constants/japaneseWords.json";
import { createSound } from "@/utils/elevenlabs";

const { width, height } = Dimensions.get("window");

interface Word {
  japanese: string;
  pronounciation: string;
  spanish: string;
  id?: number;
  top?: number;
}

const FloatingWordItem = memo(({ word, onComplete, onPress }: { word: Word; onComplete: () => void; onPress: (word: Word) => void }) => {
  
  const translateX = useRef(new Animated.Value(width)).current;
  const duration = 24000;
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: -800,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        onCompleteRef.current();
      }
    });
  }, [translateX, duration]);

  return (
    <Animated.View
      style={[
        styles.floatingWordContainer,
        {
          top: word.top,
          transform: [{ translateX }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => onPress(word)}
        activeOpacity={0.7}
        style={styles.floatingBubble}
      >
        <Text style={styles.floatingJapaneseText}>{word.japanese}</Text>
        <Text style={styles.floatingRomajiText}>{word.pronounciation}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

interface PetMascotRef {
  triggerJump: (word: Word) => boolean;
}

const PetMascot = memo(forwardRef<PetMascotRef, any>((props, ref) => {

  const [isJumping, setIsJumping] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const animationRef = useRef<any>(null);
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  const showBubble = useCallback((specificWord?: Word) => {

    const selectedWord = specificWord || (words[Math.floor(Math.random() * words.length)] as Word);
    setCurrentWord(selectedWord);
    createSound(selectedWord.pronounciation);

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

  const handlePress = useCallback((specificWord?: Word) => {

    if (isJumping || currentWord) return false;
    setIsJumping(true);
    setJumpFrame(0);
    showBubble(specificWord);

    let frame = 0;
    const totalFrames = PET_ANIMATIONS.jump.length;

    animationRef.current = setInterval(() => {
      frame++;
      if (frame < totalFrames) {
        setJumpFrame(frame);
      } else {
        if (animationRef.current) clearInterval(animationRef.current);
        setIsJumping(false);
        setJumpFrame(0);
      }
    }, 24);
    return true;
  }, [isJumping, currentWord, showBubble]);

  useImperativeHandle(ref, () => ({
    triggerJump: (word: Word) => {
      return handlePress(word);
    }
  }));

  return (
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
        onPress={() => handlePress()}
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
  );
}));

export default function JapaneseWordsScreen() {
  const [floatingWords, setFloatingWords] = useState<Word[]>([]);
  const petRef = useRef<PetMascotRef>(null);

  const removeFloatingWord = useCallback((id: number) => {
    setFloatingWords((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const addFloatingWord = useCallback(() => {

     const minDistance = 70;
     const maxAttempts = 10;
     let finalTop = 0;
     let attempts = 0;
     let isTooClose = true;
 
     const maxTop = height * 0.8 - 120;
     while (isTooClose && attempts < maxAttempts) {
       finalTop = Math.random() * (maxTop - 80) + 80;
       isTooClose = floatingWords.some((word) => Math.abs((word.top || 0) - finalTop) < minDistance);
       attempts++;
     }

    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = { 
      ...words[randomIndex], 
      id: Date.now() + Math.random(),
      top: finalTop 
    };
    setFloatingWords((prev) => [...prev, newWord as Word]);
  }, [floatingWords]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      addFloatingWord();
    }, 2000);

    const interval = setInterval(() => {
      if (floatingWords.length < 5) {
        addFloatingWord();
      }
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [addFloatingWord, floatingWords.length]);

  return (
    <View style={styles.container}>
      {floatingWords.map((word) => (
        <FloatingWordItem
          key={word.id}
          word={word}
          onComplete={() => removeFloatingWord(word.id!)}
          onPress={(word) => {
            const started = petRef.current?.triggerJump(word);
            if (started) {
              removeFloatingWord(word.id!);
            }
          }}
        />
      ))}
      <PetMascot ref={petRef} />
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
    zIndex: 10,
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
    zIndex: 10
  },
  image: {
    width: "100%",
    height: "100%",
  },
  floatingWordContainer: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  floatingBubble: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(240, 240, 240, 0.8)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  floatingJapaneseText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  floatingRomajiText: {
    fontSize: 12,
    color: "#666",
    fontStyle: "italic",
  },
});
