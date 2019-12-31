import { Fragment } from "react";
import React from 'react';
import Point from "./Point";

const Curve = (props) => {
    return (
        <Fragment>
            <path 
                id={props.id}
                d={`M${props.points[0].x} ${props.points[0].y} Q ${props.points[1].x} ${props.points[1].y} ${props.points[2].x} ${props.points[2].y}`} 
                stroke="black" 
                fill="transparent" 
            />
            {
                props.points.map(point => 
                    <Point id={point.id} x={point.x} y={point.y} key={point.id}></Point>
                )
            }
        </Fragment>
    );
}

export default Curve;
