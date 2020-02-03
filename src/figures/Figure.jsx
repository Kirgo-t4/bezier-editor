import { Component, Fragment } from "react";
import React from 'react';
import Point from "./Point/Point";
import WithBindRectHOC from "./../components/WithBindRectHOC";

export class Figure extends Component {
    
    render() {
        const { obj, helpLines, figure_className, point_className } = this.props
        const points = obj.points
        return (
            <Fragment>
                <path ref="obj"
                    className= {figure_className}
                    id={obj.id}
                    d={obj.svgString} 
                    stroke="black" 
                    fill="transparent" 
                />
                {
                    helpLines && obj.helpLines.map((line, index) => 
                        <line key={obj.id + index} x1={line.point1.x} y1={line.point1.y} x2={line.point2.x} y2={line.point2.y} stroke="black" strokeDasharray="2 3" strokeWidth="1" />
                    )
                }
                {
                    points.map(point => 
                        <Point id={point.id} x={point.x} y={point.y} key={point.id} className={point_className}></Point>
                    )
                }
            </Fragment>
        );
    }
}

export default WithBindRectHOC(Figure);