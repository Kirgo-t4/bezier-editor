import React, { Component } from 'react'
import { connect } from "react-redux";
import { addObj } from "../actions/objActions";
import TempRect from "./TempRect";
import { getSvgCoordsX, getSvgCoordsY } from "./common";
import SVG from "./SVG"

export class WithAddingNewFigure extends Component {

    constructor(props) {
        super(props)
        this.CTM = {}
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
        this.CTM = document.getElementById('svg').getScreenCTM()
        let CTM = this.CTM
        let realCord = {
            x: getSvgCoordsX(e.clientX, CTM),
            y: getSvgCoordsY(e.clientY, CTM),
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
            let CTM = this.CTM
            let realCord = {
                x: getSvgCoordsX(e.clientX, CTM),
                y: getSvgCoordsY(e.clientY, CTM),
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
            let newCurve = this.props.newFigure(startpoint, endpoint)
            this.props.addCurve(this.props.type, newCurve)
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
                <SVG>
                    {this.props.children}
                    {this.state.dragable && 
                        <TempRect startpoint={this.state.startpoint} endpoint={this.state.endpoint} />                        
                    }
                </SVG>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addCurve: (type,point) => dispatch(addObj(type, point))
    }
}

export default connect(null, mapDispatchToProps )(WithAddingNewFigure)