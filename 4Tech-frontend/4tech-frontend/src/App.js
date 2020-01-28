import React from 'react';
import './App.css';
import Login from './containers/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Timeline from './containers/Timeline/Timeline';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/timeline" component={Timeline} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
