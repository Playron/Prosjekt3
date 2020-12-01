import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import './../styles/titlecard.css'

const ThemeSwapper: React.FC = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const [textColor, setTextColor] = useState(theme === "lightmode" ? "#171717" : "#e0e0e0");

    const click = () => {
        toggleTheme();
        setTextColor(textColor === "#171717" ? "#e0e0e0" : "#171717");
    }

    return (
        <div className="theme">
            <button onClick={click} style={{background: "transparent", border: "none", float: "right", color: textColor}}>
                {theme === "lightmode" ? "Dark mode" : "Light mode"}
            </button>
        </div>
    )
};

export default ThemeSwapper;