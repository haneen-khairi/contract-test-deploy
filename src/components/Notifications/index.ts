type NotificationProps = {
    notificationType: string,
    notificationMsg: string,
    notificationDate: string,
    notificationTitle: string,
}
type INotification = {
    content: string,
    received: boolean,
    seen: boolean,
    time_since: string,
    title: string,
    type: string,
} 