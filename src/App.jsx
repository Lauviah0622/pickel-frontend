import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Entry from './pages/Entry';
import Create from './pages/Create';
import Event from './pages/Event';
import Pick from './pages/Pick';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Entry} />
          <Route path="/create" component={Create}/>
          <Route path="/event/:suffix" component={Event}/>
          <Route path="/pick/:suffix" component={Pick}/>
          <Redirect to='/' />
        </Switch>
    </Router>
  );
}

export default App;
