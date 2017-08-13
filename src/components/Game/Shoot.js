import React, {Component} from 'react';
import Projectile from './Projectile';

export default class Shoot extends Component {
    constructor(props) {
        super(props);

    }

    // componentDidUpdate() {
    //     const {playerPosition, enemyPosition, info, container} = this.props;
    //         if(info.top <= (enemyPosition.top + enemyPosition.height) && info.top >= enemyPosition.top && info.left === (container.width - enemyPosition.width)) { 
    //             this.props.win();               
    //         } else if(info.top <= (playerPosition.top + 85) && info.top >= playerPosition.top && info.left === 85) {
    //             this.props.lose();
    //         }
    
    // }
    
    //passing the position of the hero div down to projectile
    render() {
        return (
            <Projectile position={this.props.info} />
        )
    }
}