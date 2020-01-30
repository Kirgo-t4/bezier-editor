import { RESIZE_SVG } from "./types";

export const resizeSvg = (size) => {
    return {
        type: RESIZE_SVG,
        payload: { x: size.x, y: size.y }
    }
}