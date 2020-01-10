import { Component, Fragment } from "react";
import React from 'react';
import Point from "../Point/Point";
import WithBindRectHOC from "../../components/WithBindRectHOC";

export class Complex extends Component {
    
    render() {
        const obj = this.props.obj
        const points = this.props.obj.points
        let points_count = this.props.obj.points.length
        return (
            <Fragment>
                <path ref="obj"
                    id={obj.id}
                    d={obj.svgString} 
                    stroke="black" 
                    fill="transparent" 
                />
                <line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} stroke="black" strokeDasharray="1 3" strokeWidth="1px" />
                <line x1={points[points_count-2].x} y1={points[points_count-2].y} x2={points[points_count-1].x} y2={points[points_count-1].y} stroke="black" strokeDasharray="2 2" strokeWidth="1px" /> 
                {
                    points.map(point => 
                        <Point id={point.id} x={point.x} y={point.y} key={point.id}></Point>
                    )
                }
            </Fragment>
        );
    }
}

export default WithBindRectHOC(Complex);