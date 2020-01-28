import React, { Component } from 'react'
import { connect } from "react-redux";
import { moveObj, shiftObj, selectObj, unselectObj, connect as figureConnect, reverse_connect as figureReverseConnect,
     reverse_connect_endside as figureReverseConnectR, self_connect} from "../actions/objActions";
import { getSvgCoordsX, getSvgCoordsY, getRealCoordsOffset, detectConnection, detectConnectionPoint } from "./common";
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
            dragable_point: null,
            highlited_points: null
        }
    }

    get_element_href = (element_id) => {
        for (let obj of this.props.objs) {
            if (obj.id === element_id) {
                return obj
            }
        }
    }

    get_point_href = (point_id) => {
        for (let obj of this.props.objs) {
            for (let point of obj.points) {
                if (point.id === point_id) {
                    return point
                }
            }
        }
    }

    mdHandler = e => {

        this.CTM = document.getElementById('svg').getScreenCTM()

        if (e.target.id && e.target.getAttribute("data-type") === "point" ) {
            let elem_id = e.target.id
            this.setState((prevState) => { 
                return {
                    ...prevState,
                    dragable: null,
                    dragable_point: this.get_point_href(elem_id)
                }
            })
        }

        if (e.target.id && e.target.tagName === "path") {
            let elem_id = e.target.id
            this.setState((prevState) => {
                return {
                    ...prevState,
                    dragable: this.get_element_href(elem_id),
                    dragable_point: null
                }
            })
            this.props.selectObj(e.target.id)
        } else {
            this.setState((prevState) => {
                return {
                    ...prevState,
                    dragable: null,
                }
            })
            this.props.unSelectObj()
        }

        let CTM = this.CTM

        this.x0 = getSvgCoordsX(e.clientX, CTM)
        this.y0 = getSvgCoordsY(e.clientY, CTM)
        this.mouseDown = true
    }

    mmHandler = e => {
        let CTM = this.CTM;
        let detectConnectionResult = undefined;
        if (this.state.dragable_point && this.mouseDown) {
            this.props.moveObj(this.state.dragable_point.id, {x: getSvgCoordsX(e.clientX, CTM), y: getSvgCoordsY(e.clientY, CTM)})
            detectConnectionResult = detectConnectionPoint(this.state.dragable_point, this.props.objs)
        }
        if (!this.state.dragable_point && this.state.dragable && this.mouseDown) {
            let realCord = getRealCoordsOffset(e.clientX, e.clientY, CTM, this.x0, this.y0)
            this.props.shiftObj(this.state.dragable.id, {x: realCord.dx, y: realCord.dy})
            detectConnectionResult = detectConnection(this.state.dragable, this.props.objs)
        }
        if (this.mouseDown && (this.state.dragable || this.state.dragable_point)) {
            console.log(detectConnectionResult)
            if (detectConnectionResult) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        highlited_points: detectConnectionResult.points
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
        }
    }

    muHandler = e => {
        let detectConnectionResult = undefined
        if (!this.state.dragable_point && this.state.dragable && this.mouseDown) {
            let CTM = this.CTM
            let realCord = getRealCoordsOffset(e.clientX, e.clientY, CTM, this.x0, this.y0)
            if ((realCord.dx !==0 ) || (realCord.dy !== 0)) {
                this.props.moveObj(this.state.dragable.id, {x: realCord.dx, y: realCord.dy})
            }
            detectConnectionResult = detectConnection(this.state.dragable, this.props.objs)
        }
        if (this.state.dragable_point) {
            detectConnectionResult = detectConnectionPoint(this.state.dragable_point, this.props.objs)
            this.setState((prevState) => {
                return { 
                    ...prevState,
                    dragable_point: null 
                }
            })
        }
        if ((this.state.dragable || this.state.dragable_point) && this.mouseDown) {
            if (detectConnectionResult) {
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        highlited_points: null
                    }
                })
                switch(detectConnectionResult.type) {
                    case "straight":
                        this.props.figureConnect(detectConnectionResult.obj_left.id, detectConnectionResult.obj_right.id)
                        break
                    case "reverse":
                        this.props.figureReverseConnect(detectConnectionResult.obj_left.id, detectConnectionResult.obj_right.id)
                        break
                    case "reverse_endside":
                        this.props.figureReverseConnectR(detectConnectionResult.obj_left.id, detectConnectionResult.obj_right.id)
                        break
                    case "self":
                        this.props.figureSelfConnect(detectConnectionResult.obj_left.id)
                        break
                    default:
                        throw new Error("Wrong connection type")
                }
            }
        }
        console.log('mouseup')
        this.mouseDown = false
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
        figureConnect: (id1, id2) => dispatch(figureConnect(id1, id2)),
        figureReverseConnect: (id1, id2) => dispatch(figureReverseConnect(id1, id2)),
        figureReverseConnectR: (id1, id2) => dispatch(figureReverseConnectR(id1, id2)),
        figureSelfConnect: (id) => dispatch(self_connect(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(WithMoveObjs)