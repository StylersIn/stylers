import PushNotification from 'react-native-push-notification';
// import { PushNotificationIOS } from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

const configure = () => {
    PushNotification.configure({

        onRegister: function (token) {
            //process token
        },

        onNotification: function (notification) {
            // process the notification
            // required on iOS only
            notification.finish(PushNotificationIOS.FetchResult.NoData);
        },

        permissions: {
            alert: true,
            badge: true,
            sound: true
        },

        popInitialNotification: true,
        requestPermissions: true,

    });
};

function truncate(text, length = 35) {
    return text.length > length ? `${text.substring(0, length)}...` : text;
}

const localNotification = (title, message, length = 35, ) => {
    PushNotification.localNotification({
        autoCancel: false,
        largeIcon: "ic_launcher",
        smallIcon: "ic_notification",
        bigText: message.length > length ? message : '',
        subText: "2m",
        color: "green",
        vibrate: true,
        vibration: 300,
        title: title,
        message: truncate(message),
        playSound: true,
        soundName: 'default',
        // actions: '["Accept", "Reject"]',
    });
};

export {
    configure,
    localNotification,
};