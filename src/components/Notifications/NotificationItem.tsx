import { Flex } from '@chakra-ui/react'
import React from 'react'

export default function NotificationItem({
    notificationType,
    notificationMsg,
    notificationDate,
    notificationTitle
}: NotificationProps) {
  return <div className='notification__menu--item'>
    <span className='notification__menu--item-type'>{notificationType}</span>
    <Flex justifyContent={'space-between'} alignItems={'center'}>
        <h3 className='notification__menu--item-title'>{notificationTitle}</h3>
        <span className='notification__menu--item-date'>{notificationDate}</span>
    </Flex>
    <p className='notification__menu--item-msg'>{notificationMsg}</p>

    <hr />
  </div>
  
}
