import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import './App.scss';
import Achievements from './components/Achievements';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import LeastAverageDeathRanking from './components/ranking/LeastAverageDeathRanking';
import MostAssistInOneGameRanking from './components/ranking/MostAssistInOneGameRanking';
import MostAverageAssistRanking from './components/ranking/MostAverageAssistRanking';
import MostAverageKillRanking from './components/ranking/MostAverageKillRanking';
import MostDamageDoneInOneGameRanking from './components/ranking/MostDamageDoneInOneGameRanking';
import MostDamageTakenInOneGameRanking from './components/ranking/MostDamageTakenInOneGameRanking';
import MostDeathInOneGameRanking from './components/ranking/MostDeathInOneGameRanking';
import MostHealingDoneInOneGameRanking from './components/ranking/MostHealingDoneInOneGameRanking';
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
        <Route exact path='/ranking/most_damage_done_one_game' component={MostDamageDoneInOneGameRanking} />
        <Route exact path='/ranking/most_healing_done_one_game' component={MostHealingDoneInOneGameRanking} />
        <Route exact path='/ranking/most_damage_taken_one_game' component={MostDamageTakenInOneGameRanking} />
        <Route exact path='/ranking/most_avg_kill' component={MostAverageKillRanking} />
        <Route exact path='/ranking/most_avg_assist' component={MostAverageAssistRanking} />
        <Route exact path='/ranking/least_avg_death' component={LeastAverageDeathRanking} />
        
        { /* 404 */ }
        <Route path='*'>
          <Redirect to='/'/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
