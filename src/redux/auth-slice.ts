import { createSlice } from "@reduxjs/toolkit";
import { Session, User } from "next-auth";

export interface InitialAuthStateProps {
    session: Session | null;
}

const initialState: InitialAuthStateProps = {
    session: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setSession: (
            state: InitialAuthStateProps,
            {
                payload: { session },
            }: {
                payload: { session: Session | null };
            }
        ) => {
            state.session = session;
        },
        setUser: (
            state: InitialAuthStateProps,
            {
                payload: { user },
            }: {
                payload: { user: any };
            }
        ) => {
            const newSession = { ...state.session, user: {} };

            if (state.session?.user) newSession["user"] = state.session?.user;
            if (user) newSession["user"] = { ...newSession["user"], ...user };

            state.session = newSession as any;
        },
    },
});

export const { setSession, setUser } = authSlice.actions;

export const selectAuth = (state: { auth: InitialAuthStateProps }) =>
    state.auth;
