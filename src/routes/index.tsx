import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { Notification } from '../components/Notification';

export function Routes() {
  const [notification, setNotification] =  useState<OSNotification>();

  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((notificationRecivedEvent: NotificationReceivedEvent) => {
      const response = notificationRecivedEvent.getNotification();

      setNotification(response);
    })

    return () => unsubscribe;

  },[])

  return (
    <NavigationContainer theme={theme}>
      <AppRoutes />
      {
        // notification?.title &&
        <Notification 
          title={'notification.title'} 
          onClose={() => setNotification(undefined)} 
        />
      }
    </NavigationContainer>
  );
}