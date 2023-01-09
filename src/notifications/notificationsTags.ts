import OneSignal from 'react-native-onesignal';

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Rennan',
    'user_email': 'rennan.douglas@rocketseat.team'
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount)
}