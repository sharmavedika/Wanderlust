import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [currUser, setCurrUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axiosInstance.get("/auth/me")
            .then((res) => setCurrUser(res.data.user))
            .catch(() => setCurrUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = (user) => setCurrUser(user);
    const logout = () => {
        axiosInstance.get("/auth/logout").then(() => setCurrUser(null));
    };

    return (
        <AuthContext.Provider value={{ currUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}