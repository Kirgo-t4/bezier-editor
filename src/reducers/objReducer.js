import { ADD_OBJ, Point, Curve } from "../actions/types";

const initialState = {
    objs: [
        new Point({x:10,y:10}),
        new Curve([{x:5, y:10},{x:50, y:10},{x:90, y:90}])
    ]
}

export default (state = initialState, action) => {
    switch(action.type) {
       case ADD_OBJ:
           return {
               ...state,
               objs: [...state.objs, action.payload]
           }
       default:
           return state; 
    }
}