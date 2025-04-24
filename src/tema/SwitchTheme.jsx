import React, {useContext} from 'react';
import { ThemeContext } from './ThemeContext';

function SwitchTheme() {
    const {toggleTheme} = useContext(ThemeContext);
    return (
        <div>
            <button onClick={toggleTheme}>Schimba tema</button>
        </div>
    );
}

export default SwitchTheme;