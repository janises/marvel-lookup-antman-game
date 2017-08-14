import React from 'react';
import {Link} from 'react-router-dom';

export default function GameIntro(){
  
        return (
            <div className="game-intro-container">
                <div className="ant-man"></div>
                <div className="instructions">
                    <h3> Feminist Ant-Man needs some target practice. Help him smash the patriarchy with a few choice words. </h3> 
                    <h5> Press the ARROW KEYS to move Ant-Man.</h5>
                    <h5> Press SPACE BAR to share some knowledge.</h5>
                    <h5> Don't get hit by the shade the patriarchy is throwing.</h5>
                </div>
               
                <div className="press-play">
                    <Link to="/game">
                        <h1 className="play-button">PLAY</h1>
                    </Link>
                </div>

            </div>
        )
    
}