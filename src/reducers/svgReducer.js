import { RESIZE_SVG, MODE, CHANGE_MODE, TOGGLE_GRID } from "../const";

const initialState = {
    size: {
        x: 500,
        y: 500,
    },
    mode: MODE.MOVE,
    show_coordinate_grid: true,
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
        case TOGGLE_GRID:
            return {
                ...state,
                show_coordinate_grid: !state.show_coordinate_grid
            }
        default:
            return {
                ...state
            }
        }
    }