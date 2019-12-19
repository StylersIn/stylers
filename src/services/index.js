import * as pushNotifications from './pushNotifications';

function notify(title, message) {
    pushNotifications.localNotification(title, message);
};

export {
    notify,
}