import StartPage from './StartPage.jsx';
import QuestionPage from './QuestionPage.jsx';
import ResultPage from './ResultPage.jsx';
import { ThemeProvider, ThemeContext } from "./tema/ThemeContext"; 
import ShowTheme from './tema/ShowTheme.jsx';
import SwitchTheme from './tema/SwitchTheme.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';

function AppContent() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={isDarkTheme ? 'dark' : 'light'}>
      <SwitchTheme />
      <ShowTheme />
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/intrebari" element={<QuestionPage />} />
        <Route path="/rezultate" element={<ResultPage />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;

