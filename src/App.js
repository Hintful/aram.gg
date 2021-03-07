import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import './App.scss';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Profile from './components/Profile';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Switch location={location} key={location.pathname}>
        <Route exact path='/' component={Main} />
        <Route path='/profile/:id' component={Profile} />
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
