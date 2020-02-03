import React, { Fragment } from 'react'
import { connect } from "react-redux";
import Figure from "../figures/Figure";
import WithAddingNewFigure from "./WithAddingNewFigure";
import WithMoveObjs from "./WithMoveObjs";
import WithDeletingObj from './WithDeletingObj';

import AddQCurveHOC from "../figures/QCurve/AddQCurveHOC";
import AddCCurveHOC from "../figures/CCurve/AddCCurveHOC";
import AddArcHOC from "../figures/Arc/AddArcHOC";
import AddLineHOC from "../figures/Line/AddLineHOC";
import CoordGrid from "./CoordGrid";

import { MODE } from "../const";

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
            case MODE.ADD_ARC:
                const AddArc = AddArcHOC(WithAddingNewFigure)
                return (<AddArc children={children}/>)
            case MODE.ADD_LINE:
                const AddLine = AddLineHOC(WithAddingNewFigure)
                return (<AddLine children={children}/>)
            case MODE.DELETE:
                return (<WithDeletingObj children={children} />)
            default:
                throw new Error("Wrong mode type")
        }
    }

    const figureCssClassname = () => {
        switch (props.mode) {
            case MODE.MOVE:
                return "move-cursor"
            case MODE.DELETE:
                return "delete-cursor"
            default:
                return ""
        }
    }

    const pointCssClassname = () => {
        switch (props.mode) {
            case MODE.MOVE:
                return "move-point-cursor"
            default:
                return ""
        }
    }

    return (
        <Fragment>
            {currentState(
                    <Fragment>
                        {
                            props.show_grid && <CoordGrid maxX={props.svg_size.x} maxY={props.svg_size.y} stepX={20} stepY={20} />
                        }
                        {
                            props.objs.map(obj => 
                                <Figure helpLines={true} obj={obj} key={obj.id} figure_className={figureCssClassname()} point_className={pointCssClassname()} />
                            )
                        }
                    </Fragment>
            )}                
        </Fragment>       
    )
}

const mapStateToProps = (state) => {
    return {
        objs: state.objs.objs,
        svg_size: state.svg.size,
        mode: state.svg.mode,
        show_grid: state.svg.show_coordinate_grid,
    }
}

export default connect(mapStateToProps, null)(Canvas)
