import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";
import Styles from "./Styles.css";

const Jugadores = (props) => {
  return props.informacion.map((el) => {
    return (
      <div key={el.id}>
        {el.first_name &&
        `${el.first_name}${" "}${el.last_name}` === props.jugadorBuscado ? (
          // si clicas en un partido tienen que aparecerte todos los elementos del partido:()
          <div>
            <div className="elemento">
              Nombre: {el.first_name} {el.last_name}
            </div>
            <div className="elemento">Equipo: {el.team.full_name}</div>
          </div>
        ) : null}
      </div>
    );
  });
};
export default Jugadores;
