import { Component, Fragment } from "react";
import React from 'react';
import Point from "./Point";
import TempRect from "./TempRect";

export class Curve extends Component {

    constructor(props) {
        super(props)
        this.state = {
            offset_point0: {
                x: 0,
                y: 0,
            },
            width: 0,
            height: 0,
        }
    }

    updateSurRect = () => {
        let areaOut = this.refs.obj.ownerSVGElement.getBoundingClientRect()
        let areaObj = this.refs.obj.getBoundingClientRect()
        this.setState((prevState) => {
            return {
                ...prevState,
                offset_point0: {
                    x: areaObj.left - areaOut.left - this.props.points[0].x,
                    y: areaObj.top - areaOut.top - this.props.points[0].y,
                },
                width: areaObj.width,
                height: areaObj.height,
            }
        })
    }

    componentDidMount() {
        this.updateSurRect()
    }
    
    render() {
        let points = this.props.points
        return (
            <Fragment>
                {this.props.selected && 
                    <TempRect 
                    startpoint={{x: points[0].x + this.state.offset_point0.x, y: points[0].y + this.state.offset_point0.y}} 
                    width={this.state.width}
                    height={this.state.height}
                    /> 
                }
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

export default Curve;
