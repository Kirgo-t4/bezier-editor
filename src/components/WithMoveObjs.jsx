import React, { Component } from 'react'
import { connect } from "react-redux";
import { moveObj, shiftObj, selectObj, unselectObj } from "../actions/objActions";
import { getSvgCoordsX, getSvgCoordsY, getRealCoordsOffset } from "./common";
import SVG from "./SVG"

export class WithMoveObjs extends Component {

    constructor(props) {
        super(props) 
        this.mouseDown = false
        this.CTM = {}
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

        console.log(e.target.id)
        console.log(document.getElementById('svg').getScreenCTM())

        this.CTM = document.getElementById('svg').getScreenCTM()

        if (e.target.id && e.target.tagName === "path") {
            this.set_state(e.target.id)
            this.props.selectObj(e.target.id)
        } else {
            this.set_state(null)
            this.props.unSelectObj()
        }

        let CTM = this.CTM

        this.x0 = getSvgCoordsX(e.clientX, CTM)
        this.y0 = getSvgCoordsY(e.clientY, CTM)
        this.mouseDown = true
    }

    mmHandler = e => {
        let CTM = this.CTM
        if (this.state.dragable && this.mouseDown) {
            let realCord = getRealCoordsOffset(e.clientX, e.clientY, CTM, this.x0, this.y0)
            console.log("MM",realCord)
            this.props.shiftObj(this.state.dragable, {x: realCord.dx, y: realCord.dy})
        }
    }

    muHandler = e => {
        let CTM = this.CTM
        this.mouseDown = false
        let realCord = getRealCoordsOffset(e.clientX, e.clientY, CTM, this.x0, this.y0)
        console.log("MU", realCord)
        if ((realCord.dx !==0 ) || (realCord.dy !== 0)) {
            this.props.moveObj(this.state.dragable, {x: realCord.dx, y: realCord.dy})
        }
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
        moveObj: (id, coords) => dispatch(moveObj(id, coords)),
        shiftObj: (id, offset) => dispatch(shiftObj(id, offset)),
        selectObj: (id) => dispatch(selectObj(id)),
        unSelectObj: () => dispatch(unselectObj()),
    }
}

export default connect(null, mapDispatchToProps )(WithMoveObjs)