import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        tokens: {
            access: string;
            refresh: string;
        };
        user: {
            email: string;
            id: string;
            job_title: string;
            name: string;
            image: string;
            phone_number: string;
        };
    }
}
