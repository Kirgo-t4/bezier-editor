import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import Figure from "../figures/Figure";
import WithAddingNewFigure from "./WithAddingNewFigure";
import WithMoveObjs from "./WithMoveObjs";
import { unselectObj } from "../actions/objActions";
import AddQCurveHOC from "../figures/QCurve/AddQCurveHOC";
import AddCCurveHOC from "../figures/CCurve/AddCCurveHOC";

export class Canvas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mode: "move_edit"
        }
    }

    btnMoveClick = (e) => {
        this.setState({mode: "move_edit"})
    }

    currentState = (children) => {
        switch(this.state.mode) {
            case 'move_edit': 
                return (<WithMoveObjs children={children} />)
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
                            this.props.objs.map(obj => 
                                <Figure obj={obj} key={obj.id} />
                            )
                )}                
                <button onClick={this.btnMoveClick}>
                    move &#38; edit
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
