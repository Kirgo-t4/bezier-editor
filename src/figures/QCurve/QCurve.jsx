import { Component, Fragment } from "react";
import React from 'react';
import Point from "../Point/Point";
import WithBindRectHOC from "../../components/WithBindRectHOC";

export class QCurve extends Component {
    
    render() {
        let points = this.props.points
        return (
            <Fragment>
                <path ref="obj"
                    id={this.props.id}
                    d={`M${points[0].x} ${points[0].y} Q ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y}`} 
                    stroke="black" 
                    fill="transparent" 
                />
                <line x1={points[0].x} y1={points[0].y} x2={points[1].x} y2={points[1].y} stroke="black" strokeDasharray="1 3" strokeWidth="1px" />
                <line x1={points[1].x} y1={points[1].y} x2={points[2].x} y2={points[2].y} stroke="black" strokeDasharray="2 2" strokeWidth="1px" />
                {
                    points.map(point => 
                        <Point id={point.id} x={point.x} y={point.y} key={point.id}></Point>
                    )
                }
            </Fragment>
        );
    }
}

export default WithBindRectHOC(QCurve);
