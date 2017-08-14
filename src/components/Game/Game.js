import React, {Component} from "react";
import Shoot from './Shoot';
import Enemy from "./Enemy";

export default class Game extends Component {
    constructor() {
        super();

        this.state={
            container: {
                height: 400,
                width: 600
            },
            positions: {
                player: {top: 0,
                        left: 0
                        },
                projectiles: []
            },
            projectileSpeed: 20,
            projectileIndex: 0,
            enemy: {
                top: 250,
                left: 550,
                height: 60,
                width: 50
            },
            enemyProjectiles: []

        };
        this.defaultState = Object.assign({}, this.state);
        this.makeNewProjectile = this.makeNewProjectile.bind(this);
        this.startProjectile = this.startProjectile.bind(this);
        this.handleKeypress = this.handleKeypress.bind(this);
        this.updateProjectilePositions = this.updateProjectilePositions.bind(this);
        this.updateEnemyPosition = this.updateEnemyPosition.bind(this);
    }


    componentDidMount() {
        this.refs.hero.focus();
        window.onkeydown = this.handleKeypress;
        requestAnimationFrame(()=>this.updateProjectilePositions());
    }

    getDefaultState() {
        return this.defaultState;
    }    

    makeNewProjectile(character) {
        this.setState({
            projectileIndex: this.state.projectileIndex + 1
        });

        if(character === "hero") {
            const newProjectile = {
                key: this.state.projectileIndex,
                info: {
                    top: this.state.positions.player.top + 25,
                    left: this.state.positions.player.left + 75
                }};
                return newProjectile;
        } else {
            const newEnemyProjectile = {
                key: this.state.projectileIndex,
                info: {
                    top: this.state.enemy.top + (this.state.enemy.height/2 + 10),
                    left: this.state.enemy.left
                }
            }
            return newEnemyProjectile;
        }

    }

    startProjectile() {
        const newProjectile = this.makeNewProjectile("hero");
        const newEnemyProjectile = this.makeNewProjectile("enemy")

        this.setState({
            positions: {
                ...this.state.positions,
                projectiles: [...this.state.positions.projectiles].concat(newProjectile)
            },
            enemyProjectiles: [...this.state.enemyProjectiles].concat(newEnemyProjectile)
        });
        
    }



    updateProjectilePositions() {
        //eslint-disable-next-line
        const {positions, container, enemy, enemyProjectiles} = this.state;
        //eslint-disable-next-line
        {positions.projectiles.length < 1 ? null : (
            this.setState({
            positions: {
                ...positions,
                projectiles: positions.projectiles.filter(projectile => !projectile.remove).map(function(projectile) {
                    if(projectile.info.left >= container.width -10 ) {
                        projectile.remove = true;
                    } else {
                        projectile.info.left += 5;
                        projectile.remove = false;
                    }
                    return projectile;
                })
            }
        })

        )}
//eslint-disable-next-line  
            enemyProjectiles.length < 1 ? null : (
                this.setState({
                    enemyProjectiles: enemyProjectiles.filter(projectile => !projectile.remove).map(function(projectile) {
                        if(projectile.info.left <= 10) {
                            projectile.remove = true;
                        } else {
                            projectile.info.left -= 5;
                            projectile.remove = false;
                        }
                        return projectile;
                    }) 
                })
            )
        
            //eslint-disable-next-line
        enemyProjectiles.map((projectile)=> {
            if(projectile.end) {
                this.lose()
            }
        })
//eslint-disable-next-line
        positions.projectiles.map((projectile) => {
            if(projectile.end) {
                this.win()
            }
        })

        requestAnimationFrame(()=>this.updateProjectilePositions());

    }


    handleKeypress(e){
        console.log(e.keyCode)
        switch(e.keyCode) {
            case 38 :
            console.log("up")
            //eslint-disable-next-line
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
            //eslint-disable-next-line
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
            //eslint-disable-next-line
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
            //eslint-disable-next-line
            this.state.positions.player.left >=  10 ?
                (this.setState({
                    positions: {
                            player: {
                                    top: this.state.positions.player.top,
                                    left: this.state.positions.player.left-10
                            },
                            projectiles: this.state.positions.projectiles
                    }
                })) : null;
            break;

            case 32:
            console.log("pew!");
            this.startProjectile();    
            break;

            default:
            break;
        }
    }

    updateEnemyPosition(position) {
        this.setState({
            enemy: {
                top: position,
                left: this.state.enemy.left,
                width: this.state.enemy.width,
                height: this.state.enemy.height
            }
        })
    }

    win =() =>{
        this.setState({...this.getDefaultState()})
        alert("You quoted Ruth Bader Ginsburg and taught the patriarchy a lesson!")
    }

    lose =() => {
        this.setState({...this.getDefaultState()})
        alert("Nevertheless, you persisted")
    }

    render() {
        const {positions: {player: playerPos}, enemy, container} = this.state;
        

        return(
            <div className="game-page">
                <div className="board">
                    <div ref="hero" className="hero" tabIndex="0" onKeyDown={(e) =>this.handleKeypress(e)} style={this.state.positions.player}>  </div>
                    <Enemy position={this.state.enemy} update={this.updateEnemyPosition}/>

                    {this.state.positions.projectiles.length < 1 ? null:  (
                        //eslint-disable-next-line
                        this.state.positions.projectiles.map( function(projectile) {
                            if(projectile.info.top <= (enemy.top + enemy.height) && projectile.info.top >= enemy.top && projectile.info.left === (container.width - enemy.width)) {
                                  projectile.end = true;
                                  // win  
                              } else {   
                                return <Shoot key={projectile.key} info={projectile.info} playerPosition={playerPos} /> 
                             } 
                                
                        
                        })
                    )}

                    {this.state.enemyProjectiles.length < 1 ? null : (
                        //eslint-disable-next-line
                        this.state.enemyProjectiles.map(function(projectile) {
                            if(projectile.info.top <= (playerPos.top + 85) &&
                                projectile.info.top >= playerPos.top && projectile.info.left === playerPos.left+45 ) {
                                    projectile.end = true;
                                    //lose
                            } else {
                                return <Shoot key={projectile.key} info={projectile.info} enemyPosition={enemy}/>
                            }
                        })
                    )}                    
      
                </div>
                <div className="no-game">
                    <h1>Oops! This game should be played on a bigger screen. </h1>
                </div>
            </div>
            
        )
    }
}
