import React from 'react';
// import "./Game.css";

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