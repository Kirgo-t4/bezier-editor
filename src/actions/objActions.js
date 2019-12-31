import { ADD_OBJ, MOVE, Curve, Point, type_curve, type_point } from "./types";

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
