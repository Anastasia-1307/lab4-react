import './App.css'

import { useContext } from 'react';
import { ThemeContext } from './tema/ThemeContext';

export const Button = ({ children, ...props }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button
      {...props}
      className={theme === 'dark' ? 'buttondark' : 'button'}
    >
      {children}
    </button>
  );
};