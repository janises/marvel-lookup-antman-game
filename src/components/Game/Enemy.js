import React, {Component} from 'react';

export default class Enemy extends Component {
    constructor() {
        super();

            this.speed= 10;
            this.size = {
                height: 50,
                width: 50
            };
            this.position = {
                top: 350,
                left: 350
            };
        
    }

    

    render() {
        if(this.position.top <= 300) {
            this.position.top += this.speed;
        } else { 

        }
            
    }
}