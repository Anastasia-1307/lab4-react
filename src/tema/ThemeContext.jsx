import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme',newTheme);
    };

    useEffect(() => {
        document.body.className = theme;
    
        const buttons = document.querySelectorAll('[data-role="theme-button"]');
        buttons.forEach(button => {
            if (theme === 'dark') {
                button.classList.remove('button');
                button.classList.add('buttondark');
            } else {
                button.classList.remove('buttondark');
                button.classList.add('button');
            }
        });
    }, [theme]);
useEffect(()=> {
 
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.className = `card ${theme}`; 
    });
}, [theme]);
   



    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};