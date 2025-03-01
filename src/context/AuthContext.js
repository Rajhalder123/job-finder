import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"; // Ensure it's installed correctly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid token:", error);
                localStorage.removeItem("token"); // Clear invalid token
                setToken(null);
                setUser(null);
            }
        }
    }, [token]);

    const login = async (credentials) => {
        try {
            const res = await axios.post("http://localhost:3000/login", credentials);
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
