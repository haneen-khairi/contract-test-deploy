import {
    Box,
    UnorderedList,
    ListItem,
    Flex,
    Heading,
    Link,
    Stack,
    Image,
    Text,
} from "@chakra-ui/react";
import "./Terms.css";

export default function TermsView() {
    return (
        <Flex
            flexDirection="column"
            position={"relative"}
            width={{ base: "100%" }}
            backgroundColor="gray.200"
            justifyContent="center"
            alignItems="center"
            bg={"white"}
        >
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                w={{ sm: "90%", md: "unset" }}
            >
                <Heading size="md">Your activity</Heading>
                <Text fontSize={"16px"}>
                    We want you to understand the types of information we
                    collect as you use our services
                </Text>
                <Text fontSize={"16px"}>
                    We collect information to provide better services to all our
                    users — from figuring out basic stuff like which language
                    you speak, to more complex things like which{" "}
                    <Link
                        href={
                            "https://policies.google.com/privacy#footnote-useful-ads"
                        }
                    >
                        ads you’ll find most useful
                    </Link>
                     , 
                    <Link
                        href={
                            "https://policies.google.com/privacy#footnote-people-online"
                        }
                    >
                        the people who matter most to you online
                    </Link>{" "}
                    , or which YouTube videos you might like. The information
                    Google collects, and how that information is used, depends
                    on how you use our services and how you manage your privacy
                    controls. When you’re not signed in to a Google Account, we
                    store the information we collect with{" "}
                    <Link
                        href={
                            "https://policies.google.com/privacy#footnote-unique-id"
                        }
                    >
                         unique identifiers
                    </Link>
                     tied to the browser, application, or{" "}
                    <Link
                        href={
                            "https://policies.google.com/privacy#footnote-device"
                        }
                    >
                         device you’re
                    </Link>{" "}
                    using. This allows us to do things like maintain your
                    preferences across browsing sessions, such as your preferred
                    language or whether to show you more relevant search results
                    or ads based on your activity. When you’re signed in, we
                    also collect information that we store with your Google
                    Account, which we treat as{" "}
                    <Link
                        href={
                            "https://policies.google.com/privacy#footnote-personal-info"
                        }
                    >
                        personal information.
                    </Link>
                     
                </Text>
            </Stack>
            <Stack
                flexDir="column"
                mt="40px"
                justifyContent="center"
                w={{ sm: "90%", md: "unset" }}
            >
                <Heading size="md">Your location information</Heading>
                <Text fontSize={"16px"}>
                    We collect location information when you use our services,
                    which helps us offer features like driving directions,
                    search results for things near you, and ads based on your
                    location. Depending on the products you’re using and
                    settings you choose, Google may use different types of
                    location information to help make some services and products
                    you use more helpful. These include:
                </Text>
                <UnorderedList>
                    <ListItem>
                        GPS and other 
                        <Link>sensor data from your device</Link>
                    </ListItem>
                    <ListItem>
                        <Link>IP address</Link>
                    </ListItem>
                    <ListItem>
                        <Link>Activity on Google services</Link>, such as from
                        your searches or
                        <Link>places you label like home or work</Link> 
                    </ListItem>
                    <ListItem>
                        <Link>Information about things near your device</Link>,
                        such as Wi-Fi access points, cell towers, and
                        Bluetooth-enabled devices
                    </ListItem>
                </UnorderedList>
                <Text>
                    The types of location data we collect and how long we store
                    it depend in part on your device and account settings. For
                    example, you can{" "}
                    <Link>turn your Android device’s location on or off</Link>
                      using the device’s settings app. You can also turn on{" "}
                    <Link>Location History</Link>  if you want to create a
                    private map of where you go with your signed-in devices. And
                    if your Web & App Activity setting is enabled, your searches
                    and other activity from Google services, which may also
                    include location information, is saved to your Google
                    Account. Learn more about{" "}
                    <Link> how we use location information</Link>.
                </Text>
            </Stack>
        </Flex>
    );
}
