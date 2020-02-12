import { ACTIONS } from "../const";

export const addObj = (type, obj) => {
    return {
        type: ACTIONS.ADD_OBJ,
        payload: new type(obj)
    }
}

export const moveObj = (id, coords) => {
    return {
        type: ACTIONS.MOVE,
        payload: { id, coords }
    }
}

export const moveAll = (coords) => {
    return {
        type: ACTIONS.MOVE_ALL,
        payload: { coords } 
    }
}

export const shiftObj = (id, offset) => {
    return {
        type: ACTIONS.SHIFT,
        payload: {id, offset}
    }
}

export const selectObj = (id) => {
    return {
        type: ACTIONS.SELECT,
        payload: {id}
    }
}

export const unselectObj = (id) => {
    return {
        type: ACTIONS.UNSELECT,
    }
}

export const connect = (id1, id2) => {
    return {
        type: ACTIONS.CONNECT,
        payload: {id1, id2}
    }
}

export const reverse_connect = (id1, id2) => {
    return {
        type: ACTIONS.REVERSE_CONNECT,
        payload: {id1, id2}
    }
}

export const reverse_connect_endside = (id1, id2) => {
    return {
        type: ACTIONS.REVERSE_CONNECT_ENDSIDE,
        payload: {id1, id2}
    }
}

export const self_connect = (id) => {
    return {
        type: ACTIONS.SELF_CONNECT,
        payload: {id}
    }
}

export const deleting = () => {
    return {
        type: ACTIONS.DELETE
    }
}