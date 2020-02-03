export const CONNECT_DIST = 5;
export const MIN_DIST_FOR_ADDING_FIGURE = 50;
export const MIN_COUNT_OF_POINTS_TO_CLOSE_OBJECT = 4;
export const SCALE_STEP = {
    x: 50,
    y: 50,
};

export const ADD_POINT = "ADD_POINT"
export const ADD_CURVE = "ADD_CURVE"
export const ADD_OBJ = "ADD_CURVE"
export const MOVE = "MOVE"
export const MOVE_ALL = "MOVE_ALL"
export const SHIFT = "SHIFT"
export const SELECT = "SELECT"
export const UNSELECT = "UNSELECT"
export const CONNECT = "CONNECT"
export const REVERSE_CONNECT = "REVERSE_CONNECT"
export const REVERSE_CONNECT_ENDSIDE = "REVERSE_CONNECT_ENDSIDE"
export const SELF_CONNECT = "SELF_CONNECT"
export const DELETE = "DELETE"

export const RESIZE_SVG = "RESIZE_SVG"
export const CHANGE_MODE = "CHANGE_MODE"
export const TOGGLE_GRID = "TOGGLE_GRID"

export const type_qcurve = "qcurve"
export const type_ccurve = "ccurve"
export const type_point = "point"
export const type_complex = "complex"
export const type_arc = "arc"
export const type_line = "line"

export const MODE = Object.freeze({
    MOVE: 0,
    ADD_QCURVE: 1,
    ADD_CCURVE: 2,
    ADD_ARC: 3,
    ADD_LINE: 4,
    DELETE: 5,
})