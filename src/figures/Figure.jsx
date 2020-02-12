import { Component, Fragment } from "react";
import React from 'react';
import Point from "./Point/Point";
import WithBindRectHOC from "./../components/Canvas/WithBindRectHOC";

export class Figure extends Component { 
    
    render() {

        const class_name = {}

        const { obj, helpLines, helpPoints, figure_className, point_className } = this.props

        if (figure_className) {
            class_name.className = figure_className
        }

        const points = obj.points

        return (
            <Fragment>
                <path ref="obj"
                    {...class_name}
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
                    helpPoints && points.map(point => 
                        <Point id={point.id} x={point.x} y={point.y} key={point.id} className={point_className}></Point>
                    )
                }
            </Fragment>
        );
    }
}

export default WithBindRectHOC(Figure);