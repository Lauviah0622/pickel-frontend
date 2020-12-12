import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Entry from './pages/Entry';
import Event from './pages/Event';


function App() {
  return (
    <Router>
        {/* <Loading/> */}
        <Switch>
          <Route path="/" exact component={Entry} />
          <Route path="/event" component={Event}/>
          <Route path="/pick">456</Route>
          <Redirect to='/' />
z
        </Switch>
    </Router>
  );
}

export default App;
