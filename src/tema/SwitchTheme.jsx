import React, {useContext} from 'react';
import { ThemeContext } from './ThemeContext';
import {Button} from '../Button.jsx';

function SwitchTheme() {
    const {toggleTheme} = useContext(ThemeContext);
    return (
        <div>
            <Button onClick={toggleTheme} className="button" data-role="theme-button">Schimba tema</Button>
        </div>
    );
}

export default SwitchTheme;