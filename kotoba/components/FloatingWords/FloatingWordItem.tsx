import React, { useRef, useEffect, memo } from "react";
import { Text, TouchableOpacity, Animated, Dimensions, Easing } from "react-native";
import styles from "./index";


const { width } = Dimensions.get("window");

interface FloatingWordItemProps {
  id: number;
  top: number;
  duration: number;
  primaryText: string;
  secondaryText?: string;
  onComplete: (id: number) => void;
  onPress: () => void;
}

export const FloatingWordItem = memo(({ 
  id, 
  top, 
  duration, 
  primaryText, 
  secondaryText, 
  onComplete, 
  onPress 
}: FloatingWordItemProps) => {

  const translateX = useRef(new Animated.Value(width)).current;
  const onCompleteRef = useRef(() => onComplete(id));

  useEffect(() => {
    onCompleteRef.current = () => onComplete(id);
  }, [onComplete, id]);

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: -400,
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
          top: top,
          transform: [{ translateX }],
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.floatingBubble}
      >
        <Text style={styles.floatingPrimaryText}>{primaryText}</Text>
        {secondaryText && <Text style={styles.floatingSecondaryText}>{secondaryText}</Text>}
      </TouchableOpacity>
    </Animated.View>
  );
});