import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Entry from './pages/Entry';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={Entry} />
          <Route path="/event">345</Route>
          <Route path="/pick">456</Route>
        </Switch>
    </Router>
  );
}

export default App;
