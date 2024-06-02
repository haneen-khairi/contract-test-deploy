"use client";

import { Box, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

declare global {
    interface Window {
        initAiCoPilot(getOptions: any): void;
    }
}

export const Chatbot = () => {
    const { data: session } = useSession();
    const { id } = useParams();

    const contractId = `${id || ""}`;

    const getOptions = (token: string, contractId?: string) => ({
        apiUrl: "http://134.122.65.184:8888/backend",
        initialMessage: "How are the things",
        token: "batHqgPXYezIrGij",
        defaultOpen: true,
        triggerSelector: "#triggerSelector",
        socketUrl: "http://134.122.65.184:8888",
        headers: {
            Authorization: `Bearer ${token}`,
            "contract-id": contractId || "",
        },
        user: {
            name: "Default User",
        },
        containerProps: {
            style: {
                // optional: you can pass any style you want to the container
                width: "400px",
                height: "500px",
                position: "fixed",
                bottom: "0",
                right: "0",
                zIndex: "9999",
            },
            className: "your class name", // if u are using tailwindcss or any className you can use the class name here
        },
    });

    const openAiBot = () => {
        if (session?.tokens?.access) {
            const initAiCoPilot = () => {
                window.initAiCoPilot(
                    getOptions(session?.tokens?.access, contractId)
                );
            };

            const script = document.createElement("script");
            script.src =
                "https://unpkg.com/@openchatai/copilot-widget@latest/dist-embed/pilot.js";
            script.onload = initAiCoPilot;
            document.body.appendChild(script);
        }
    };

    return (
        <Box display="flex" position="fixed" left="60px" bottom="40px">
            <Button
                onClick={() => {
                    openAiBot();
                }}
            >
                Ask AI
            </Button>
        </Box>
    );
};
