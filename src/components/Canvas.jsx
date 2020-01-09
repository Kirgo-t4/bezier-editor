import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import Point from "../figures/Point/Point";
import QCurve from "../figures/QCurve/QCurve";
import CCurve from "../figures/CCurve/CCurve";
import { type_qcurve, type_ccurve, type_point } from "../actions/types";
import WithMovePoints from "./WithMovePoints";
import WithAddingNewFigure from "./WithAddingNewFigure";
import WithMoveObjs from "./WithMoveObjs";
import { unselectObj } from "../actions/objActions";
import AddQCurveHOC from "../figures/QCurve/AddQCurveHOC";
import AddCCurveHOC from "../figures/CCurve/AddCCurveHOC";

export class Canvas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mode: "move_obj"
        }
    }

    btnMoveClick = (e) => {
        this.setState({mode: "move_obj"})
    }

    btnEditClick = (e) => {
        this.setState({mode: "move_points"})
        this.props.unSelectObj()
    }

    currentState = (children) => {
        switch(this.state.mode) {
            case 'move_obj': 
                return (<WithMoveObjs children={children} />)
            case 'move_points':
                return (<WithMovePoints children={children} />)
            case 'add_qcurve':
                const AddQ = AddQCurveHOC(WithAddingNewFigure)
                return (<AddQ children={children}/>)
            case 'add_ccurve':
                const AddC = AddCCurveHOC(WithAddingNewFigure)
                return (<AddC children={children}/>)
            default:
                throw new Error()
        }
    }

    render() {
        return (
            <Fragment>
                {this.currentState(
                            this.props.objs.map(obj => {
                                if (obj.type === type_point) {
                                    return (<Point id={obj.id} x={obj.x} y={obj.y} key={obj.id} />)
                                } else if (obj.type === type_qcurve) {
                                    return (<QCurve id={obj.id} points={obj.points} key={obj.id} selected={obj.selected} />)
                                } else if (obj.type === type_ccurve) {
                                    return (<CCurve id={obj.id} points={obj.points} key={obj.id} selected={obj.selected} />)
                                } else {
                                    return false
                                }
                            })
                )}
                <button onClick={this.btnMoveClick}>
                    move 
                </button>
                <button onClick={this.btnEditClick}>
                    edit
                </button>
                <button onClick={() => this.setState({mode: "add_qcurve"})}>
                    new Q Curve
                </button>
                <button onClick={() => this.setState({mode: "add_ccurve"})}>
                    new C Curve
                </button>
                
                <h2>{this.state.mode}</h2>
            </Fragment>       
        )
    }
}

const mapStateToProps = (state) => {
    return {
        objs: state.objs.objs,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unSelectObj: () => dispatch(unselectObj()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
