import { Figure } from "../../actions/types";
import { type_qcurve } from "../../actions/types";

export class Curve extends Figure {
    constructor(points) {
        super(points)
        this.type = type_qcurve
    }
}