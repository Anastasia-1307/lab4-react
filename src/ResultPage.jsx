import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResultPage() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [highestScores, setHighestScores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];
    const username = sessionStorage.getItem('username') || 'guest';

    setUserAnswers(storedAnswers);
    const correctCount = storedAnswers.filter(
      item => item.userAnswer === item.correctAnswer
    ).length;
    setScore(correctCount);

    // actualizare scoruri în localStorage
    const localScores = JSON.parse(localStorage.getItem('highestScores')) || {};
    const currentBest = localScores[username] || 0;

    if (correctCount > currentBest) {
      localScores[username] = correctCount;
      localStorage.setItem('highestScores', JSON.stringify(localScores));
    }

    setHighestScores(localScores);
  }, []);

  const goToStart = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Scorul final: {score} / {userAnswers.length}</h2>
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

      <h3>Istoric scoruri (Highest Score):</h3>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>Username</th>
            <th>Scor maxim</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(highestScores).map(([username, score]) => (
            <tr key={username}>
              <td>{username}</td>
              <td>{score}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={goToStart}>Înapoi la pagina de start</button>
    </div>
  );
}

export default ResultPage;
