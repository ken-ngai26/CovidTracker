import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./login.component";
import SignUp from "./signup.component";
import CovidTrack from "./components/CovidTrack/CovidTrack"

function App() {
  return (<Router>
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/CovidTrack"}>Covid-19 Tracker</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/CovidTrack"}>CovidTrack</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/CovidTrack" component={CovidTrack} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            
            {/* <Route exact path='/'/>
            <Route path="/sign-in" />
            <Route path="/sign-up"/>
            <Route path="/CovidTrack" /> */}

          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;