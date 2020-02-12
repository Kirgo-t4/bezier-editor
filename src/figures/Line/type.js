import { Figure } from "../../actions/types";
import { TFIGURE } from "../../const";

export class Line extends Figure {
    constructor(points) {
        super(points)
        this.type = TFIGURE.LINE
    }

    get svgString() {
        const points = this.points
        return `M${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`
    }
}