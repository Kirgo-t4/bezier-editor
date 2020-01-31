import { Figure } from "../../actions/types";
import { type_line } from "../../const";

export class Line extends Figure {
    constructor(points) {
        super(points)
        this.type = type_line
    }

    get svgString() {
        const points = this.points
        return `M${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
    }
}