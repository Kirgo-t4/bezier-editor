import React, { Component } from 'react'
import { connect } from "react-redux";
import { moveObj, shiftObj, selectObj, unselectObj } from "../actions/objActions";

export class WithMoveObjs extends Component {

    constructor(props) {
        super(props) 
        this.readyToMove = false
        this.mouseDown = false
        this.x0 = 0
        this.y0 = 0
        this.state = {
            dragable: null,
        }
    }

    set_state = (element_id) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                dragable: element_id,
            }
        })
    }

    mdHandler = e => {
        let emptyClick = true

        this.refs.svg.childNodes.forEach((elem) => {
            if (!elem.getBoundingClientRect) {
                return false
            }
            if (elem.tagName === "path") {
                let { x, y ,width, height } = elem.getBoundingClientRect()
                if ((e.clientX > x) && (e.clientX < (x + width)) && (e.clientY > y) && (e.clientY < (y + height))) {
                    emptyClick = false
                    this.set_state(elem.id)
                    this.props.selectObj(elem.id)
                }
            }
        })

        if (emptyClick) {
            this.set_state(null)
            this.props.unSelectObj()
        }

        this.x0 = e.clientX
        this.y0 = e.clientY
        this.mouseDown = true
        console.log(this.readyToMove)
    }

    mmHandler = e => {
        if (this.state.dragable && this.mouseDown) {
            let realCord = {
                dx: (e.clientX - this.x0),
                dy: (e.clientY - this.y0),
            }
            console.log("MM",realCord)
            this.props.shiftObj(this.state.dragable, {x: realCord.dx, y: realCord.dy})
        }
    }

    muHandler = e => {
        this.mouseDown = false
        let realCord = {
            dx: (e.clientX - this.x0),
            dy: (e.clientY - this.y0),
        }
        console.log("MU", realCord)
        if ((realCord.dx !==0 ) || (realCord.dy !== 0)) {
            this.props.moveObj(this.state.dragable, {x: realCord.dx, y: realCord.dy})
        }
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
        moveObj: (id, coords) => dispatch(moveObj(id, coords)),
        shiftObj: (id, offset) => dispatch(shiftObj(id, offset)),
        selectObj: (id) => dispatch(selectObj(id)),
        unSelectObj: () => dispatch(unselectObj()),
    }
}

export default connect(null, mapDispatchToProps )(WithMoveObjs)