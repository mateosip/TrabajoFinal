import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";
import Styles from "./Styles.css";

const DatosEquipo = (props) => {
    return props.informacion.map((el) => {
        return (
          <div key={el.id}>
            {el.full_name && (el.full_name === props.datosEquipo) ? (
              <div className="datos">
                  {console.log(el)}
                <div className="caracteristicas">Alias: {el.name} </div>
                <div className = "caracteristicas">Nombre: {el.full_name}</div>
                <div className="caracteristicas">Conferencia: {el.conference}</div>
                <div className="caracteristicas">Division: {el.division}</div>
                <div className="caracteristicas">Ciudad: {el.city}</div>
              </div>
            ) : null}
          </div>
        );
      });
}
export default DatosEquipo;