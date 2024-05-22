import { extendTheme, ThemeConfig } from "@chakra-ui/react";

export const FILTER_VALUE =
    "brightness(0) saturate(100%) invert(56%) sepia(26%) saturate(2721%) hue-rotate(347deg) brightness(97%) contrast(92%)";


const config: ThemeConfig = {
    initialColorMode: "light",
    useSystemColorMode: false,
};
const breakpoints = {
    sm: "320px", // Small devices
    md: "768px", // Medium devices
    lg: "996px", // Large devices
    xl: "1200px", // Extra large devices
    "2xl": "1480px", // Extra extra large devices
};

const theme = extendTheme({
    config,
    breakpoints,
    components: {
        Button: {
            variants: {
                prime: {
                    padding: "8px 28px",
                    color: "white",
                    bg: "#287AE0",
                    _hover: {
                        bg: "blue.600",
                    },
                    _active: {
                        bg: "blue.700",
                    },
                    _disabled: {
                        bg: "blue.400 !important",
                    },
                },
                orangeOutline: {
                    color: "#EE7C21",
                    bg: "#EE7C2114",
                    border: "1px solid #EE7C21",
                    borderRadius: "8px",
                    _hover: {
                        bg: "#EE7C2130",
                    },
                    _active: {
                        bg: "#EE7C2140",
                    },
                    // _disabled: {
                    //     color: "#EE7C2150",
                    //     bg: "#EE7C2114",
                    //     border: "1px solid #EE7C2150",
                    // },
                },
                orange: {
                    padding: "8px 28px",
                    color: "white",
                    bg: "#EE7C21",
                    _hover: {
                        bg: "orange.600",
                    },
                    _active: {
                        bg: "orange.700",
                    },
                },
            },
        },
    },
    fonts: {
        body: "Inter, sans-serif",
        heading: "Inter, sans-serif",
    },
});

export default theme;