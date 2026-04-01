import { useState, useCallback, useEffect } from "react";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export interface FloatingWord {
  id: number;
  top: number;
  duration: number;
  data: any;
}

interface UseFloatingWordsOptions {
  wordsList: any[];
  maxWords?: number;
  intervalTime?: number;
  minTop?: number;
  maxTop?: number;
  laneHeight?: number;
}

export function useFloatingWords({
  wordsList,
  maxWords = 15,
  intervalTime = 1500,
  minTop = 80,
  maxTop = height * 0.75,
  laneHeight = 70,
}: UseFloatingWordsOptions) {

  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);
  const removeFloatingWord = useCallback((id: number) => {
    setFloatingWords((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const addFloatingWord = useCallback(() => {
    setFloatingWords((prev) => {
      const lanes = [];
      for (let top = minTop; top <= maxTop; top += laneHeight) {
        lanes.push(top);
      }

      const availableLanes = lanes.filter(lane => 
        !prev.some(word => Math.abs(word.top - lane) < laneHeight - 10)
      );

      if (availableLanes.length === 0 || prev.length >= maxWords) return prev;

      const finalTop = availableLanes[Math.floor(Math.random() * availableLanes.length)];
      const randomIndex = Math.floor(Math.random() * wordsList.length);
      const newWord: FloatingWord = { 
        id: Date.now() + Math.random(),
        top: finalTop,
        duration: Math.random() * 4000 + 10000,
        data: wordsList[randomIndex]
      };
      
      return [...prev, newWord];
    });
  }, [wordsList, maxWords, minTop, maxTop, laneHeight]);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      addFloatingWord();
    }, 1000);

    const interval = setInterval(() => {
      addFloatingWord();
    }, intervalTime);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [addFloatingWord, intervalTime]);

  return { floatingWords, removeFloatingWord };
}
