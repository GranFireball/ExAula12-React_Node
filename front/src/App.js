import './App.css';
import { useRef } from 'react';
import Insert from './components/Insert';
import Delete from './components/Delete';
import Edit from './components/Edit';

function App() {
  const usuario = useRef(null);
  const senha = useRef(null);
  return (
    <>
      <input type="text" ref={usuario} placeholder='Usuário' />
      <input type="text" ref={senha} placeholder='Senha' />
      <Insert usuario={usuario} senha={senha} />
      <Delete usuario={usuario} />
      <Edit usuario={usuario} senha={senha} />
    </>
  );
}

export default App;
