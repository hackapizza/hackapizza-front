"use client"

import { ReactNode, useEffect, useState } from "react";
import { AuthContext, LoginFormData } from "./auth-context";
import { api } from "@/lib/axios";
import { toast } from "sonner";

export default function AuthContextProvider(props: { children: ReactNode }) {
    const [isAuth, setIsAuth] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem("token");
            return !!token;
        }
        return false;
    });
    


    async function login(data: LoginFormData) {
        try {
            const response = await api.post("auth/login", data);
            console.log('Login response:', response.data);
            localStorage.setItem("token", response.data.access_token);
            setIsAuth(true);
            toast.success("Login realizado com sucesso!");
        }
        catch(error) {
            console.error(error);
            toast.error("Email ou senha não conferem!");
        }
    }

    function logout() {
        setIsAuth(false);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ isAuth, login, logout }}>
            {props.children}
        </AuthContext.Provider>
    );
}