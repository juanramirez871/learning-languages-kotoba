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
      <Text style={styles.text}>Welcome to Japanese Words section!</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 60,
  },
  petContainer: {
    position: "absolute",
    bottom: 0,
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
