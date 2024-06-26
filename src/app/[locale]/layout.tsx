import type { Metadata } from "next";
import "@/styles/global.scss";
import ChakraProviders from "@/hooks/ChakraProviders";
import SessionProviders from "@/hooks/SessionProviders";
import RecoilProviders from "@/hooks/RecoilProviders";
import { Chatbot } from "@/components/chatbot/Chatbot";
import ReduxProvider from "@/redux/reduxProvider";

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    return (
        <html lang={locale}>
            <ChakraProviders>
                <SessionProviders>
                    <RecoilProviders>
                        <ReduxProvider>
                            <Chatbot />
                            <body>{children}</body>
                        </ReduxProvider>
                    </RecoilProviders>
                </SessionProviders>
            </ChakraProviders>
        </html>
    );
}
