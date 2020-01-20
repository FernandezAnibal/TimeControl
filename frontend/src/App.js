import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css'
import 'react-router-bootstrap';


import Navigation from './component/Navigation'
import CreateNote from './component/CreateNote'
//import NoteList from './component/NoteList'
//import CreateUser from './component/CreateUser'
import Maquinas from './component/Maquinas'
import Principal from './component/Principal'


function App() {
  return (
    <Router >
        <Navigation/>
        <Route path= "/" exact component = {Principal} />
        <Route path= "/edit/:id" component = {CreateNote} />
        <Route path= "/create" component = {CreateNote} />
        <Route path= "/maquinas" component = {Maquinas} />
        <Route path= "/principal" component = {Principal} />
    </Router>
  );
}

export default App;
