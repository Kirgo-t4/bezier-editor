import { Component, Fragment } from "react";
import React from 'react';
import Point from "../Point/Point";
import WithBindRectHOC from "../../components/WithBindRectHOC";

export class Arc extends Component {
    
    render() {
        const obj = this.props.obj
        const points = this.props.obj.points
        return (     
            <Fragment>
                <path ref="obj"
                    id={obj.id}
                    d={obj.svgString} 
                    stroke="black" 
                    fill="transparent" 
                />
                {
                    points.map(point => 
                        <Point id={point.id} x={point.x} y={point.y} key={point.id}></Point>
                    )
                }
            </Fragment>
        );
    }
}

export default WithBindRectHOC(Arc);
