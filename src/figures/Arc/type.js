import { Figure } from "../../actions/types";
import { type_arc } from "../../actions/types";

export class Arc extends Figure {
    constructor(points) {
        super(points)
        this.type = type_arc
    }


    get r() {
        let points = this.points
        let a = Math.sqrt(Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y- points[0].y, 2))
        let b = Math.sqrt(Math.pow(points[2].x - points[1].x, 2) + Math.pow(points[2].y- points[1].y, 2))
        let c = Math.sqrt(Math.pow(points[0].x - points[2].x, 2) + Math.pow(points[0].y- points[2].y, 2))
        let p = (a + b + c) / 2
        return (a * b * c) / (4 * Math.sqrt(p * (p - a) * (p - b) * (p - c)))
    }

    get large_arc() {
        let points = this.points
        let A = Math.pow(points[1].x - points[0].x, 2) + Math.pow(points[1].y- points[0].y, 2)
        let B = Math.pow(points[2].x - points[1].x, 2) + Math.pow(points[2].y- points[1].y, 2)
        let C = Math.pow(points[0].x - points[2].x, 2) + Math.pow(points[0].y- points[2].y, 2)
        return C > A + B ? 0 : 1
    }

    get sweep_flag() {
        let points = this.points
        let D = (points[1].x - points[0].x) * (points[2].y - points[0].y) - (points[1].y - points[0].y) * (points[2].x - points[0].x)
        return D > 0 ? 1 : 0
    }

    get svgString() {
        const points = this.points
        return `M${points[0].x} ${points[0].y} A ${this.r} ${this.r} 0 ${this.large_arc} ${this.sweep_flag} ${points[2].x} ${points[2].y}`
    }
}

