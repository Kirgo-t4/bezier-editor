import { Figure } from "../../actions/types";
import { type_ccurve } from "../../actions/types";

export class Curve extends Figure {
    constructor(points) {
        super(points)
        this.type = type_ccurve
    }

    get svgString() {
        const points = this.points
        return `M${points[0].x} ${points[0].y} C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}`
    }
}