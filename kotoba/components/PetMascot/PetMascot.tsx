import React, { useState, useCallback, useRef, useEffect, memo, forwardRef, useImperativeHandle, useMemo } from "react";
import { View, Text, TouchableOpacity, Animated, Image as RNImage } from "react-native";
import { Image } from "expo-image";
import { PET_ANIMATIONS } from "@/constants/petAnimations";
import { createSound } from "@/utils/elevenlabs";
import styles from "./index";
import { useSettings } from "@/context/SettingsContext";

export interface PetMascotRef {
  triggerJump: (data: { primary: string; secondary?: string; extra?: string; soundText: string }) => boolean;
}

interface PetMascotProps {
  onPressWithoutWord?: () => void;
  type?: "japanese" | "english";
}

export const PetMascot = memo(forwardRef<PetMascotRef, PetMascotProps>(({ type = "japanese", ...props }, ref) => {

  const { isSoundEnabled } = useSettings();
  const [isJumping, setIsJumping] = useState(false);
  const [jumpFrame, setJumpFrame] = useState(0);
  const [currentWord, setCurrentWord] = useState<{ primary: string; secondary?: string; extra?: string } | null>(null);
  const animationRef = useRef<any>(null);
  const bubbleTimeoutRef = useRef<any>(null);
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const stayAnimation = useMemo(() => 
    RNImage.resolveAssetSource(type === "japanese" ? PET_ANIMATIONS.stay : PET_ANIMATIONS.stayCat),
    [type]
  );
  
  const jumpAnimations = useMemo(() => 
    (type === "japanese" ? PET_ANIMATIONS.jump : PET_ANIMATIONS.jumpCat).map(asset => RNImage.resolveAssetSource(asset)),
    [type]
  );

  useEffect(() => {
    const prefetchImages = async () => {
      try {
        const uris = jumpAnimations.map(asset => asset.uri).filter(uri => !!uri);
        if (uris.length > 0) await Image.prefetch(uris);
      }
      catch (err) {
        console.warn("Error prefetching images:", err);
      }
    };
    
    prefetchImages();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, [jumpAnimations]);

  const showBubble = useCallback((data: { primary: string; secondary?: string; extra?: string; soundText: string }) => {

    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    
    setCurrentWord(data);
    if (isSoundEnabled) {
      createSound(data.soundText).catch(err => console.error("Error playing sound:", err));
    }

    bubbleAnim.stopAnimation();
    Animated.spring(bubbleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();

    bubbleTimeoutRef.current = setTimeout(() => {
      Animated.timing(bubbleAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setCurrentWord(null);
          bubbleTimeoutRef.current = null;
        }
      });
    }, 3000);
  }, [bubbleAnim, isSoundEnabled]);

  const handleJump = useCallback((data?: { primary: string; secondary?: string; extra?: string; soundText: string }) => {
    if (isJumping) return false;
    
    setIsJumping(true);
    setJumpFrame(0);

    if (data) showBubble(data);
    
    const totalFrames = jumpAnimations.length;
    let frame = 0;
    const startTime = Date.now();
    const frameDuration = 24;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const nextFrame = Math.floor(elapsed / frameDuration);

      if (nextFrame < totalFrames) {
        setJumpFrame(nextFrame);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsJumping(false);
        setJumpFrame(0);
        animationRef.current = null;
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return true;
  }, [isJumping, showBubble, jumpAnimations.length]);

  const handleMascotPress = useCallback(() => {
    if (isJumping) return;
    
    if (props.onPressWithoutWord) {
      props.onPressWithoutWord();
    } else {
      handleJump();
    }
  }, [isJumping, props, handleJump]);

  useImperativeHandle(ref, () => ({
    triggerJump: (data) => {
      return handleJump(data);
    }
  }), [handleJump]);

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
        onPress={handleMascotPress}
        activeOpacity={0.9}
        style={styles.petContainer}
      >
        <Image
          source={isJumping ? jumpAnimations[jumpFrame] : stayAnimation}
          style={styles.image}
          contentFit="contain"
          transition={0}
          cachePolicy="memory-disk"
        />
      </TouchableOpacity>
    </View>
  );
}));