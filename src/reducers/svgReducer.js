import { RESIZE_SVG, MODE, CHANGE_MODE } from "../actions/types";

const initialState = {
    size: {
        x: 500,
        y: 500,
    },
    mode: MODE.MOVE,
}

export default (state = initialState, action) => {
    switch(action.type) {
        case RESIZE_SVG:
            return {
                ...state,
                size: {
                    x: action.payload.x,
                    y: action.payload.y
                }
            }
        case CHANGE_MODE:
            return {
                ...state,
                mode: action.payload
            }
        default:
            return {
                ...state
            }
        }
    }