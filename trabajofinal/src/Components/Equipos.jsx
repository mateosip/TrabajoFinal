import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";
import Styles from "./Styles.css";

const Equipos = (props) => {
  return props.informacion.map((el) => {
    return (
      <div key={el.id}>
        <div className="elemento" onClick={()=>props.buscarDatosEquipo(el.full_name)}>{el.full_name}</div>
      </div>
    );
  });
};
export default Equipos;
