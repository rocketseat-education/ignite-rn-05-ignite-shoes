import { useEffect, useState } from 'react';
import { StatusBar, Platform } from 'react-native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Notification } from './src/components/Notification';
import { Loading } from './src/components/Loading';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

import { CartContextProvider } from './src/contexts/CartContext';

const oneSignalAppId = Platform.OS === 'ios' ? '2b542c58-e2e9-48f1-8bff-004caefe40c4' : 'dd6753a9-19ad-4f0f-b1c3-700cff7f9dcc';
OneSignal.setAppId(oneSignalAppId);

OneSignal.promptForPushNotificationsWithUserResponse()

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [notification, setNotification] =  useState<OSNotification>();

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal
    .setNotificationWillShowInForegroundHandler((notificationRecivedEvent: NotificationReceivedEvent) => {
      const response = notificationRecivedEvent.getNotification();

      setNotification(response);
    })

    return () => unsubscribe;

  },[])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      {
        notification?.title && 
        <Notification 
          title={notification.title} 
          onClose={() => setNotification(undefined)} 
        />
      }
    </NativeBaseProvider>
  );
}