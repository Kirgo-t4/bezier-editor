import React, { Component } from 'react'
import { connect } from "react-redux";
import { addObj } from "../actions/objActions";
import { type_curve } from "../actions/types";
import TempRect from "./TempRect";

export class WithAddingNewCurve extends Component {

    constructor(props) {
        super(props)
        this.state = { 
            dragable: null,
            startpoint: {
                x: 0,
                y: 0,
            },
            endpoint: {
                x: 0,
                y: 0,
            } 
        }
    }

    mdHandler = e => {
        console.log(e.clientX)
        console.log(e.screenX)
        console.log(e.currentTarget.getBoundingClientRect())
        let realCord = {
            x: (e.clientX - e.currentTarget.getBoundingClientRect().left),
            y: (e.clientY - e.currentTarget.getBoundingClientRect().top),
        }
        this.setState({ 
            dragable: true,
            startpoint: {
                x: realCord.x,
                y: realCord.y,
            },
            endpoint: {
                x: realCord.x,
                y: realCord.y,
            },
        })
        console.log('mousedown')
    }

    mmHandler = e => {
        if (this.state.dragable) {
            let realCord = {
                x: (e.clientX - e.currentTarget.getBoundingClientRect().left),
                y: (e.clientY - e.currentTarget.getBoundingClientRect().top),
            }
            this.setState((prevState) => ({
                ...prevState,
                endpoint: {
                    x: realCord.x,
                    y: realCord.y,
                } 
            }))
        }
    }

    muHandler = e => {
        let { startpoint, endpoint } = this.state
        if (startpoint.x !== endpoint.x || startpoint.y !== endpoint.y) {
            let newCurve = [
                {
                    x: startpoint.x,
                    y: startpoint.y,
                },
                {
                    x: parseInt((startpoint.x + endpoint.x)/2),
                    y: parseInt((startpoint.y + endpoint.y)/2),
                },
                {
                    x: endpoint.x,
                    y: endpoint.y,
                },
            ]
            this.props.addCurve(newCurve)
            console.log(newCurve)
        }
        this.setState({ 
            dragable: null,
            startpoint: {x: 0, y: 0},
            endpoint: {x: 0, y: 0} 
        })
    }

    render() {
        return (
            <div className="canvas-wrapper" onMouseDown={this.mdHandler} onMouseMove={this.mmHandler} onMouseUp={this.muHandler}>
                <svg /*viewBox="0 0 100 100"*/>
                    {this.props.children}
                    {this.state.dragable && 
                        <TempRect startpoint={this.state.startpoint} endpoint={this.state.endpoint} />                        
                    }
                </svg>
                {this.state.dragable && <div>koko</div> }
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCurve: point => dispatch(addObj(type_curve, point))
    }
}

export default connect(null, mapDispatchToProps )(WithAddingNewCurve)