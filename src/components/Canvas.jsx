import React, { Fragment } from 'react'
import { connect } from "react-redux";
import Figure from "../figures/Figure";
import WithAddingNewFigure from "./WithAddingNewFigure";
import WithMoveObjs from "./WithMoveObjs";

import AddQCurveHOC from "../figures/QCurve/AddQCurveHOC";
import AddCCurveHOC from "../figures/CCurve/AddCCurveHOC";
import CoordGrid from "./CoordGrid";

import { MODE } from "../actions/types";

const Canvas = (props) => {

    const currentState = (children) => {
        switch(props.mode) {
            case MODE.MOVE: 
                return (<WithMoveObjs children={children} />)
            case MODE.ADD_QCURVE:
                const AddQ = AddQCurveHOC(WithAddingNewFigure)
                return (<AddQ children={children}/>)
            case MODE.ADD_CCURVE:
                const AddC = AddCCurveHOC(WithAddingNewFigure)
                return (<AddC children={children}/>)
            default:
                throw new Error()
        }
    }

    return (
        <Fragment>
            {currentState(
                    <Fragment>
                        <CoordGrid maxX={props.svg_size.x} maxY={props.svg_size.y} stepX={20} stepY={20} />
                        {
                            props.objs.map(obj => 
                                <Figure helpLines={true} obj={obj} key={obj.id} />
                            )
                        }
                    </Fragment>
            )}                
            
            <h2>{props.mode}</h2>
        </Fragment>       
    )
}

const mapStateToProps = (state) => {
    return {
        objs: state.objs.objs,
        svg_size: state.svg.size,
        mode: state.svg.mode,
    }
}

export default connect(mapStateToProps, null)(Canvas)
