import React, {Component} from "react";
import "./Game.css";
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
       
    }
    

    componentDidMount() {
        this.refs.block.focus();
        window.onkeydown = this.handleKeypress;
    }


       makeNewProjectile = (position) => {
        this.setState({
            projectileIndex: this.state.projectileIndex + 1
        })

        const newProjectile = {key: this.state.projectileIndex, 
        info: {
            top: this.state.positions.player.top + 25,
            left: this.state.positions.player.left + 90
        }};
    

        return newProjectile;
        
    }

    startProjectile = () => {
        const {player: playerPos} = this.state.positions;
        const newProjectile = this.makeNewProjectile(playerPos);

        this.setState({
            positions: {
                ...this.state.positions,
                projectiles: [...this.state.positions.projectiles].concat(newProjectile)
            }
        });
    }

    updateProjectilePositions = () => {
        const {projectileSpeed, positions: {projectiles}} = this.state;
    
        this.setState({
            positions: {
                ...this.state.positions,
                projectiles: projectiles.filter(projectile => !projectile.remove).map(projectile => {
                    if(projectile.left > this.state.container.width + 10) {
                        projectile.remove = true;
                        return projectile;
                    }
                    projectile.left += projectileSpeed;
                    return projectile;
                })
            }
        })
    }
   

    handleKeypress =(e)=> {
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
            console.log(this.state.positions.projectiles)
            break;

            default:
            break;
        }
        // }       
    }

 

    render() {
        const {positions: {player: playerPos}} = this.state;

        return(
            <div className="board">
                <div ref="block" className="block" tabIndex="0" onKeyDown={(e) =>this.handleKeypress(e)} style={this.state.positions.player}>  </div>
                <div className="goal" ref="goal">Goal</div>
                {
                    this.state.positions.projectiles.map(projectile => {
                         return <Shoot key={projectile.key} info={projectile.info} playerPosition={playerPos} /> 
                        
                    
                    })

                }
               
            </div>
        )
    }
}