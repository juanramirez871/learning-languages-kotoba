import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleNotifications } from '@/utils/notificationService';

interface SettingsContextType {
  isSoundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => Promise<void>;
  isNotificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  dailyFrequency: number;
  setDailyFrequency: (frequency: number) => Promise<void>;
  startTime: string;
  setStartTime: (time: string) => Promise<void>;
  endTime: string;
  setEndTime: (time: string) => Promise<void>;
  loading: boolean;
}

const STORAGE_KEYS = {
  SOUND_ENABLED: 'isSoundEnabled',
  NOTIFICATIONS_ENABLED: 'isNotificationsEnabled',
  DAILY_FREQUENCY: 'dailyFrequency',
  START_TIME: 'startTime',
  END_TIME: 'endTime',
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabledState] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabledState] = useState(false);
  const [dailyFrequency, setDailyFrequencyState] = useState(5);
  const [startTime, setStartTimeState] = useState("09:00");
  const [endTime, setEndTimeState] = useState("21:00");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    if (!loading) {
      scheduleNotifications(
        isNotificationsEnabled,
        dailyFrequency,
        startTime,
        endTime
      );
    }
  }, [isNotificationsEnabled, dailyFrequency, startTime, endTime, loading]);

  const loadSettings = async () => {
    try {
      const [sound, notif, freq, start, end] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.SOUND_ENABLED),
        AsyncStorage.getItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED),
        AsyncStorage.getItem(STORAGE_KEYS.DAILY_FREQUENCY),
        AsyncStorage.getItem(STORAGE_KEYS.START_TIME),
        AsyncStorage.getItem(STORAGE_KEYS.END_TIME),
      ]);

      if (sound !== null) setIsSoundEnabledState(JSON.parse(sound));
      if (notif !== null) setIsNotificationsEnabledState(JSON.parse(notif));
      if (freq !== null) setDailyFrequencyState(parseInt(freq));
      if (start !== null) setStartTimeState(start);
      if (end !== null) setEndTimeState(end);
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const setSoundEnabled = async (enabled: boolean) => {
    setIsSoundEnabledState(enabled);
    await AsyncStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, JSON.stringify(enabled));
  };

  const setNotificationsEnabled = async (enabled: boolean) => {
    setIsNotificationsEnabledState(enabled);
    await AsyncStorage.setItem(STORAGE_KEYS.NOTIFICATIONS_ENABLED, JSON.stringify(enabled));
  };

  const setDailyFrequency = async (frequency: number) => {
    setDailyFrequencyState(frequency);
    await AsyncStorage.setItem(STORAGE_KEYS.DAILY_FREQUENCY, frequency.toString());
  };

  const setStartTime = async (time: string) => {
    setStartTimeState(time);
    await AsyncStorage.setItem(STORAGE_KEYS.START_TIME, time);
  };

  const setEndTime = async (time: string) => {
    setEndTimeState(time);
    await AsyncStorage.setItem(STORAGE_KEYS.END_TIME, time);
  };

  return (
    <SettingsContext.Provider
      value={{
        isSoundEnabled,
        setSoundEnabled,
        isNotificationsEnabled,
        setNotificationsEnabled,
        dailyFrequency,
        setDailyFrequency,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
