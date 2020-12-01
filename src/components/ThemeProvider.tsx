import React, { useState } from "react";
type Theme = "lightmode" | "darkmode";
type ThemeContext = { theme: Theme; toggleTheme: () => void };

export const ThemeContext = React.createContext<ThemeContext>(
    {} as ThemeContext
);

export const ThemeProvider: React.FC = ({ children }) => {
    const [theme, setTheme] = useState<Theme>("darkmode");
    const toggleTheme = () => {
        setTheme(theme === "lightmode" ? "darkmode" : "lightmode");
    };

    const lightmodeValues = [
        "#e7e7e7", /* backgroundColor */
        "#171717", /* color */

    ];

    const darkmodeValues = [
        "#272727", /* Background color */
        "#e0e0e0", /* Text color */
        
    ];


    const backgroundColor = theme === "lightmode" ? lightmodeValues[0] : darkmodeValues[0];
    const color = theme === "lightmode" ? lightmodeValues[1] : darkmodeValues[1];



    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = color;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};