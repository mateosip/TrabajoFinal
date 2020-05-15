import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import App from "./Containers/App.js";
import * as serviceWorker from "./serviceWorker";
import ApolloClient from "apollo-boost";
import {ApolloProvider} from "@apollo/react-hooks";
axios.defaults.headers.common["x-rapidapi-host"] = "free-nba.p.rapidapi.com";
axios.defaults.headers.common["x-rapidapi-key"] =
  "b656ec7119msh0b2549279109802p12ea9fjsnee3d8b3c0d50";

const client = new ApolloClient({
  uri: "http://localhost:8000",
});
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
serviceWorker.unregister();
