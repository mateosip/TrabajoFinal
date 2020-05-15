import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";
import Styles from "./Styles.css";
import Equipos from "./Equipos.jsx";
import Partidos from "./Partidos.jsx";
import PartidosEquipo from "./PartidosEquipo.jsx";
import DatosEquipo from "./DatosEquipo.jsx";
import Partido from "./Partido.jsx";
import Jugadores from "./Jugadores.jsx";
import JugadoresEquipo from "./JugadoresEquipo.jsx";
const Aplicacion = (props) => {
  const [addURL, setAddURL] = useState("teams");
  const [informacion, setInformacion] = useState(null);
  const [change, setChange] = useState(false);
  const [equipoBuscado, setEquipoBuscado] = useState(null);
  const [datosEquipo, setDatosEquipo] = useState(null);
  const [partidoMostrar, setPartidoMostrar] = useState(null);
  const [jugadorBuscado, setJugadorBuscado] = useState(null);
  const [equipoJugador, setEquipoJugador] = useState(null);

  const LOGOUT_PETICION = gql`
    mutation Logout($nombre: String!, $token: String!) {
      logout(nombre: $nombre, token: $token) {
        _id
        nombre
        token
      }
    }
  `;

  const [
    logoutUser,
    { loading: logoutLoading, error: logoutError, data: logoutData },
  ] = useMutation(LOGOUT_PETICION);
  useEffect(() => {
    axios.get(`https://free-nba.p.rapidapi.com/${addURL}`).then((response) => {
      console.log(response);
      setInformacion(response.data.data);
    });
  }, [addURL]);

  const mostrarPartidos = () => {
    setAddURL("games");
    setEquipoBuscado(null);
    setPartidoMostrar(null);
  };
  const mostrarEquipos = () => {
    setAddURL("teams");
    setDatosEquipo(null);
  };
  const buscarPartidosEquipo = (props) => {
    //en props está el nombre del equipo del que queremos buscar sus partidos
    setEquipoBuscado(props);
    setAddURL("games");
  };
  const buscarDatosEquipo = (props) => {
    setDatosEquipo(props);
    setAddURL("teams");
  };
  const mostrarPartido = (props) => {
    setPartidoMostrar(props);
  };
  const buscarPartidosMostrarPartido = (props) => {
    mostrarPartido(null);
    buscarPartidosEquipo(props);
  };
  const mostrarJugador = (props) => {
    //jugadorBuscado tiene el nombre del jugador buscado
    setEquipoJugador(null);
    setJugadorBuscado(props);
    setAddURL("players");
  };
  const buscarEquipoJugador = (props) => {
    console.log(props);
    setJugadorBuscado(null);
    setEquipoJugador(props);
    setAddURL("players");
  };
  const hacerLogout = () => {
    logoutUser({
      variables: {
        nombre: localStorage.getItem("nombre"),
        token: localStorage.getItem("token"),
      },
    });
    localStorage.removeItem("idUsuario");
    localStorage.removeItem("nombre");
    localStorage.removeItem("token");
    props.setEstaConectado(false);
    props.setSeHaLogueado(false);
  };
  return (
    <div className="aplicacion">
      <div className="cuadro">
        <div className="titulo">{addURL.toUpperCase()}</div>
        <div className="informacion">
          {informacion ? (
            addURL === "teams" && datosEquipo === null ? (
              <Equipos
                informacion={informacion}
                buscarDatosEquipo={buscarDatosEquipo}
              />
            ) : addURL === "games" &&
              equipoBuscado === null &&
              partidoMostrar === null ? (
              <Partidos
                informacion={informacion}
                mostrarPartido={mostrarPartido}
              />
            ) : addURL === "games" &&
              equipoBuscado !== null &&
              partidoMostrar === null ? (
              <PartidosEquipo
                informacion={informacion}
                equipoBuscado={equipoBuscado}
                mostrarPartido={mostrarPartido}
              />
            ) : addURL === "teams" && datosEquipo !== null ? (
              <DatosEquipo
                informacion={informacion}
                datosEquipo={datosEquipo}
              />
            ) : addURL === "games" && partidoMostrar ? (
              (console.log("Hola"),
              (
                <Partido
                  informacion={informacion}
                  mostrarPartido={mostrarPartido}
                  partidoMostrar={partidoMostrar}
                />
              ))
            ) : addURL === "players" &&
              jugadorBuscado !== null &&
              equipoJugador === null ? (
              (console.log(jugadorBuscado),
              (
                <Jugadores
                  informacion={informacion}
                  jugadorBuscado={jugadorBuscado}
                />
              ))
            ) : addURL === "players" &&
              jugadorBuscado === null &&
              equipoJugador !== null ? (
              <JugadoresEquipo
                informacion={informacion}
                equipoJugador={equipoJugador}
              />
            ) : null
          ) : null}
        </div>
      </div>
      <div className="filtros">
        <div className="botonesArriba">
          <button className="mostrarPartidos" onClick={() => mostrarPartidos()}>
            Mostrar partidos
          </button>
          <button className="mostrarPartidos" onClick={() => mostrarEquipos()}>
            Mostrar equipos{" "}
          </button>
        </div>
        <span>Partidos del equipo: </span>
        <div className="buscador">
          <input
            className="partidosEquipo"
            type="text"
            name="partidosEquipo"
            id="partidosEquipo"
            placeholder=" equipo"
          />
          <button
            className="botonBuscador"
            onClick={
              () =>
                buscarPartidosMostrarPartido(
                  document.getElementById("partidosEquipo").value
                )
              // buscarPartidosEquipo(
              //   document.getElementById("partidosEquipo").value
              // )
            }
          >
            Search
          </button>
        </div>
        <span>Datos del equipo: </span>
        <div className="buscador">
          <input
            className="datosEquipo"
            type="text"
            name="datosEquipo"
            id="datosEquipo"
            placeholder="equipo"
          />
          <button
            className="botonBuscador"
            onClick={() =>
              buscarDatosEquipo(document.getElementById("datosEquipo").value)
            }
          >
            Search
          </button>
        </div>
        <span>Buscar jugador: </span>
        <div className="buscador">
          <input
            className="buscarJugador"
            type="text"
            name="buscarJugador"
            id="buscarJugador"
            placeholder="jugador"
          />
          <button
            className="botonBuscador"
            onClick={() =>
              mostrarJugador(document.getElementById("buscarJugador").value)
            }
          >
            Search
          </button>
        </div>
        <span>Mostrar jugadores del equipo: </span>
        <div className="buscador">
          <input
            className="jugadoresEquipo"
            type="text"
            name="jugadoresEquipo"
            id="jugadoresEquipo"
            placeholder="equipo"
          />
          <button
            className="botonBuscador"
            onClick={() =>
              buscarEquipoJugador(
                document.getElementById("jugadoresEquipo").value
              )
            }
          >
            Search
          </button>
        </div>
      </div>
      <div className="logout" onClick={() => hacerLogout()}>
        LOGOUT
      </div>
    </div>
  );
};
export default Aplicacion;
