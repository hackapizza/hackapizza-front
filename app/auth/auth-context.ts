import { createContext } from "react";

export interface LoginFormData {
    email: string;
    senha: string;
}

export interface AuthContextProps {
    isAuth: boolean;
    login: (data: LoginFormData) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
