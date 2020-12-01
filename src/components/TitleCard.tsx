import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeProvider';
import './../styles/titlecard.css'

export default function TitleCard() {

    const { theme, toggleTheme } = useContext(ThemeContext);

    const [headercolor, setHeadercolor] = useState(theme === "lightmode" ? "#171717" : "#e0e0e0");

    useEffect(() => {
        setHeadercolor(theme === "lightmode" ? "#171717" : "#e0e0e0");
    }, [theme])


    const headerstyle = {
        color: headercolor,
    }

    return (
        <div className="title">
            <h4 style={headerstyle}>The Supreme Court's</h4>
            <h1 style={headerstyle}>Super Movie DB</h1>
        </div>
    );
}
