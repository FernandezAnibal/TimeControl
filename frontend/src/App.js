import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'


import Navigation from './component/Navigation'
import Empleados from './component/Empleados'
import Maquinas from './component/Maquinas'
import Principal from './component/Principal'


function App() {
  return (
    <Router >
        <Navigation/>
        <Route path= "/" exact component = {Principal} />
        <Route path= "/maquinas" component = {Maquinas} />
        <Route path= "/principal" component = {Principal} />
        <Route path= "/empleados" component = {Empleados} />
    </Router>
  );
}

export default App;
