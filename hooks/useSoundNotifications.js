import React from 'react';
import * as Notifications from 'expo-notifications';

import { Audio } from 'expo-av';
import * as TaskManager from 'expo-task-manager';

// if (Platform.OS === 'android') {
//   Notifications.setNotificationChannelAsync('channelMusic', {
//     name: 'default',
//     importance: Notifications.AndroidImportance.MAX,
//     // vibrationPattern: [0, 250, 250, 250],
//     lightColor: '#FF231F7C',
//     // sound: false,
//     // vibrate: false,
//   });
// }

const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND-NOTIFICATION-TASK';

TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, (data) => {
  console.log('123', data);
});
import registerForPushNotificationsAsync from '../assets/ts/registerForPushNotificationsAsync';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function () {
  const [action, setAction] = React.useState();

  const obtainRemoteNotifPermissionsAsync = async () => {
    let permission = await Notifications.getPermissionsAsync();
    if (permission.status !== 'granted') {
      permission = await Notifications.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        Alert.alert(
          `We don't have permission to receive remote notifications.`
        );
      }
    }
    return permission;
  };

  const pushNotification = async ({ title, position, duration, isPlay }) => {
    const permission = await obtainRemoteNotifPermissionsAsync();
    // if (permission.status === 'granted') {
    //   registerForPushNotificationsAsync();
    // }

    Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
    await Notifications.setNotificationCategoryAsync('musicActions', [
      // {
      //   buttonTitle: 'Prev',
      //   identifier: 'first-button',
      //   options: {
      //     opensAppToForeground: false,
      //   },
      // },
      {
        buttonTitle: isPlay ? 'PAUSE' : 'PLAY',
        identifier: 'pause-play',
        options: {
          opensAppToForeground: false,
        },
      },
      // {
      //   buttonTitle: 'Next',
      //   identifier: 'third-button',
      //   options: {
      //     opensAppToForeground: true,
      //   },
      // },
    ])
      .then((_category) => {})
      .catch((error) =>
        console.warn('Could not have set notification category', error)
      );

    await Notifications.scheduleNotificationAsync({
      identifier: 'music',
      content: {
        title: title + ` ~ ${position}/${duration}`,
        subtitle: 'music',
        categoryIdentifier: 'musicActions',
        color: '#3B69D5',
        // Андроид
        // sound: true,
        vibrate: false,
        // autoDismiss: false,
        sticky: true, // Нельзя свайпнуть
      },
      trigger: null,
    });
  };

  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (notification) => {
        if (notification.actionIdentifier === 'pause-play') {
          console.log(action);
          action && action();
        }
        // console.log(notification);
      }
    );
    return () => subscription.remove();
  }, [action]);

  return {
    pushNotification,
    setAction,
  };
}

obtainRemoteNotifPermissionsAsync = async () => {
  let permission = await Notifications.getPermissionsAsync();
  if (permission.status !== 'granted') {
    permission = await Notifications.requestPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert(`We don't have permission to receive remote notifications.`);
    }
  }
  return permission;
};
