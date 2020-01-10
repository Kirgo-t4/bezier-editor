import React, { Component } from 'react'
import { connect } from "react-redux";
import { moveObj, shiftObj, selectObj, unselectObj, connect as figure_connect } from "../actions/objActions";
import { getSvgCoordsX, getSvgCoordsY, getRealCoordsOffset } from "./common";
import SVG from "./SVG"

const CONNECT_DIST = 5;

export class WithMoveObjs extends Component {

    constructor(props) {
        super(props) 
        this.mouseDown = false
        this.CTM = {}
        this.x0 = 0
        this.y0 = 0
        this.state = {
            dragable: null,
            highlited_points: null
        }
    }

    set_state = (element_id) => {
        this.setState((prevState) => {
            return {
                ...prevState,
                dragable: this.get_element_href(element_id),
            }
        })
    }

    get_element_href = (element_id) => {
        for (let obj of this.props.objs) {
            if (obj.id === element_id) {
                return obj
            }
        }
    }

    detectConnection = () => {
        const objs  = this.props.objs
        console.log(this.state.dragable)
        for (let obj of objs) {
                if (obj === this.state.dragable) {
                    continue
                }
                let x0_obj = obj.points[0].x
                let y0_obj = obj.points[0].y
                let xe_obj = obj.points[obj.points.length - 1].x
                let ye_obj = obj.points[obj.points.length - 1].y
                let x0_drag = this.state.dragable.points[0].x
                let y0_drag = this.state.dragable.points[0].y
                let xe_drag = this.state.dragable.points[this.state.dragable.points.length - 1].x
                let ye_drag = this.state.dragable.points[this.state.dragable.points.length - 1].y
                if ((Math.abs(xe_obj-x0_drag) < CONNECT_DIST) && (Math.abs(ye_obj-y0_drag)) < CONNECT_DIST) {
                    return {obj: obj, side: 'left', type: "straight", points: [obj.points[obj.points.length - 1], this.state.dragable.points[0]]}
                } else if ((Math.abs(x0_obj-xe_drag) < CONNECT_DIST) && (Math.abs(y0_obj-ye_drag)) < CONNECT_DIST) {
                    return {obj: obj, side: 'right', type: "straight", points: [obj.points[0], this.state.dragable.points[this.state.dragable.points.length - 1]] }
                } else if ((Math.abs(x0_obj-x0_drag) < CONNECT_DIST) && (Math.abs(y0_obj-y0_drag)) < CONNECT_DIST) {
                    return {obj: obj, side: 'left', type: "reverse", points: [obj.points[0], this.state.dragable.points[0]]}
                } else if ((Math.abs(xe_obj-xe_drag) < CONNECT_DIST) && (Math.abs(ye_obj-ye_drag)) < CONNECT_DIST) {
                    return {obj: obj, side: 'right', type: "reverse", points: [obj.points[obj.points.length - 1], this.state.dragable.points[this.state.dragable.points.length - 1]] }
                }
        
        }
        return null
        
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
            const detectConnection = this.detectConnection()
            if (detectConnection) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        highlited_points: detectConnection.points
                    }
                })
            } else {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        highlited_points: null
                    }
                })
            }
            let realCord = getRealCoordsOffset(e.clientX, e.clientY, CTM, this.x0, this.y0)
            this.props.shiftObj(this.state.dragable.id, {x: realCord.dx, y: realCord.dy})
        }
    }

    muHandler = e => {
        if (this.state.dragable && this.mouseDown) {
            let CTM = this.CTM
            this.mouseDown = false
            let realCord = getRealCoordsOffset(e.clientX, e.clientY, CTM, this.x0, this.y0)
            console.log("MU", realCord)
            const detectConnection = this.detectConnection()
            if (detectConnection) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        highlited_points: null
                    }
                })
                if (detectConnection.side === 'left') {
                    this.props.figure_connect(detectConnection.obj.id, this.state.dragable.id)
                } else {
                    this.props.figure_connect(this.state.dragable.id, detectConnection.obj.id)
                }
                return false
            }
            if ((realCord.dx !==0 ) || (realCord.dy !== 0)) {
                this.props.moveObj(this.state.dragable.id, {x: realCord.dx, y: realCord.dy})
            }
        }
        console.log('mouseup')
    }

    render() {
        return (
            <div className="canvas-wrapper" onMouseDown={this.mdHandler} onMouseMove={this.mmHandler} onMouseUp={this.muHandler}>
                <SVG>
                    {this.props.children}
                    {this.state.highlited_points && 
                        this.state.highlited_points.map((point) => (
                            <circle id={point.id} key={point.id} cx={point.x} cy={point.y} r="8" fill="transparent" stroke="#000" />
                        ))
                    }
                </SVG>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        objs: state.objs.objs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveObj: (id, coords) => dispatch(moveObj(id, coords)),
        shiftObj: (id, offset) => dispatch(shiftObj(id, offset)),
        selectObj: (id) => dispatch(selectObj(id)),
        unSelectObj: () => dispatch(unselectObj()),
        figure_connect: (id1, id2) => dispatch(figure_connect(id1, id2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(WithMoveObjs)