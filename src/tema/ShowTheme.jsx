import {useContext} from "react";
import {ThemeContext} from "./ThemeContext.jsx";
import '../App.css'

function ShowTheme() {
    const {isDarkTheme} = useContext(ThemeContext);
    return <div>Modul curent {isDarkTheme ? "dark" : "light"}</div>;
}

export default ShowTheme;