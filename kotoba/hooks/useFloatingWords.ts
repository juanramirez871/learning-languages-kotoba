import { useState, useCallback, useEffect, useRef } from "react";
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
  pickWord?: (wordsList: any[]) => any;
  onWordPassed?: (wordData: any) => void;
}

export function useFloatingWords({
  wordsList,
  maxWords = 15,
  intervalTime = 1500,
  minTop = 80,
  maxTop = height * 0.70,
  laneHeight = 70,
  pickWord,
  onWordPassed,
}: UseFloatingWordsOptions) {

  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);
  const floatingWordsRef = useRef<FloatingWord[]>([]);
  const pickWordRef = useRef(pickWord);
  const onWordPassedRef = useRef(onWordPassed);

  useEffect(() => { floatingWordsRef.current = floatingWords; }, [floatingWords]);
  useEffect(() => { pickWordRef.current = pickWord; }, [pickWord]);
  useEffect(() => { onWordPassedRef.current = onWordPassed; }, [onWordPassed]);
  const removeFloatingWord = useCallback((id: number) => {
    setFloatingWords((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const completeFloatingWord = useCallback((id: number) => {
    const word = floatingWordsRef.current.find((w) => w.id === id);
    if (word) {
      onWordPassedRef.current?.(word.data);
    }
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
      const picker = pickWordRef.current;
      const selectedData = picker
        ? picker(wordsList)
        : wordsList[Math.floor(Math.random() * wordsList.length)];

      const newWord: FloatingWord = {
        id: Date.now() + Math.random(),
        top: finalTop,
        duration: Math.random() * 4000 + 10000,
        data: selectedData,
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

  return { floatingWords, removeFloatingWord, completeFloatingWord };
}
