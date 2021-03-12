import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import './App.scss';
import Achievements from './components/Achievements';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import MostAssistInOneGameRanking from './components/ranking/MostAssistInOneGameRanking';
import MostDeathInOneGameRanking from './components/ranking/MostDeathInOneGameRanking';
import MostKillInOneGameRanking from './components/ranking/MostKillInOneGameRanking';
import Ranking from './components/ranking/Ranking';
import Stats from './components/Stats';

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Switch location={location} key={location.pathname}>
        { /* Main */ }
        <Route exact path='/' component={Main} />

        { /* Profile */ }
        <Route exact path='/profile/:id' component={Profile} />
        <Route exact path='/profile/:id/achievements' component={Achievements} />
        <Route exact path='/profile/:id/stats' component={Stats} />

        { /* Ranking/Leaderboard */}
        <Route exact path='/ranking' component={Ranking} />
        <Route exact path='/ranking/most_kills_one_game' component={MostKillInOneGameRanking} />
        <Route exact path='/ranking/most_deaths_one_game' component={MostDeathInOneGameRanking} />
        <Route exact path='/ranking/most_assists_one_game' component={MostAssistInOneGameRanking} />

        { /* 404 */ }
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
