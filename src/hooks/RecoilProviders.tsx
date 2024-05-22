"use client";
import React, { ReactNode } from "react";
import { RecoilRoot } from "recoil";

interface Props {
    children: ReactNode;
}
const RecoilProviders = ({ children }: Props) => {
    return <RecoilRoot>{children}</RecoilRoot>;
};

export default RecoilProviders;
