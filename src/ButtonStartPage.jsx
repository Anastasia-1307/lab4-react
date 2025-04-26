import {Button} from './Button.jsx';
import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import './App.css';

function StartPageButton() {
    const navigate = useNavigate();
    const location = useLocation();
    const goHome = () => {
        navigate('/');
    };

     
  if (location.pathname === '/') {
    return null;
  }
    return <Button onClick={goHome} data-role="theme-button">Pagina start</Button>;
} 
export default StartPageButton;