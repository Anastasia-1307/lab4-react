import {useContext} from "react";
import {ThemeContext} from "./ThemeContext.jsx";
import '../App.css'

function ShowTheme() {
    const {theme} = useContext(ThemeContext);
    return <div className="divmod">Modul curent {theme === 'dark' ? 'dark' : 'light'}</div>;
}

export default ShowTheme;