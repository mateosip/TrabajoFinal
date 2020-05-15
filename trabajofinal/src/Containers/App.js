import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Login from '../Components/Login.jsx';
import './App.css';
import Aplicacion from '../Components/Aplicacion'

const App = () => {
  const [seHaLogueado, setSeHaLogueado] = useState(false);
  const [estaConectado,setEstaConectado] = useState(false);
  return (
    <div className="App">
      {!seHaLogueado && !estaConectado? (
        <Login setSeHaLogueado = {setSeHaLogueado} />
      )
      :
      (
        <Aplicacion setEstaConectado={setEstaConectado} setSeHaLogueado={setSeHaLogueado} />
      )}
    </div>
  );//donde pone null poner el content pero todavía no está creado
}

export default App;
