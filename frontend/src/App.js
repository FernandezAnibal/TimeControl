import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-router-bootstrap';

import Navigation from './component/Navigation'
import CreateNote from './component/CreateNote'
import NoteList from './component/NoteList'
import CreateUser from './component/CreateUser'

function App() {
  return (
    <Router>
        <Navigation/>
        <Route path= "/" exact component = {NoteList} />
        <Route path= "/edit/:id" component = {CreateNote} />
        <Route path= "/create" component = {CreateNote} />
        <Route path= "/user" component = {CreateUser} />
    </Router>
  );
}

export default App;
