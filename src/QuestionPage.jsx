import './App.css'
import questions from './data/intrebari.json';
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {ThemeContext} from './tema/ThemeContext.jsx';


function QuestionPage() {
    const [questionurl, setQuestion] = useState(() => {
        const stored = sessionStorage.getItem('intrebari');
        return stored ? JSON.parse(stored) : questions; 
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10);
    const navigate = useNavigate();
    const {theme} = useContext(ThemeContext);
    const timpLimita = sessionStorage.getItem('limita');


    const currentQuestion = questionurl[currentIndex];


    const handleTimeout = () => {
        if(!showResult) {
            setShowResult(true);
            setSelectedAnswer(null);

            setTimeout(() => {
                if(currentIndex === questionurl.length - 1) {
                    navigate('/rezultate');
                } else {
                    setSelectedAnswer(null);
                    setShowResult(false);
                    setTimeLeft(10);
                    setCurrentIndex((prev) => prev + 1);
                }
            }, 3000);
        }
    };

    useEffect(() => {
    if(showResult || timpLimita === 'Nelimitat') return;
    const timer = setInterval(() => {
        setTimeLeft((prev) => {
            if(prev <= 1) {
                clearInterval(timer);
                handleTimeout();
                return 0;
            }
            return prev - 1;
        });
    }, 1000);

    return () => clearInterval(timer);
    }, [currentIndex, showResult, timpLimita]);

 
   const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    const userAnswers = JSON.parse(sessionStorage.getItem('userAnswers')) || [];
    userAnswers.push({ 
        question: currentQuestion.intrebare, 
        correctAnswer: currentQuestion.raspunsul,
        userAnswer: answer 
    });
    sessionStorage.setItem('userAnswers', JSON.stringify(userAnswers));

    if (timpLimita !== 'Nelimitat') {
        setTimeout(() => {
            if (currentIndex === questionurl.length - 1) {
                navigate('/rezultate');
            } else {
                setSelectedAnswer(null);
                setShowResult(false);
                setTimeLeft(10);
                setCurrentIndex((prev) => prev + 1);
            }
        }, 3000);
    }

   };
   const nextQuestion = () => {
    if (currentIndex === questionurl.length - 1) {
      navigate('/rezultate');
    } else {
      setSelectedAnswer(null);
      setShowResult(false);
      if(timpLimita !== 'Nelimitat') {
      setTimeLeft(10);
      }
      setCurrentIndex((prev) => prev + 1);
    }
  };


    return (
    <div className="card">
      
            <h2>{currentQuestion.intrebare}</h2>
            {timpLimita !== 'Nelimitat' && (
                <span>Timp ramas: {timeLeft} secunde</span>
            )}
            <p>Categorie: {currentQuestion.categorie} | Dificultate: {currentQuestion.dificultate}</p>
            <div key={theme}>
                {currentQuestion.lista.map((option, index) => (
                    <button key={`${index}-${theme}`} onClick={() => handleAnswerClick(option)} disabled={showResult}
                    className={`
                          w-full sm:w-1/2 md:w-1/3 lg:w-1/4
                            p-2 sm:p-3 md:p-4
                                        text-sm sm:text-base md:text-lg
                                     rounded-xl
                                             transition-all duration-300              
                        ${theme === 'dark' ? 'selectdark' : 'selectlight'}
                        ${showResult && option === currentQuestion.raspunsul ? 'bg-green-200' : ''}
                        ${showResult && selectedAnswer === option && selectedAnswer !== currentQuestion.raspunsul ? 'bg-red-200' : ''}
                      `}>
                        {option}
                    </button>
                ))}
            </div>
            {showResult && (
                <div>
                    <p className={`font-semibold ${selectedAnswer === currentQuestion.raspunsul ? 'text-green-600' : 'text-red-600'}`}>
              {selectedAnswer === currentQuestion.raspunsul ? 'Corect!' : `Greșit! Răspunsul corect este: ${currentQuestion.raspunsul}`}
            </p>
            {timpLimita === 'Nelimitat' && (
        <button onClick={nextQuestion} className={theme === 'dark' ? 'selectdark' : 'selectlight'}>
            {currentIndex === questionurl.length - 1 ? 'Vezi scorul' : 'Urmatoarea intrebare' }
        </button>
            )}
                </div>
            )}
      
    </div>
    );


}

export default QuestionPage;



