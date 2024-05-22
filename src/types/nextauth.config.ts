import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/en/login",
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: "Credentials",
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: {},
                password: {},
            },
            async authorize(credentials, req) {
                const { email, otp } = credentials as any;
                const res = await fetch(
                    "https://staging.backend.accordcontract.com/account/token/otp",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email,
                            otp,
                        }),
                    }
                );

                const user = await res.json();

                if (res.ok && user) {
                    return user;
                } else return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            // const userData = user;
            return { ...token, ...user };
        },
        async session({ session, token, user }: any) {
            session.user = token.data.user;
            session.tokens = token.data.tokens;
            return session;
        },
    },
}