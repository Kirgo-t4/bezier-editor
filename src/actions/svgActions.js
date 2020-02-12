import { ACTIONS } from "../const";

export const resizeSvg = (size) => {
    return {
        type: ACTIONS.RESIZE_SVG,
        payload: { x: size.x, y: size.y }
    }
}