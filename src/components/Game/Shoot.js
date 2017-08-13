import React, {Component} from 'react';
import Projectile from './Projectile';

export default class Shoot extends Component {
    // componentDidUpdate() {
    //     const {info: {top, left}} = this.props;
    //     if(left >= 390) {
            
    //     }
     
    // }

    render() {
        // const {info: {top, left}} = this.props;
        return (
            <Projectile position={this.props.info} />
        )
    }
}