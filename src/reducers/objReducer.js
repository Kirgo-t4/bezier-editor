import { ADD_OBJ, MOVE, SHIFT, SELECT, UNSELECT, CONNECT, REVERSE_CONNECT, REVERSE_CONNECT_ENDSIDE } from "../actions/types";
import { Curve as QCurve } from "../figures/QCurve/type";
import { Curve as CCurve } from "../figures/CCurve/type";
import { Complex } from "../figures/Complex/type"

const initialState = {
    objs: [
        new QCurve([{x:5, y:180},{x:100, y:10},{x:180, y:140}]),
        new CCurve([{x:180, y:143},{x: 180, y: 80},{x: 300, y: 100},{x: 300, y: 250}])
    ]
}

export default (state = initialState, action) => {
    switch(action.type) {
       case ADD_OBJ:
           return {
               ...state,
               objs: [...state.objs, action.payload]
           }
        case MOVE:
            return {
                ...state,
                objs: state.objs.map((obj) => {
                    if (obj.id === action.payload.id) {
                        return obj.move(action.payload.coords)        
                    } else {
                        if (obj.points) {
                            obj.points.map( point => {
                                if (point.id === action.payload.id) {
                                    return point.move(action.payload.coords)
                                } else {
                                    return point
                                }
                            })
                        } 
                        return obj
                    }
                })
            }
        case SHIFT:
            return {
                ...state,
                objs: state.objs.map((obj) => {
                    if (obj.id === action.payload.id) {
                        return obj.setOffset(action.payload.offset)        
                    } else {
                        return obj
                    }
                })
            }
        case SELECT: 
            return {
                ...state,
                objs: state.objs.map((obj) => {
                    if (obj.id === action.payload.id) {
                        obj.selected = true
                    } else {
                        obj.selected = false
                    }
                    return obj
                })
            }
        case UNSELECT:
            return {
                ...state,
                objs: state.objs.map((obj) => {
                    obj.selected = false
                    return obj
                })
            }
        case CONNECT: 
            return {
                ...state,
                objs: [
                    new Complex(
                        state.objs.filter((obj) => (obj.id === action.payload.id1))[0], 
                        state.objs.filter((obj) => (obj.id === action.payload.id2))[0]
                    ), 
                    ...state.objs.filter((obj) => (obj.id !== action.payload.id1 && obj.id !== action.payload.id2))]
            }
        case REVERSE_CONNECT:
            return {
                ...state,
                objs: [
                    new Complex(
                        state.objs.filter((obj) => (obj.id === action.payload.id1))[0].reverseFigure(), 
                        state.objs.filter((obj) => (obj.id === action.payload.id2))[0]
                    ), 
                    ...state.objs.filter((obj) => (obj.id !== action.payload.id1 && obj.id !== action.payload.id2))]
            }
        case REVERSE_CONNECT_ENDSIDE:
            return {
                ...state,
                objs: [
                    new Complex(
                        state.objs.filter((obj) => (obj.id === action.payload.id1))[0], 
                        state.objs.filter((obj) => (obj.id === action.payload.id2))[0].reverseFigure(),
                    ), 
                    ...state.objs.filter((obj) => (obj.id !== action.payload.id1 && obj.id !== action.payload.id2))]
            }
       default:
           return state; 
    }
}