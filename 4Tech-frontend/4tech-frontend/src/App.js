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
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/timeline" component={Timeline} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
