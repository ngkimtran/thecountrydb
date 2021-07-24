import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/Home'
import Error from './pages/Error'
import SingleCountry from './pages/SingleCountry'
import Navbar from './components/Navbar'

function App() {
  return (
    <div class='container'>
      <Router>
        <Navbar />
          <Switch>
            <Route path="/thecountrydb/" exact component={Home} />
            <Route path="/thecountrydb/country/:name" component={SingleCountry} />
            <Route path="*" component={Error} />
          </Switch>
      </Router>
    </div>
  );
}

export default App;
