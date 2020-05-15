import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Axios from "axios";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";
import Styles from "./Styles.css";

const LOGIN_PETICION = gql`
  mutation Login($nombre: String!, $contrasena: String!) {
    login(nombre: $nombre, contrasena: $contrasena) {
      _id
      nombre
      token
    }
  }
`;
//Hacemos uqe en registro se haga después el login para que una vez te registres ya entres
const REGISTRO_PETICION = gql`
  mutation AddUser($nombre: String!, $contrasena: String!) {
    addUser(nombre: $nombre, contrasena: $contrasena) {
      _id
      nombre
      token
    }
    login(nombre: $nombre, contrasena: $contrasena) {
      _id
      nombre
      token
    }
  }
`;

const Login = (props) => {
  //Cuando hagamos loginUser estaremos llamando a la mutación y se guardará todo en loginData.
  const [
    loginUser,
    { loading: loginLoading, error: loginError, data: loginData },
  ] = useMutation(LOGIN_PETICION);
  const [
    registroUser,
    { loading: registroLoading, error: registroError, data: registroData },
  ] = useMutation(REGISTRO_PETICION);

  const [estaLogin, setEstaLogin] = useState(true);
  //const [infoLogin,setInfoLogin] = useState({
  //    nombre:"",
  //    contrasena:"",
  //});//LA INFORMACIÓN DEL FORMULARIO SE VA A GUARDAR AQUÍ

  useEffect(() => {
    //Cada vez que se recarga el componente
    if (estaLogin && loginData) {
      //Cuando ya se ha realizado una mutación y por lo tanto loginData tiene info guardada
      guardarDatosUsuarios(
        loginData.login._id,
        loginData.login.nombre,
        loginData.login.token
      );
    } else if (!estaLogin && registroData) {
      // Cuando no esta logueado pero se ha realizado la mutación de registrarse y se procederá al inicio
      guardarDatosUsuarios(
        registroData.login._id,
        registroData.login.nombre,
        registroData.login.token
      );
    }
  });
  const guardarDatosUsuarios = (_id, nombre, token) => {
    localStorage.setItem("idUsuario", _id);
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("token", token);
  };
  const clickBoton = async () => {
    if (estaLogin) {
      await loginUser({
        //espera hasta que se haga la mutación para continuar
        variables: {
          nombre: document.getElementById("nombre").value,
          contrasena: md5(document.getElementById("contrasena").value),
        },
      });
    } else {
      await registroUser({
        //espera a que se haga la mutacion para continuar
        variables: {
          nombre: document.getElementById("nombre").value,
          contrasena: md5(document.getElementById("contrasena").value),
        },
      });
    }
    props.setSeHaLogueado(true); //Para que pase a mostrar el content
  };
  return (
    <div className="inicio">
      {estaLogin ? ( //por defecto va a ser está la opción, a no ser que se pulse un botón que pondremos más abajo
        <div className="login">
          <p>LOGIN</p>
          <input
            className="nombre"
            type="text"
            name="nombre"
            id="nombre"
            placeholder="nombre usuario"
          />
          <input
            className="contrasena"
            type="password"
            name="contrasena"
            id="contrasena"
            placeholder="contrasena"
          />
          <div className="botones">
            <button className="button" onClick={() => clickBoton()}>
              OK
            </button>
            <div className="crearCuenta" onClick={() => setEstaLogin(false)}>
              Crear cuenta
            </div>
          </div>
        </div>
      ) : (
        <div className="register">
          <p>REGISTER</p>
          <input
            className="nombre"
            type="text"
            name="nombre"
            id="nombre"
            placeholder="nombre usuario"
          />
          <input
            className="contrasena"
            type="password"
            name="contrasena"
            id="contrasena"
            placeholder="contrasena"
          />
          <div className="botones">
            <button className="button" onClick={() => clickBoton()}>
              OK
            </button>
            <div className="crearCuenta" onClick={() => setEstaLogin(true)}>
              Acceder
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
