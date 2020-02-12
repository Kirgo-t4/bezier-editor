import React from 'react'

const Point = ({id, x, y, className}) => {
    return (
        <circle className={`canvas__point ${className ? className : ""}`} id={id} cx={x} cy={y} r="5" fill="#ab4328" data-type="point"/>
    );
}


export default Point
