import { atom } from "recoil";

export interface Role {
    id: number;
    name: string;
    codename: string;
}

interface StatusData {
    id: string;
    name: string;
    color: string;
}

export const rolesState = atom<Role[]>({
    key: "rolesState",
    default: [],
});

export const errorsState = atom<Record<string, boolean>>({
    key: "errorsState",
    default: {},
});

export const contractState = atom<StatusData[]>({
    key: "contractState",
    default: [],
});

export const searchState = atom<string>({
    key: "searchState",
    default: "",
});