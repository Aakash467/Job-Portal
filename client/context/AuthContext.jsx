import { createContext, useState, useEffect } from "react";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    // Load user and token from localStorage when the app starts
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser !== "undefined" && storedUser !== null && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        } else {
            localStorage.removeItem("user"); // Clear invalid user data
        }
    }, []);

    const login = (token, userData) => {
        console.log("User logged in:", userData);
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData)); // Store user data
        setToken(token);
        setUser(userData);
    };

    const logout = () => {
        console.log("User logged out.");
        localStorage.removeItem("token");
        localStorage.removeItem("user"); // Clear user data
        setToken(null);
        setUser(null);
        
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;