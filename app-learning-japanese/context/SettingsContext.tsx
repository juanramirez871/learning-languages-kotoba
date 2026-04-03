import React, { createContext, useContext, useState } from 'react';

interface SettingsContextType {
  isSoundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => Promise<void>;
  isNotificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  dailyFrequency: number;
  setDailyFrequency: (frequency: number) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabledState] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabledState] = useState(false);
  const [dailyFrequency, setDailyFrequency] = useState(5);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("21:00");
  const [loading, setLoading] = useState(false);

  const setSoundEnabled = async (enabled: boolean) => {
    setIsSoundEnabledState(enabled);
  };

  const setNotificationsEnabled = async (enabled: boolean) => {
    setIsNotificationsEnabledState(enabled);
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
