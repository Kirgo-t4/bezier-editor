import { ADD_OBJ, MOVE, Point, Curve } from "../actions/types";

const initialState = {
    objs: [
        new Point({x:420,y:10}),
        new Curve([{x:5, y:80},{x:250, y:10},{x:480, y:340}])
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
                    if (obj.points) {
                        obj.points.map( point => {
                            if (point.id === action.payload.id) {
                                return point.move(action.payload.coords)
                            } else {
                                return point
                            }
                        })
                        return obj
                    } else {
                        return obj
                    }
                })
            }
       default:
           return state; 
    }
}