import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { authSlice } from "./auth-slice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage =
    typeof window === "undefined"
        ? createNoopStorage()
        : createWebStorage("local");

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["session"],
};

const authPersistReducer = persistReducer(authPersistConfig, authSlice.reducer);

const reducers = combineReducers({
    auth: authPersistReducer,
});

export default reducers;
