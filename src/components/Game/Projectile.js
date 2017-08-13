import React from 'react';

//each projectile has a className "projectile" and a position relative to the position of the hero div
const style = (position) => {
    return {
        top: position.position.top,
        left: position.position.left,
    };
};

export default (props) => {

    
        return (
        <div className="projectile" style={style(props)}/>
    )
}