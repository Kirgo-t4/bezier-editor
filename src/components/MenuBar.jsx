import { connect } from "react-redux";
import React from 'react'

import ToolTip from "./ToolTip/ToolTip";

import { ACTIONS, MODE } from "../const";

import { resizeSvg } from "../actions/svgActions";
import { moveAll } from "../actions/objActions";
import { SCALE_STEP } from "../const";

import json_strings from "../strings.json";


const MenuBar = (props) => {

/* Основное меню для работы с редактором */

    const increaseScale = () => {
        const dSize = {
            x: props.svg_size.x - SCALE_STEP.x,
            y: props.svg_size.y - SCALE_STEP.y,
        }

        if ((dSize.x > SCALE_STEP.x * 2) && (dSize.y > SCALE_STEP.y * 2)) {
            props.resizeSvg(dSize)
            props.moveAll({x: (SCALE_STEP.x / -2), y: (SCALE_STEP.y / -2)})
        }
    }

    const decreaseScale = () => {
        const dSize = {
            x: props.svg_size.x + SCALE_STEP.x,
            y: props.svg_size.y + SCALE_STEP.y,
        }

        if ((dSize.x < SCALE_STEP.x * 40) && (dSize.y < SCALE_STEP.y * 40)) {
            props.resizeSvg(dSize)
            props.moveAll({x: SCALE_STEP.x / 2, y: SCALE_STEP.y /2})
        }
    }

    return (
        <div className="menu">
            <div className="menu__sub-block">
                <h3>{json_strings.menu_headers.edit}</h3>
                <div className="menu__buttons-group">
                    <ToolTip text={json_strings.tooltips.edit}>
                        <button className={'button menu__button' + (props.current_mode === MODE.MOVE ? " menu__active-button" : "") } onClick={() => { props.changeMode(MODE.MOVE)}}>
                            <svg version="1.1" viewBox="0 0 297 297">
                                <g>
                                    <path d="M142.131,200.933l34.909-20.166c3.275-1.892,5.181-5.488,4.908-9.261c-0.271-3.772-2.676-7.058-6.188-8.459L13.531,98.336
                                        c-3.664-1.461-7.848-0.602-10.639,2.188c-2.79,2.791-3.651,6.974-2.191,10.639L65.406,273.41c1.402,3.514,4.688,5.918,8.46,6.19
                                        c3.78,0.266,7.37-1.636,9.261-4.909l20.161-34.909l49.79,49.794c1.851,1.852,4.362,2.893,6.982,2.893
                                        c2.618,0,5.13-1.04,6.981-2.893l24.883-24.887c3.855-3.855,3.855-10.105,0-13.962L142.131,200.933z M160.06,268.632l-51.905-51.91
                                        c-1.864-1.864-4.38-2.893-6.98-2.893c-0.428,0-0.859,0.027-1.289,0.084c-3.043,0.4-5.727,2.193-7.261,4.852l-16.416,28.424
                                        L27.554,125.188l121.987,48.66l-28.426,16.42c-2.657,1.535-4.449,4.22-4.851,7.262c-0.4,3.043,0.638,6.099,2.808,8.27
                                        l51.908,51.909L160.06,268.632z"/>
                                    <path d="M294.949,81.099L273.889,53.76c-3.327-4.32-9.525-5.123-13.846-1.796c-4.32,3.327-5.124,9.526-1.797,13.846l8.813,11.441
                                        h-42.625V34.523l11.37,8.795c1.798,1.391,3.923,2.064,6.034,2.063c2.951,0,5.87-1.316,7.815-3.832
                                        c3.337-4.313,2.545-10.513-1.769-13.851L220.602,6.595c-3.556-2.752-8.524-2.752-12.08,0l-27.283,21.104
                                        c-4.314,3.338-5.105,9.538-1.77,13.851c3.337,4.314,9.539,5.106,13.85,1.769l11.37-8.795v42.729h-42.625l8.814-11.441
                                        c3.327-4.319,2.523-10.519-1.796-13.846c-4.318-3.328-10.518-2.522-13.847,1.796l-21.06,27.339c-2.735,3.552-2.735,8.5,0,12.051
                                        l21.06,27.339c1.945,2.525,4.87,3.849,7.828,3.849c2.104,0,4.223-0.67,6.019-2.052c4.319-3.327,5.123-9.527,1.796-13.847
                                        l-8.814-11.441h42.625v42.728l-11.369-8.795c-4.31-3.336-10.513-2.546-13.85,1.767c-3.337,4.314-2.546,10.515,1.767,13.851
                                        l27.284,21.106c1.778,1.375,3.91,2.063,6.041,2.063c2.131,0,4.263-0.688,6.042-2.063l27.283-21.106
                                        c4.313-3.336,5.104-9.536,1.768-13.851c-3.336-4.312-9.537-5.103-13.851-1.767l-11.369,8.795V96.998h42.625l-8.813,11.441
                                        c-3.327,4.319-2.523,10.52,1.797,13.847c1.795,1.383,3.914,2.052,6.018,2.052c2.958,0,5.884-1.324,7.828-3.849l21.061-27.339
                                        C297.684,89.599,297.684,84.651,294.949,81.099z"/>
                                </g>
                            </svg>
                        </button>
                    </ToolTip>
                    <ToolTip text={json_strings.tooltips.delete}>
                        <button className={'button menu__button delete-button' + (props.current_mode === MODE.DELETE ? " menu__active-button" : "") } onClick={() => { props.changeMode(MODE.DELETE)}}>
                            <svg version="1.1" viewBox="0 0 413.348 413.348">
                                <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 
                                182.32 182.32 24.354-24.354-182.32-182.32z"/>
                            </svg>
                        </button>
                    </ToolTip>
                </div>
            </div>
            <div className="menu__sub-block">
                <h3>{json_strings.menu_headers.add}</h3>
                <div className="menu__buttons-group">
                    <ToolTip text={json_strings.tooltips.add_qcurve} >
                        <button className={"button menu__button" + (props.current_mode === MODE.ADD_QCURVE ? " menu__active-button" : "")} 
                            onClick={() => { props.changeMode(MODE.ADD_QCURVE)}}>
                            <svg version="1.1" viewBox="0 0 200 200">
                                <g>
                                    <path d="M26 183 Q 142 -90 166 183" fill="transparent" strokeWidth="10"/>
                                </g>
                            </svg>
                        </button>
                    </ToolTip>
                    <ToolTip text={json_strings.tooltips.add_ccurve} >
                        <button className={"button menu__button" + (props.current_mode === MODE.ADD_CCURVE ? " menu__active-button" : "")} 
                                onClick={() => { props.changeMode(MODE.ADD_CCURVE)}}>
                                <svg version="1.1" viewBox="0 0 200 200">
                                    <g>
                                        <path d="M52 150 C -44 -27 300 6 127 132" fill="transparent" strokeWidth="10"/>
                                    </g>
                                </svg>
                        </button>    
                    </ToolTip>
                </div>
                <div className="menu__buttons-group">
                    <ToolTip text={json_strings.tooltips.add_arc} >
                        <button className={"button menu__button" + (props.current_mode === MODE.ADD_ARC ? " menu__active-button" : "")} 
                            onClick={() => { props.changeMode(MODE.ADD_ARC)}}>
                            <svg version="1.1" viewBox="0 0 200 200">
                                <g>
                                    <path d="M74 190 A 80 80 0 1 1 140 190" fill="transparent" strokeWidth="10"/>
                                </g>
                            </svg>
                        </button>
                    </ToolTip>
                    <ToolTip text={json_strings.tooltips.add_line} >
                        <button className={"button menu__button" + (props.current_mode === MODE.ADD_LINE ? " menu__active-button" : "")} onClick={() => { props.changeMode(MODE.ADD_LINE)}}>
                            <svg version="1.1" viewBox="0 0 200 200">
                                <g>
                                    <path d="M10 190 L 190 10" fill="transparent" strokeWidth="10"/>
                                </g>
                            </svg>
                        </button>
                    </ToolTip>
                </div>
            </div>
            <div className="menu__sub-block">                
                <h3>{json_strings.menu_headers.scale}</h3>
                
                <div className="menu__buttons-group">
                    <p>{props.svg_size.x}п <i className="fas fa-times"></i> {props.svg_size.y}п</p>
                    <div className="menu__sub-buttons">
                        <button className="scale-button" onClick={increaseScale}>
                            <i className="fas fa-search-plus"></i>
                        </button>
                        <button className="scale-button" onClick={decreaseScale}>
                            <i className="fas fa-search-minus"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="menu__sub-block">
                <h3>{json_strings.menu_headers.coords}</h3>
                <div className="menu__buttons-group">
                    <ToolTip text={json_strings.tooltips.coords}>
                        <button className={"button menu__button" + (props.show_grid ? " menu__active-button" : "")} onClick={ props.toggleGrid }>
                            <svg version="1.1" viewBox="0 0 100 100">
                                <g>
                                    <path d="M0 20 H100" />
                                    <path d="M0 80 H100" />
                                    <path d="M20 0 V100" />
                                    <path d="M80 0 V100" />
                                </g>
                            </svg>
                        </button>
                    </ToolTip>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        current_mode: state.svg.mode,
        svg_size: state.svg.size,
        show_grid: state.svg.show_coordinate_grid,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resizeSvg: (newSize) => dispatch(resizeSvg(newSize)),
        moveAll: (coords) => dispatch(moveAll(coords)),
        changeMode: (mode) => dispatch({type: ACTIONS.CHANGE_MODE, payload: mode}),
        toggleGrid: () => dispatch({type: ACTIONS.TOGGLE_GRID})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)