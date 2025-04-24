import './App.css'

export const Button = ({onClick, children}) => {
return <button className='button' onClick={onClick}>{children}</button>
}