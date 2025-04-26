import {Button} from './Button.jsx';
import { useState} from 'react';
import questions from './data/intrebari.json';
import './App.css';
import { useNavigate } from 'react-router-dom'; 



function StartPage() {
  const [questionurl, setQuestion] = useState(questions);
  const [nume, setNume] = useState('');
  const [aleatoriu, setAleatoriu] = useState(null);
  const [limitaTimp, setLimitaTimp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault(); 
  sessionStorage.setItem('userAnswers', JSON.stringify([])); 


  if(!nume || aleatoriu === null || !limitaTimp) {
    setError("Toate campurile sunt obligatorii!");
    return;
  }

  setError('');

const intrebariamestecate = [...questionurl].sort(() => Math.random() - 0.5);
 sessionStorage.setItem('username', nume);
 sessionStorage.setItem('aleatoriu', aleatoriu);
 sessionStorage.setItem('limita', limitaTimp);
 sessionStorage.setItem('intrebari', JSON.stringify(intrebariamestecate));

 navigate('/intrebari'); 

  }


const aranjareAleatoare = () => {
 
const shuffled = [...questionurl].sort(() => Math.random() - 0.5);
setQuestion(shuffled);
setAleatoriu(true);

}




    return (
        <form className='card'>
          <h2>Pagina de start</h2>
        <label htmlFor="numele">Introdu numele: </label>
          <input type="text" id="numele" value={nume} onChange={(e) => setNume(e.target.value)} required/><br />
          <label htmlFor="optiune">Ordinea aleatorie a intrebarilor: </label>
          <label htmlFor="da">Da</label>
          <input type="radio" id="da" name="optiune" value="Da" onChange={() => aranjareAleatoare()}/>
          <label htmlFor="nu">Nu</label>
          <input type="radio" id="nu" name="optiune" value="Nu" onChange={() => setAleatoriu(false)}/> <br />
          <label htmlFor="limita">Timp limita per intrebare: </label>
          <label htmlFor="nelimitat">Nelimitat</label>
          <input type="radio" id="nelimitat" name="timp" value="Nelimitat" checked={limitaTimp === 'Nelimitat'} onChange={(e) => setLimitaTimp(e.target.value)}/>
          <label htmlFor="zece">10 secunde</label>
          <input type="radio" id="zece" name="timp" value="10 secunde" checked={limitaTimp === '10 secunde'} onChange={(e) => setLimitaTimp(e.target.value)}/><br />
          {error && <p className="error">{error}</p>}
          <Button onClick={handleSubmit} className="button" data-role="theme-button">Începe testul</Button>
        </form>
      
    )
}

export default StartPage;