import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import japaneseWords from '../constants/japaneseWords.json';
import englishWords from '../constants/englishWords.json';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

const getRandomWord = (list: any[]) => {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
};

export const scheduleNotifications = async (
  enabled: boolean,
  frequency: number,
  startTime: string,
  endTime: string
) => {

  await cancelAllNotifications();
  if (!enabled || frequency <= 0) return;

  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) return;

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startMinutes = startHour * 60 + startMinute;
  const endMinutes = endHour * 60 + endMinute;

  let availableMinutes = endMinutes - startMinutes;
  if (availableMinutes <= 0) availableMinutes += 24 * 60;

  const interval = frequency > 1 ? availableMinutes / (frequency - 1) : 0;

  for (let day = 0; day < 7; day++) {
    for (let i = 0; i < frequency; i++) {

      const notificationTimeInMinutes = startMinutes + i * interval;
      const scheduledDate = new Date();
      scheduledDate.setDate(scheduledDate.getDate() + day);
      scheduledDate.setHours(Math.floor(notificationTimeInMinutes / 60) % 24);
      scheduledDate.setMinutes(Math.floor(notificationTimeInMinutes % 60));
      scheduledDate.setSeconds(0);

      if (day === 0 && scheduledDate <= new Date()) continue;
      const isJapanese = i % 2 === 0;
      let title = '';
      let body = '';

      if (isJapanese) {
        const word = getRandomWord(japaneseWords);
        title = `${word.japanese}`;
        body = `(${word.pronounciation})\n${word.spanish}`;
      }
      else {
        const word = getRandomWord(englishWords);
        title = `${word.word}`;
        body = `${word.spanish}`;
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: 'default',
          ...(Platform.OS === 'android' && { 
            priority: Notifications.AndroidNotificationPriority.HIGH,
          }),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: scheduledDate,
        },
      });
    }
  }
};
