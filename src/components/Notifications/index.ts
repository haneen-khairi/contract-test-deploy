type NotificationProps = {
    notificationType: string,
    notificationMsg: string,
    notificationDate: string,
    notificationTitle: string,
    notificationAction: INotificationAction
}
type INotification = {
    content: string,
    received: boolean,
    seen: boolean,
    time_since: string,
    title: string,
    type: string,
    action?: string,
    data?: any
} 
type INotificationAction = {
    action: any,
    id: any
}