import { ADD_OBJ, MOVE, SHIFT, SELECT, UNSELECT, CONNECT } from "./types";

export const addObj = (type, obj) => {
    return {
        type: ADD_OBJ,
        payload: new type(obj)
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

export const connect = (id1, id2) => {
    return {
        type: CONNECT,
        payload: {id1, id2}
    }
}