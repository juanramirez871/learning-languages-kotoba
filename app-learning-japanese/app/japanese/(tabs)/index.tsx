import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { PET_ANIMATIONS } from "@/constants/petAnimations";

export default function JapaneseWordsScreen() {

  const [isJumping, setIsJumping] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0);
  const animationRef = useRef<any>(null);

  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  const handlePress = useCallback(() => {
    if (isJumping) return;

    setIsJumping(true);
    setJumpFrame(0);

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
    }, 35);
  }, [isJumping]);

  return (
    <View style={styles.container}>
      <View style={styles.petSection}>
        
        <View style={styles.speechBubble}>
          <Text style={styles.japaneseText}>パイナップル</Text>
          <Text style={styles.romajiText}>painappuru</Text>
          <View style={styles.divider} />
          <Text style={styles.spanishText}>Piña</Text>
        </View>

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
    bottom: 20,
    alignItems: "center",
  },
  speechBubble: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: -100,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  japaneseText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 2,
  },
  romajiText: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
    marginBottom: 8,
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#eee",
    marginBottom: 8,
  },
  spanishText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ff6b6b",
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
