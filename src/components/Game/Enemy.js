import React, {Component} from 'react';

export default class Enemy extends Component {
    constructor() {
        super();
        this.state = {
            speed: 1,
        }
        this.moveEnemy = this.moveEnemy.bind(this);
        
    }

    componentDidMount() {
        requestAnimationFrame(() => this.moveEnemy()); 
    }

    moveEnemy() {
        //this.props.update from the Game component - allows Enemy to update the state in Game
        this.props.update(
             this.props.position.top + this.state.speed
        )
        // if the position of Enemy hits 0 or 350, it reverses direction
        if(this.props.position.top <= 0 || this.props.position.top >= 350) {
            //eslint-disable-next-line
            this.state.speed *= -1;
        }

        requestAnimationFrame(()=>this.moveEnemy());


    }

    render() {
        
        // console.log(this.state.position.top)

        return ( 
            <div className="enemy" style={this.props.position}></div>
        )
    }
}