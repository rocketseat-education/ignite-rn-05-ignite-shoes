import OneSignal from 'react-native-onesignal';

export function tagUserEmailCreate(email: string) {
  OneSignal.deleteTag('user_email');
}