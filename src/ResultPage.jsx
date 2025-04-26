import React, { useEffect, useState } from 'react';
import { Button } from './Button.jsx';


function safeJSONParse(data, fallback) {
  try {
    if (!data || data === 'undefined' || data === 'null') {
      return fallback;
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Eroare la parsarea JSON:', error);
    return fallback;
  }
}

function ResultPage() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [highestScores, setHighestScores] = useState({});


  useEffect(() => {
    const storedAnswersRaw = sessionStorage.getItem('userAnswers');
    const storedAnswers = safeJSONParse(storedAnswersRaw, []);

    const username = sessionStorage.getItem('username') || 'guest';

      const storedScoresRaw = localStorage.getItem('allScores');
      const parsedScores = safeJSONParse(storedScoresRaw, {});
      setHighestScores(parsedScores);

      if(storedAnswers.length > 0) {
        setUserAnswers(storedAnswers);
        const correctCount = storedAnswers.filter(item => item.userAnswer === item.correctAnswer).length;
        setScore(correctCount);
        if (!parsedScores[username]) {
          parsedScores[username] = [];
        }

        const alreadySaved = parsedScores[username].includes(correctCount);
        if (!alreadySaved) {
          parsedScores[username].push(correctCount);
          localStorage.setItem('allScores', JSON.stringify(parsedScores));
        }
        setHighestScores(parsedScores);
      }
  }, []);



  return (
    <div>
      <h2>Scorul final: {score} / 15</h2>
  
      {userAnswers.length > 0 ? (
        <>
          <h3>Răspunsurile tale:</h3>
          {userAnswers.map((item, index) => (
            <div key={index} style={{ marginBottom: '1rem' }}>
              <p><strong>Întrebare:</strong> {item.question}</p>
              <p style={{ color: item.userAnswer === item.correctAnswer ? 'green' : 'red' }}>
                <strong>Răspunsul tău:</strong> {item.userAnswer}
              </p>
              <p><strong>Răspuns corect:</strong> {item.correctAnswer}</p>
            </div>
          ))}
        </>
      ) : (
        <p>Nu există răspunsuri de afișat.</p>
      )}
  
      <h3>Istoric scoruri:</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Username</th>
            <th>Scorurile</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(highestScores).map(([username, scores]) => (
            <tr key={username}>
              <td>{username}</td>
              <td>{scores.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
  
    </div>
  );
  
}

export default ResultPage;
