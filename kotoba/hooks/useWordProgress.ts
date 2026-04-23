import { useCallback, useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Language = "english" | "japanese";

const SCORE_TAP = -10;
const SCORE_PASS = 1;
const MIN_SCORE = -100;
const MAX_SCORE = 100;
const MIN_WEIGHT = 5;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function useWordProgress(language: Language, getKey: (word: any) => string) {
  const scoresRef = useRef<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const storageKey = `wordProgress_${language}`;

  useEffect(() => {
    AsyncStorage.getItem(storageKey).then((raw) => {
      if (raw) {
        try {
          scoresRef.current = JSON.parse(raw);
        } catch {}
      }
      setLoaded(true);
    });
  }, [storageKey]);

  const saveScores = useCallback(() => {
    AsyncStorage.setItem(storageKey, JSON.stringify(scoresRef.current));
  }, [storageKey]);

  const onWordTapped = useCallback((wordData: any) => {
    const key = getKey(wordData);
    const current = scoresRef.current[key] ?? 0;
    scoresRef.current[key] = clamp(current + SCORE_TAP, MIN_SCORE, MAX_SCORE);
    saveScores();
  }, [getKey, saveScores]);

  const onWordPassed = useCallback((wordData: any) => {
    const key = getKey(wordData);
    const current = scoresRef.current[key] ?? 0;
    scoresRef.current[key] = clamp(current + SCORE_PASS, MIN_SCORE, MAX_SCORE);
    saveScores();
  }, [getKey, saveScores]);

  const pickWord = useCallback((wordsList: any[]) => {
    if (!loaded || wordsList.length === 0) {
      return wordsList[Math.floor(Math.random() * wordsList.length)];
    }

    const weights = wordsList.map((word) => {
      const score = scoresRef.current[getKey(word)] ?? 0;
      return Math.max(MIN_WEIGHT, 100 - score);
    });

    const totalWeight = weights.reduce((sum, w) => sum + w, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < wordsList.length; i++) {
      random -= weights[i];
      if (random <= 0) return wordsList[i];
    }

    return wordsList[wordsList.length - 1];
  }, [loaded, getKey]);

  return { pickWord, onWordTapped, onWordPassed };
}
