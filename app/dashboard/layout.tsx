"use client"

import { ReactNode, useEffect } from "react";
import { DashboardHeader } from "./components/header";
import { DashboardMain } from "./components/main";
import { useAuth } from "../auth/use-auth";
import { useRouter } from "next/navigation";

interface DashboardPageProps {
    children: ReactNode;
}

export default function DashboardLayoyt(props: DashboardPageProps) {
    const { isAuth } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!isAuth) {
            router.push("/auth/login");
        }
    }, [isAuth]);

    return (
        <>
            <DashboardHeader />
            <DashboardMain>{props.children}</DashboardMain>
        </>
    );
}