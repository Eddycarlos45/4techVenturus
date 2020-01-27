import React from 'react';
import './App.css';
import Login from './containers/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/timeline" component={Login} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
