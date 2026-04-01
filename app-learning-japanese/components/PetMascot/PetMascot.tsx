import React, { useState, useCallback, useRef, useEffect, memo, forwardRef, useImperativeHandle } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Image } from "expo-image";
import { PET_ANIMATIONS } from "@/constants/petAnimations";
import { createSound } from "@/utils/elevenlabs";
import styles from "./index";

export interface PetMascotRef {
  triggerJump: (data: { primary: string; secondary?: string; extra?: string; soundText: string }) => boolean;
}

interface PetMascotProps {
  onPressWithoutWord?: () => void;
}

export const PetMascot = memo(forwardRef<PetMascotRef, PetMascotProps>((props, ref) => {

  const [isJumping, setIsJumping] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0);
  const [currentWord, setCurrentWord] = useState<{ primary: string; secondary?: string; extra?: string } | null>(null);
  const animationRef = useRef<any>(null);
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, []);

  const showBubble = useCallback((data: { primary: string; secondary?: string; extra?: string; soundText: string }) => {

    setCurrentWord(data);
    createSound(data.soundText);

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

  const handlePress = useCallback((data?: { primary: string; secondary?: string; extra?: string; soundText: string }) => {

    if (isJumping || currentWord) return false;
    
    setIsJumping(true);
    setJumpFrame(0);
    
    if (data) {
      showBubble(data);
    } else if (props.onPressWithoutWord) {
      props.onPressWithoutWord();
    }

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
  }, [isJumping, currentWord, showBubble, props]);

  useImperativeHandle(ref, () => ({
    triggerJump: (data) => {
      return handlePress(data);
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
          <Text style={styles.primaryText}>{currentWord.primary}</Text>
          {currentWord.secondary && <Text style={styles.secondaryText}>{currentWord.secondary}</Text>}
          {currentWord.extra && <Text style={styles.extraText}>{currentWord.extra}</Text>}
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