import React, { Component } from 'react'
import { connect } from "react-redux";
import Point from "./Point";
import Curve from "./Curve";
import { type_curve, type_point } from "../actions/types";

export class Canvas extends Component {

    componentDidMount = () => {
        console.log(this.props.points)
    }

    render() {
        return (
            <div className="canvas-wrapper">
                <svg viewBox="0 0 100 100">
                    {
                        this.props.points.map(point => 
                            <Point x={point.x} y={point.y} key={point.id}></Point>
                        )
                    }
                    {
                        this.props.curves.map(curve => 
                            <Curve points={curve.points} key={curve.id}></Curve>
                        )
                    }
                    
                </svg>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        points: state.objs.objs.filter( obj => obj.type === type_point),
        curves: state.objs.objs.filter( obj => obj.type === type_curve),
    }
}

export default connect(mapStateToProps, null)(Canvas)
