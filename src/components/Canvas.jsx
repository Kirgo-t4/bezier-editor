import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import Point from "./Point";
import Curve from "./Curve";
import { type_curve, type_point } from "../actions/types";
import WithMovePoints from "./WithMovePoints";
import WithAddingNewCurve from "./WithAdiingNewCurve";
import WithMoveObjs from "./WithMoveObjs";
import { unselectObj } from "../actions/objActions";

export class Canvas extends Component {

    constructor(props) {
        super(props)
        this.state = {
            mode: "move_obj"
        }
    }

    components = {
        move_points: WithMovePoints,
        add_curve: WithAddingNewCurve,
        move_obj: WithMoveObjs,
    }

    btnMoveClick = (e) => {
        this.setState({mode: "move_obj"})
    }

    btnEditClick = (e) => {
        this.setState({mode: "move_points"})
        this.props.unSelectObj()
    }

    render() {
        const ContainerName = this.components[this.state.mode]
        return (
            <Fragment>
                <ContainerName>
                        {
                            this.props.points.map(point => 
                                <Point id={point.id} x={point.x} y={point.y} key={point.id}></Point>
                            )
                        }
                        {
                            this.props.curves.map(curve => 
                                <Curve id={curve.id} points={curve.points} key={curve.id} selected={curve.selected}></Curve>
                            )
                        }
                </ContainerName> 
                    <button onClick={this.btnMoveClick}>
                        move 
                    </button>
                    <button onClick={this.btnEditClick}>
                        edit
                    </button>
                    <h2>{this.state.mode}</h2>
            </Fragment>       
        )
    }
}

const mapStateToProps = (state) => {
    return {
        points: state.objs.objs.filter( obj => obj.type === type_point),
        curves: state.objs.objs.filter( obj => obj.type === type_curve),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        unSelectObj: () => dispatch(unselectObj()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
