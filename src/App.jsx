import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Entry from './pages/Entry';
import Event from './pages/Event';
import Pick from './pages/Pick';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Entry} />
          <Route path="/event" component={Event}/>
          <Route path="/pick" component={Pick}/>
          <Redirect to='/' />
        </Switch>
    </Router>
  );
}

export default App;
