import { ADD_OBJ, MOVE, SHIFT, SELECT, UNSELECT, Curve, Point, type_curve, type_point } from "./types";

export const addObj = (type, obj) => {
    switch (type) {
        case type_curve:
            return {
                type: ADD_OBJ,
                payload: new Curve(obj)
            }
        case type_point:
            return {
                type: ADD_OBJ,
                payload: new Point(obj)
            }
        default:
                throw Error("Wrong Obj Type")
    }
}

export const moveObj = (id, coords) => {
    return {
        type: MOVE,
        payload: { id, coords }
    }
}

export const shiftObj = (id, offset) => {
    return {
        type: SHIFT,
        payload: {id, offset}
    }
}

export const selectObj = (id) => {
    return {
        type: SELECT,
        payload: {id}
    }
}

export const unselectObj = (id) => {
    return {
        type: UNSELECT,
    }
}