import React, { Component } from 'react'
import { connect } from "react-redux";
import { moveObj } from "../actions/objActions";

export class WithMovePoints extends Component {

    constructor(props) {
        super(props)
        this.state = { dragable: null }
    }

    mdHandler = e => {
        if (e.target.id) {
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
                <svg /*viewBox="0 0 100 100"*/ ref="svg">
                    {this.props.children}
                </svg>
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