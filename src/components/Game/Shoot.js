import React, {Component} from 'react';
import Projectile from './Projectile';

export default class Shoot extends Component {
    componentDidUpdate() {
        // const {info: {top, left}} = this.props;
        // console.log(this.props.info);
        //oncollide method
    }

    render() {
        // const {info: {top, left}} = this.props;
        return (
            <Projectile position={this.props.info} />
        )
    }
}