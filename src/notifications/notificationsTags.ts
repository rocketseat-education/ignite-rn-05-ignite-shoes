import OneSignal from 'react-native-onesignal';

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email);
}