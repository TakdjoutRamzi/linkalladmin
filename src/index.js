import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import "semantic-ui-css/semantic.min.css";
import {Container} from 'semantic-ui-react'

ReactDOM.render(
  <Container>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </Container>,
  document.getElementById("root")
);
