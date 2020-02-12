export const CONNECT_DIST = 5; // Расстояние между 2 крайними точками фигур,  при движении точек или фигур, меньше которого производится слияние фигур
export const MIN_DIST_FOR_ADDING_FIGURE = 50; // Минимальная длина стороны окаймляющего прямоугольника больше которой генерируется создание фигуры внутри прямоугольника
export const MIN_COUNT_OF_POINTS_TO_CLOSE_OBJECT = 4; // Минимальное кол-во точек, при котором возможно замыкание фигуры на себя 
export const SCALE_STEP = { // Шаг координатной сетки в svg координатах
    x: 50,
    y: 50,
};


export const ACTIONS = Object.freeze({ // События вызывающие изменение состояния приложения
    ADD_POINT: "ADD_POINT",
    ADD_CURVE: "ADD_CURVE",
    ADD_OBJ: "ADD_CURVE",
    MOVE: "MOVE",
    MOVE_ALL: "MOVE_ALL",
    SHIFT: "SHIFT",
    SELECT: "SELECT",
    UNSELECT: "UNSELECT",
    CONNECT: "CONNECT",
    REVERSE_CONNECT: "REVERSE_CONNECT",
    REVERSE_CONNECT_ENDSIDE: "REVERSE_CONNECT_ENDSIDE",
    SELF_CONNECT: "SELF_CONNECT",
    DELETE: "DELETE",
    RESIZE_SVG: "RESIZE_SVG",
    CHANGE_MODE: "CHANGE_MODE",
    TOGGLE_GRID: "TOGGLE_GRID"
})

export const TFIGURE = Object.freeze({
    QCURVE: "qcurve",
    CCURVE: "ccurve",
    POINT: "point",
    COMPLEX: "complex",
    ARC: "arc",
    LINE: "line"
})

export const MODE = Object.freeze({
    MOVE: 0,
    ADD_QCURVE: 1,
    ADD_CCURVE: 2,
    ADD_ARC: 3,
    ADD_LINE: 4,
    DELETE: 5,
})