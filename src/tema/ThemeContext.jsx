import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setDarkTheme] = useState(false);

    const toggleTheme = () => {
        setDarkTheme(prev => !prev);
    };

    useEffect(() => {
        document.body.className = isDarkTheme ? 'dark' : 'light';
    }, [isDarkTheme]);

    return (
        <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};