import React, { useState } from 'react';
import {   Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor, MenuButton, MenuList, MenuItem, useDisclosure, Badge, Button,
    Flex,  } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa6';
import NotificationIcon from './NotificationIcon';
import NotificationItem from './NotificationItem';

function NotificationDropdown({
    notifications
}: {notifications: INotification[]}) {
    const [hasNotifications, setHasNotifications] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleNotificationClick = (notification: any) => {
        // Handle notification action here
        console.log(`Notification clicked: ${notification}`);
    };

    return (
        <Popover>
            <PopoverTrigger>
            <Button
                color={"#EE7C21"}
                variant={"none"}
                p={"8px"}
                backgroundColor={'#F9F9FA'}
                // as={MenuButton}
            >
                {/* {hasNotifications && <Badge variant="solid" colorScheme="red">1</Badge>} */}
                <NotificationIcon />
            </Button>
            </PopoverTrigger>
            <PopoverContent borderRadius={'16px'}>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader className='notification__header'>New Notifications ({notifications?.length})</PopoverHeader>
                <PopoverBody padding={0} >
                    <Flex gap={'25px'} paddingY={'25px'} direction={'column'}>
                        {notifications?.length> 0 && notifications.map((notification: INotification, index: number) => <Button backgroundColor={'transparent'}  key={index} onClick={() => handleNotificationClick('Notification 1')} paddingX={0} paddingY={0} height={'100%'} width={'100%'}>
                            <NotificationItem 
                                notificationType={notification.type}
                                notificationMsg={notification.content}
                                notificationDate={notification.time_since}
                                notificationTitle={notification.title}
                            />
                            </Button>)}

                    </Flex>
                </PopoverBody>
                <PopoverFooter
                                    className='notification__foote'

                >
                    <Button 
                    backgroundColor={'transparent'}
                    borderRadius={'8px'} 
                    className='notification__footer--close'
                    border={'1px solid #D0D5DD'}
                    boxShadow='0px 1px 2px 0px #1018280D'
                    >Close</Button>
                </PopoverFooter>
            </PopoverContent>
            </Popover>
    );
}

export default NotificationDropdown;
