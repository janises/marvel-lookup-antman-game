import React, {Component} from "react";
// import "./Game.css";
import Shoot from './Shoot';

export default class Game extends Component {
    constructor() {
        super();

        this.state={
            container: {
                height: 400,
                width: 400
            },
            positions: {
                player: {top: 0,
                        left: 0
                        },
                projectiles: []
            },
            projectileSpeed: 20,
            projectileIndex: 0

        };
        this.makeNewProjectile = this.makeNewProjectile.bind(this);
        this.startProjectile = this.startProjectile.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.updateProjectilePositions = this.updateProjectilePositions.bind(this);
        this.moveProjectiles = this.moveProjectiles.bind(this);
        // this.handleCollision = this.handleCollision.bind(this);
     
    }


    componentDidMount() {
        this.refs.hero.focus();
        window.onkeydown = this.handleKeypress;
    }

        

       makeNewProjectile(/*position*/) {
        this.setState({
            projectileIndex: this.state.projectileIndex + 1
        })

        const newProjectile = {
            key: this.state.projectileIndex,
            info: {
                top: this.state.positions.player.top + 25,
                left: this.state.positions.player.left + 75
            }};


        return newProjectile;

    }

    startProjectile() {
        // const {player: playerPos} = this.state.positions;
        const newProjectile = this.makeNewProjectile(/*playerPos*/);

        this.setState({
            positions: {
                ...this.state.positions,
                projectiles: [...this.state.positions.projectiles].concat(newProjectile)
            }
        });

        this.moveProjectiles();
            
            // this.state.positions.projectiles.map(function(projectile){
            //     if(this.state.positions.projectiles.info.left > 390) {
            //         clearInterval(this.projectileInterval)
            //     } else {
            //         this.projectileInterval = setInterval(this.updateProjectilePositions, 50)
            //     }
            // })
         
        
    }

    moveProjectiles = () => {
        this.projectileInterval = setInterval(this.updateProjectilePositions, 100)
    }

    // handleCollision = () => {
    //     clearInterval(this.projectileInterval)
    // }

    updateProjectilePositions() {
        const {positions, container} = this.state;
        {positions.projectiles.length < 1 ? null : (
            this.setState({
            positions: {
                ...positions,
                projectiles: positions.projectiles.map(function(projectile) {
                    // console.log(projectile, "line 73, updateProjectilePositions()")
                    
                    if(projectile.info.left >= container.width -10 ) {
                        projectile.remove = true;
                    } else {
                        projectile.info.left += 5;
                        projectile.remove = false;
                    }
                    // console.log(projectile, "line 78")
                    return projectile;
                })
            }
        })

        )}
        // positions.projectiles.length > 11 ? positions.projectiles.splice(0, 10) : null;
        // console.log(positions.projectiles)
        for(var i = 0; i < this.state.positions.projectiles.length; i++) {
                if(this.state.positions.projectiles[i].delete) {
                    this.state.positions.projectiles.splice(i, 1)
                }
            }
    }


    handleKeypress(e){
        // this.refs.block.focus();
        console.log(e.keyCode)
        // if(this.state.positions.player.top === 200 && this.state.positions.player.left === 100) {
        //     alert("You Win!");
        //     //something else either pop up a link to the next page or reload the page
        // } else {
        switch(e.keyCode) {
            case 38 :
            console.log("up")
            this.state.positions.player.top >= 10 ? (this.setState({
                positions: {
                    player: {top: this.state.positions.player.top-10,
                            left: this.state.positions.player.left
                            },
                    projectiles: this.state.positions.projectiles
            }})): null;
            break;

            case 40 :
            console.log("down");
            this.state.positions.player.top <=  this.state.container.height -60 ?
            (this.setState({
                positions: {player: {
                                top: this.state.positions.player.top+10,
                                left: this.state.positions.player.left
                            },
                            projectiles: this.state.positions.projectiles
            }})) : null;
            break;

            case 39 :
            console.log("right");
            this.state.positions.player.left <=  this.state.container.width -60 ?
            (this.setState({
                positions: { player: {
                                top: this.state.positions.player.top,
                                left: this.state.positions.player.left+10
                            },
                            projectiles: this.state.positions.projectiles
            }})) : null;
            break;

            case 37 :
            console.log('left');
            this.state.positions.player.left >=  10 ?
            (this.setState({
                positions: {player: {top: this.state.positions.player.top,
                                    left: this.state.positions.player.left-10
                                },
                            projectiles: this.state.positions.projectiles
            }})) : null;
            break;

            case 32:
            console.log("pew!");
            this.startProjectile();
            console.log(this.state.positions.projectiles,"line 143")       
            break;

            default:
            break;
        }
        // }
    }



    render() {
        const {positions: {player: playerPos}} = this.state;

        return(
            <div className="game-page">
                <div className="board">
                <div ref="hero" className="hero" tabIndex="0" onKeyDown={(e) =>this.handleKeypress(e)} style={this.state.positions.player}>  </div>
                <div className="enemy" ref="enemy">Enemy</div>
                {this.state.positions.projectiles.length < 1 ? null:  (
                      this.state.positions.projectiles.map( function(projectile) {
                         {/* console.log(projectile) */}
                         {/* console.log(projectile, "line 181, return")  */}
                            if(projectile.info.top >= 200 && projectile.info.top <= 250 && projectile.info.left === 350) {
                                alert("You Win!")
                            } else {
                                return <Shoot key={projectile.key} info={projectile.info} playerPosition={playerPos} /> 
                            }
                            
                      
                    })) 
                }
      
                </div>
                <div className="no-game">
                    <h1>Oops! This game should be played on a bigger screen. </h1>
                </div>
            </div>
            
        )
    }
}
