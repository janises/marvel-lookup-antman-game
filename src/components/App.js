import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import "../styles/main.scss";
import CharacterInfo from "./Marvel/CharacterInfo";
import Header from "./Header/Header";
import Landing from "./Landing/Landing";
import Game from "./Game/Game";

class App extends Component {
  render() {
    return (
      <div className="App">
         <Header /> 
        <Switch>
           <Route component={Landing} exact path='/'/> 
           <Route component={CharacterInfo} path="/marvelcharacters"/> 
           <Route component={Game} path="/game"/>

        </Switch>
      </div>
    );
  }
}

export default App;
