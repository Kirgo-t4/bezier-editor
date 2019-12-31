import React, { Component } from 'react'
import { connect } from "react-redux";
import Point from "./Point";
import Curve from "./Curve";
import { type_curve, type_point } from "../actions/types";
import { moveObj } from "../actions/objActions";

export class Canvas extends Component {

    constructor(props) {
        super(props)
        this.state = { dragable: null }
    }

    mdHandler = e => {
        
        if (e.target.id) {
            console.log(e.clientX)
            console.log(e.screenX)
            console.log(e.currentTarget.getBoundingClientRect())
           // this.props.movePoint(e.target.id, {x: 100, y: 99})
           this.setState({ dragable: e.target.id})
           console.log('mousedown')
        }
    }

    mmHandler = e => {
        if (this.state.dragable) {
            let realCord = {
                x: (e.clientX - e.currentTarget.getBoundingClientRect().left),
                y: (e.clientY - e.currentTarget.getBoundingClientRect().top),
            }
            this.props.movePoint(this.state.dragable, {x: realCord.x, y: realCord.y})
        }
    }

    muHandler = e => {
        this.setState({ dragable: null })
        console.log('mouseup')
    }

    render() {
        return (
            <div className="canvas-wrapper" onMouseDown={this.mdHandler} onMouseMove={this.mmHandler} onMouseUp={this.muHandler}>
                <svg /*viewBox="0 0 100 100"*/>
                    {
                        this.props.points.map(point => 
                            <Point id={point.id} x={point.x} y={point.y} key={point.id}></Point>
                        )
                    }
                    {
                        this.props.curves.map(curve => 
                            <Curve id={curve.id} points={curve.points} key={curve.id}></Curve>
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

const mapDispatchToProps = (dispatch) => {
    return {
        movePoint: (id, coords) => dispatch(moveObj(id, coords))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(Canvas)
