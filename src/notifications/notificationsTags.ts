import OneSignal from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Rennan',
    'user_email': 'rennan.douglas@rocketseat.team'
  });
}