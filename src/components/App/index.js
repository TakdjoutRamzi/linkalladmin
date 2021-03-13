import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header";
import ConnexionPage from "../ConnexionPage";
import Footer from "../Footer";
import Admin from "../Admin";
import ErrorPage from "../ErrorPage";
import ForgetPassword from "../ForgetPassword";
import Ads from "../Ads";
import Home from "../Home";
import UsersPage from "../UsersPage";
import "../../App.css";
import { IconContext } from "react-icons";

function App() {
  return (
    <Router>
      <IconContext.Provider value={{ style: { verticalAlign: "middle" } }}>
        <Header />

        <Switch>
          <Route exact path="/" component={ConnexionPage} />
          <Route path="/ads" component={Ads} />
          <Route path="/admin" component={Admin} />
          <Route path="/forgetpassword" component={ForgetPassword} />
          <Route path="/home" component={Home} />
          <Route path="/usersPage" component={UsersPage} />
          <Route component={ErrorPage} />
        </Switch>

        <Footer />
      </IconContext.Provider>
    </Router>
  );
}

export default App;
