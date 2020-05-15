import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import axios from "axios";
import { gql } from "apollo-boost";
import md5 from "md5";
import cloneDeep from "clone-deep";
import Styles from "./Styles.css";

const Partido = (props) => {
  return props.informacion.map((el) => {
    return (
      <div key={el.id}>
        {el.home_team && el.id === props.partidoMostrar
          ? (console.log(el),
            (
              <div>
                <div className="elemento">
                  {el.home_team.name} {el.home_team_score} -{" "}
                  {el.visitor_team_score} {el.visitor_team.name}
                </div>
                <div className="elemento">Estado: {el.status}</div>
                <div className="elemento">Temporada: {el.season}</div>
              </div>
            ))
          : null}
      </div>
    );
  });
};
export default Partido;
