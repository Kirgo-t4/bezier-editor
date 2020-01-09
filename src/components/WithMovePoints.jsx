import React, { Component } from 'react'
import { connect } from "react-redux";
import { moveObj } from "../actions/objActions";
import { getSvgCoordsX, getSvgCoordsY } from "./common";
import SVG from "./SVG"

export class WithMovePoints extends Component {

    constructor(props) {
        super(props)
        this.state = { dragable: null }
    }

    mdHandler = e => {
        if (e.target.id && e.target.tagName === "circle" ) {
            this.setState({ dragable: e.target.id})
            console.log('mousedown')
        }
    }

    mmHandler = e => {
        let CTM = document.getElementById('svg').getScreenCTM()
        if (this.state.dragable) {
            let realCord = {
                x: getSvgCoordsX(e.clientX, CTM),
                y: getSvgCoordsY(e.clientY, CTM),
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
                <SVG>
                    {this.props.children}
                </SVG>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        movePoint: (id, coords) => dispatch(moveObj(id, coords))
    }
}

export default connect(null, mapDispatchToProps )(WithMovePoints)