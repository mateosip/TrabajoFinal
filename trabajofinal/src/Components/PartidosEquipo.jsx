import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";
import Styles from "./Styles.css";

const PartidosEquipo = (props) => {
  return props.informacion.map((el) => {
    return (
      <div key={el.id}>
        {el.home_team && (el.home_team.full_name===props.equipoBuscado || el.visitor_team.full_name===props.equipoBuscado) ? (
          <div className="elemento" onClick = {()=> props.mostrarPartido(el.id)}>
            {el.home_team.name} - {el.visitor_team.name}
          </div>
        ) : null}
      </div>
    );
  });
};
export default PartidosEquipo;
