import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import './App.scss';
import Achievements from './components/Achievements';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Ranking from './components/ranking/Ranking';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Switch location={location} key={location.pathname}>
        <Route exact path='/' component={Main} />
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/profile/:id/achievements' component={Achievements} />
        <Route path='/ranking' component={Ranking} />
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
