import React, {Component} from 'react';
import Projectile from './Projectile';

export default class Shoot extends Component {
 
    //passing the position of the hero div down to projectile
    render() {
        return (
            <Projectile position={this.props.info} />
        )
    }
}